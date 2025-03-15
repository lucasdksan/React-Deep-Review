## Manipulação de Dados e API´s

A manipulação de dados e o consumo de APIs são essenciais para aplicativos React dinâmicos. O React, por padrão, não possui uma camada nativa para requisições HTTP, então usamos bibliotecas como fetch API, Axios ou soluções avançadas como React Query para gerenciar chamadas à API, cache e revalidação automática.

### Métodos HTTP e Manipulação de Dados

As requisições para APIs REST geralmente seguem estes métodos:

* GET → Buscar dados
* POST → Criar novos dados
* PUT/PATCH → Atualizar dados
* DELETE → Excluir dados

Cada um desses métodos interage com uma API para modificar ou recuperar informações do backend.

### Consumo de API com Fetch API (Nativo do JavaScript)

O fetch é a forma nativa de fazer requisições HTTP no JavaScript. Vamos ver um exemplo básico de um GET request:

```tsx
import { useEffect, useState } from "react";

function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Erro ao buscar usuários:", error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Carregando...</p>;

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

**Vantagens do Fetch API**

* ✔ Nativo no JavaScript
* ✔ Suporte a Promises
* ✔ Não requer instalação de pacotes

**Desvantagens**

* ✖ Não trata erros automaticamente
* ✖ Sintaxe um pouco verbosa
* ✖ Precisa de mais código para lidar com tempo limite e cancelamento

### Consumo de API com Axios (Mais robusto)

O Axios é uma biblioteca popular que simplifica chamadas HTTP:

**Instalação**

```sh
npm install axios
```

**Uso do Axios para Buscar Usuários**

```tsx
import axios from "axios";
import { useEffect, useState } from "react";

function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Erro:", error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Carregando...</p>;

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

**Vantagens do Axios**

* ✔ Sintaxe mais curta e legível
* ✔ Tratamento de erros automático
* ✔ Suporte a cancelamento de requisições
* ✔ Melhor compatibilidade com JSON

**Desvantagens**

* ✖ Requer instalação de pacote externo

### Otimizando com React Query

O React Query melhora a performance ao evitar chamadas desnecessárias à API e manter os dados sempre atualizados.

**Instalação**

```sh
npm install @tanstack/react-query
```

**Uso de useQuery para Buscar Dados**

```tsx
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchUsers = async () => {
  const { data } = await axios.get("https://jsonplaceholder.typicode.com/users");
  return data;
};

function UsersList() {
  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: 1000 * 60 * 5, // Cache por 5 min
  });

  if (isLoading) return <p>Carregando...</p>;

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

**Uso de useMutation para Criar Usuários**

```tsx
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const createUser = async (name) => {
  return axios.post("https://jsonplaceholder.typicode.com/users", { name });
};

function AddUser() {
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

**Comparação de Abordagens**

| Método | Vantagens | Desvantagens |
| ------ | --------- | ------------ |
| Fetch API | Nativo, sem dependências | Precisa de mais código para manipular erros |
| Axios | Código mais limpo, suporte a timeout e interceptores | Precisa de instalação |
| React Query | Cache automático, sincronização, evita requisições desnecessárias | Requer curva de aprendizado |

**Conclusão**

A manipulação de dados e consumo de APIs são partes essenciais do React.

* Para chamadas simples, o Fetch API é suficiente.
* Para requisições mais limpas e robustas, use Axios.
* Para gestão avançada de cache e revalidação automática, React Query é a melhor escolha.

Cada abordagem tem seu uso ideal, dependendo da complexidade do seu projeto.

### useEffect para Chamadas Assíncronas no React

O useEffect é um dos hooks mais importantes no React, pois permite a execução de efeitos colaterais em componentes funcionais, incluindo chamadas assíncronas para APIs. No entanto, lidar com assíncronismo dentro do useEffect exige alguns cuidados para evitar comportamentos inesperados, como vazamentos de memória, renderizações duplicadas e efeitos concorrentes.

#### Revisão do useEffect

O useEffect executa código após a renderização do componente e pode ser configurado para rodar:

* Sempre que o componente renderiza (sem dependências).
* Apenas na montagem ([] como dependência).
* Quando uma dependência específica muda ([variável]).

> Importante: O React não permite que a função passada para useEffect seja async, pois useEffect espera uma função síncrona e o retorno de um Promise poderia causar comportamento imprevisível.

#### Chamadas Assíncronas no useEffect (Maneira Correta)

A forma correta de chamar funções assíncronas dentro do useEffect é criar uma função interna assíncrona e chamá-la dentro do efeito:

```tsx
import { useEffect, useState } from "react";

function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // Executa apenas na montagem

  if (loading) return <p>Carregando...</p>;

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

**Vantagens dessa abordagem:**

* A função assíncrona (fetchUsers) é chamada dentro do useEffect, sem tornar o efeito assíncrono.
* Trata erros, evitando que o aplicativo quebre.
* Usa um finally para atualizar o estado loading, garantindo melhor UX.

#### Evitando Vazamentos de Memória

Quando uma requisição demora e o usuário navega para outra página antes de sua conclusão, o componente pode ser desmontado antes de receber a resposta. Isso pode causar o erro:

> "Can't perform a React state update on an unmounted component."

Para evitar isso, podemos usar um abort controller para cancelar a requisição se o componente for desmontado:

```tsx
import { useEffect, useState } from "react";

function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchUsers = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users", { signal });
        if (!response.ok) throw new Error("Erro ao buscar dados");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Erro ao buscar usuários:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();

    return () => {
      controller.abort(); // Cancela a requisição se o componente for desmontado
    };
  }, []);

  if (loading) return <p>Carregando...</p>;

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

