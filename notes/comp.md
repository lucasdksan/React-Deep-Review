## Componentização e Arquitetura

Em aplicações React escaláveis e bem organizadas, componentes reutilizáveis são fundamentais para garantir:

* Consistência visual
* Redução de código duplicado
* Melhor manutenção
* Facilidade de testes

Vamos abordar padrões, boas práticas e estratégias para criar componentes reutilizáveis de forma profunda e eficaz.

### Padrões de componentes reutilizáveis

É um componente pensado para ser usado em múltiplos contextos da aplicação, com comportamentos e estilos que podem ser personalizados via props.

Exemplos típicos:

* Botões (```<Button />```)
* Inputs (```<TextField />```)
* Modais (```<Modal />```)
* Cards (```<ProductCard />```)
* Avatares (```<Avatar />```)

#### Princípios fundamentais

* **Generalização via Props**

Evite hardcoded. Use props para tornar o componente flexível.

```tsx
type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
};

const Button = ({ children, onClick, variant = 'primary' }: ButtonProps) => {
  const className = variant === 'primary' ? 'bg-blue-500' : 'bg-gray-500';
  return (
    <button className={`${className} text-white px-4 py-2`} onClick={onClick}>
      {children}
    </button>
  );
};
```

* **Evitar acoplamentos**

Não dependa de dados ou estados externos. Use props e callbacks:

```tsx
// ruim:
const ProductCard = () => {
  const { product } = useProductContext();
  return <div>{product.name}</div>;
};

// bom:
const ProductCard = ({ product }: { product: Product }) => (
  <div>{product.name}</div>
);
```

* **Prop Drilling vs Composição (children)**

Use children para permitir composição.

```tsx
const Modal = ({ children }: { children: React.ReactNode }) => (
  <div className="modal">{children}</div>
);

// Uso:
<Modal>
  <h2>Confirmar ação</h2>
  <p>Você tem certeza?</p>
</Modal>
```

* **Forwarding refs (ex: input programático)**

```tsx
const TextInput = React.forwardRef<HTMLInputElement, Props>(
  ({ label }, ref) => (
    <label>
      {label}
      <input ref={ref} />
    </label>
  )
);
```

* **Polimorfismo com as prop**

Para componentes que podem mudar de tag:

```tsx
type PolymorphicProps = {
  as?: keyof JSX.IntrinsicElements;
  children: React.ReactNode;
};

const Box = ({ as: Component = 'div', children }: PolymorphicProps) => (
  <Component>{children}</Component>
);

// Uso:
<Box as="section">Conteúdo</Box>
```

#### Estratégias Avançadas

* **Component Factories**

Para gerar componentes com configuração pré-definida.

```tsx
const createButton = (variant: string) => (props: ButtonProps) =>
  <Button {...props} variant={variant} />;

export const PrimaryButton = createButton('primary');
export const SecondaryButton = createButton('secondary');
```

* **Prop Types vs TypeScript**

Prefira TypeScript para tipos fortes, especialmente em componentes reutilizáveis e bibliotecas compartilhadas.

* **Exemplo realista de componente reutilizável**

```tsx
type InputProps = {
  id: string;
  label: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const TextInput = ({ id, label, error, ...rest }: InputProps) => (
  <div className="mb-4">
    <label htmlFor={id} className="block font-bold">
      {label}
    </label>
    <input
      id={id}
      className={`border p-2 w-full ${error ? 'border-red-500' : 'border-gray-300'}`}
      {...rest}
    />
    {error && <span className="text-red-500 text-sm">{error}</span>}
  </div>
);
```

### Composição vs. Herança

Em React, composição é preferida à herança — e isso é um pilar importante da filosofia do framework.

* **Composição**

Composição é a prática de combinar componentes entre si, montando interfaces complexas a partir de blocos menores e reutilizáveis.

> Um componente é "composto" por outros.

* **Herança**

Herança é um conceito da programação orientada a objetos onde uma classe estende outra, herdando seus métodos e propriedades.

> Em React, não é necessário nem recomendado usar herança para reutilizar comportamento ou estrutura de UI.

#### Por que o React prefere composição?

1. Mais flexível
    Permite reutilizar lógica e estrutura sem forçar dependência entre componentes.

2. Evita acoplamento forte
    Componentes filhos não precisam conhecer detalhes da hierarquia.

3. Facilita testes e manutenção
    Cada componente é isolado e pode ser testado individualmente.

4. React é baseado em funções, não em classes herdadas

**Exemplos práticos**

```tsx
const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="border p-4 rounded-md shadow">{children}</div>
);

const Profile = () => (
  <Card>
    <h2>João da Silva</h2>
    <p>Desenvolvedor Frontend</p>
  </Card>
);
```

#### Padrões de Composição no React

* **Props.children**

O padrão mais simples e poderoso de composição.

```tsx
const Layout = ({ children }: { children: React.ReactNode }) => (
  <main className="container">{children}</main>
);
```

* **Slot Pattern (ou Render Props)**

