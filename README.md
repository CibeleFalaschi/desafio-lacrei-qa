# 🧪 Desafio QA — Lacrei Saúde

> Avaliação de qualidade de software contemplando **testes funcionais, Gherkin, acessibilidade, responsividade, performance, automação e CI/CD**.

---

## 📌 Sobre o projeto

Este repositório reúne os artefatos desenvolvidos para o desafio técnico de QA da Lacrei Saúde, incluindo:

- cenários em Gherkin;
- documentação e estratégia de testes;
- evidências das execuções;
- testes de desempenho;
- testes de acessibilidade;
- avaliação de responsividade;
- testes automatizados;
- pipeline de CI/CD.

O objetivo foi avaliar os principais fluxos da aplicação considerando qualidade funcional, desempenho, acessibilidade, responsividade e automação.

---

## 🔗 Links da entrega

| Recurso | Acesso |
|---|---|
| 📁 **Repositório GitHub** | https://github.com/CibeleFalaschi/desafio-lacrei-qa |
| ⚙️ **GitHub Actions** | https://github.com/CibeleFalaschi/desafio-lacrei-qa/actions |
| 📝 **Documentação completa — Notion** | https://harmonious-potential-7a5.notion.site/Desafio-T-cnico-QA-Lacrei-Sa-de-3d94c363fe40802a9d5dc92bb4d3453d |

---

## 🖥️ 1. Ambiente e pré-requisitos

### 🌐 Ambiente de testes

| Item | Configuração |
|---|---|
| Aplicação | Ambiente de staging da Lacrei Saúde |
| Testes funcionais mobile | Samsung Galaxy A12 — Android — Google Chrome |
| Lighthouse | Chrome — modo Mobile |
| Testes de desempenho | k6 |
| Automação funcional | Cypress + Cucumber |
| CI/CD | GitHub Actions |

### 🧰 Pré-requisitos

Para executar os artefatos do projeto, é necessário ter instalado:

- Git
- Node.js
- npm
- k6

### 📦 Instalação das dependências

Instalação padrão:

```bash
npm install
```

Para reproduzir exatamente as dependências versionadas no projeto:

```bash
npm ci
```

---

## 🔐 2. Configuração do ambiente e segurança

> ⚠️ **Credenciais de teste não devem ser armazenadas diretamente no código-fonte.**

As variáveis necessárias para os testes autenticados e de performance são configuradas localmente por meio de um arquivo `.env`.

### 💻 Configuração local

Crie um arquivo `.env` na raiz do projeto:

```env
K6_EMAIL=seu_email
K6_PASSWORD=sua_senha
```

🔒 O arquivo `.env` está incluído no `.gitignore` e não deve ser enviado ao repositório.

### ⚙️ GitHub Actions

No GitHub Actions, as mesmas credenciais são fornecidas de forma segura por meio de **Repository Secrets**:

```text
K6_EMAIL
K6_PASSWORD
```

Dessa forma, as credenciais não ficam expostas no código-fonte ou no repositório público.

> 🚫 **Não utilizar credenciais reais em arquivos versionados, screenshots, vídeos ou documentação pública.**

---

## 🧪 3. Como executar os testes

### 3.1 📝 Testes manuais

Os testes funcionais foram executados manualmente no ambiente de staging.

#### 📱 Ambiente mobile

- **Dispositivo:** Samsung Galaxy A12
- **Sistema:** Android
- **Navegador:** Google Chrome
- **Tipo:** dispositivo físico

Os casos de teste e resultados detalhados estão documentados no Notion.

Os cenários Gherkin utilizados como base para os testes estão disponíveis em:

```text
cypress/e2e/
```

### 3.2 🤖 Testes automatizados

A automação foi implementada utilizando:

- Cypress 16.0.0
- Cucumber
- Gherkin
- `@badeball/cypress-cucumber-preprocessor`

O fluxo prioritário definido para automação é o **cadastro de pessoa paciente**, conforme requisito do desafio.

Também foi automatizado o fluxo de **login, busca e agendamento**.

#### 🖥️ Abrir o Cypress em modo interativo

```bash
npm run cy:open
```

#### ⚡ Executar os testes em modo headless

```bash
npm test
```

O mesmo comando headless é utilizado no pipeline de CI.

### 3.3 📈 Teste de desempenho com k6

O cenário de desempenho da API foi automatizado utilizando **k6**.

#### ▶️ Execução

```bash
k6 run performance/performance.js
```

As credenciais devem estar disponíveis por meio das variáveis:

```text
K6_EMAIL
K6_PASSWORD
```

O teste avalia a **busca de profissionais por especialidade** e utiliza carga de até **30 usuários virtuais**.

#### 📂 Arquivos

**Script:**

```text
performance/performance.js
```

**Relatório:**

```text
performance/performance-report.html
```

