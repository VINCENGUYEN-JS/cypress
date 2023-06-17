/// <reference types="cypress" />

describe('Input obstacles', () => {
  beforeEach(() => {
    cy.visit('/obstacle-course');
  });

  it('should input text into the input field', () => {
    const thought = 'Ravioli are a form of pop tart.';

    cy.get('[data-test="text-input"]').type(thought);
    cy.get('[data-test="text-result"]').contains(thought);
  });

  it('should control a select input', () => {
    const selectValue = 'Hulk';
    cy.get('[data-test="select-input"]').as('select');
    cy.get('[data-test="select-result"]').as('selectResult');
    cy.get('@select').select(selectValue);
    cy.get('@selectResult').contains(selectValue);
  });

  it('should find and control a checkbox input', () => {
    cy.get('[data-test="checkbox-tomato"]').as('checkbox');
    cy.get('[data-test="checkbox-result"]').as('checkBoxResult').contains('(None)');
    cy.get('@checkbox').check();
    cy.get('[data-test="checkbox-result"]').contains('Tomato');
  });

  it('should find and control a radio input', () => {
    cy.get('[data-test="radio-ringo"]').check();
    cy.get('[data-test="radio-result"]').contains('Ringo');
  });

  it('should find and control a color input', () => {
    const colorInput = '#0000ff';
    cy.get('[data-test="color-input"]').invoke('val', colorInput).trigger('input');
    cy.get('[data-test="color-result"]').contains(colorInput);
  });

  it('should find and control a date input', () => {
    const dateInput = '2021-12-17';
    cy.get('[data-test="date-input"]').invoke('val', dateInput).trigger('input');
    cy.get('[data-test="date-result"]').contains(dateInput);
  });

  it.only('should find and control a range input', () => {
    const rangeInput = 7;
    cy.get('[data-test="range-input"]').invoke('val', rangeInput).trigger('input');
    cy.get('[data-test="range-result"]').contains(rangeInput);
  });

  it('should find and control a file input', () => {
    cy.get('[data-test="file-input"]');
    cy.get('[data-test="file-result"]');
  });
});
