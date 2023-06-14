/// <reference types="cypress" />

describe('Aliases', () => {
  beforeEach(() => {
    cy.visit('/jetsetter');
    cy.get('[data-test="filter-items"]').as('filterInput');
    cy.get('[data-test="items"]').as('allItems');
    cy.get('[data-test="items-unpacked"]').as('unpackedItems');
    cy.get('[data-test="items-packed"]').as('packedItems');
  });
  it('should filter items', () => {
    cy.get('@filterInput').type('iPhone');
    cy.get('@allItems').should('contain.text', 'iPhone');
    cy.get('@allItems').should('not.contain.text', 'hoodie');
  });
  it.only('should move items from one list to the other', () => {
    cy.get('@unpackedItems').find('label').first().as('firstItem');
    cy.get('@firstItem').invoke('text').as('text');
    cy.get('@firstItem').find('input[type="checkbox"]').click();

    cy.get('@text').then((text) => {
      cy.get('@packedItems').find('label').first().should('include.text', text);
    });
  });
});
