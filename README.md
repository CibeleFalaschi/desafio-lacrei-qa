# Desafio QA — Lacrei Saúde

## 1. Sobre o projeto

Este repositório contém os artefatos desenvolvidos para o desafio técnico de QA da Lacrei Saúde, incluindo cenários Gherkin, documentação, evidências, testes de desempenho e, posteriormente, testes automatizados e CI/CD.

O objetivo é avaliar os principais fluxos da aplicação considerando qualidade funcional, desempenho, acessibilidade e responsividade.

---

## 2. Ambiente e pré-requisitos

### Ambiente de testes

- **Aplicação:** ambiente de staging da Lacrei Saúde
- **Testes funcionais mobile:** Samsung Galaxy A12, Android, Google Chrome
- **Lighthouse:** Chrome, modo Mobile
- **Testes de desempenho:** k6
- **Automação funcional:** Cypress + Cucumber
- **CI/CD:** GitHub Actions

### Pré-requisitos

Para executar os artefatos do projeto, será necessário ter instalados:

- Git
- Node.js e npm
- Cypress
- k6

As dependências do projeto devem ser instaladas com:

```bash
npm install
```

---

## 3. Configuração do ambiente

Credenciais utilizadas nos testes não devem ser armazenadas diretamente no código.

As variáveis necessárias para os testes de performance são configuradas localmente por meio de arquivo `.env`.

Exemplo:

```text
K6_EMAIL=seu_email
K6_PASSWORD=sua_senha
```

O arquivo `.env` está incluído no `.gitignore` e não deve ser enviado ao repositório.

> Não utilizar credenciais reais em arquivos versionados, screenshots ou documentação pública.

---

## 4. Como executar os testes

### 4.1 Testes manuais

Os testes funcionais foram executados manualmente no ambiente de staging.

Os casos de teste e resultados detalhados estão documentados no Notion do projeto.

Os testes funcionais mobile foram realizados em:

- Samsung Galaxy A12
- Android
- Google Chrome
- Dispositivo físico

Os cenários Gherkin utilizados como base para os testes estão disponíveis na pasta:

```text
features/
```

---

### 4.2 Testes automatizados

Os testes funcionais automatizados foram implementados utilizando:

- Cypress
- Cucumber
- Gherkin

O fluxo prioritário definido para automação é o **cadastro de pessoa usuária**, conforme requisito do desafio. Os comandos de execução estão detalhados na seção 9.

---

### 4.3 Teste de desempenho com k6

O cenário de desempenho da API foi automatizado utilizando k6.

Para executar:

```bash
k6 run performance/performance.js
```

As credenciais devem estar disponíveis por meio das variáveis de ambiente:

```text
K6_EMAIL
K6_PASSWORD
```

O teste avalia a busca de profissionais por especialidade e utiliza carga de até 30 usuários virtuais.

O script está disponível em:

```text
performance/performance.js
```

O relatório detalhado da execução está em:

```text
performance/performance-report.html
```

---

### 4.4 Lighthouse

Foi realizada uma avaliação automatizada da aplicação utilizando Lighthouse em modo Mobile.

Resultados obtidos:

| Métrica | Resultado |
|---|---:|
| Performance | 35/100 |
| Accessibility | 96/100 |
| FCP | 2,0 s |
| LCP | 13,2 s |
| TBT | 3.670 ms |
| CLS | 0 |
| Speed Index | 9,3 s |

O relatório HTML da execução está em:

```text
performance/lighthouse-report.html
```

---

## 5. Organização do projeto

```text
desafio_lacrei/
├── .github/
│   └── workflows/
├── docs/
│   └── evidencias/
├── features/
├── performance/
│   ├── performance.js
│   ├── performance-report.html
│   └── lighthouse-report.html
├── .gitignore
├── package.json
└── README.md
```

A pasta `features/` contém os cenários Gherkin.

A pasta `docs/evidencias/` contém as evidências relacionadas aos bugs encontrados.

A pasta `performance/` contém o script de performance e os relatórios HTML gerados pelo k6 e pelo Lighthouse.

---

## 6. Casos de teste em Gherkin

Os cenários Gherkin estão organizados no diretório:

```text
features/
```

Foram contemplados os principais fluxos definidos no desafio:

### Cadastro

- Cadastro com dados válidos
- Cadastro com campos obrigatórios vazios
- Cadastro com e-mails diferentes
- Cadastro com senhas diferentes
- Cadastro com e-mail já cadastrado

### Login

- Login com credenciais válidas
- Login com e-mail vazio
- Login com formato de e-mail inválido
- Login com credenciais inválidas

### Recuperação de senha

- Fluxo completo de recuperação e alteração de senha

### Busca e agendamento

- Acesso à busca após o pós-cadastro
- Busca de profissional por especialidade
- Acesso ao agendamento de profissional

---

