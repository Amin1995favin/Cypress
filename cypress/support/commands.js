// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })







Cypress.Commands.add('loginAPI', ( mobile, password, status, callback) => {
    cy.request({
        method: 'POST',
        url: 'https://api.cvmanager.ir/api/v1/auth/login',
        failOnStatusCode:false,
        body:
            {
                "mobile": mobile,
                "password": password,
            }
    }).then((resp) => {
        if(resp.status === 200 ){
            const tkn = resp.body.data[0].access_token
            console.log(tkn)
            window.localStorage.setItem('token', resp.body.data[0].access_token)
            expect(resp.status).to.eq(status)
            callback(tkn)
        }else {
            console.log(resp.status)
            expect(resp.status).to.eq(status)
        }
    })
})




Cypress.Commands.add('loginAPIBimeh', ( mobile, status, callback) => {
    cy.request({
        method: 'POST',
        url: 'https://restcore.bimeh.com/v1/authentication',
        failOnStatusCode:false,
        headers :{
            "Content-Type" : "application/json",
            'Token' : "da4aa2f8-70d9-4d56-b577-3162dfae2c0f"
                },
        body:
            {
                "MobileNumber": mobile
            }
    }).then((resp) => {
        if(resp.status === 200 ){
            const tkn = resp.body.SecurityData
            window.localStorage.setItem('token', tkn)
            expect(resp.status).to.eq(status)
            callback(tkn)
            // cy.log(tkn)
        }else {
            expect(resp.status).to.eq(status)
        }
    })
})




Cypress.Commands.add('PasswordAPIBimeh', ( password, token, status) => {
    // cy.log(token)
    cy.request({
        method: 'POST',
        url: 'https://restcore.bimeh.com/v1/authentication/login',
        failOnStatusCode:false,
        headers :{
            // "Content-Type" : "application/json",
            'Token' : "da4aa2f8-70d9-4d56-b577-3162dfae2c0f"
        },
        body: {
            Password: password,
            SecurityData: token,
            queryParam : ''
        },
    }).then((resp)=>{
        // cy.log(resp)
        expect(resp.status).to.eq(status)

    })
})




Cypress.Commands.add('signupAPI', function (firstname,lastname ,username ,mobile ,password,status ){
    cy.request({
            method: 'POST',
            url: 'https://api.cvmanager.ir/api/v1/auth/signup',
            failOnStatusCode:false,
            body:
                {
                    "firstname": firstname,
                    "lastname": lastname,
                    "username": username,
                    "mobile": mobile,
                    "password": password
                }
        }).then((resp) =>{
        if(resp.status === 201 ){
            console.log(resp.status)
            expect(resp.status).to.eq(201)
        }else {
            localStorage.clear()
            console.log(resp.status)
            expect(resp.status).to.eq(status)
        }


    })


})

Cypress.Commands.add('logoutAPI', ( ) => {
    window.localStorage.clear()
})







