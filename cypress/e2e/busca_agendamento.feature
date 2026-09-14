Feature: Agendamento de consulta

  Scenario: Agendar consulta com login válido
    Given que estou na tela de login
    When preencho minhas credenciais válidas
    And busco a especialidade
    And agendo uma consulta
    And agendo um atendimento
    Then devo ser direcionada para a tela de verificação de código