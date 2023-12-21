/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit('./src/index.html')
    })    

    it('verifica o título da aplicação', function() {
        cy.title().should('eq','Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {
        const nome = "nome"
        cy.get('#firstName').type(nome, {delay: 0})
        cy.get('#lastName').type('Ferreira')
        cy.get('#email').type('teste@teste.com')
        cy.get('#open-text-area').type('teste')
        cy.get('#white-background > form > button').click()          
        cy.get('body > span.success > strong').should('be.visible') 
        
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        const nome = "nome"
        cy.get('#firstName').type(nome, {delay: 0})
        cy.get('#lastName').type('Ferreira')
        cy.get('#email').type('testeteste.com')
        cy.get('#open-text-area').type('teste')
        cy.get('#white-background > form > button').click()          
        cy.get('body > span.error > strong').should('be.visible')        
    })

    it('verifica que o campo telefone preenchido com numeros permanece em branco', function() {
        
        cy.get('#firstName').type('Gabriela')
        cy.get('#lastName').type('Ferreira')
        cy.get('#email').type('teste@teste.com')
        cy.get('#phone').type('letras').should('not.have.value')
        cy.get('#open-text-area').type('teste')
        cy.get('#white-background > form > button').click()        
                
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        
        cy.get('#firstName').type('Gabriela')
        cy.get('#lastName').type('Ferreira')
        cy.get('#email').type('teste@teste.com')        
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('teste')
        cy.get('#white-background > form > button').click()
        cy.get('.error').should('be.visible')      
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        
        cy.get('#firstName').type('Gabriela')
            .should('have.value','Gabriela')
            .clear()
            .should('not.have.value')
        cy.get('#lastName').type('Ferreira')
            .should('have.value','Ferreira')
            .clear()
            .should('not.have.value')
        cy.get('#email').type('teste@teste.com') 
            .should('have.value','teste@teste.com')
            .clear()
            .should('not.have.value')       
        cy.get('#phone').type('872317197')
            .should('have.value','872317197')
            .clear()
            .should('not.have.value')      
        cy.get('#open-text-area').type('teste')
        cy.get('#white-background > form > button').click()            
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {               
        cy.get('#white-background > form > button').click()
        cy.get('.error').should('be.visible')      
    })

    it('envia o formuário com sucesso usando um comando customizado', function() {               
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('#white-background > form > button').click()
        cy.get('body > span.success > strong').should('be.visible')       
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function(){
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('#product').select('Mentoria')
        .should('have.value', 'mentoria')
        cy.get('#white-background > form > button').click()           
    })

    it('seleciona um produto (Blog) por seu índice', function(){
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('#product').select(1)
        .should('have.value', 'blog')
        cy.get('#white-background > form > button').click()           
    })

    it('marca o tipo de atendimento "Feedback"', function(){
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('#support-type > label:nth-child(4) > input[type=radio]').check()
        .should('have.value', 'feedback')                  
    })

    it('marca cada tipo de atendimento', function(){
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('input[type=radio]').each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })                        
    })
    
    it('marca ambos checkboxes, depois desmarca o último', function(){
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('input[type=checkbox]')
            .check().should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')                      
    })

    it('seleciona um arquivo da pasta fixtures', function(){
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json')
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo simulando um drag-and-drop', function(){
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json')
            // , {action: 'drag-drop'}
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })            
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
        cy.get('#privacy > a')
        .should('have.attr','target','_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
        cy.get('#privacy > a').invoke('removeAttr', 'target')
        .should('not.have.attr','target')
    })




    
})
  
