import {
  Given,
  When,
  Then,
} from "@badeball/cypress-cucumber-preprocessor";

Given("que estou na página de cadastro", () => {
  cy.visit("https://paciente-staging.lacreisaude.com.br/saude/paciente/cadastrar/");
});

When("preencho o cadastro com dados válidos", () => {
  const email = `qa.lacrei.${Date.now()}@hotmail.com`;
  const senha = "Lacrei@123";

  cy.get('input[name="firstName"]')
    .should("be.visible")
    .type("Maria");

  cy.get('input[name="lastName"]')
    .should("be.visible")
    .type("Teste");

  cy.get('input[name="email"]')
    .should("be.visible")
    .type(email);

  cy.get('input[name="email2"]')
    .should("be.visible")
    .type(email);

  cy.get('input[name="password1"]')
    .should("be.visible")
    .type(senha);

  cy.get('input[name="password2"]')
    .should("be.visible")
    .type(senha);
});

When("aceito os termos de uso e confirmo que tenho 18 anos ou mais", () => {
  cy.get('input[name="acceptedPrivacyDocument"]')
    .check()
    .should("be.checked");

  cy.get('input[name="is18YearsOldOrMore"]')
    .check()
    .should("be.checked");
});

When("concluo o cadastro", () => {
  cy.contains("button", "Cadastrar")
    .should("be.visible")
    .click();
});

Then("devo visualizar a confirmação do cadastro", () => {
  cy.contains("Estamos quase lá")
    .should("be.visible");

});