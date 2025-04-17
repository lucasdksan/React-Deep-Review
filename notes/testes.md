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

