const { faker } = require('@faker-js/faker');


const UserFaker = {
    firstname : faker.name.firstName(),
    lastname : faker.name.lastName(),
    username : faker.random.alpha(9),
    mobile : faker.phone.phoneNumber('9891########'),
    password : 'A123456a'
}
describe('POST /signup', function (){

    it('test01 should get httpStatus.BAD_REQUEST if all data is correct',function (){
        cy.signupAPI(UserFaker.firstname,UserFaker.lastname, UserFaker.username, UserFaker.mobile, UserFaker.password, 201)
    })

    it('test02 should get httpStatus.BAD_REQUEST if firstname is less than 3 character',function (){
        cy.signupAPI("Am",UserFaker.lastname, UserFaker.username, UserFaker.mobile, UserFaker.password, 400)
    })

    it('test03 should get httpStatus.BAD_REQUEST if firstname is grather than 80 character',function (){
        cy.signupAPI("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod sit amet est."
            ,UserFaker.lastname, UserFaker.username, UserFaker.mobile, UserFaker.password, 400)
    })

    it('test04 should get httpStatus.BAD_REQUEST  if lastname is not send',function (){
        cy.signupAPI(UserFaker.firstname,"", UserFaker.username, UserFaker.mobile, UserFaker.password, 400)
    })

    it('test05 should get httpStatus.BAD_REQUEST  if lastname is less than 3 character',function (){
        cy.signupAPI(UserFaker.firstname,"te", UserFaker.username, UserFaker.mobile, UserFaker.password, 400)
    })

    it('test06 should get httpStatus.BAD_REQUEST if lastname is grather than 80 character',function (){
        cy.signupAPI(UserFaker.firstname,"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod sit amet est."
            , UserFaker.username, UserFaker.mobile, UserFaker.password, 400)
    })

    it('test07 should get httpStatus.BAD_REQUEST  if mobile is not send',function (){
        cy.signupAPI(UserFaker.firstname,UserFaker.lastname, UserFaker.username, "", UserFaker.password, 400)
    })

    it('test08 should get httpStatus.BAD_REQUEST if mobile has wrong format',function (){
        cy.signupAPI(UserFaker.firstname,UserFaker.lastname, UserFaker.username, "129379161514", UserFaker.password, 400)
    })

    it('test09 should get httpStatus.BAD_REQUEST if username is not send',function (){
        cy.signupAPI(UserFaker.firstname,UserFaker.lastname, "", UserFaker.mobile, UserFaker.password, 400)
    })

    it('test10 should get httpStatus.BAD_REQUEST if username is less than 3 character',function (){
        cy.signupAPI(UserFaker.firstname,UserFaker.lastname, "am", UserFaker.mobile, UserFaker.password, 400)
    })

    it('test11 should get httpStatus.BAD_REQUEST if username is grather than 15 character',function (){
        cy.signupAPI(UserFaker.firstname,UserFaker.lastname, "Loremipsumdoloraa", UserFaker.mobile, UserFaker.password, 400)
    })

    it('test12 should get httpStatus.BAD_REQUEST if password is not send',function (){
        cy.signupAPI(UserFaker.firstname,UserFaker.lastname, UserFaker.username, UserFaker.mobile, "", 400)
    })

    it('test13 should get httpStatus.BAD_REQUEST if password is less than 8 character',function (){
        cy.signupAPI(UserFaker.firstname,UserFaker.lastname, UserFaker.username, UserFaker.mobile, "A1234", 400)
    })

    it('test14 should get httpStatus.BAD_REQUEST if password is grather than 20 character',function (){
        cy.signupAPI(UserFaker.firstname,UserFaker.lastname, UserFaker.username, UserFaker.mobile, "A123456789012345678912345", 400)
    })

    it('test15 should get httpStatus.BAD_REQUEST if user mobile is already exists',function (){
        cy.signupAPI(UserFaker.firstname,UserFaker.lastname, UserFaker.username, "989379161533", UserFaker.password, 400)
    })

    it('test16 should get httpStatus.BAD_REQUEST if firstname is not send',function (){
        cy.signupAPI("",UserFaker.lastname, UserFaker.username, UserFaker.mobile, UserFaker.password, 400)
    })
})








