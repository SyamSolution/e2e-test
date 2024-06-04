# Cypress E2E Testing

This repository contains end-to-end (E2E) tests for a ticket war application using [Cypress](https://www.cypress.io/). The tests cover various API endpoints to ensure the application functions correctly.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Writing Tests](#writing-tests)
- [Running Tests](#running-tests)
- [Best Practices](#best-practices)
- [Contributing](#contributing)
- [License](#license)

## Installation

To get started with Cypress, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/SyamSolution/e2e-test
   cd your-repo
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Ensure you have Cypress installed:

   ```bash
   npm install cypress --save-dev
   ```

## Configuration

**Environment Variables**: Create a `.env` file in the root of your project to store sensitive data such as email and password.

```env
CYPRESS_EMAIL=""
CYPRESS_PASSWORD=""
```

## Usage

### Opening Cypress

To open the Cypress Test Runner, run:

```bash
npx cypress open
```

### Running Test

To run test from command you can run this

```bash
npx cypress run
```
