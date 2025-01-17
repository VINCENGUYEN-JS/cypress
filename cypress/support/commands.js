// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('signIn', (email, password) => {
  cy.visit('/echo-chamber/sign-in');
  cy.get('[data-test="sign-in-email"]').type(email);
  cy.get('[data-test="sign-in-password"]').type(password);
  cy.get('[data-test="sign-in-submit"]').click();
});

Cypress.Commands.add('signUp', (email, password) => {
  cy.visit('/echo-chamber/sign-up');
  cy.get('[data-test="sign-up-email"]').type(email);
  cy.get('[data-test="sign-up-password"]').type(password);
  cy.get('[data-test="sign-up-submit"]').click();
});

//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