```tsx
const Card = ({ header, footer, children }: any) => (
  <div>
    {header}
    <div>{children}</div>
    {footer}
  </div>
);

// Uso
<Card
  header={<h2>Título</h2>}
  footer={<button>OK</button>}
>
  Conteúdo aqui
</Card>
```

* **Higher-Order Components (HOC)**

Funções que recebem um componente e retornam outro, adicionando comportamento.

```tsx
function withLogger(WrappedComponent) {
  return function LoggedComponent(props) {
    console.log("Rendering", WrappedComponent.name);
    return <WrappedComponent {...props} />;
  };
}
```

##### O que é um Higher-Order Component (HOC)?

Um HOC é uma função que recebe um componente e retorna um novo componente com comportamento adicional.

```tsx
const EnhancedComponent = withSomething(BaseComponent);
```

> Ele não modifica o componente original diretamente — apenas o “envolve”, retornando um novo componente com funcionalidades extras.

**Por que usar HOCs?**

HOCs são úteis quando você precisa reutilizar lógica de comportamento entre vários componentes. Exemplos comuns:

* Autenticação (proteger rotas)
* Logging
* Tracking (analytics)
* Fetch de dados
* Responsividade (detecção de largura de tela, por exemplo)

**Estrutura Básica de um HOC**

```tsx
function withLogger<P>(WrappedComponent: React.ComponentType<P>) {
  return function ComponentWithLogger(props: P) {
    console.log('Componente renderizado com props:', props);
    return <WrappedComponent {...props} />;
  };
}
```

**Exemplo real de HOC**

```tsx
function withAuth<P>(WrappedComponent: React.ComponentType<P>) {
  return function ProtectedComponent(props: P) {
    const isAuthenticated = localStorage.getItem('token');

    if (!isAuthenticated) {
      return <p>Você precisa estar logado.</p>;
    }

    return <WrappedComponent {...props} />;
  };
}

const Dashboard = () => {
  return <div>Bem-vindo ao painel!</div>;
};

export default withAuth(Dashboard);
```

### Hooks customizados para lógica reutilizável

Hooks customizados no React são funções que começam com a palavra use e encapsulam lógica reutilizável que pode ser compartilhada entre vários componentes.

