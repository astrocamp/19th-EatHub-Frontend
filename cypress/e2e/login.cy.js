describe('Login testing', () => {
  it('User Login', () => {
    cy.visit('http://localhost:5174/login');

    cy.get('input[name=email]').type('demo@gmail.com');
    cy.get('input[name=password]').type('demodemo');
    cy.get('button[type=submit]').click();

    cy.url().should('include', '/');
    cy.contains('目前登入者：demo').should('exist');
  });
});
