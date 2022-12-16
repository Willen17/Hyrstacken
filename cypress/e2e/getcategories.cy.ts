export default describe("Test to check if all category-buttons work", () => {
    it("Should click all the buttons in the category-filter on both desktop and phone devices", () => {
        cy.viewport("macbook-16");
        cy.visit("/");

        cy.contains("Annonser").click();

        cy.wait(2000);

        cy.url().should("include", "/searchResults");

        cy.get("#category-btn")
            .children("li")
            .eq(0)
            .should("contain", "Verktyg")
            .click();

        cy.get("#category-btn")
            .children("li")
            .eq(0)
            .children("span")
            .should("contain", "Verktyg")
            .should("have.class", "bg-lightRed");

        cy.get("#category-btn")
            .children("li")
            .eq(0)
            .should("contain", "Verktyg")
            .click();

        cy.get("#category-btn")
            .children("li")
            .eq(0)
            .children("span")
            .should("contain", "Verktyg")
            .should("not.have.class", "bg-lightRed");

        cy.get("#category-btn")
            .children("li")
            .eq(1)
            .should("contain", "Hem")
            .click();

        cy.get("#category-btn")
            .children("li")
            .eq(1)
            .children("span")
            .should("contain", "Hem")
            .should("have.class", "bg-lightRed");

        cy.get("#category-btn")
            .children("li")
            .eq(1)
            .should("contain", "Hem")
            .click();

        cy.get("#category-btn")
            .children("li")
            .eq(1)
            .children("span")
            .should("contain", "Hem")
            .should("not.have.class", "bg-lightRed");

        cy.get("#category-btn")
            .children("li")
            .eq(2)
            .should("contain", "Sport")
            .click();

        cy.get("#category-btn")
            .children("li")
            .eq(2)
            .children("span")
            .should("contain", "Sport")
            .should("have.class", "bg-lightRed");

        cy.get("#category-btn")
            .children("li")
            .eq(2)
            .should("contain", "Sport")
            .click();

        cy.get("#category-btn")
            .children("li")
            .eq(2)
            .children("span")
            .should("contain", "Sport")
            .should("not.have.class", "bg-lightRed");

        cy.get("#category-btn")
            .children("li")
            .eq(3)
            .should("contain", "Friluftsliv")
            .click();

        cy.get("#category-btn")
            .children("li")
            .eq(3)
            .children("span")
            .should("contain", "Friluftsliv")
            .should("have.class", "bg-lightRed");

        cy.get("#category-btn")
            .children("li")
            .eq(3)
            .should("contain", "Friluftsliv")
            .click();

        cy.get("#category-btn")
            .children("li")
            .eq(3)
            .children("span")
            .should("contain", "Friluftsliv")
            .should("not.have.class", "bg-lightRed");

        cy.get("#category-btn")
            .children("li")
            .eq(4)
            .should("contain", "Övrigt")
            .click();

        cy.get("#category-btn")
            .children("li")
            .eq(4)
            .children("span")
            .should("contain", "Övrigt")
            .should("have.class", "bg-lightRed");

        cy.get("#category-btn")
            .children("li")
            .eq(4)
            .should("contain", "Övrigt")
            .click();

        cy.get("#category-btn")
            .children("li")
            .eq(4)
            .children("span")
            .should("contain", "Övrigt")
            .should("not.have.class", "bg-lightRed");
    });

    it("Go to verification page", () => {
        cy.viewport("iphone-xr", "portrait");
        cy.visit("/");

        cy.wait(2000);

        cy.get("#add-btn").click();

        cy.wait(2000);

        cy.url().should("include", "/searchResults");

        cy.get("#filter-btn").click();

        cy.get("#category-btn")
            .children("li")
            .eq(0)
            .should("contain", "Verktyg")
            .click();

        cy.get("#category-btn")
            .children("li")
            .eq(0)
            .children("span")
            .should("contain", "Verktyg")
            .should("have.class", "bg-lightRed");

        cy.get("#category-btn")
            .children("li")
            .eq(0)
            .should("contain", "Verktyg")
            .click();

        cy.get("#category-btn")
            .children("li")
            .eq(0)
            .children("span")
            .should("contain", "Verktyg")
            .should("not.have.class", "bg-lightRed");

        cy.get("#category-btn")
            .children("li")
            .eq(1)
            .should("contain", "Hem")
            .click();

        cy.get("#category-btn")
            .children("li")
            .eq(1)
            .children("span")
            .should("contain", "Hem")
            .should("have.class", "bg-lightRed");

        cy.get("#category-btn")
            .children("li")
            .eq(1)
            .should("contain", "Hem")
            .click();

        cy.get("#category-btn")
            .children("li")
            .eq(1)
            .children("span")
            .should("contain", "Hem")
            .should("not.have.class", "bg-lightRed");

        cy.get("#category-btn")
            .children("li")
            .eq(2)
            .should("contain", "Sport")
            .click();

        cy.get("#category-btn")
            .children("li")
            .eq(2)
            .children("span")
            .should("contain", "Sport")
            .should("have.class", "bg-lightRed");

        cy.get("#category-btn")
            .children("li")
            .eq(2)
            .should("contain", "Sport")
            .click();

        cy.get("#category-btn")
            .children("li")
            .eq(2)
            .children("span")
            .should("contain", "Sport")
            .should("not.have.class", "bg-lightRed");

        cy.get("#category-btn")
            .children("li")
            .eq(3)
            .should("contain", "Friluftsliv")
            .click();

        cy.get("#category-btn")
            .children("li")
            .eq(3)
            .children("span")
            .should("contain", "Friluftsliv")
            .should("have.class", "bg-lightRed");

        cy.get("#category-btn")
            .children("li")
            .eq(3)
            .should("contain", "Friluftsliv")
            .click();

        cy.get("#category-btn")
            .children("li")
            .eq(3)
            .children("span")
            .should("contain", "Friluftsliv")
            .should("not.have.class", "bg-lightRed");

        cy.get("#category-btn")
            .children("li")
            .eq(4)
            .should("contain", "Övrigt")
            .click();

        cy.get("#category-btn")
            .children("li")
            .eq(4)
            .children("span")
            .should("contain", "Övrigt")
            .should("have.class", "bg-lightRed");

        cy.get("#category-btn")
            .children("li")
            .eq(4)
            .should("contain", "Övrigt")
            .click();

        cy.get("#category-btn")
            .children("li")
            .eq(4)
            .children("span")
            .should("contain", "Övrigt")
            .should("not.have.class", "bg-lightRed");
    });
});
