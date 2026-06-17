describe('Features Section', () => {
  beforeEach(() => {
    cy.visit('/');

    // Scroll naar features-section om lazy rendering te triggeren
    cy.get('[data-cy="features-section"]', { timeout: 10000 })
      .scrollIntoView()
      .should('exist');
  });

  it('Features section is zichtbaar', () => {
    cy.get('[data-cy="features-section"]').should('be.visible');
  });

  it('Bevat een juiste heading', () => {
    cy.get('[data-cy="features-heading"]')
      .should('contain.text', 'De features die')
      .and('contain.text', 'wij bieden');
  });

  const features = [
    {
      title: 'Gecertificeerde personal trainers',
      description: 'Wij bieden gecertificeerde personal trainers die jou de perfecte tips kunnen geven waar nodig',
    },
    {
      title: 'Een snelle reactietijd',
      description: 'Onze trainers zijn altijd bereikbaar via de app, zodat je nooit lang hoeft te wachten op een antwoord.',
    },
    {
      title: 'Slimme tools & tips',
      description: 'We helpen je met handige tools en slimme inzichten om jouw doelen écht te bereiken.',
    }
  ];

  features.forEach((feature, index) => {
    it(`Feature ${index + 1} bevat correcte titel en tekst`, () => {
      cy.get(`[data-cy="feature-block-${index}"]`)
        .scrollIntoView()
        .should('exist');
      cy.get(`[data-cy="feature-title-${index}"]`)
        .should('contain.text', feature.title);
      cy.get(`[data-cy="feature-description-${index}"]`)
        .should('contain.text', feature.description);
    });
  });

  it('Maakt een Percy snapshot van de Features Section', () => {
    cy.get('[data-cy="features-section"]')
      .scrollIntoView()
      .should('be.visible');
    cy.percySnapshot('Features Section');
  });

  it('Mobiele weergave van Features Section (iPhone X)', () => {
    cy.viewport('iphone-x');
    cy.visit('/');
    cy.get('[data-cy="features-section"]', { timeout: 10000 })
      .scrollIntoView()
      .should('be.visible');
    cy.percySnapshot('Features Section - Mobile');
  });
});
