## Gerenciamento de Estado

À medida que a sua aplicação cresce, ajuda ser mais intencional sobre como o seu estado é organizado e como os dados fluem entre os seus componentes. O estado redundante ou duplicado é uma fonte comum de bugs. O estado no React é um dos conceitos fundamentais para o funcionamento da aplicação. Ele define como os dados são armazenados e atualizados, influenciando diretamente o que é renderizado na interface do usuário. Com o crescimento das aplicações, o gerenciamento de estado se torna um desafio, e é por isso que diferentes abordagens surgiram para lidar com essa complexidade.

### O que é Estado no React?

O estado (state) é um objeto que guarda informações mutáveis dentro de um componente. Sempre que o estado muda, o React re-renderiza o componente para refletir a nova versão da UI.

### Gerenciamento de Estado Local

O estado local é gerenciado dentro de um único componente e normalmente usa o hook useState.

```jsx
import { useState } from "react";

function Contador() {
  const [contador, setContador] = useState(0);

  return (
    <div>
      <p>Valor: {contador}</p>
      <button onClick={() => setContador(contador + 1)}>Incrementar</button>
    </div>
  );
}
```

* ✔ Simples e fácil de usar
* ✔ Ideal para estado pequeno e local
* ❌ Se muitos componentes precisarem do mesmo estado, pode gerar prop drilling (passagem excessiva de props)

### Entendendo useState, useEffect e o Ciclo de Vida no React

No React, os hooks (useState, useEffect, etc.) são usados para gerenciar estado e efeitos colaterais dentro de componentes funcionais. Antes dos hooks, apenas Class Components podiam lidar com estado e ciclo de vida.

#### 1. ``useState``: Gerenciamento de Estado

O useState permite criar variáveis de estado dentro de componentes funcionais.

```jsx
const [estado, setEstado] = useState(valorInicial);
```

* estado: variável que armazena o valor atual.
* setEstado: função que atualiza o estado.
* valorInicial: pode ser um número, string, booleano, array, objeto ou até mesmo uma função.

```jsx
function Contador() {
  const [contador, setContador] = useState(0);

  return (
    <div>
      <p>Contador: {contador}</p>
      <button onClick={() => setContador((prev) => prev + 1)}>+1</button>
    </div>
  );
}
```

**Por que usar (prev) => prev + 1?**

Se a atualização depender do valor anterior, é melhor usar uma função para garantir o valor correto.

#### 2. ``useEffect``: Lidando com Efeitos Colaterais

O useEffect permite executar código quando o componente monta, atualiza ou desmonta.

```tsx
useEffect(() => {
  // Código executado após renderização
  return () => {
    // Cleanup (opcional)
  };
}, [dependencias]);
```

* Sem dependências ([]) → Executa apenas uma vez (montagem).
* Com dependências ([valor]) → Executa sempre que valor mudar.
* Sem array (useEffect(() => {...})) → Executa a cada renderização.
* Retorno da função → Executado quando o componente desmonta.

#### Conclusão

* useState → Gerencia estados locais de forma simples e eficiente.
* useEffect → Permite manipular efeitos colaterais e substitui os métodos do ciclo de vida.
* O ciclo de vida dos componentes pode ser completamente gerenciado com hooks!

### Ciclo de Vida

O ciclo de vida de um componente no React define os momentos-chave da sua existência, desde sua criação (montagem), passando por atualizações (re-renderizações) até sua remoção (desmontagem).

Antes dos hooks (useState, useEffect), apenas os Class Components podiam manipular o ciclo de vida através de métodos específicos (componentDidMount, componentDidUpdate, componentWillUnmount).

Agora, com React Hooks, podemos gerenciar o ciclo de vida de maneira mais simplificada usando useEffect.

#### Fases do Ciclo de Vida no React

| fase | O que acontece? |
| ---- | --------------- |
| Montagem | O componente é criado e inserido na árvore DOM |
| Atualização | O estado (state) ou as propriedades (props) mudam, acionando uma nova renderização |
| Desmontagem | O componente é removido da DOM |

