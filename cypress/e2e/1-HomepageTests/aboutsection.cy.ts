describe('About Section', () => {
  beforeEach(() => {
    cy.visit('/');
  
    // Log de volledige body zodat we kunnen zien of iets ontbreekt
    cy.document().then((doc) => {
      console.log('📦 DOM content:', doc.body.innerHTML);
    });
  
    cy.wait(3000); // extra wachttijd om rendering te forceren
  });
  
  it('About section is zichtbaar', () => {
    cy.get('[data-cy="about-section"]').should('be.visible');
  });

  it('Bevat een correcte heading', () => {
    cy.get('[data-cy="about-heading"]').should('contain.text', 'Krijg gepersonaliseerd');
  });

  it('Bevat een beschrijving met inhoud', () => {
    cy.get('[data-cy="about-description"]').should('contain.text', 'Vind je een personal trainer te duur');
  });

  it('Bevat drie knoppen met juiste tekst', () => {
    cy.get('[data-cy="about-buttons"]').within(() => {
      cy.get('[data-cy="about-btn-tips"]').should('contain.text', 'Tips op maat');
      cy.get('[data-cy="about-btn-reactie"]').should('contain.text', 'Snelle reactie');
      cy.get('[data-cy="about-btn-prijs"]').should('contain.text', 'Goedkope prijs');
    });
  });

  it('Maakt een Percy snapshot van de About Section', () => {
    cy.get('[data-cy="about-section"]').scrollIntoView().should('be.visible');
    cy.percySnapshot('About Section');
  });

  it('Mobiele weergave van About Section (iPhone X)', () => {
    cy.viewport('iphone-x');
    cy.visit('/');
    cy.get('[data-cy="about-section"]', { timeout: 10000 }).scrollIntoView().should('exist');
    cy.percySnapshot('About Section - Mobile');
  });
});
