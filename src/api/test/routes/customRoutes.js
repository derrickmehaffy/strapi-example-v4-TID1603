module.exports = {
  routes: [
    { // Path defined with an URL parameter
      method: 'POST',
      path: '/tests/actions/create-or-update',
      handler: 'test.createOrUpdate',
    }
  ]
}
