## Fundamentos do React

O React.js é baseado em conceitos fundamentais que tornam o desenvolvimento de interfaces mais eficiente, modular e performático. Aqui estão os principais fundamentos da biblioteca:

### JSX

JSX (JavaScript XML) é uma extensão de sintaxe para JavaScript usada no React que permite escrever HTML dentro do JavaScript. Embora pareça HTML, ele não é diretamente interpretado pelo navegador, pois precisa ser convertido em código JavaScript puro.

Exemplo básico de JSX:

```javascript
const elemento = <h1>Olá, mundo!</h1>;
```

Esse código é transformado em chamadas para React.createElement internamente.

#### Como o JSX Funciona por Baixo dos Panos?

O JSX não é um código que o navegador entende diretamente. Antes de ser executado, ele é convertido em JavaScript puro pelo Babel, um transpilador que traduz código moderno para versões compatíveis com navegadores.

Por exemplo, este JSX:

```javascript
const elemento = <h1>Olá, mundo!</h1>;
```

É convertido para:

```javascript
const elemento = React.createElement("h1", null, "Olá, mundo!");
```

E, quando renderizado no React:

```javascript
ReactDOM.createRoot(document.getElementById("root")).render(elemento);
```

Isso cria o seguinte DOM:

```html
<h1>Olá, mundo!</h1>
```

O React.createElement recebe três argumentos principais:

* Tipo do elemento ("h1" no exemplo acima).
* Propriedades (props) (null significa que não há atributos adicionais).
* Conteúdo do elemento ("Olá, mundo!").

#### Características do JSX

* **JSX Deve Retornar um Único Elemento Pai**

No React, um componente deve sempre retornar um único elemento pai. Caso contrário, ocorrerá um erro.

* **Expressões JavaScript dentro do JSX**

Podemos usar expressões JavaScript dentro do JSX com {}.

```javascript
const nome = "João";
const elemento = <h1>Olá, {nome}!</h1>;
```

* **Atributos em JSX**

Os atributos em JSX são baseados no JavaScript, então seguem a convenção camelCase, diferente do HTML.

* **Renderização Condicional**

Podemos renderizar elementos condicionalmente dentro do JSX.

* **Listas e Iteração no JSX**

Podemos renderizar listas dinâmicas com map(). Cada elemento da lista precisa de uma key única.

* **Eventos em JSX**

Os eventos em JSX funcionam de maneira semelhante ao JavaScript, mas usam camelCase.

### Componentes funcionais e class componentes

No React, os componentes são a base da construção da UI. Eles podem ser criados de duas formas principais: Componentes Funcionais e Componentes de Classe (Class Components).

#### Componentes Funcionais (Function Components)

Os componentes funcionais são funções JavaScript que retornam JSX. Eles são mais simples, modernos e amplamente utilizados, especialmente após a introdução dos React Hooks.

```jsx
function Saudacao({ nome }) {
  return <h1>Olá, {nome}!</h1>;
}
```

* Mais legível e conciso
* Usa Hooks para estado e efeitos colaterais
* Melhor desempenho em comparação com componentes de classe

#### Componentes de Classe (Class Components)

Os componentes de classe eram a principal forma de criar componentes dinâmicos antes da introdução dos Hooks no React 16.8. Eles são baseados em ES6 Classes e precisam estender React.Component.

```jsx
import { Component } from "react";

type ComponentClassProps = {
    title: string;
}

type ComponentClassStates = {
    count: number;
}

export class ComponentClass extends Component<ComponentClassProps, ComponentClassStates> {
    constructor(props: ComponentClassProps){
        super(props);
        this.state = {
            count: 0,
        };
    }

    incrementar() {
        this.setState((prevState) => ({
            count: prevState.count + 1
        }));
    }

    decrementar() {
        this.setState((prevState) => ({ count: prevState.count - 1 }));
    };
    
    render(){
        return(
            <div>
                <h2>{this.props.title || "Contador"}</h2>
                <p>Valor: {this.state.count}</p>
                <button onClick={()=> this.incrementar()}>+1</button>
                <button onClick={()=> this.decrementar()}>-1</button>
            </div>
        );
    }
}
```