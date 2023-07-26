describe('constructor', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.contains('Соберите бургер');
  });

  it('the ingredients have been loaded', () => {
    cy.get('a[class^="IngredientItem_item"]').should('have.length', 15);
  });

  it('should open the modal', () => {
    cy.get('[alt="Флюоресцентная булка R2-D3"]').click();
    cy
      .get('[data-cy="ingredient-modal-title"]')
      .contains('Флюоресцентная булка R2-D3');
    cy.get('[data-cy="ingredient-modal-item"]').contains('Калории,ккал');
  });


  it('should close the modal', () => {
    cy.get('[alt="Флюоресцентная булка R2-D3"]').click();
    cy
      .get('[data-cy="ingredient-modal-title"]')
      .contains('Флюоресцентная булка R2-D3');
    cy.get('[data-cy="close-modal"]').click({ force: true });
    cy.get('[data-cy="close-modal"]').should('not.exist');
  });
  

  it('add products to constructor and order', () => {
    const dataTransfer = new DataTransfer();
    cy.get('a[data-value="bun"]').as('buns');
    cy.get('a[data-value="main"]').as('mains');
    cy.get('a[data-value="sauce"]').as('sauces');
    cy.get('[data-cy="constructor-bun"]').as('boardBun');
    cy.get('[data-cy="constructor-ingredient"]').as('boardIngredients');

    cy.get('@buns').first().trigger('dragstart', { dataTransfer });
    cy.get('@boardBun').first().trigger('drop', { dataTransfer });

    cy.get('@mains').first().trigger('dragstart', { dataTransfer });
    cy.get('@boardIngredients').first().trigger('drop', { dataTransfer });

    cy.get('@sauces').first().trigger('dragstart', { dataTransfer });
    cy.get('@boardIngredients').eq(0).trigger('drop', { dataTransfer });
    cy.get('@sauces').last().trigger('dragstart', { dataTransfer });
    cy.get('@boardIngredients').eq(0).trigger('drop', { dataTransfer });

    cy.get('button').contains('Оформить заказ').click();

    cy.get('input[name="email"]').type('test@tt.ru');
    cy.get('input[name="password"]').type('1234567');
    cy.get('button[class^="login_button"]').click();

    cy.get('button').contains('Оформить заказ').click();
    cy
      .get('div[class^=OrderDetails_number]', { timeout: 17000 })
      .should('be.visible');

    cy.get('[data-cy="close-modal"]').click({ force: true });
    cy.get('[data-cy="close-modal"]').should('not.exist');
  });
});
