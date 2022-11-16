"use strict";

/**
 * test controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::test.test", {
  createOrUpdate: async (ctx) => {

    // grabbing the existing data to see if the required value needed to search exists
    const data = JSON.parse(ctx.request.body.data);

    // if the required value exists, then we can search for the existing record
    if (data.string) {

      // search for the existing record by injecting a filter string into the query
      ctx.query.filters = { string: data.string };
      const findExisting = await strapi.controller('api::test.test').find(ctx)

      const existingData = findExisting.data

      // if the existing record exists, then we can update it
      if (existingData.length === 1) {
        ctx.params = { id: existingData[0].id }
        ctx.query.populate = ['media']

        // downside here is if you allow multiple media it will not delete the old media and just add a new file
        // not currently sure how to "replace" the media here but you could loop through existing media and unlink them
        return strapi.controller('api::test.test').update(ctx)

      // if there are multiple matching then we will return an error
      } else if (existingData.length >= 2) {
        return ctx.badRequest('Multiple Values matching that string')

      // if there is no existing record, then we can create a new one
      } else {
        ctx.query.populate = ['media']
        return strapi.controller('api::test.test').create(ctx)
      }
    }
  }
});
