Feature: Cadastro de pessoa paciente

  Scenario: Cadastrar pessoa paciente com dados válidos
    Given que estou na página de cadastro
    When preencho o cadastro com dados válidos
    And aceito os termos de uso e confirmo que tenho 18 anos ou mais
    And concluo o cadastro
    Then devo visualizar a confirmação do cadastro