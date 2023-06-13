/// <reference types="cypress" />

describe('Basic Practice', () => {
  beforeEach(() => {
    cy.visit('/jetsetter');
  });

  describe('Adding a new item', () => {
    it('should put a new item on the page after clicking on "Add Item"', () => {
      const newTextAdded = 'Hello World';
      cy.get('[data-test="new-item-input"]').type(newTextAdded);
      cy.get('[data-test="add-item"]').click();
      cy.contains(newTextAdded);
    });

    it('should put a new item in the "Unpacked Items" list', () => {
      const newTextAdded = 'Hello World';
      cy.get('[data-test="new-item-input"]').type(newTextAdded);
      cy.get('form').submit();
      cy.get('[data-test="items-unpacked"]').contains(newTextAdded);
    });

    it('should put a new item as the last item in the "Unpacked Items" list', () => {
      const newTextAdded = 'Hello World';
      cy.get('[data-test="new-item-input"]').type(newTextAdded);
      cy.get('form').submit();
      cy.get('[data-test="items-unpacked"] li').last().contains(newTextAdded);
    });
  });

  describe('Filtering items', () => {
    it('should show items that match whatever is in the filter field', () => {
      const itemToMatch = 'Tooth Brush';
      cy.get('[data-test="filter-items"]').type(itemToMatch);
      cy.get('[data-test="items-unpacked"]').contains(itemToMatch);
    });

    it('should hide items that do not match whatever is in the filter field', () => {
      const itemToMatch = 'Tooth';
      const itemNotMatch = 'Hoodie';
      cy.get('[data-test="filter-items"]').type(itemToMatch);
      cy.contains(itemNotMatch).should('not.exist');
    });

    it('should show items that match whatever is in the filter field (better)', () => {
      cy.get('[data-test="filter-items"]').type('Tooth');

      cy.get('[data-test="items"] li').each(($item) => {
        expect($item.text()).to.include('Tooth');
      });
    });
  });

  describe('Removing items', () => {
    describe('Remove all', () => {
      it('should remove all of the items', () => {
        cy.get('[data-test="remove-all"]').click();
        cy.get('[data-test="items-unpacked"]').contains('No items to show');
      });
    });

    describe('Remove individual items', () => {
      it('should have a remove button on an item', () => {
        cy.get('[data-test="items"] li button').each(($item) => {
          expect($item.text()).to.contain('Remove');
        });
      });

      it('should remove an element from the page (better)', () => {
        cy.get('[data-test="items"] li')
          .first()
          .within(() => cy.get('[data-test="remove"]').click())
          .should('not.exist');
      });
    });
  });

  describe('Mark all as unpacked', () => {
    it('should empty out the "Packed" list', () => {
      cy.get('[data-test="mark-all-as-unpacked"]').click();
      cy.get('[data-test="items-packed"]').contains('No items to show');
    });

    it('should empty have all of the items in the "Unpacked" list', () => {
      cy.get('[data-test="remove-all"]').click();
      cy.get('[data-test="items-unpacked"]').contains('No items to show');
    });
  });

  describe.only('Mark individual item as packed', () => {
    it('should move an individual item from "Unpacked" to "Packed"', () => {
      cy.get('[data-test="items"] li label')
        .first()
        .within(() => cy.get('input[type="checkbox"]').click())
        .then(($item) => {
          const text = $item.text();
          cy.get('[data-test="items-packed"] li label').first().should('have.text', text);
        });
    });
  });
});
