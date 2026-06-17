describe('Hero Section', () => {
  beforeEach(() => {
    cy.visit('/');

    // Wacht tot hero-section echt gerenderd is
    cy.get('[data-cy="hero-section"]', { timeout: 10000 })
      .scrollIntoView()
      .should('exist');
  });

  it('Hero section is zichtbaar op de pagina', () => {
    cy.get('[data-cy="hero-section"]').should('be.visible');
  });

  it('Hero tekst wrapper bevat de heading', () => {
    cy.get('[data-cy="hero-text-wrapper"]').within(() => {
      cy.get('[data-cy="hero-heading"]').should('be.visible');
    });
  });

  it('De highlight tekst is correct en rood', () => {
    cy.get('[data-cy="hero-highlight"]')
      .should('contain.text', 'Bereid je voor op')
      .and('have.css', 'color')
      .then((color) => {
        // checkt of kleur rood-achtig is
        expect(color).to.match(/^rgb\((255|2\d\d),\s*\d+,\s*\d+\)$/);
      });
  });

  it('De complete hero heading bevat de juiste tekst', () => {
    cy.get('[data-cy="hero-heading"]').should(
      'contain.text',
      'Bereid je voor op een nieuwe piek in jouw progressie.'
    );
  });

  it('Maakt een Percy snapshot van de Hero Section', () => {
    cy.get('[data-cy="hero-section"]')
      .scrollIntoView()
      .should('be.visible');
    cy.percySnapshot('Hero Section');
  });

  it('Mobiele weergave van Hero Section (iPhone X)', () => {
    cy.viewport('iphone-x');
    cy.visit('/');
    cy.get('[data-cy="hero-section"]', { timeout: 10000 })
      .scrollIntoView()
      .should('be.visible');
    cy.percySnapshot('Hero Section - Mobile');
  });
});
