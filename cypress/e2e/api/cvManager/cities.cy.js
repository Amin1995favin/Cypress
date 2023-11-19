/// <reference types = "cypress"/>


// describe('GET /cities', function (){
//     it('test01 should get httpStatus.OK if user is loged in with mobile',function (){
//         Cypress.session.clearAllSavedSessions()
//         cy.loginAPI('989379161533', 'A19223674f', 200 )
//
//     })
//
//
//
// })




describe('GET /cities', () => {

    it.only(`test01_should get list of cities`,  () => {
         cy.loginAPI('989379161533', 'A19223674f', 200 , function (token) {
             cy.request({
                 method: 'get',
                 url: 'https://api.cvmanager.ir/api/v1/cities',
                 failOnStatusCode:false,
                 headers: {
                     Authorization: `Bearer ${token}`
                 },
             }).then((resp)=>{
                 console.log(resp.body.data[0].docs[1].name)
                 expect(resp.status).to.eq(200)

             })
        })

    })





})