### 3.4 🔎 Lighthouse

Foi realizada uma avaliação automatizada da aplicação utilizando **Lighthouse em modo Mobile**.

#### 📊 Resultados

| Métrica | Resultado |
|---|---:|
| ⚡ Performance | **35/100** |
| ♿ Accessibility | **96/100** |
| 🎨 FCP | **2,0 s** |
| 🖼️ LCP | **13,2 s** |
| ⏱️ TBT | **3.670 ms** |
| 📐 CLS | **0** |
| 🚀 Speed Index | **9,3 s** |

**Relatório:**

```text
performance/lighthouse-report.html
```

> ⚠️ O resultado de Performance ficou abaixo do esperado e foi registrado na avaliação. A pontuação de Accessibility atingiu **96/100**.

---

## 📁 4. Organização do projeto

```text
desafio-lacrei/
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
│   ├── screenshots/
│   ├── support/
│   │   ├── commands.js
│   │   └── e2e.js
│   │
│   └── step_definitions/
│       ├── cadastro.steps.js
│       └── busca_agendamento.steps.js
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
├── .gitignore
├── cypress.config.js
├── package.json
├── package-lock.json
└── README.md
```

### 📂 Diretórios principais

| Diretório | Finalidade |
|---|---|
| `cypress/e2e/` | Cenários Gherkin utilizados na automação |
| `cypress/step_definitions/` | Implementação dos passos dos cenários |
| `docs/evidencias/` | Evidências relacionadas aos bugs encontrados |
| `performance/` | Script e relatórios de performance |
| `.github/workflows/` | Configuração do pipeline de CI/CD |

---

## 🥒 5. Casos de teste em Gherkin

Os cenários Gherkin estão organizados em:

```text
cypress/e2e/
```

Foram contemplados os principais fluxos definidos no desafio.

### 👤 Cadastro

- Cadastro com dados válidos
- Cadastro com campos obrigatórios vazios
- Cadastro com e-mails diferentes
- Cadastro com senhas diferentes
- Cadastro com e-mail já cadastrado

### 🔑 Login

- Login com credenciais válidas
- Login com e-mail vazio
- Login com formato de e-mail inválido
- Login com credenciais inválidas

### 🔄 Recuperação de senha

- Fluxo completo de recuperação e alteração de senha

### 🔎 Busca e agendamento

- Acesso à busca após o pós-cadastro
- Busca de profissional por especialidade
- Acesso ao agendamento de profissional

---

## 🐞 6. Bugs e evidências

Foram identificados e documentados **7 bugs/oportunidades de melhoria** durante a avaliação.

As evidências estão organizadas em:

```text
docs/evidencias/
```

Os registros detalhados estão disponíveis no:

- 📝 Notion
- 🐙 GitHub Issues

### 🔎 Principais achados

- problemas de layout e responsividade em telas mobile;
- sobreposição de elementos da interface;
- posicionamento inadequado de elementos;
- ausência de limitação aparente para grande quantidade de caracteres no campo de nome em desktop;
- ausência de indicador visual de foco durante a navegação por teclado.

> 🔒 Antes da publicação, evidências contendo dados pessoais devem ter essas informações ocultadas.

---

## ♿ 7. Acessibilidade

Foram realizados testes de acessibilidade utilizando:

- Lighthouse;
- navegação por teclado;
- leitor de tela NVDA.

### 📊 Resultados

| Avaliação | Resultado |
|---|---|
| Lighthouse — Accessibility | ✅ **PASSOU — 96/100** |
| Navegação por teclado | ⚠️ **PASSOU COM RESSALVAS** |
| Indicador visual de foco | 🐞 **BUG-007** |
| NVDA — leitor de tela | ✅ **PASSOU** |

### ⌨️ Navegação por teclado

Foi realizada navegação utilizando **Tab** e **Shift + Tab** em diferentes telas da aplicação.

A navegação é funcional, porém foi identificado que alguns elementos recebem foco sem apresentar indicador visual claramente perceptível.

O achado foi registrado como:

> 🐞 **BUG-007 — Ausência de indicador visual de foco na navegação por teclado.**

### 🔊 NVDA

Foi realizada avaliação utilizando o leitor de tela **NVDA com Google Chrome em ambiente desktop**.

Durante a avaliação, os elementos da interface foram anunciados corretamente pelo leitor de tela, permitindo identificar e compreender os conteúdos e controles apresentados.

Não foi identificado, neste teste, comportamento que justificasse a abertura de um bug relacionado à leitura por leitor de tela.

---

## 🤖 8. Testes automatizados

A automação foi desenvolvida utilizando:

- Cypress 16.0.0
- Cucumber
- Gherkin
- `@badeball/cypress-cucumber-preprocessor`

### 🔄 Fluxo 1 — Cadastro de pessoa paciente