#### Fase de Montagem (Creation)

Quando um componente é criado, ele passa pelos seguintes estágios:

**Class Component**

```tsx
class MeuComponente extends React.Component {
  constructor(props) {
    super(props);
    console.log("1️⃣ Constructor chamado");
  }

  componentDidMount() {
    console.log("3️⃣ ComponentDidMount chamado");
  }

  render() {
    console.log("2️⃣ Render chamado");
    return <h1>Olá, mundo!</h1>;
  }
}
```

* **O que acontece?**
    * constructor → Inicializa o estado (state) e configurações iniciais.
    * render → Retorna a interface do usuário (UI).
    * componentDidMount → Executado após o primeiro render, útil para chamadas de API, configurações de eventos ou timers.

**Com useEffect (Functional Component)**

```tsx
import { useEffect } from "react";

function MeuComponente() {
  useEffect(() => {
    console.log("Componente montado! 🚀");
  }, []);

  return <h1>Olá, mundo!</h1>;
}
```

* **Explicação:**
    * O useEffect(() => {...}, []) substitui componentDidMount.
    * O array vazio ([]) significa que o código só executa uma vez, logo após a renderização inicial.

#### Fase de Atualização (Update)

Ocorre quando o estado (state) ou as propriedades (props) mudam.

**Class Component**

```tsx
class MeuComponente extends React.Component {
  constructor(props) {
    super(props);
    this.state = { contador: 0 };
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(`Componente atualizado! Novo contador: ${this.state.contador}`);
  }

  render() {
    return (
      <div>
        <p>Contador: {this.state.contador}</p>
        <button onClick={() => this.setState({ contador: this.state.contador + 1 })}>
          Incrementar
        </button>
      </div>
    );
  }
}
```

* **Explicação:**
    * componentDidUpdate(prevProps, prevState) → Executado após uma atualização.
    * Podemos verificar se state ou props realmente mudaram antes de executar alguma lógica.

**Com useEffect (Functional Component)**

```tsx
import { useState, useEffect } from "react";

function MeuComponente() {
  const [contador, setContador] = useState(0);

  useEffect(() => {
    console.log(`Componente atualizado! Novo contador: ${contador}`);
  }, [contador]); // Executa sempre que `contador` mudar

  return (
    <div>
      <p>Contador: {contador}</p>
      <button onClick={() => setContador(contador + 1)}>Incrementar</button>
    </div>
  );
}
```

* **Explicação:**
    * useEffect(() => {...}, [contador]) → Executado sempre que contador mudar.
    * Se removermos [contador], o efeito rodará a cada renderização, o que pode ser indesejado.

#### Fase de Desmontagem (Unmount)

Quando um componente é removido da árvore DOM, devemos limpar eventuais timers, listeners ou conexões.

**Class Component**

```tsx
class MeuComponente extends React.Component {
  componentWillUnmount() {
    console.log("Componente será desmontado!");
  }

  render() {
    return <h1>Vou desaparecer em breve!</h1>;
  }
}
```

* **Explicação:**
    * componentWillUnmount() → Executado antes do componente ser removido.

**Com useEffect (Functional Component)**

```tsx
import { useEffect } from "react";

function MeuComponente() {
  useEffect(() => {
    console.log("Componente montado!");

    return () => {
      console.log("Componente desmontado!");
    };
  }, []);

  return <h1>Vou desaparecer em breve!</h1>;
}
```

* **Explicação:**
    * O retorno da função dentro do useEffect substitui componentWillUnmount.
    * Útil para remover event listeners, cancelar requisições e limpar timers.

#### Resumo do Ciclo de Vida

| Fase | Class Component | Functional Component |
| ---- | --------------- | -------------------- |
| Montagem | componentDidMount | useEffect(() => {...}, []) |
| Atualização | componentDidUpdate | useEffect(() => {...}, [dependencias]) |
| Desmontagem | componentWillUnmount | useEffect(() => { return () => {...} }, []) |

### useReducer para estados mais complexos

