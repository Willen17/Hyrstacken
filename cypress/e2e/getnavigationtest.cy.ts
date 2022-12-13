export default describe("Test to try to go to product and go back to start", () => {
  it("Goes to homepage, clicks on adds, go to searchresult page, clicks on the first product, clicks on the profile button, go back twice to searchresults ", () => {
    cy.visit("/");

    cy.contains("Annonser").click();

    cy.url().should("include", "/searchResults");

    cy.get('#item-container').children('a').first().click();

    cy.url().should('not.contain', '/searchResults');
    cy.url().should("include", "/product");

    cy.get("#profile-link").click();

    cy.wait(4000);

    cy.url().should('not.contain', '/product');
    cy.url().should("include", "/profile");

    cy.get("#back-btn").click();

    cy.wait(4000);

    cy.url().should('not.contain', '/profile');
    cy.url().should("include", "/product");

    cy.get("#back-btn").click();

    cy.wait(3000);

    cy.url().should('not.contain', '/product');
    cy.url().should("include", "/searchResults");

    cy.get("#logotype-img").click();

    cy.wait(3000);

    cy.url().should('not.contain', '/searchResults');
    cy.url().should("include", "/");
  });
});