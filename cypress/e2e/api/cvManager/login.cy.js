/// <reference types = "cypress"/>


describe('POST /login', function (){

    it('test01 should get httpStatus.BAD_REQUEST if mobile and username is not send',function (){
        cy.loginAPI('', '', 400 )

    })
    it('test02 should get username not found',function (){
        cy.loginAPI('989379161530', 'A19223674f', 400 )

    })

    it('test03 should get httpStatus.OK if user is loged in with mobile',function (){
        cy.loginAPI('989379161533', 'A19223674f', 200 , (token) => {})

    })

    it('test04 should get httpStatus.BAD_REQUEST if password is wrong',function (){
        cy.loginAPI('98937916153', '1922367', 400 )

    })

    it('test05 should get httpStatus.BAD_REQUEST if mobile number has wromg format',function (){
        cy.loginAPI('a', 'a', 400 )

    })

    it('test06 should get httpStatus.BAD_REQUEST if mobile number has wromg format',function (){
        cy.loginAPI('9893791615', 'A19223674f', 400 )

    })

    it('test07 should get httpStatus.BAD_REQUEST if username is less than 3 character',function (){
        cy.loginAPI('98', 'A19223674f', 400 )
    })

    it('test08 should get httpStatus.BAD_REQUEST if username is grather than 15 character',function (){
        cy.loginAPI('9893791615333333', 'A19223674f', 400 )
    })

    it('test09 should get httpStatus.BAD_REQUEST if password is not send',function (){
        cy.loginAPI('989379161533', '', 400 )
    })

    it('test10 should get httpStatus.BAD_REQUEST if password is less than 8 character',function (){
        cy.loginAPI('989379161533', 'A19223', 400 )
    })

    it('test11 should get httpStatus.BAD_REQUEST if password is grather than 20 character',function (){
        cy.loginAPI('98937916153', 'A12345678901234567894f', 400 )
    })


})