Quando trabalhamos com estados mais complexos no React, que envolvem múltiplos valores ou transições de estado mais elaboradas, o useState pode se tornar limitado e difícil de gerenciar.

Nesses casos, useReducer oferece uma alternativa mais escalável e previsível, semelhante ao padrão Redux, mas integrado ao React de forma nativa.

#### O que é useReducer?

O useReducer é um hook que ajuda no gerenciamento de estados complexos. Ele funciona baseado em um estado inicial, uma função reducer e ações (dispatch) que determinam como o estado deve ser atualizado.

```tsx
const [state, dispatch] = useReducer(reducer, initialState);
```

**Principais Elementos:**

* state → Representa o estado atual.
* dispatch(action) → Uma função que envia ações para modificar o estado.
* reducer(state, action) → Uma função que recebe o estado atual e uma ação, retornando um novo estado.
* initialState → O estado inicial do componente.

#### Exemplo Simples: Contador com useReducer

Aqui está um contador implementado com useReducer:

```tsx
import { useReducer } from "react";

// Estado inicial
const initialState = { count: 0 };

// Função reducer
function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "reset":
      return { count: 0 };
    default:
      throw new Error("Ação desconhecida");
  }
}

export default function Contador() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <h1>Contador: {state.count}</h1>
      <button onClick={() => dispatch({ type: "increment" })}>➕ Incrementar</button>
      <button onClick={() => dispatch({ type: "decrement" })}>➖ Decrementar</button>
      <button onClick={() => dispatch({ type: "reset" })}>🔄 Resetar</button>
    </div>
  );
}
```

**O que acontece aqui?**

* Criamos um reducer que lida com ações (increment, decrement, reset).
* O estado inicial é { count: 0 }.
* O dispatch({ type: "increment" }) chama a ação e modifica o estado de acordo com o reducer.

#### Quando Usar useReducer em Vez de useState?

| Situação | Melhor opção |
| -------- | ------------ |
| Estado simples (1 ou 2 variáveis) | useState ✅ |
| Estado depende do estado anterior | useReducer ✅ |
| Muitas ações diferentes modificam o estado | useReducer ✅ |
| Estado complexo com múltiplos valores | useReducer ✅ |

#### Gerenciando Estado Complexo

Agora, vamos gerenciar um formulário usando useReducer. Suponha que temos um formulário de cadastro de usuário:

```tsx
import { useReducer } from "react";

// Estado inicial
const initialState = {
  nome: "",
  email: "",
  idade: "",
};

// Função reducer
function reducer(state, action) {
  switch (action.type) {
    case "setNome":
      return { ...state, nome: action.payload };
    case "setEmail":
      return { ...state, email: action.payload };
    case "setIdade":
      return { ...state, idade: action.payload };
    case "reset":
      return initialState;
    default:
      return state;
  }
}

export default function Formulario() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <h1>Cadastro</h1>
      <input
        type="text"
        placeholder="Nome"
        value={state.nome}
        onChange={(e) => dispatch({ type: "setNome", payload: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={state.email}
        onChange={(e) => dispatch({ type: "setEmail", payload: e.target.value })}
      />
      <input
        type="number"
        placeholder="Idade"
        value={state.idade}
        onChange={(e) => dispatch({ type: "setIdade", payload: e.target.value })}
      />
      <button onClick={() => dispatch({ type: "reset" })}>🔄 Resetar</button>

      <p>📌 Nome: {state.nome}</p>
      <p>📌 Email: {state.email}</p>
      <p>📌 Idade: {state.idade}</p>
    </div>
  );
}
```

**Explicação**

* initialState mantém os campos do formulário.
* reducer gerencia as mudanças com base em ações específicas (setNome, setEmail, etc.).
* O dispatch é usado para atualizar cada campo individualmente.

> Benefício: O código fica mais organizado e escalável à medida que novos campos são adicionados.

#### Exemplo Prático: Carrinho de Compras

Agora vamos aplicar useReducer para gerenciar um carrinho de compras.

**Criando o reducer**