## 7. Bugs e evidências

Foram identificados e documentados sete bugs/oportunidades de melhoria durante a avaliação.

As evidências estão organizadas em:

```text
docs/evidencias/
```

Os registros detalhados dos bugs estão disponíveis no Notion e no GitHub Issues.

Os problemas identificados incluem:

- problemas de layout e responsividade em telas mobile;
- sobreposição de elementos da interface;
- posicionamento inadequado de elementos;
- ausência de limitação aparente para grande quantidade de caracteres no campo de nome em desktop.

Antes da publicação, evidências contendo dados pessoais devem ter essas informações ocultadas.

---

## 8. Acessibilidade

Foram realizados testes de acessibilidade utilizando Lighthouse, navegação por teclado e leitor de tela NVDA.

| Avaliação | Resultado |
|---|---|
| Lighthouse — Accessibility | PASSOU — 96/100 |
| Navegação por teclado | PASSOU COM RESSALVAS |
| Indicador visual de foco | BUG-007 |
| NVDA — leitor de tela | NÃO CONCLUSIVO |

### Navegação por teclado

Foi realizada navegação utilizando `Tab` e `Shift + Tab` em diferentes telas da aplicação.

A navegação é funcional, porém foi identificado que alguns elementos recebem foco sem apresentar indicador visual claramente perceptível.

O achado foi registrado como **BUG-007 — Ausência de indicador visual de foco na navegação por teclado**.

### NVDA

Foi realizada uma tentativa de avaliação utilizando o leitor de tela NVDA com Google Chrome em ambiente desktop.

O NVDA apresentou funcionamento em outros conteúdos do navegador, porém a leitura do foco e de determinados elementos da aplicação não ocorreu de maneira consistente.

Como não foi possível determinar com segurança a origem do comportamento, o teste foi classificado como **NÃO CONCLUSIVO**, sem abertura de novo bug baseada exclusivamente nessa evidência.

---

## 9. Testes Automatizados

A automação foi desenvolvida utilizando Cypress 16.0.0, Cucumber e o preprocessor `@badeball/cypress-cucumber-preprocessor`.

### Fluxos automatizados

#### Cadastro de pessoa paciente

Arquivo:

`cypress/e2e/cadastro.feature`

Fluxo:

- acesso à página de cadastro;
- preenchimento dos dados;
- aceite dos termos;
- confirmação de idade;
- envio do cadastro;
- validação da tela de confirmação.

Status: PASSOU

#### Busca e agendamento

Arquivo:

`cypress/e2e/busca_agendamento.feature`

Fluxo:

- login com credenciais válidas;
- acesso à busca de profissionais;
- pesquisa por especialidade;
- seleção de profissional;
- agendamento de consulta;
- agendamento de atendimento;
- acesso à tela de verificação de telefone/código.

Status: PASSOU

### Credenciais

As credenciais utilizadas nos testes autenticados são armazenadas em variáveis de ambiente e não são versionadas no repositório.

Variáveis utilizadas:

- `K6_EMAIL`
- `K6_PASSWORD`

O arquivo `.env` está incluído no `.gitignore`.

### Execução dos testes

Para executar os testes em modo interativo:

```bash
npx cypress open --e2e --browser chrome
```

Para executar os testes em modo headless (mesmo comando utilizado no pipeline de CI):

```bash
npm test
```

---

## 10. Documentação

A documentação detalhada da execução dos testes está organizada no Notion.

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

Este README funciona como um guia técnico e de execução do projeto.

---

## 11. Status do projeto

### Concluído

- [x] Cenários funcionais em Gherkin
- [x] Execução dos principais testes funcionais
- [x] Documentação dos bugs encontrados
- [x] Evidências dos bugs
- [x] Teste de desempenho com k6
- [x] Relatório HTML do k6
- [x] Avaliação com Lighthouse
- [x] Relatório HTML do Lighthouse
- [x] Avaliação automatizada de acessibilidade
- [x] Testes manuais complementares de acessibilidade
- [x] Finalização da avaliação de responsividade
- [x] Automação funcional com Cypress + Cucumber

### Em andamento

- [ ] GitHub Actions
- [ ] Relatórios da automação no pipeline
- [ ] Revisão final de segurança e documentação

---

## 12. Resultados principais

| Avaliação | Resultado |
|---|---|
| Testes funcionais principais | Executados |
| Bugs identificados | 7 |
| k6 — falhas HTTP | 0% |
| k6 — checks | 100% |
| k6 — resultado | PASSOU COM RESSALVAS |
| Lighthouse — Performance | 35/100 |
| Lighthouse — Accessibility | 96/100 |

---

## 13. Observações

Os resultados de performance podem variar de acordo com as condições do ambiente de staging no momento da execução.

Os resultados apresentados neste repositório correspondem às execuções realizadas durante esta avaliação.