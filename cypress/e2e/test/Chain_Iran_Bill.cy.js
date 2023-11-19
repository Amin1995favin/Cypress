/// <reference types = "cypress"/>


function login(account, code) {
    cy.visit('http://testbpm.2ms.ir/login')
    cy.intercept('post', 'http://testbpm.2ms.ir/api/auth/loginbycode.json').as('reqAlias')
    cy.get('#loginform > div:nth-child(2) > input.form-control.ltr.mobilelogin').type(account)
    cy.get(':nth-child(3) > .btn').click()
    cy.get('#passwordform > div:nth-child(8) > button.btn.btn-default.btn-block.btn-flat.loginbycode').then(function ($button) {
        if ($button.is(':visible')) {
            $button.click();
            cy.get('#codeform > div:nth-child(6) > input').type(code)
            cy.get('#codeform > div:nth-child(7) > button').click()
        } else {
            cy.get('#codeform > div:nth-child(6) > input').type(code)
            cy.get('#codeform > div:nth-child(7) > button').click()
        }
    });
    cy.wait('@reqAlias')
    cy.get('@reqAlias').then(function (req){
        expect(req.response.statusCode).to.equal(200)
    })
}
describe('creat_order', function (){
    it.only('test01_creat_order', () => {
        const account = '9020981024';
        const code = '963741';
        cy.wrap(account).as('account');
        cy.wrap(code).as('code');
        login(account, code);
        cy.get('body > div.wrapper > aside > section > ul > li:nth-child(7) > a').click()
        cy.get('#main-content-wrapper > section.content > a').click()
        cy.get('#select2-formuser_id_owner-n1-container').click()
        cy.get('body > span > span > span.select2-search.select2-search--dropdown > input').type('ملیکا کابلی')
        cy.get('.select2-results__option--highlighted').click()
        cy.get('#select2-formuser_id_owner-n1-container').invoke('attr', 'title')
            .should('include', 'Melika Kaboli ملیکا کابلی / 989045414481')
        cy.get('#transport').click()
        cy.get('#clearance').click()
        cy.get('.box > .btn').click()
        cy.get('#orderproductsholder > :nth-child(3) > .btn').click()
        cy.get('#formname').type('دوربین')
        cy.get('input[id=formname_en]').type("camera")
        cy.get('#select2-formop_general_category-container').click()
        cy.get('.select2-search__field').type("دیجیتال")
        cy.get('#select2-formop_general_category-results > li').click()
        cy.get('body > div.featherlight > div > div > div > section.content > div > div > div > div > form > div.inputholder.holderop_partial_category > div > div > span > span.selection > span').click()
        cy.get('body > span > span > span.select2-search.select2-search--dropdown > input').type("دوربین")
        cy.wait(1000)
        cy.get('#select2-formop_partial_category-results > li').click({force: true})
        cy.get('input[id=formquantity]').type('5000')
        cy.get('input[id=formoneweight]').type('1')
        cy.get('input[id=formlength]').type('2')
        cy.get('#formwidth').type('5')
        cy.get('#formheight').type('10')
        cy.get('#formquantity_in_box').type('2')
        cy.get('.form-group > .btn').click()
        cy.wait(2000)
        cy.get('#select2-formsender_city-n1-container').click({force:true})
        cy.get('body > span > span > span.select2-search.select2-search--dropdown > input').type("Shenzhen")
        cy.wait(1000)
        // cy.get('#select2-formsender_city-n1-results > li').click()
        cy.get('#select2-formsender_city-n1-results > li').click({force:true})
        cy.get('#select2-formreceiver_city-n1-container').click()
        cy.get('body > span > span > span.select2-search.select2-search--dropdown > input').type('Tehran')
        cy.wait(1000)
        cy.get('#select2-formreceiver_city-n1-results > li').click()
        cy.get('#formfactorrasmi_transport-n1').select('غیر رسمی')
        cy.get('#formfactorrasmi_clearance-n1').select('غیر رسمی')
        cy.get('#formfactorrasmi-n1').select('غیر رسمی')
        cy.get('#information > div > div > form > div.col-md-12 > div.col-md-9 > button').click()
        cy.get('#review > div > div > form > div.inputholder.holdersender_city > div > div').contains('Shenzhen - China')
        cy.get('#review > div > div > form > div.col-md-12 > div.col-md-9 > button').click()
        cy.get('#main-content-wrapper > section.content-header > h1 > a:nth-child(1)').invoke('text').as('tn')
        cy.get('@tn').then(function tn (tn2){
            let tn1 = tn2.replace(/\D/g,'')
            cy.wrap(tn1).as('tnn')
            cy.log(tn1)
        })
        cy.log('@tnn')
    });

    it('test02_creat_order', () => {
        cy.wrap(this.tn).then((tn1) => {
            cy.log('Value of tn1:', tn1);
        });
        const account = '9020981024';
        const code = '963741';
        cy.wrap(account).as('account');
        cy.wrap(code).as('code');
        login(account, code);
        cy.get('body > div.wrapper > aside > section > ul > li:nth-child(7) > a').click()
        cy.get(':nth-child(2) > a > .info-box').click()
        // cy.get('@tn').then(function (tn){
        //     cy.get('form > :nth-child(3) > .form-control').type(tn)
        // })
        cy.get('form > :nth-child(3) > .btn').click()
        cy.get('tr:nth-child(1) > td:nth-child(2) > a:nth-child(4) ').click({force:true})
        cy.get('.box > .btn').click()
        cy.get('.box > .btn').click()
        cy.get('#select2-formsender_city-n1-container').click()
        cy.get('input[class=select2-search__field]').type('Shenzhen')
        cy.wait(1000)
        cy.get('#select2-formsender_city-n1-results > li').click()
        cy.get('#select2-formreceiver_city-n1-container').click()
        cy.get('body > span > span > span.select2-search.select2-search--dropdown > input').type('Tehran')
        cy.wait(1000)
        cy.get('#select2-formreceiver_city-n1-results > li').click()
        cy.get('#formfactorrasmi_transport-n1').select('غیر رسمی')
        cy.get('#formfactorrasmi_clearance-n1').select('غیر رسمی')
        cy.get('#formfactorrasmi-n1').select('غیر رسمی')
        cy.get('#information > div > div > form > div.col-md-12 > div.col-md-9 > button').click()
        cy.get('#review > div > div > form > div.inputholder.holdersender_city > div > div').contains('Shenzhen - China')
        cy.get('#review > div > div > form > div.col-md-12 > div.col-md-9 > button').click()

    });
})
