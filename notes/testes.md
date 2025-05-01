## Testes em React

Testar aplicações React é essencial para garantir:

* Confiabilidade do código.
* Facilidade de manutenção e refatoração segura.
* Prevenção de regressões (bugs antigos voltando).
* Documentação viva (os testes mostram como o componente deve se comportar).

Existem vários níveis de testes que podemos aplicar:

| Tipo de Teste | O que cobre | Exemplo |
| ------------- | ----------- | ------- |
| Testes unitários | Funções puras, hooks customizados, componentes isolados | Testar se um botão chama o callback corretamente |
| Testes de integração | Múltiplos componentes/hooks trabalhando juntos | Formulário completo enviando dados |
| Testes end-to-end (E2E) | Todo o app funcionando como o usuário final vê | Clicar, navegar, preencher campos, etc. |

### Principais ferramentas de teste em React

* **Jest** → Test runner + assertion library. Testes unitários e integração.
* **React Testing Library (RTL)** → Simula o comportamento do usuário de forma realista.
* **Cypress / Playwright** → Testes E2E (browser completo).
* **Vitest** → Alternativa moderna ao Jest para quem usa Vite.
* **Testing Library Dom** → Base da Testing Library para manipulação de DOM.

### Setup típico de testes em projetos React

```bash
# Para projetos com Vite:
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom
```

```bash
# Para projetos normais (CRA ou outros):
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

E configura no package.json:

```json
"scripts": {
  "test": "jest"
}
```

Ou para Vite:

```json
"scripts": {
  "test": "vitest"
}
```

### Exemplo de Teste Unitário com React Testing Library

Um componente simples:

```tsx
// Button.tsx
export function Button({ onClick }: { onClick: () => void }) {
  return <button onClick={onClick}>Click me</button>;
}
```

Teste:

```tsx
// Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

test('chama onClick quando clicado', () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick} />);

  const button = screen.getByText('Click me');
  fireEvent.click(button);

  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

### Princípios do RTL (Testing Library)

* Teste o comportamento, não a implementação.
* Foque no que o usuário vê e interage.
* Use seletores baseados em textos, rótulos e roles (não em classes ou IDs!).

Bom:

```tsx
    screen.getByRole('button', { name: /submit/i })
```

Ruim:

```tsx
    container.querySelector('.btn')
```

### Testando Hooks Customizados

Hooks podem ser testados isoladamente usando o @testing-library/react-hooks ou o renderHook (já incluso no Testing Library React mais novo).

```tsx
import { renderHook, act } from '@testing-library/react';

function useCounter() {
  const [count, setCount] = useState(0);
  const increment = () => setCount((c) => c + 1);
  return { count, increment };
}

test('incrementa contador', () => {
  const { result } = renderHook(() => useCounter());

  act(() => {
    result.current.increment();
  });

  expect(result.current.count).toBe(1);
});
```

### Testes End-to-End (E2E)

Para testar a aplicação de verdade no navegador:

* Cypress → Ótimo para devs frontend, experiência muito boa.
* Playwright → Mais robusto para testes multiplataforma.

```js
// cypress/e2e/form.cy.ts
describe('Formulário', () => {
  it('envia corretamente', () => {
    cy.visit('/form');
    cy.get('input[name="email"]').type('teste@exemplo.com');
    cy.get('button[type="submit"]').click();
    cy.contains('Obrigado pelo envio!').should('be.visible');
  });
});
```

### Boas práticas para testes em React

Escreva testes pequenos e focados.

* Nomeie bem seus testes (deve fazer X quando Y).
* Mocks e fakes para APIs externas (usando msw, jest.fn(), etc).
* Use CI/CD pipelines para rodar testes automaticamente (GitHub Actions, GitLab CI).
* Cobertura de testes é importante, mas não absoluta — qualidade > quantidade.

### Testes unitários com Jest e Testing Library

**O que são testes unitários no React?**

Testes unitários validam o comportamento de uma unidade de código isolada, como:

* Um componente React
* Uma função utilitária
* Um hook customizado

Eles são rápidos e ajudam a garantir que cada peça do sistema funcione como esperado.

**Ferramentas principais**

* **Jest**: Framework de testes (test runner, assertions, mocking)
* **React Testing Library (RTL)**: Foca em testar o que o usuário vê e interage, não a implementação.

```bash
npm i -D jest @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

> Se estiver usando o Vite, prefira o Vitest, um substituto mais rápido e moderno para o Jest.

#### Estrutura básica de um teste

```tsx
// src/components/Hello.tsx