**Arquivo:**

```text
cypress/e2e/cadastro.feature
```

**Fluxo automatizado:**

1. acesso à página de cadastro;
2. preenchimento dos dados;
3. aceite dos termos;
4. confirmação de idade;
5. envio do cadastro;
6. validação da tela de confirmação.

**Status:** ✅ **PASSOU**

### 🔎 Fluxo 2 — Busca e agendamento

**Arquivo:**

```text
cypress/e2e/busca_agendamento.feature
```

**Fluxo automatizado:**

1. login com credenciais válidas;
2. acesso à busca de profissionais;
3. pesquisa por especialidade;
4. seleção de profissional;
5. agendamento de consulta;
6. agendamento de atendimento;
7. acesso à tela de verificação de telefone/código.

**Status:** ✅ **PASSOU**

---

## 🔐 9. Credenciais

As credenciais utilizadas nos testes autenticados são armazenadas em **variáveis de ambiente** e não são versionadas no repositório.

### Variáveis utilizadas

```text
K6_EMAIL
K6_PASSWORD
```

O arquivo `.env` está incluído no `.gitignore`.

---

## ⚙️ 10. CI/CD — GitHub Actions

O projeto possui um workflow configurado no **GitHub Actions** para execução automática dos testes E2E.

### 🚀 Gatilhos

O workflow é executado automaticamente em:

```text
push

pull_request

Checkout do código

        ↓

Configuração do Node.js

        ↓

Instalação das dependências com npm ci

        ↓

Execução dos testes Cypress + Cucumber

        ↓

Geração dos relatórios JUnit

        ↓

Armazenamento dos relatórios e evidências

### ▶️ Comando utilizado no CI

npx cypress run --e2e --browser chrome

As credenciais utilizadas nos testes autenticados são fornecidas por meio de **GitHub Repository Secrets**, sem exposição no código.

### 📊 Relatórios do pipeline

Ao final da execução, o GitHub Actions disponibiliza os resultados como um **Artifact** denominado:

```text
cypress-relatorios

## 📚 11. Documentação

A documentação detalhada da execução dos testes está organizada no **Notion**.

O Notion contém:

- estratégia de testes;
- casos de teste;
- resultados das execuções;
- evidências;
- bugs e oportunidades de melhoria;
- análise de performance;
- acessibilidade;
- responsividade;
- automação;
- CI/CD;
- segurança;
- limitações e próximos passos.

Este README funciona como um **guia técnico e de execução do projeto**, enquanto o Notion concentra a documentação detalhada da avaliação.

---

## ✅ 12. Status do projeto

### 🎯 Concluído

- ✅ Cenários funcionais em Gherkin
- ✅ Execução dos principais testes funcionais
- ✅ Documentação dos bugs encontrados
- ✅ Evidências dos bugs
- ✅ Teste de desempenho com k6
- ✅ Relatório HTML do k6
- ✅ Avaliação com Lighthouse
- ✅ Relatório HTML do Lighthouse
- ✅ Avaliação automatizada de acessibilidade
- ✅ Testes manuais complementares de acessibilidade
- ✅ Finalização da avaliação de responsividade
- ✅ Automação funcional com Cypress + Cucumber
- ✅ GitHub Actions
- ✅ Relatórios da automação no pipeline
- ✅ Revisão final
- ✅ Revisão de segurança e documentação
- ✅ Criação/revisão dos GitHub Issues dos bugs e melhorias

---

## 📊 13. Resultados principais

| Avaliação | Resultado |
|---|---|
| 🧪 Testes funcionais principais | **Executados** |
| 🐞 Bugs identificados | **7** |
| 📈 k6 — falhas HTTP | **0%** |
| ✔️ k6 — checks | **100%** |
| 📊 k6 — resultado | ⚠️ **PASSOU COM RESSALVAS** |
| ⚡ Lighthouse — Performance | **35/100** |
| ♿ Lighthouse — Accessibility | **96/100** |
| 🤖 Cypress + Cucumber | **2/2 features passando no CI** |
| ⚙️ GitHub Actions | ✅ **PASSOU** |
| 📄 Relatórios JUnit | **Disponíveis como Artifact** |

---

## 📝 14. Observações

Os resultados de performance podem variar de acordo com as condições do ambiente de staging no momento da execução.

Os resultados apresentados neste repositório correspondem às execuções realizadas durante esta avaliação.

---

# 🏁 Entrega

### 📝 Documentação completa

https://harmonious-potential-7a5.notion.site/Desafio-T-cnico-QA-Lacrei-Sa-de-3d94c363fe40802a9d5dc92bb4d3453d

### 🐙 Repositório

https://github.com/CibeleFalaschi/desafio-lacrei-qa

---

> 💙 **Desafio Técnico QA — Lacrei Saúde**
