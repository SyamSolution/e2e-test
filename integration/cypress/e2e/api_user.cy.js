let authToken;
let refreshToken;

describe("User Login", () => {
  it("Should print the email environment variable", () => {
    cy.log("Email: " + Cypress.env("email"));
    cy.log("Pass: " + Cypress.env("password"));
  });

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
      refreshToken = response.body.data.refresh_token;
    });
  });
});

describe("User Profile", () => {
  it("Should retrieve the user profile using the stored token", () => {
    expect(authToken).to.exist;

    cy.request({
      method: "GET",
      url: "http://localhost:4001/users/profile",
      headers: {
        Authorization: `${authToken}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("data");
    });
  });
});

describe("Refresh Token", () => {
  it("Should refresh the token", () => {
    expect(authToken).to.exist;

    cy.request({
      method: "GET",
      url: "http://localhost:4001/users/refresh-token",
      headers: {
        Authorization: `${refreshToken}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property("data");
    });
  });
});

describe("User Registration", () => {
  it("Should register successfully", () => {
    const randomNumber = Math.floor(Math.random() * 1000000);

    const email = `syamsularie${randomNumber}@example.com`;

    cy.request({
      method: "POST",
      url: "http://localhost:4001/users/register",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        username: "syamsul2",
        email: email,
        password: "Password123!",
        full_name: "syamsul",
        phone_number: "62822",
        address: "address",
        city: "city",
        country: "country",
        postal_code: "postal_code",
        nik: "nik",
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.meta.code).to.eq(201);
      expect(response.body).to.have.property("data");
    });
  });
});
