describe('CTA Section', () => {
  beforeEach(() => {
    cy.visit('/');

    // Scroll naar de CTA sectie om deze zichtbaar te maken
    cy.get('[data-cy="cta-section"]', { timeout: 10000 })
      .scrollIntoView()
      .should('exist');
  });

  it('CTA sectie is zichtbaar', () => {
    cy.get('[data-cy="cta-section"]').should('be.visible');
  });

  it('Bevat heading en tekst', () => {
    cy.get('[data-cy="cta-heading"]').should('contain.text', 'SweatSmartly');
    cy.get('[data-cy="cta-text"]').should('contain.text', 'Meld je dan nu aan bij SweatSmartly');
  });

  it('Knop is klikbaar en opent de modal', () => {
    cy.get('[data-cy="cta-button"]').click();
    cy.get('[role="dialog"]').should('be.visible'); // Chakra UI modal check
  });

  it('Maakt een Percy snapshot van de CTA Section', () => {
    cy.get('[data-cy="cta-section"]').scrollIntoView().should('be.visible');
    cy.percySnapshot('CTA Section');
  });

  it('Mobiele weergave van CTA Section (iPhone X)', () => {
    cy.viewport('iphone-x');
    cy.visit('/');
    cy.get('[data-cy="cta-section"]', { timeout: 10000 })
      .scrollIntoView()
      .should('be.visible');
    cy.percySnapshot('CTA Section - Mobile');
  });
});
