export default describe("Test to try to book a product without beeing logged in", () => {
  it("Goes to homepage, clicks on adds, go to searchresult page and click on first product and tries to find booking button", () => {
    cy.visit("/");

    cy.contains("Annonser").click();

    // Should be on a new URL which
    // includes '/commands/actions'
    cy.url().should("include", "/searchResults");

    // Get an input, type into it and verify
    // that the value has been updated

    cy.get('#item-container').children('a').first().click();

    cy.url().should('not.contain', '/searchResults');
    cy.url().should("include", "/product");

    cy.get('#submit-btn').should('not.exist');
  });
});