Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    const nome = "nome"
    cy.get('#firstName').type(nome, {delay: 0})
    cy.get('#lastName').type('Ferreira')
    cy.get('#email').type('teste@teste.com')
    cy.get('#open-text-area').type('teste')
    cy.get('#white-background > form > button').click()
}) 
