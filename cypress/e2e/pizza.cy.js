describe('Order Pizza Page', () => {
  beforeEach(() => {
    cy.visit('/order');
  });

  it('should enter a name in the input field', () => {
    cy.get('input[name="isim"]').type('Hasan Şimşek');
    cy.get('input[name="isim"]').should('have.value', 'Hasan Şimşek');
  });

  it('should select multiple toppings', () => {
    cy.get('input[type="checkbox"][value="Pepperoni"]').check();
    cy.get('input[type="checkbox"][value="Domates"]').check();
    cy.get('input[type="checkbox"][value="Biber"]').check();
    cy.get('input[type="checkbox"][value="Sosis"]').check();
    cy.get('input[type="checkbox"][value="Pepperoni"]').should('be.checked');
    cy.get('input[type="checkbox"][value="Domates"]').should('be.checked');
    cy.get('input[type="checkbox"][value="Biber"]').should('be.checked');
    cy.get('input[type="checkbox"][value="Sosis"]').should('be.checked');
  });

  it('should submit the form', () => {
    cy.get('input[name="isim"]').type('Hasan Şimşek');
    cy.get('input[type="radio"][value="Büyük"]').check();
    cy.get('select[name="kenar"]').select('İnce');
    cy.get('input[type="checkbox"][value="Pepperoni"]').check();
    cy.get('input[type="checkbox"][value="Domates"]').check();
    cy.get('input[type="checkbox"][value="Biber"]').check();
    cy.get('input[type="checkbox"][value="Sosis"]').check();
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/success');
  });
});