**Benefícios do AbortController:**

* Evita vazamento de memória cancelando a requisição ao desmontar o componente.
* Garante que estados não sejam atualizados indevidamente.

#### Chamadas Assíncronas com Dependências

Podemos fazer chamadas assíncronas sempre que um estado ou uma propriedade mudar.

```tsx
import { useEffect, useState } from "react";

function UserDetail({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const fetchUser = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]); // Chama a API sempre que userId mudar

  if (loading) return <p>Carregando usuário...</p>;
  if (!user) return <p>Nenhum usuário encontrado.</p>;

  return <p>Nome: {user.name}</p>;
}
```

**Benefícios:**

* Executa a busca apenas quando userId mudar, otimizando performance.
* Evita requisições desnecessárias.

#### Evitando Problemas no React 18 (Strict Mode e Renderizações Duplicadas)

No React 18, durante o desenvolvimento, o Strict Mode monta e desmonta componentes duas vezes para detectar bugs. Isso pode causar requisições duplicadas.

```tsx
useEffect(() => {
  fetch("https://jsonplaceholder.typicode.com/users") // 🚨 Chamado duas vezes no modo estrito
    .then((res) => res.json())
    .then((data) => console.log(data));
}, [])
```

* **Solução: useRef para evitar chamadas repetidas**

```tsx
import { useEffect, useRef, useState } from "react";

function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetched = useRef(false); // 🔑 Controla se já buscamos os dados

  useEffect(() => {
    if (fetched.current) return; // 🔑 Evita execução duplicada
    fetched.current = true;

    const fetchUsers = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Carregando...</p>;

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

Agora a requisição ocorre apenas uma vez, mesmo no Strict Mode.

O useEffect é essencial para chamadas assíncronas no React, mas exige boas práticas:

* Sempre use uma função assíncrona dentro do useEffect, não diretamente.
* Evite vazamentos de memória com AbortController em requisições longas.
* Use dependências corretamente para evitar chamadas desnecessárias.
* No React 18, evite chamadas duplicadas com useRef.

⚡ Quer que eu aprofunde mais algum ponto? 🚀

### Cache e SWR no React

A otimização do cache de dados no React é essencial para melhorar a performance e a experiência do usuário. Ferramentas como SWR (Stale-While-Revalidate) ajudam a tornar o processo eficiente, reduzindo chamadas de API desnecessárias e garantindo que os dados exibidos estejam sempre atualizados.

#### O que é Cache e por que ele é importante?

Cache é um armazenamento temporário de dados que evita requisições repetidas à API, melhorando:

* 🚀 Performance (dados carregam mais rápido).
* 💾 Menor consumo de rede (evita requisições redundantes).
* 🎯 Experiência do usuário (dados disponíveis mesmo offline).

No React, o cache pode ser gerenciado manualmente com o useState, mas soluções como SWR fazem isso de forma automática.

#### SWR - Stale While Revalidate

SWR (Stale-While-Revalidate) é uma estratégia de cache que mostra dados armazenados (stale) primeiro e depois busca novos dados na API, garantindo que os dados sempre estejam atualizados sem bloquear a interface.

📌 Principais recursos do SWR:

* ✅ Cache automático de requisições
* ✅ Revalidação automática ao refocar a aba ou reconectar à internet
* ✅ Suporte a polling (atualização periódica)
* ✅ Evita chamadas duplicadas à API

```sh
npm install swr
# ou
yarn add swr
```

#### Como Usar SWR no React?

```tsx
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function UsersList() {
  const { data, error, isLoading } = useSWR('https://jsonplaceholder.typicode.com/users', fetcher);

  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar os dados.</p>;

  return (
    <ul>
      {data.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

**Como funciona?**

1. O useSWR faz a requisição para a API e armazena a resposta no cache.
2. Sempre que o componente for renderizado, primeiro exibe os dados em cache.
3. Em segundo plano, refaz a requisição para obter dados atualizados.
4. Se a aba for refocada, os dados são atualizados automaticamente.

#### Revalidação Automática

O SWR revalida os dados automaticamente sempre que:

* O usuário voltar para a aba.
* A conexão de rede for restaurada.
* O tempo de cache expirar (configurável).

**Exemplo: Revalidar a cada 10 segundos**

```tsx
const { data, error } = useSWR('https://jsonplaceholder.typicode.com/users', fetcher, {
  refreshInterval: 10000 // Revalida a cada 10 segundos
});
```

#### Controle Avançado de Cache

Podemos pré-popular o cache ou forçar uma revalidação manualmente.

```tsx
import { mutate } from 'swr';

mutate('https://jsonplaceholder.typicode.com/users', [
  { id: 1, name: "Usuário Exemplo" }
], false);
```

*  Isso adiciona um valor ao cache antes mesmo de chamar a API.

#### SWR vs React Query - Quando Usar Cada Um?

| Característica | SWR | React Query |
| -------------- | --- | ----------- |
| 🔄 Revalidação automática | Sim (ao refocar aba, reconectar) | Sim (mais personalizável) |
| 📦 Cache | Sim | Sim (com mais controle) |
| 🚀 Fácil de usar | Muito simples | Levemente mais complexo |
| 🔁 Polling (atualização periódica) | Sim | Sim |
| 🛠 Mutations (POST, PUT, DELETE) | Suporte básico | Suporte avançado |

**Quando usar SWR?**

* Projetos simples ou leves, onde o foco é fetching de dados.
* Apps onde não há muitas mutações (POST, PUT, DELETE).

**Quando usar React Query?**

* Projetos complexos, onde há mutações de dados.
* Aplicações que exigem controle avançado do cache.