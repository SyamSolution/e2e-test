describe("Eligibility and Discount Checks", () => {
  it("Should check eligibility successfully", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:4004/check-eligible",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        day: "Sunday",
        month: "May",
        year: "2024",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("data");
    });
  });

  it("Should check discount successfully", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:4004/check-discount",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        isContinentSoldOut: true,
        isContinentDiff: true,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("data");
    });
  });
});
