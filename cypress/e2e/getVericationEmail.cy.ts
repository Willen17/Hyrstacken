export default describe("Test to get to verification page when logging in or signing up", () => {
    it("Go to verification page", () => {
        cy.visit("/");

        cy.contains("Logga in").click();

        // Should be on a new URL which
        // includes '/commands/actions'
        cy.url().should("include", "/auth?callbackUrl");

        // Get an input, type into it and verify
        // that the value has been updated
        cy.get("#email")
            .type("mail@mail.com")
            .should("have.value", "mail@mail.com");
        cy.get("form").submit();

        cy.url().should("include", "/verify");
    });
});
