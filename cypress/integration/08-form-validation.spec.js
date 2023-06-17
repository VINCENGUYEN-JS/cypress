/// <reference types="cypress" />

describe('Sign Up', () => {
  beforeEach(() => {
    cy.visit('/echo-chamber/sign-up');
  });

  it('should require an email', () => {
    cy.get('[data-test="sign-up-submit"]').click();
    cy.get('[data-test="sign-up-email"]')
      .invoke('prop', 'validationMessage')
      .should('contain', 'Please fill out this field');
  });

  it('should require that the email actually be an email address', () => {
    cy.get('[data-test="sign-up-email"]').type('notanemail{enter}');

    cy.get('[data-test="sign-up-email"]:invalid')
      .invoke('prop', 'validationMessage')
      .should('contain', "Please include an '@' in the email address.");

    cy.get('[data-test="sign-up-email"]:invalid')
      .invoke('prop', 'validity')
      .its('typeMismatch')
      .should('be.true');
  });

  it('should require a password when the email is present', () => {
    cy.get('[data-test="sign-up-email"]').type('valid@email.com{enter}');
    cy.get('input:invalid').should('have.length', 1);
    cy.get('[data-test="sign-up-password"]')
      .invoke('prop', 'validity')
      .its('valueMissing')
      .should('be.true');
  });
});
