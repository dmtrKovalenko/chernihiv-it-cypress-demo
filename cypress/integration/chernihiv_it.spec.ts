describe("Chernihiv it", () => {
  before(() => {
    cy.visit("https://chernihiv.it/conference2019/");
  });

  it("Should open webpage", () => {
    cy.contains("p", "Chernihiv.IT");
  });

  it("Shows about", () => {
    cy.scrollToSection("About");
    cy.contains("h2", "ABOUT");
  });

  it("Shows speakers", () => {
    cy.scrollToSection("Speakers");
    cy.contains("h2", "SPEAKERS");

    cy.get("#speakers .speakers__speaker > img").should("have.length", 6);
    cy.get("#speakers")
      .should("contain", "Борис Могила")
      .should("contain", "Сергій Бабіч")
      .should("contain", "Євгеній Сафронов")
      .should("contain", "Дмитро Коваленко")
      .should("contain", "Богдан Шульга")
      .should("contain", "Рудольф Фенцик");
  });

  it("Shows program", () => {
    cy.scrollToSection("Program");
    cy.contains("h2", "PROGRAM");

    [
      "09:00",
      "10:00",
      "10:10",
      "11:10",
      "12:10",
      "12:30",
      "13:30",
      "14:30",
      "15:30",
      "16:30",
      "17:30"
    ].forEach(time => {
      cy.get(".program__time").contains(time);
    });
  });

  it("Shows partners", () => {
    cy.scrollToSection("Partners");
    cy.get(".partners__partner").should("have.length", 6);

    cy.get(".partners-info-block > p > a").should(
      "have.attr",
      "href",
      "mailto:info@chernihiv.it"
    );
  });

  context("Shows location", () => {
    it("Shows location", () => {
      cy.scrollToSection("Location");
      cy.get("#map").should("be.visible");
    });

    it("Shows marker", () => {
      cy.get(".leaflet-marker-icon").should("be.visible");
    });

    it("Zooms in and out", () => {
      cy.get(".leaflet-control-zoom-in")
        .click()
        .click();
      cy.get(".leaflet-control-zoom-out")
        .click()
        .click();
    });

    it("Shows address popover", () => {
      cy.get(".leaflet-popup-content").should(
        "have.text",
        "м. Чернігів,вул. О. Молодчого 46,Полікомбанк, 7 поверх"
      );
    });

    it("Closes address popover", () => {
      cy.get(".leaflet-popup-close-button").click();
      cy.get(".leaflet-popup-content").should("not.be.visible");
    });
  });

  context("Shows tickets", () => {
    it("Shows tickets section", () => {
      cy.scrollToSection("Buy ticket");
    });

    it("Shows early bird ticket", () => {
      cy.get("#tickets .tickets__ticket-price")
        .eq(0)
        .contains("Early bird");

      cy.get("#tickets .tickets__ticket-price")
        .eq(0)
        .contains("350");
    });

    it("Shows regular ticket", () => {
      cy.get("#tickets .tickets__ticket-price")
        .eq(1)
        .contains("Regular price");
      cy.get("#tickets .tickets__ticket-price")
        .eq(1)
        .contains("500");
    });

    it("Shows buy tickets button", () => {
      cy.get("#tickets a")
        .contains("BUY TICKETS")
        .should("be.visible")
        .should(
          "have.attr",
          "href",
          "https://chernihivitconf2019.ticketforevent.com/"
        );
    });
  });
});
