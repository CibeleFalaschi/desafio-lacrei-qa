Desafio QA — Lacrei Saúde

Sobre o projeto

Este repositório contém os artefatos desenvolvidos para o desafio técnico de QA da Lacrei Saúde, incluindo cenários Gherkin, documentação, evidências, testes de desempenho, testes automatizados e CI/CD.

O objetivo é avaliar os principais fluxos da aplicação considerando qualidade funcional, desempenho, acessibilidade, responsividade e automação.

🔗 Links da entrega

Repositório GitHub: https://github.com/CibeleFalaschi/desafio-lacrei-qa

GitHub Actions: https://github.com/CibeleFalaschi/desafio-lacrei-qa/actions

Documentação completa no Notion: https://harmonious-potential-7a5.notion.site/Desafio-T-cnico-QA-Lacrei-Sa-de-3d94c363fe40802a9d5dc92bb4d3453d

Ambiente e pré-requisitos

Ambiente de testes

Aplicação: ambiente de staging da Lacrei Saúde

Testes funcionais mobile: Samsung Galaxy A12, Android, Google Chrome

Lighthouse: Chrome, modo Mobile

Testes de desempenho: k6

Automação funcional: Cypress + Cucumber

CI/CD: GitHub Actions

Pré-requisitos

Para executar os artefatos do projeto, será necessário ter instalados:

Git

Node.js e npm

k6

As dependências do projeto podem ser instaladas com:

npm install

Para reproduzir exatamente as dependências versionadas no projeto, recomenda-se utilizar:

npm ci

Configuração do ambiente

Credenciais utilizadas nos testes não devem ser armazenadas diretamente no código.

As variáveis necessárias para os testes autenticados e de performance são configuradas localmente por meio de arquivo .env.

Exemplo:

K6_EMAIL=seu_email
K6_PASSWORD=sua_senha

O arquivo .env está incluído no .gitignore e não deve ser enviado ao repositório.

No GitHub Actions, as mesmas credenciais são fornecidas por meio de Repository Secrets:

K6_EMAIL
K6_PASSWORD

Não utilizar credenciais reais em arquivos versionados, screenshots ou documentação pública.

Como executar os testes

4.1 Testes manuais

Os testes funcionais foram executados manualmente no ambiente de staging.

Os casos de teste e resultados detalhados estão documentados no Notion do projeto.

Os testes funcionais mobile foram realizados em:

Samsung Galaxy A12

Android

Google Chrome

Dispositivo físico

Os cenários Gherkin utilizados como base para os testes estão disponíveis em:

cypress/e2e/

4.2 Testes automatizados

Os testes funcionais automatizados foram implementados utilizando:

Cypress 16.0.0

Cucumber

Gherkin

@badeball/cypress-cucumber-preprocessor

O fluxo prioritário definido para automação é o cadastro de pessoa paciente, conforme requisito do desafio.

Também foi automatizado o fluxo de busca e agendamento.

Para abrir o Cypress em modo interativo:

npm run cy

Para executar os testes em modo headless:

npm test

O mesmo comando de execução headless é utilizado no pipeline de CI.

4.3 Teste de desempenho com k6

O cenário de desempenho da API foi automatizado utilizando k6.

Para executar:

k6 run performance/performance.js

As credenciais devem estar disponíveis por meio das variáveis de ambiente:

K6_EMAIL
K6_PASSWORD

O teste avalia a busca de profissionais por especialidade e utiliza carga de até 30 usuários virtuais.

O script está disponível em:

performance/performance.js

O relatório detalhado da execução está em:

performance/performance-report.html

4.4 Lighthouse

Foi realizada uma avaliação automatizada da aplicação utilizando Lighthouse em modo Mobile.

Resultados obtidos:

Métrica

Resultado

Performance

35/100

Accessibility

96/100

FCP

2,0 s

LCP

13,2 s

TBT

3.670 ms

CLS

0

Speed Index

9,3 s

O relatório HTML da execução está em:

performance/lighthouse-report.html

Organização do projeto

desafio_lacrei/
│
├── .github/
│   └── workflows/
│       └── cypress.yml
│
├── cypress/
│   ├── e2e/
│   │   ├── cadastro.feature
│   │   └── busca_agendamento.feature
│   │
│   ├── fixtures/
│   │
│   ├── screenshots/
│   │
│   └── support/
│       ├── commands.js
│       ├── e2e.js
│       └── step_definitions/
│           ├── cadastro.steps.js
│           └── busca_agendamento.steps.js
│
├── docs/
│   └── evidencias/
│       ├── BUG-001...
│       ├── BUG-002...
│       ├── BUG-003...
│       ├── BUG-004...
│       ├── BUG-005...
│       ├── BUG-006...
│       └── BUG-007...
│
├── performance/
│   ├── lighthouse-report.html
│   ├── performance-report.html
│   └── performance.js
│
├── .env
├── .gitignore
├── cypress.config.js
├── package.json
├── package-lock.json
└── README.md

A pasta cypress/e2e/ contém os cenários Gherkin utilizados na automação.

A pasta docs/evidencias/ contém as evidências relacionadas aos bugs e oportunidades de melhoria encontrados durante a avaliação.

A pasta performance/ contém o script de performance e os relatórios HTML gerados pelo k6 e pelo Lighthouse.

Casos de teste em Gherkin

Os cenários Gherkin estão organizados no diretório:

cypress/e2e/

Foram contemplados os principais fluxos definidos no desafio:

Cadastro

Cadastro com dados válidos

Cadastro com campos obrigatórios vazios

Cadastro com e-mails diferentes

Cadastro com senhas diferentes

Cadastro com e-mail já cadastrado

Login

Login com credenciais válidas

Login com e-mail vazio

