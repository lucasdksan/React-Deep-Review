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