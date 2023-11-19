/// <reference types = "cypress"/>



describe('POST /login', function (){


    it('test01 should get BAD_REQUEST if mobile is not send',function (){
        cy.loginAPIBimeh(' ', 400)
    })

    it('test02 should get BAD_REQUEST if mobile is wrong',function (){
        cy.loginAPIBimeh('0 9 3 7 9 1 6 1 5 3 3', 400)
    })

    it('test03 should get BAD_REQUEST if mobile is wrong',function (){
        cy.loginAPIBimeh('0 9 3 7 9 1 6 1 5 3 3', 400)
    })

    it('test04 should get BAD_REQUEST if mobile is wrong',function (){
        cy.loginAPIBimeh('0937916153A', 400)
    })

    it('test05 should get BAD_REQUEST if password not send',function (){
        cy.loginAPIBimeh('09379161533', 200 , function (token){
            cy.PasswordAPIBimeh(' ',token ,400)
        })
    })

    it('test06 should get BAD_REQUEST if password is wrong',function (){
        cy.loginAPIBimeh('09379161533', 200 , function (token){
            cy.PasswordAPIBimeh('A192236',token ,400)
        })
    })

    it('test07 should get httpStatus.OK',function (){
        cy.loginAPIBimeh('09379161533', 200 , function (token){
            cy.PasswordAPIBimeh('A19223674f',token ,200)
        })
    })



})