```tsx
type Produto = {
  id: number;
  nome: string;
  preco: number;
};

type CarrinhoState = {
  produtos: Produto[];
};

type CarrinhoAction =
  | { type: "ADD"; produto: Produto }
  | { type: "REMOVE"; id: number }
  | { type: "CLEAR" };

const carrinhoReducer = (state: CarrinhoState, action: CarrinhoAction): CarrinhoState => {
  switch (action.type) {
    case "ADD":
      return { produtos: [...state.produtos, action.produto] };
    case "REMOVE":
      return { produtos: state.produtos.filter((p) => p.id !== action.id) };
    case "CLEAR":
      return { produtos: [] };
    default:
      return state;
  }
};
```

**Criando o Componente**

```tsx
import { useReducer } from "react";

const initialState = { produtos: [] };

export default function Carrinho() {
  const [state, dispatch] = useReducer(carrinhoReducer, initialState);

  const adicionarProduto = () => {
    const novoProduto = { id: Date.now(), nome: "Produto X", preco: 50 };
    dispatch({ type: "ADD", produto: novoProduto });
  };

  return (
    <div>
      <h1>🛒 Carrinho</h1>
      <button onClick={adicionarProduto}>Adicionar Produto</button>
      <button onClick={() => dispatch({ type: "CLEAR" })}>🗑 Limpar Carrinho</button>
      <ul>
        {state.produtos.map((p) => (
          <li key={p.id}>
            {p.nome} - R$ {p.preco}{" "}
            <button onClick={() => dispatch({ type: "REMOVE", id: p.id })}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### Context API (useContext)

O Context API do React é uma ferramenta poderosa para compartilhar estado global entre componentes sem precisar passar props manualmente (prop drilling). Ele permite fornecer (Provider) e consumir (Consumer) valores em diferentes partes da árvore de componentes.

#### Como o Context API Funciona?

1. Criamos um contexto com createContext().
2. Definimos um Provider para disponibilizar o estado global.
3. Usamos useContext() para acessar os valores do contexto em qualquer componente.

#### Exemplo Simples: Tema Claro/Escuro

* **Criando o Contexto de Tema**

```tsx
import { createContext, useState, useContext } from "react";