type HelloProps = { name: string; };

export function Hello({ name }: HelloProps) {
  return <h1>Olá, {name}</h1>
}
```

```tsx
// src/components/__tests__/Hello.test.tsx
import { render, screen } from "@testing-library/react";
import { Hello } from "../Hello.tsx";

test("Renderiza o nome corretamente", ()=>{
  render(<Hello name="Lucas" />);
  expect(screen.getByText("Olá, Lucas")).toBeInTheDocument();
});
```

#### Testando eventos

```tsx
// src/components/Button.tsx

type ButtonProps = { onClick: ()=>void; };

export function Button({ onClick }: ButtonProps) {
  return <button onClick={onClick}>Clique</button>
}
```

```tsx
// src/components/__tests__/Button.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "../Button.tsx";

test("Renderiza o componente corretamente", async ()=>{
  const handleClick = jest.fn();
  render(<Button onClick={handleClick} />);
  await userEvent.click(screen.getByText("Clique"));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

#### Testando componentes com estado (useState)

```tsx
// src/components/Counter.tsx

import { useState } from "react";

export function Counter(){
  const [count, setCount] = useState(1);

  return(
    <>
      <p>Contador: {count}</p>
      <button onClick={()=> setCount((prev) => prev + 1)}>Add</button>
    </>
  );
}
```

```tsx
// src/components/__tests__/Counter.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Counter } from "../Counter.tsx";

test("Incrementar corretamente", async () => {  
  render(<Counter />);
  const btn = screen.getByRole("button", { name: "/add/i" });
  await userEvent.click(btn);
  expect(screen.getByText("/contador: 1/i")).toBeInTheDocument();
});
```

#### Boas práticas

* Sempre teste do ponto de vista do usuário (textos visíveis, rótulos, etc.)
* Use screen.getByText, getByRole, getByLabelText, etc - Evite querySelector ou className
* Separe testes por responsabilidade e evite muitos asserts em um único teste
* Use jest.fn() para mockar funções e validar chamadas

### Testes de integração (Mocking de API)

Testes de integração com mocking de API no React são essenciais para garantir que seus componentes interajam corretamente com serviços externos, como APIs REST ou GraphQL, sem realmente fazer chamadas reais durante os testes. Isso torna os testes mais rápidos, estáveis e isolados.

#### O que são testes de integração?

Testes de integração verificam a interação entre múltiplas partes do sistema. No contexto de React:

* Um componente + hook + API.
* Componente que depende de fetch ou axios.
* Componente que usa useEffect para buscar dados.

#### Como simular chamadas de API?

A melhor abordagem moderna é usar o Mock Service Worker (MSW). Ele intercepta chamadas reais de fetch ou axios, sem precisar alterar seu código.

* jest.mock("axios")
* msw

```bash
npm i -D msw
```

```ts
// src/mocks/handlers.ts

import { rest } from "msw";

export const handlers = [
  rest.get("/api/users", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([ { id: 1, name: "Lucas" } ])
    );
  }),
];
```

```ts
// src/mocks/server.ts

import { setupServer } from "msw/node";
import { handlers } from "./handlers";

export const server = setupServer(...handlers);
```

```ts
// src/setupTests.ts

import { server } from "./mocks/server";
import "@testing-library/jest-dom";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

Garanta que setupFilesAfterEnv em jest.config.js esteja apontando para esse arquivo.

#### Componente a ser testado

```tsx
// src/components/UserList.tsx
import { useEffect, useState } from 'react';

export function UserList() {
  const [users, setUsers] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    fetch('/api/users')
      .then((res) => res.json())
      .then(setUsers);
  }, []);

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

#### Teste de integração

```tsx
// src/components/__tests__/UserList.test.tsx
import { render, screen } from '@testing-library/react';
import { UserList } from '../UserList';

test('renderiza usuários vindos da API mockada', async () => {
  render(<UserList />);
  expect(await screen.findByText('João')).toBeInTheDocument();
  expect(await screen.findByText('Maria')).toBeInTheDocument();
});
```

* A API foi mockada com MSW.
* O fetch continua funcionando como em produção.
* O teste verifica a integração entre o componente e a API mockada.

#### Benefícios do MSW

* Simula erros de rede facilmente.
* Mantém seu código inalterado.
* Permite simular latência, status 500, timeouts.
* Funciona para testes e2e também (Cypress, Playwright).