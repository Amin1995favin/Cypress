/// <reference types = "cypress"/>

let admin;
let code_admin;
beforeEach(function() {
    cy.visit('http://testbpm.2ms.ir/login');
    cy.readFile('cypress/fixtures/users.json').then((fileContent) => {
        admin = fileContent.users.admin1;
    });
    cy.readFile('cypress/fixtures/users.json').then(function (new_code){
        code_admin = new_code.users.code_admin;
    })
});
describe('Login', function() {
    it('test1', function() {
        cy.get('#loginform > div:nth-child(2) > input.form-control.ltr.mobilelogin').type(admin)
        cy.get(':nth-child(3) > .btn').click()
        cy.get('#passwordform > div:nth-child(8) > button.btn.btn-default.btn-block.btn-flat.loginbycode').then(function ($button) {
            if ($button.is(':visible')) {
                $button.click();
                cy.get('#codeform > div:nth-child(6) > input').type("235233")
                cy.get('#codeform > div:nth-child(7) > button').click()
            } else {
                cy.get('#codeform > div:nth-child(6) > input').type("235233")
                cy.get('#codeform > div:nth-child(7) > button').click()
            }
            cy.on('window:alert', function (message) {
                expect (message).eq('کد ارسال شده معتبر نیست، بیشتر دقت نمایید!')
            })
        });
        cy.log("با زدن شماره صحیح و کد اشتباه وارد نشد.")
    });

    it('test2', function() {
        cy.get('#loginform > div:nth-child(2) > input.form-control.ltr.mobilelogin').type('912236786')
        cy.get(':nth-child(3) > .btn').click()
        cy.on('window:alert', function (message) {
            expect (message).eq('فرمت شماره وارد شده 98912236786 صحیح نیست. فقط شماره موبایل ایران قابل قبول است  مثال: +989120000000')
        })
        cy.log("فرمت شماره وارد شده صحیح نمی باشد.")
        });

    it('test3', function() {
        cy.get('#loginform > div:nth-child(2) > input.form-control.ltr.mobilelogin').type('91223678600')
        cy.get(':nth-child(3) > .btn').click()
        cy.on('window:alert', function (message) {
            expect (message).eq('فرمت شماره وارد شده 9891223678600 صحیح نیست. فقط شماره موبایل ایران قابل قبول است  مثال: +989120000000')
        })
        cy.log("فرمت شماره وارد شده صحیح نمی باشد.")
        });

    it('test4', function() {
        cy.get(':nth-child(3) > .btn').click()
        cy.on('window:alert', function (message) {
            expect (message).eq('فرمت شماره وارد شده 98 صحیح نیست. فقط شماره موبایل ایران قابل قبول است  مثال: +989120000000')
        })
        cy.log("بدون وارد کردن شماره تلفن وارد نشد.")
        });


    it('test5', function() {
        cy.get('#loginform > div:nth-child(2) > input.form-control.ltr.mobilelogin').type(admin)
        cy.get(':nth-child(3) > .btn').click()

        cy.get('#passwordform > div:nth-child(8) > button.btn.btn-default.btn-block.btn-flat.loginbycode').then(function ($button) {
            if ($button.is(':visible')) {
                $button.click();
                cy.get('#codeform > div:nth-child(6) > input').type(code_admin)
                cy.get('#codeform > div:nth-child(7) > button').click()
            } else {
                cy.get('#codeform > div:nth-child(6) > input').type(code_admin)
                cy.get('#codeform > div:nth-child(7) > button').click()
            }
        });
        cy.log("با موفقیت وارد پنل شد")
    });
});

describe('Login_Api', function (){
    it('test1', function ()  {
        cy.intercept('post', 'http://testbpm.2ms.ir/api/auth/loginbycode.json').as('reqAlias')
        // cy.visit('http://testbpm.2ms.ir/login')
        cy.get('#loginform > div:nth-child(2) > input.form-control.ltr.mobilelogin').type(admin)
        cy.get(':nth-child(3) > .btn').click()
        cy.get('#passwordform > div:nth-child(8) > button.btn.btn-default.btn-block.btn-flat.loginbycode').then(function ($button) {
            if ($button.is(':visible')) {
                $button.click();
                cy.get('#codeform > div:nth-child(6) > input').type(code_admin)
                cy.get('#codeform > div:nth-child(7) > button').click()
            } else {
                cy.get('#codeform > div:nth-child(6) > input').type(code_admin)
                cy.get('#codeform > div:nth-child(7) > button').click()
            }
        });
        cy.log("با موفقیت وارد پنل شد")
        cy.wait('@reqAlias')
        cy.get('@reqAlias').then(function (req){
            console.log(req)
            expect(req.response.statusCode).to.equal(200)
            expect(req.response.body.msg).eq("خوش آمدید")
            expect(req.request.body).include("989122367860")
        })

    });

})
