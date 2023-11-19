/// <reference types = "cypress"/>
let user1;
let code1;
let code1_no;
beforeEach(function (){
    cy.visit("https://bimeh.com/auth/login")
})
before(function (){
    cy.readFile('cypress/fixtures/users.json').then((fileContent) => {
        user1 = fileContent.users_bimeh.user1;
    });
    cy.readFile('cypress/fixtures/users.json').then(function (new_code){
        code1 = new_code.users_bimeh.code1;
        code1_no = new_code.users_bimeh.code1_no;
    })
})
describe('login', function (){

    it('test01 should get error if mobile not send', function (){
        cy.get('#login-input').type(" ")
        cy.get('#check-phone-number').click()
        cy.get('.ant-form-item-explain-error').then((err)=>{
            expect(err.text()).eq("نام کاربری نامعتبر است.")
        })
    })

    it('test02 should get error if mobile is wrong', function (){
        cy.get('#login-input').type("0 9 3 7 9 1 6 1 5 33")
        cy.get('#check-phone-number').click()
        cy.get('.ant-form-item-explain-error').then((err)=>{
            expect(err.text()).eq("نام کاربری نامعتبر است.")
        })
    })

    it('test03 should get error if mobile is wrong', function (){
        cy.get('#login-input').type("0937916153A")
        cy.get('#check-phone-number').click()
        cy.get('.ant-form-item-explain-error').then((err)=>{
            expect(err.text()).eq("نام کاربری نامعتبر است.")
        })
    })

    it('test04 should get error if code not send', function (){
        cy.get('#login-input').type(user1)
        cy.get('#check-phone-number').click()
        cy.get('#password-input').type(" ")
        cy.get('#password-submit-button').click()
        cy.get('.ant-form-item-explain-error').then((err)=>{
            expect(err.text()).eq("نام کاربری یا رمز عبور اشتباه است")
        })
    })

    it('test05 should get error if code is wrong', function (){
        cy.get('#login-input').type(user1)
        cy.get('#check-phone-number').click()
        cy.get('#password-input').type(code1_no)
        cy.get('#password-submit-button').click()
        cy.get('.ant-form-item-explain-error').then((err)=>{
            expect(err.text()).eq("نام کاربری یا رمز عبور اشتباه است")
        })
    })

    it('test06 should get ok', function (){
        cy.get('#login-input').type(user1)
        cy.get('#check-phone-number').click()
        cy.get('#password-input').type(code1)
        cy.get('#password-submit-button').click()
        cy.wait(2000)
        cy.get('.ant-spin-container > .mr-2').then((phone)=>{
            expect(phone.text()).eq("09379161533")
        })
    })


})