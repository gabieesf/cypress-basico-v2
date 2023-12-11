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

    it.only('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        
        cy.get('#firstName').type('Gabriela')
        cy.get('#lastName').type('Ferreira')
        cy.get('#email').type('teste@teste.com')        
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('teste')
        cy.get('#white-background > form > button').click()
        cy.get('.error').should('be.visible')      
    })

  })
  