Login com formato de e-mail inválido

Login com credenciais inválidas

Recuperação de senha

Fluxo completo de recuperação e alteração de senha

Busca e agendamento

Acesso à busca após o pós-cadastro

Busca de profissional por especialidade

Acesso ao agendamento de profissional

Bugs e evidências

Foram identificados e documentados sete bugs/oportunidades de melhoria durante a avaliação.

As evidências estão organizadas em:

docs/evidencias/

Os registros detalhados dos bugs estão disponíveis no Notion e no GitHub Issues.

Os problemas identificados incluem:

problemas de layout e responsividade em telas mobile;

sobreposição de elementos da interface;

posicionamento inadequado de elementos;

ausência de limitação aparente para grande quantidade de caracteres no campo de nome em desktop;

ausência de indicador visual de foco durante a navegação por teclado.

Antes da publicação, evidências contendo dados pessoais devem ter essas informações ocultadas.

Acessibilidade

Foram realizados testes de acessibilidade utilizando Lighthouse, navegação por teclado e leitor de tela NVDA.

Avaliação

Resultado

Lighthouse — Accessibility

PASSOU — 96/100

Navegação por teclado

PASSOU COM RESSALVAS

Indicador visual de foco

BUG-007

NVDA — leitor de tela

PASSOU

Navegação por teclado

Foi realizada navegação utilizando Tab e Shift + Tab em diferentes telas da aplicação.

A navegação é funcional, porém foi identificado que alguns elementos recebem foco sem apresentar indicador visual claramente perceptível.

O achado foi registrado como BUG-007 — Ausência de indicador visual de foco na navegação por teclado.

NVDA

Foi realizada uma tentativa de avaliação utilizando o leitor de tela NVDA com Google Chrome em ambiente desktop.

Durante a avaliação da aplicação, os elementos da interface foram anunciados corretamente pelo leitor de tela, permitindo identificar e compreender os conteúdos e controles apresentados.

A leitura dos elementos ocorreu de forma consistente durante o teste realizado. Não foi identificado, neste teste, comportamento que justificasse a abertura de um bug relacionado à leitura por leitor de tela.

Testes automatizados

A automação foi desenvolvida utilizando Cypress 16.0.0, Cucumber e o preprocessor @badeball/cypress-cucumber-preprocessor.

Fluxos automatizados

Cadastro de pessoa paciente

Arquivo:

cypress/e2e/cadastro.feature

Fluxo:

acesso à página de cadastro;

preenchimento dos dados;

aceite dos termos;

confirmação de idade;

envio do cadastro;

validação da tela de confirmação.

Status: PASSOU

Busca e agendamento

Arquivo:

cypress/e2e/busca_agendamento.feature

Fluxo:

login com credenciais válidas;

acesso à busca de profissionais;

pesquisa por especialidade;

seleção de profissional;

agendamento de consulta;

agendamento de atendimento;

acesso à tela de verificação de telefone/código.

Status: PASSOU

Credenciais

As credenciais utilizadas nos testes autenticados são armazenadas em variáveis de ambiente e não são versionadas no repositório.

Variáveis utilizadas:

K6_EMAIL

K6_PASSWORD

O arquivo .env está incluído no .gitignore.

CI/CD — GitHub Actions

O projeto possui um workflow configurado no GitHub Actions para execução automática dos testes E2E.

O workflow é disparado automaticamente em:

push

pull_request

O pipeline realiza:

checkout do código;

configuração do Node.js;

instalação das dependências com npm ci;

execução dos testes Cypress + Cucumber;

geração dos relatórios JUnit;

armazenamento dos relatórios e evidências como Artifact.

O fluxo utilizado no CI é:

npx cypress run --e2e --browser chrome

As credenciais utilizadas nos testes autenticados são fornecidas por meio de GitHub Repository Secrets, sem exposição no código.

Relatórios do pipeline

Ao final da execução, o GitHub Actions disponibiliza o Artifact:

cypress-relatorios

O Artifact contém os relatórios JUnit gerados para os arquivos .feature executados, permitindo consultar os resultados após a execução do workflow.

Documentação

A documentação detalhada da execução dos testes está organizada no Notion.

O Notion contém:

estratégia de testes;

casos de teste;

resultados das execuções;

evidências;

bugs e oportunidades de melhoria;

análise de performance;

acessibilidade;

responsividade;

automação;

CI/CD;

segurança;

limitações e próximos passos.

Este README funciona como um guia técnico e de execução do projeto.

Status do projeto

Concluído

Cenários funcionais em Gherkin

Execução dos principais testes funcionais

Documentação dos bugs encontrados

Evidências dos bugs

Teste de desempenho com k6

Relatório HTML do k6

Avaliação com Lighthouse

Relatório HTML do Lighthouse

Avaliação automatizada de acessibilidade

Testes manuais complementares de acessibilidade

Finalização da avaliação de responsividade

Automação funcional com Cypress + Cucumber

GitHub Actions

Relatórios da automação no pipeline

Revisão final

Revisão final de segurança e documentação

Criação/revisão dos GitHub Issues dos bugs e melhorias

Resultados principais

Avaliação

Resultado

Testes funcionais principais

Executados

Bugs identificados

7

k6 — falhas HTTP

0%

k6 — checks

100%

k6 — resultado

PASSOU COM RESSALVAS

Lighthouse — Performance

35/100

Lighthouse — Accessibility

96/100

Automação Cypress + Cucumber

2/2 features passando no CI

GitHub Actions

PASSOU

Relatórios JUnit

Disponíveis como Artifact

Observações

Os resultados de performance podem variar de acordo com as condições do ambiente de staging no momento da execução.

Os resultados apresentados neste repositório correspondem às execuções realizadas durante esta avaliação.