> Em resumo: eles permitem extrair lógica que usa outros hooks (useState, useEffect, useReducer, etc.) para deixar seus componentes mais limpos e sua lógica mais DRY (Don't Repeat Yourself).

#### Por que criar Hooks customizados?

* Organização de código: em vez de repetir useState, useEffect e funções em vários lugares, você centraliza tudo.
* Reutilização de lógica: usar o mesmo comportamento em diferentes componentes.
* Separação de responsabilidades: deixa seus componentes focados apenas em renderizar UI.
* Teste mais fácil: facilita testar regras de negócio separadamente dos componentes.

#### Estrutura de um Hook Customizado

Sempre que você cria um hook customizado, ele:

* Começa com use
* Pode chamar outros hooks React
* Pode receber parâmetros
* Retorna dados e/ou funções

Exemplo básico:

```tsx
import { useState } from 'react';

function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount((c) => c + 1);
  const decrement = () => setCount((c) => c - 1);
  const reset = () => setCount(initialValue);

  return { count, increment, decrement, reset };
}


function CounterComponent() {
  const { count, increment, decrement, reset } = useCounter(5);

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={increment}>Incrementar</button>
      <button onClick={decrement}>Decrementar</button>
      <button onClick={reset}>Resetar</button>
    </div>
  );
}
```

#### Hook Customizado mais complexo: useFetch

```tsx
import { useState, useEffect } from 'react';

function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        if (isMounted) {
          setData(json);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [url]);

  return { data, loading, error };
}



function UsersList() {
  const { data, loading, error } = useFetch<User[]>('/api/users');

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error.message}</p>;

  return (
    <ul>
      {data?.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

```

#### Regras dos Hooks Customizados

* Devem começar com use (importante para o React entender que eles seguem as regras dos hooks).
* Devem ser chamados no topo de funções (não dentro de if, for, while).
* Podem chamar outros hooks (useState, useEffect, useMemo, etc.).
* Podem receber parâmetros e retornar o que você quiser (estado, funções, objetos).

#### Hooks Customizados + Tipagem Genérica (TypeScript)

Usar tipos genéricos (<T>) faz seus hooks customizados serem ainda mais poderosos:

```tsx
function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  const setValue = (value: T) => {
    setStoredValue(value);
    localStorage.setItem(key, JSON.stringify(value));
  };

  return [storedValue, setValue] as const;
}
```

#### Pensamento estratégico

Hooks customizados não precisam renderizar nada, eles só organizam a lógica.
Você pode pensar neles como mini “serviços” internos do seu front-end React.

Eles permitem:

* Composição de comportamentos complexos.
* Isolamento de lógica
* Facilitação de testes.
* Melhor legibilidade e manutenção.

### Monorepos (Turborepo, Nx)

Monorepo (Monolithic Repository) é uma estratégia onde vários projetos (apps, pacotes, bibliotecas) vivem no mesmo repositório Git.

* Você mantém múltiplos pacotes em um único repositório, em vez de um repositório para cada projeto.
* Cada app ou lib pode ser independente, mas compartilham o mesmo ambiente de build, CI/CD, versionamento, controle de dependências, etc.

> Exemplo: Em vez de ter repositórios separados para frontend, backend, design system, você coloca tudo em um único repositório organizado.

#### Benefícios de Monorepos

| Vantagem | Descrição |
| -------- | --------- |
| Melhor compartilhamento de código | Fácil criar bibliotecas internas usadas por vários apps. |
| Atomic commits | Atualiza múltiplos pacotes de uma vez só em um único commit. |
| Integração contínua simplificada | Um pipeline de CI pode validar todos os projetos juntos. |
| Consistência de dependências | Todos os projetos usam as mesmas versões de libs e ferramentas. |
| Refatoração global | Alterações em larga escala (ex: mudar um componente usado em todos os apps). |

#### Principais desafios de Monorepos

* Performance: builds, testes e linting podem ficar lentos sem otimizações.
* Gerenciamento de dependências: risco de "acoplamento" excessivo entre projetos.
* Complexidade: precisa de ferramentas e processos mais robustos (como Turbo ou Nx).
* Escalabilidade: mais fácil se tornar bagunçado se não houver boas práticas.

#### Ferramentas para Monorepo Moderno

##### Turborepo

Desenvolvido pela Vercel, foca em performance ultra alta para aplicações JavaScript/TypeScript.

**Características:**

* Cache de build inteligente (local e remoto).
* Parallel execution: tarefas rodam em paralelo.
* Incremental builds: só re-executa tarefas de pacotes que mudaram.
* Zero-config para projetos TypeScript, Next.js, React, etc.
* Integração automática com Vercel para deploy contínuo.

**Como funciona:**

* Arquivo turbo.json define pipelines de tarefas (build, lint, test, etc.).
* Detecta dependências entre pacotes.
* Usa cache local (.turbo) e remoto (se configurado).

```tsx
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "lint": {},
    "test": {
      "dependsOn": ["build"]
    }
  }
}
```

> Depende do build de dependências (^build) antes de rodar o seu.

#### Nx

Desenvolvido pela Nrwl (ex-Googlers que trabalharam no Angular).

**Características:**

* Workspaces organizados por apps e libs.
* Generators: cria apps, libs, componentes, serviços automaticamente.
* Executors: comandos inteligentes para build, lint, test, serve.
* Dependência gráfica: visualiza a árvore de dependências dos projetos (nx graph).
* Task caching avançado, como o Turbo, local e remoto.
* Plugins oficiais para React, Next.js, NestJS, Angular, etc.
* Controlled boundaries: regras para dependências entre libs/apps (Lint Rules).

**Como funciona:**

* Arquivo nx.json + project.json ou workspace.json.
* Estrutura separada em apps/ e libs/.
* Cada app/lib tem configurações isoladas.
* Pode usar o nx affected para rodar somente o que foi impactado por uma mudança no Git.

```bash
nx build frontend
nx test backend
nx affected:build --base=main
```

>Ex: affected:build só faz build dos pacotes impactados em comparação com main.

#### Estrutura típica de um Monorepo moderno (Turbo ou Nx)

```bash
/my-monorepo
  /apps
    /web
    /admin
    /api
  /packages
    /ui
    /config
    /hooks
    /utils
  turbo.json / nx.json
  package.json
  tsconfig.base.json
```

* /apps → Projetos finais (Next.js, Node.js, etc.)
* /packages → Bibliotecas compartilhadas.
* turbo.json ou nx.json → Configurações do gerenciador de tarefas.

#### Configurando um Monorepo na prática

Com Turborepo:

```bash
npx create-turbo@latest
```

Com Nx:

```bash
npx create-nx-workspace@latest
```

* Escolhe entre monorepo de apps (multi-app) ou packages (multi-library).
* Depois cria novos apps/libs com:

```bash
nx generate @nrwl/next:app frontend
nx generate @nrwl/react:lib ui-components
```

#### Decisões estratégicas

| Caso | Melhor escolha |
| ---- | -------------- |
| Preciso de máxima simplicidade e projeto focado em React / Next.js | Turborepo |
| Quero escala corporativa com muitos apps/libs/serviços e regras de dependência | Nx |
| Preciso de plugins para outras stacks (NestJS, Angular, etc) | Nx |
| Meu foco é desempenho em builds locais e CI/CD | Ambos são excelentes (Turbo um pouco mais minimalista) |

#### Considerações Avançadas

* Em projetos grandes, combine monorepo com Workspaces do Yarn, PNPM ou NPM para gerenciar pacotes internos (workspaces no package.json).
* Cache remoto (com Turborepo ou Nx) acelera muito CI/CD: só o que mudou é rebuildado.
* CI inteligente: configurar pipelines para rodar apenas tasks dos apps/libs impactados (nx affected, turbo run).
* Boundary Rules (com Nx) evitam "dependência circular" entre libs/apps.