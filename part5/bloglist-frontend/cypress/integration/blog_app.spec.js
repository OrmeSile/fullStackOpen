describe('Blog app', function () {
  const user = { username: 'root', name: 'root', password: 'secret' }
  const blog = { title: 'corn', author: 'me', url: 'local' }
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.get('.login-form').should('be.visible')
  })
  
  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('.username').type(user.username)
      cy.get('.password').type(user.password)
      cy.get('.login').click()
      cy.get('.message').contains(`${user.username} logged in`)
    })
    it('fails with wrong credentials', function () {
      cy.get('.username').type('hello')
      cy.get('.password').type('user')
      cy.get('.login').click()
      cy.get('.message')
        .should('contain', 'wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })
  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: user.username, password: user.password })
    })
    it('A blog can be created', function () {
      cy.get('.show-blog-form').click()
      cy.get('.title').type(blog.title)
      cy.get('.author').type(blog.author)
      cy.get('.url').type(blog.url)
      cy.get('.create').click()
      cy.get('.blog')
        .should('contain', blog.title)
        .and('contain', blog.author)
        .and('contain', blog.url)
    })
  })
})