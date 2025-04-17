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

* Botões (<Button />)
* Inputs (<TextField />)
* Modais (<Modal />)
* Cards (<ProductCard />)
* Avatares (<Avatar />)

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