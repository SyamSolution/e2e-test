let authToken;

describe("User Login and Get Tickets By Continent & By Type", () => {
  it("Should login successfully and store the token", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:4001/users/login",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        email: Cypress.env("email"),
        password: Cypress.env("password"),
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property("data");

      authToken = response.body.data.token;
    });
  });

  it("Should get tickets by continent using the stored token", () => {
    expect(authToken).to.exist;

    cy.request({
      method: "GET",
      url: "http://localhost:4003/tickets/continent/asean",
      headers: {
        Authorization: `${authToken}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("data");
    });
  });

  it("Should get tickets by type using the stored token", () => {
    expect(authToken).to.exist;

    cy.request({
      method: "GET",
      url: "http://localhost:4003/tickets/type/bronze",
      headers: {
        Authorization: `${authToken}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("data");
    });
  });
});