// Criamos o contexto do tema
const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [tema, setTema] = useState("light");

  const alternarTema = () => {
    setTema((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ tema, alternarTema }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Criamos um hook para facilitar o uso do contexto
export function useTheme() {
  return useContext(ThemeContext);
}
```

* **Criando um Componente que Usa o Tema**

```tsx
function BotaoTrocarTema() {
  const { tema, alternarTema } = useTheme();

  return (
    <button onClick={alternarTema} style={{ background: tema === "dark" ? "#333" : "#fff", color: tema === "dark" ? "#fff" : "#000" }}>
      Alternar para {tema === "light" ? "Escuro" : "Claro"}
    </button>
  );
}
```

* **Aplicando no App Principal**

```tsx
export default function App() {
  return (
    <ThemeProvider>
      <BotaoTrocarTema />
    </ThemeProvider>
  );
}
```

### Gerenciamento global de estado com redux (RTK)

O Redux Toolkit (RTK) é a maneira recomendada e otimizada de usar Redux no React. Ele simplifica a configuração e a escrita de reducers, eliminando a verbosidade do Redux clássico.

#### Por que usar Redux Toolkit?

* ✅ Menos código e menos complexidade
* ✅ Imutabilidade simplificada com Immer
* ✅ Inclui createSlice para reduzir a verbosidade
* ✅ Performance otimizada
* ✅ Inclui createAsyncThunk para chamadas assíncronas
* ✅ Melhor integração com TypeScript

#### 1 Criando um Slice (Gerenciamento de Estado Simplificado)

O createSlice combina actions e reducers em um único arquivo.

```tsx
// store/slices/counterSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
  value: number;
}

const initialState: CounterState = { value: 0 };

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1; // Immer cuida da imutabilidade
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
```

#### 2 Configurando a Store do Redux

A Store centraliza o estado da aplicação.

```tsx
// store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

// Tipagem para uso do Redux com TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

#### 3 Configurando o Redux no React

Agora, usamos o Provider para envolver nossa aplicação.

```tsx
// main.tsx (React com Redux)
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
```

#### 4 Usando Redux dentro de Componentes

Agora, podemos acessar o estado global dentro de um componente usando useSelector e useDispatch.

```tsx
// Counter.tsx
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./store";
import { increment, decrement, incrementByAmount } from "./store/slices/counterSlice";

export function Counter() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Contador: {count}</h1>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>+5</button>
    </div>
  );
}
```

#### Gerenciamento de Estados Assíncronos com createAsyncThunk

O Redux Toolkit também facilita chamadas assíncronas, como requisições para APIs.

##### 1 Criando um Slice com createAsyncThunk

```tsx
// store/slices/userSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface UserState {
  users: any[];
  loading: boolean;
  error: string | null;
}

// Estado inicial
const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

// Thunk para buscar usuários
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get("https://jsonplaceholder.typicode.com/users");
  return response.data;
});

// Criando Slice
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erro ao buscar usuários";
      });
  },
});

export default userSlice.reducer;
```

##### 2 Adicionando o Novo Slice na Store

```tsx
// store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import userReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: userReducer,
  },
});
```

##### 3 Consumindo Dados Assíncronos no Componente

```tsx
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "./store";
import { fetchUsers } from "./store/slices/userSlice";
import { useEffect } from "react";

export function UserList() {
  // ✅ Correto: Tipar o Dispatch como AppDispatch
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(fetchUsers()); // Agora TypeScript reconhece
  }, [dispatch]);

  return (
    <div>
      <h1>Lista de Usuários</h1>
      {loading && <p>Carregando...</p>}
      {error && <p>Erro: {error}</p>}
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

#### Redux Toolkit vs. Context API

| Feature | Redux Tookit | Context API |
| ------- | ------------ | ----------- |
| Complexidade | Média | Baixa |
| Performace | Melhor (otimizado) | Pode ser menos eficiente |
| Escalabilidade | Alta | Média |
| Suporte Assíncrono | Sim (createAsyncThunk) | Não nativo |

* Use Redux Toolkit quando:
  * ✅ A aplicação tem muitos estados globais complexos
  * ✅ O estado precisa ser atualizado de forma eficiente
  * ✅ Requisições assíncronas precisam ser bem gerenciadas

* Use Context API quando:
  * ✅ Apenas alguns estados precisam ser compartilhados
  * ✅ A aplicação é pequena ou média
  * ✅ Você quer simplicidade sem precisar de Redux

### React Query (Para cache de dados e revalidação automático)

O React Query é uma biblioteca poderosa para o gerenciamento de dados assíncronos no React. Ele melhora o desempenho, a experiência do usuário e a organização do código ao lidar com requisições HTTP, cache de dados e revalidação automática. Com ele, você substitui o uso excessivo de useState, useEffect e Redux para estados remotos.

**Motivação**

A maioria dos frameworks web principais não vem com uma maneira opinativa de buscar ou atualizar dados de forma holística. Por causa disso, os desenvolvedores acabam construindo meta-frameworks que encapsulam opiniões estritas sobre busca de dados, ou inventam suas próprias maneiras de buscar dados. Isso geralmente significa juntar estados e efeitos colaterais baseados em componentes, ou usar bibliotecas de gerenciamento de estado de propósito mais geral para armazenar e fornecer dados assíncronos em seus aplicativos.

Embora a maioria das bibliotecas tradicionais de gerenciamento de estado sejam ótimas para trabalhar com estado do cliente, elas não são tão boas para trabalhar com estado assíncrono ou de servidor . Isso ocorre porque o estado do servidor é totalmente diferente . Para começar, estado do servidor:

* É persistido remotamente em um local que você não pode controlar ou possuir
* Requer APIs assíncronas para busca e atualização
* Implica propriedade compartilhada e pode ser alterado por outras pessoas sem seu conhecimento
* Pode potencialmente ficar "desatualizado" em seus aplicativos se você não tomar cuidado

Em uma nota mais técnica, o React Query provavelmente irá:

Ajuda você a remover muitas linhas de código complicado e mal compreendido do seu aplicativo e substituí-las por apenas algumas linhas de lógica de consulta do React.
Torne seu aplicativo mais sustentável e mais fácil de criar novos recursos sem se preocupar em conectar novas fontes de dados de estado do servidor
Tenha um impacto direto em seus usuários finais, tornando seu aplicativo mais rápido e responsivo do que nunca.
Pode ajudar você a economizar largura de banda e aumentar o desempenho da memória


#### Principais Recursos

* ✅ Cache automático de dados
* ✅ Revalidação e sincronização automática
* ✅ Suporte a pagination e infinite queries
* ✅ Gerenciamento de loading, error, refetching sem necessidade de useState
* ✅ Suporte a mutations (operações POST, PUT, DELETE)
* ✅ Fácil integração com GraphQL e REST APIs
* ✅ Compatível com SSR (Next.js, Remix)

#### Configurando o QueryClientProvider

Antes de usar o React Query, precisamos envolver a aplicação com o QueryClientProvider:

```tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MyComponent />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
```

#### useQuery: Buscando Dados e Cache Automático

O useQuery permite fazer fetching automático de dados e armazená-los no cache.

```tsx
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function fetchUsers() {
  const { data } = await axios.get("https://jsonplaceholder.typicode.com/users");
  return data;
}

export function UserList() {
  const { data: users, isLoading, error, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: 1000 * 60 * 5, // Dados são considerados frescos por 5 minutos
  });

  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao buscar dados</p>;

  return (
    <div>
      <h1>Lista de Usuários</h1>
      <button onClick={() => refetch()}>Recarregar</button>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

**Explicação**

* O useQuery armazena os dados no cache e evita chamadas desnecessárias à API.
* queryKey: ["users"] identifica os dados no cache.
* staleTime: 5 minutos define que os dados não serão revalidados nesse período.
* O botão Recarregar força um refetch() manual.

#### Revalidação Automática (Refetching)

O React Query oferece revalidação automática:

* staleTime: Define por quanto tempo os dados são considerados frescos.
* refetchInterval: Revalida automaticamente em um intervalo de tempo.
* Revalidação ao foco: Quando o usuário volta para a aba, os dados são atualizados.

```tsx
  useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: 1000 * 60 * 5, // 5 minutos
    refetchOnWindowFocus: true, // Revalida ao alternar abas
    refetchInterval: 10000, // Revalida a cada 10s
  });
```

#### useMutation: Enviando Dados para a API

Para POST, PUT, DELETE, usamos useMutation:

```tsx
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

async function createUser(name: string) {
  return axios.post("https://jsonplaceholder.typicode.com/users", { name });
}

export function AddUser() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] }); // Atualiza cache
    },
  });

  return (
    <button onClick={() => mutation.mutate("Novo Usuário")}>
      {mutation.isPending ? "Salvando..." : "Adicionar Usuário"}
    </button>
  );
}
```

**Explicação**

* useMutation executa POST ao clicar no botão.
* onSuccess invalida ["users"] para forçar atualização dos dados no cache.

#### Comparação: React Query vs useEffect + useState

**❌ Sem React Query (código mais verboso)**

```tsx
const [users, setUsers] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  async function fetchUsers() {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }
  fetchUsers();
}, []);
```

**✅ Com React Query (código mais limpo)**

```tsx
const { data: users, isLoading, error } = useQuery({
  queryKey: ["users"],
  queryFn: fetchUsers,
});
```

**Vantagens:**

* Menos código boilerplate
* Cache automático
* Revalidação automática
* Melhor desempenho

#### Quando Usar React Query?

**✅ Casos indicados:**

* ✔ Dados que precisam de cache e sincronização
* ✔ Requisições frequentes (ex.: lista de produtos, usuários)
* ✔ Suporte a paginação e rolagem infinita
* ✔ Melhor experiência em SPAs e Next.js

**❌ Quando NÃO usar?**

* ✖ Estados locais (ex.: formulário controlado)
* ✖ Dados que não precisam de sincronização constante

