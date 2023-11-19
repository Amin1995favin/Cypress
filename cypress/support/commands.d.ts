/// <reference types="Cypress" />

declare namespace Cypress {
    interface Chainable {
        // loginAPI(mobile: string, password: string, status: number): Cypress.Chainable
        loginAPI( mobile: string, password: string, status: string): Cypress.Chainable
        loginAPIBimeh( mobile: string, status: string): Cypress.Chainable
        PasswordAPIBimeh( password: string, token: string, status: string): Cypress.Chainable
        signupAPI(firstname: string, lastname: string, username: string, mobile: string, password: string, status: string): Cypress.Chainable
        logoutAPI(): Cypress.Chainable
    }
}
