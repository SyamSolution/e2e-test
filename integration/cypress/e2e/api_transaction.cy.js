let authToken;

describe("User Login, Create Transaction, and Get Transactions List", () => {
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

  it("Should create a transaction successfully", () => {
    expect(authToken).to.exist;

    cy.request({
      method: "POST",
      url: "http://localhost:4000/transactions",
      headers: {
        Authorization: `${authToken}`,
        "Content-Type": "application/json",
      },
      body: {
        payment_method: "banking",
        total_ticket: 8,
        continent: "asean",
        detail_ticket: [
          {
            ticket_id: 9,
            ticket_type: "silver",
            country_name: "indonesia",
            city: "jakarta",
            quantity: 5,
          },
          {
            ticket_id: 10,
            ticket_type: "gold",
            country_name: "indonesia",
            city: "jakarta",
            quantity: 3,
          },
        ],
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property("data");
    });
  });

  it("Should retrieve the transactions list using the stored token", () => {
    expect(authToken).to.exist;

    cy.request({
      method: "GET",
      url: "http://localhost:4000/transactions-list",
      headers: {
        Authorization: `${authToken}`,
        "Content-Type": "application/json",
      },
      body: {
        status: "completed",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("data");
    });
  });
});
