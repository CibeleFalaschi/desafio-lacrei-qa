import {
  Given,
  When,
  Then,
} from "@badeball/cypress-cucumber-preprocessor";

Given("que estou na tela de login", () => {
  cy.visit("https://paciente-staging.lacreisaude.com.br/login/");
});

When("preencho minhas credenciais válidas", () => {
  cy.env(["K6_EMAIL", "K6_PASSWORD"]).then(
    ({ K6_EMAIL, K6_PASSWORD }) => {
      cy.get('input[name="email"]')
        .should("be.visible")
        .clear()
        .type(K6_EMAIL, { log: false });

      cy.get('input[name="password"]')
        .should("be.visible")
        .clear()
        .type(K6_PASSWORD, { log: false });

      cy.contains("button", "Entrar")
        .should("be.visible")
        .click();
    }
  );
});

When("busco a especialidade", () => {
  cy.get("#campo-de-busca")
    .should("be.visible")
    .clear()
    .type("psicologia");

  cy.contains("button", "Pesquisar")
    .should("be.visible")
    .click();
});

When("agendo uma consulta", () => {
  cy.get("#atendimentos")
    .should("be.visible")
    .click();
});

When("agendo um atendimento", () => {
  cy.contains("button", "Agendar atendimento")
    .should("be.visible")
    .click();
});

Then("devo ser direcionada para a tela de verificação de código", () => {
  cy.contains("Qual é o seu número de celular?")
    .should("be.visible");

  cy.contains("Digite o código enviado por SMS")
    .should("be.visible");
});