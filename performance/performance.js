import http from 'k6/http';
import { check, sleep } from 'k6';

const LOGIN_URL =
  'https://api-staging.lacreisaude.com.br/v1/lacreiid/auth/login/';

const SEARCH_URL =
  'https://api-staging.lacreisaude.com.br/v1/lacreisaude/professionals/?search=psicologia';

const email = __ENV.K6_EMAIL;
const password = __ENV.K6_PASSWORD;

if (!email || !password) {
  throw new Error('K6_EMAIL ou K6_PASSWORD não foi configurado.');
}

const smokeTest = __ENV.K6_SMOKE === 'true';

export const options = smokeTest
  ? {
      vus: 1,
      iterations: 1,
    }
  : {
      stages: [
        { duration: '30s', target: 10 },
        { duration: '30s', target: 30 },
        { duration: '1m', target: 30 },
        { duration: '30s', target: 0 },
      ],

      thresholds: {
        http_req_failed: ['rate<0.01'],
        http_req_duration: ['p(95)<2000'],
      },
    };

export function setup() {
  const payload = JSON.stringify({
    email: email,
    password: password,
    is_professional: false,
  });

  const response = http.post(LOGIN_URL, payload, {
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      Origin: 'https://paciente-staging.lacreisaude.com.br',
      Referer: 'https://paciente-staging.lacreisaude.com.br/',
    },
  });

  console.log(`Status do login: ${response.status}`);

  const loginSuccess = check(response, {
    'login retornou 200': (r) => r.status === 200,
  });

  if (!loginSuccess) {
    console.log(`Resposta do login: ${response.body}`);
    throw new Error(`Falha no login. Status: ${response.status}`);
  }

  const body = response.json();

  if (!body.key) {
    throw new Error('Login realizado, mas o token não foi encontrado.');
  }

  return {
    token: body.key,
  };
}

export default function (data) {
  const response = http.get(SEARCH_URL, {
    headers: {
      Accept: 'application/json, text/plain, */*',
      Authorization: `Bearer ${data.token}`,
      Origin: 'https://paciente-staging.lacreisaude.com.br',
      Referer: 'https://paciente-staging.lacreisaude.com.br/',
    },
  });

  check(response, {
    'busca retornou 200': (r) => r.status === 200,
  });

  if (response.status !== 200) {
    console.log(`Falha na busca. Status: ${response.status}`);
    console.log(`Resposta da busca: ${response.body}`);
  }

  sleep(1);
}