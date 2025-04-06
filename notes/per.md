## Performance e Otimização

No React, re-renderizações desnecessárias podem impactar a performance da aplicação, especialmente quando lidamos com cálculos complexos ou funções que são recriadas constantemente.

### Otimização de Renderizações no React: useMemo e useCallback

Para resolver isso, utilizamos dois hooks poderosos:

* useMemo: Memoriza valores computados.
* useCallback: Memoriza funções.

Ambos ajudam a evitar a recriação desnecessária de dados e funções quando um componente renderiza.

#### useMemo – Memoriza Valores Computados

O useMemo evita recalcular valores em cada renderização, armazenando o resultado na memória até que suas dependências mudem.

**📌 Quando usar useMemo?**

* Quando temos cálculos pesados que não precisam ser refeitos em cada render.
* Quando lidamos com filtragens, mapeamentos e reduções em grandes listas.
* Quando passamos valores computados como props para componentes filhos.

**Exemplo de useMemo**

```tsx
import { useMemo, useState } from "react";

const HeavyCalculationComponent = () => {
  const [count, setCount] = useState(0);
  const [input, setInput] = useState("");

  // Simulando um cálculo pesado
  const expensiveCalculation = (num: number) => {
    console.log("Realizando cálculo pesado...");
    for (let i = 0; i < 1000000000; i++) {} // Simula um processo lento
    return num * 2;
  };

  // `useMemo` evita que a função seja recalculada se `count` não mudar
  const doubledValue = useMemo(() => expensiveCalculation(count), [count]);

  return (
    <div>
      <h2>Valor dobrado: {doubledValue}</h2>
      <button onClick={() => setCount(count + 1)}>Incrementar</button>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </div>
  );
};

export default HeavyCalculationComponent;
```

**Explicação:**

* expensiveCalculation(count) só será recalculado quando count mudar.
* O input pode ser alterado sem afetar o cálculo (sem useMemo, toda mudança no input acionaria a função desnecessariamente).

#### useCallback – Memoriza Funções

O useCallback evita que funções sejam recriadas toda vez que um componente renderiza, garantindo que a mesma referência da função seja mantida.

**Quando usar useCallback?**

* Quando passamos funções como props para componentes filhos (evita re-renderizações desnecessárias).
* Quando usamos funções em useEffect e queremos evitar dependências desnecessárias.
* Quando funções são recriadas frequentemente sem necessidade.

**Exemplo de useCallback**

```tsx
import { useState, useCallback } from "react";

const Button = ({ onClick }: { onClick: () => void }) => {
  console.log("Renderizou o botão");
  return <button onClick={onClick}>Clique aqui</button>;
};

const ParentComponent = () => {
  const [count, setCount] = useState(0);
  const [otherState, setOtherState] = useState("");

  // Função é memorizada e não será recriada a cada render
  const handleClick = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  return (
    <div>
      <h2>Contador: {count}</h2>
      <Button onClick={handleClick} />

      <input
        type="text"
        value={otherState}
        onChange={(e) => setOtherState(e.target.value)}
      />
    </div>
  );
};

export default ParentComponent;
```

**Explicação:**

* Sem useCallback, o componente <Button> seria re-renderizado toda vez que o estado otherState mudasse.
* Com useCallback, a função handleClick mantém a mesma referência, evitando que <Button> re-renderize desnecessariamente.

#### Comparação entre useMemo e useCallback

| Hook | O que memoriza? | Quando usar? |
| ---- | --------------- | ------------ |
| useMemo | Memoriza valores computados | Para cálculos pesados ou dados processados que não devem ser recalculados em toda renderização. |
| useCallback | Memoriza funções | Para evitar a recriação de funções quando elas são passadas como props ou usadas dentro de um useEffect. |

#### Conclusão – Quando Usar?

* Se o problema for cálculo pesado → useMemo 🚀
* Se o problema for recriação de funções → useCallback 🔄
* Se não houver impacto de performance perceptível → NÃO use (evite otimizações prematuras).

### Virtualização de Listas no React: react-window e react-virtual

Quando trabalhamos com listas grandes no React, renderizar todos os itens de uma vez pode ser um problema para a performance. Para resolver isso, usamos virtualização de listas, que renderiza apenas os itens visíveis na tela, economizando memória e processamento.

#### O que é Virtualização de Listas?

A virtualização de listas é uma técnica que renderiza apenas os elementos visíveis na viewport, em vez de carregar toda a lista na memória. Isso melhora a performance e reduz o consumo de RAM e CPU.

* Imagine uma lista com 10.000 itens. Sem virtualização, o React renderizaria todos esses elementos no DOM, o que pode travar o navegador.
* Com virtualização, apenas os itens visíveis (por exemplo, 20 por vez) são renderizados, e os demais são carregados dinamicamente conforme o usuário rola a página.

**Benefícios da Virtualização:**

* Menos uso de memória.
* Melhor performance e menor tempo de renderização.
* Menos re-renderizações desnecessárias.
* Suporte a listas dinâmicas e carregamento infinito.

#### Principais bibliotecas para Virtualização no React

As duas principais bibliotecas para virtualização no React são:

* react-window – Simples e eficiente para listas e grids.
* react-virtual – Mais flexível e otimizado para casos avançados.

#### Usando react-window para virtualizar uma lista

**Instalação:**

```bash
npm install react-window
```

**Exemplo de Virtualização com FixedSizeList**

O FixedSizeList cria uma lista onde cada item tem altura fixa, facilitando o cálculo da rolagem.

```tsx
import { FixedSizeList as List } from "react-window";

const items = Array.from({ length: 10000 }, (_, index) => `Item ${index + 1}`);

const Row = ({ index, style }) => (
  <div style={style}> {items[index]} </div>
);

const VirtualizedList = () => {
  return (
    <List
      height={400} // Altura da lista visível
      width={300} // Largura da lista
      itemCount={items.length} // Número total de itens
      itemSize={35} // Altura fixa de cada item
    >
      {Row}
    </List>
  );
};

export default VirtualizedList;
```

#### Como funciona?

* Apenas os itens visíveis na tela são renderizados.
* Quando o usuário rola a página, novos itens são adicionados dinamicamente.
* Isso evita sobrecarregar o DOM com 10.000 elementos de uma vez.

#### VariableSizeList: Lista com altura variável

Se os itens tiverem alturas diferentes, usamos VariableSizeList.

```tsx
import { VariableSizeList as List } from "react-window";

const items = Array.from({ length: 10000 }, (_, index) => `Item ${index + 1}`);

const getItemSize = (index) => (index % 2 === 0 ? 50 : 30); // Alternando tamanhos

const Row = ({ index, style }) => (
  <div style={style}>{items[index]}</div>
);

const VirtualizedList = () => {
  return (
    <List
      height={400}
      width={300}
      itemCount={items.length}
      itemSize={getItemSize} // Função que retorna altura de cada item
    >
      {Row}
    </List>
  );
};

export default VirtualizedList;
```
>  Ideal para listas dinâmicas, onde os itens têm alturas variadas.

#### Usando react-virtual para virtualizar uma lista

O react-virtual é ainda mais flexível e otimizado.

**Instalação**

```bash
npm install @tanstack/react-virtual
```

**Exemplo de Virtualização com react-virtual**

```tsx
import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";

const items = Array.from({ length: 10000 }, (_, index) => `Item ${index + 1}`);

const VirtualizedList = () => {
  const parentRef = useRef(null);

  const rowVirtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35, // Altura estimada dos itens
  });

  return (
    <div
      ref={parentRef}
      style={{ height: "400px", width: "300px", overflow: "auto" }}
    >
      <div style={{ height: rowVirtualizer.getTotalSize() }}>
        {rowVirtualizer.getVirtualItems().map((virtualRow) => (
          <div
            key={virtualRow.index}
            style={{
              position: "absolute",
              top: virtualRow.start,
              width: "100%",
              height: 35,
              background: virtualRow.index % 2 ? "#ddd" : "#eee",
            }}
          >
            {items[virtualRow.index]}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VirtualizedList;
```

> react-virtual é mais flexível e oferece suporte nativo a rolagem infinita e colunas dinâmicas.

#### Comparação entre react-window e react-virtual

| Característica | react-window | react-virtual |
| -------------- | ------------ | ------------- |
| Facilidade de uso | ✅ Fácil | 🔹 Um pouco mais complexo |
| Performanc | 🚀 Rápido | 🚀 Mais otimizado |
| Tamanho do bundle | 🔹 ~4KB | 🔹 ~5KB |
| Suporte a listas grandes | ✅ Sim | ✅ Sim |
| Suporte a colunas dinâmicas | ❌ Não | ✅ Sim |

> Se precisar de algo simples, use react-window. Para maior flexibilidade, use react-virtual.

#### Conclusão

* Virtualização de listas melhora performance e evita renderizações desnecessárias.
* react-window é mais simples e rápido para casos comuns.
* react-virtual oferece mais flexibilidade e suporte avançado.

### Lazy Loading e Suspense no React

O Lazy Loading e o React Suspense são técnicas essenciais para melhorar a performance das aplicações React, reduzindo o tempo de carregamento inicial e otimizando a experiência do usuário.

#### O que é Lazy Loading?

O Lazy Loading (ou carregamento sob demanda) é uma técnica que atrasa o carregamento de componentes ou recursos até que sejam necessários.

**Benefícios do Lazy Loading:**

* Reduz o tamanho do bundle inicial (menos código carregado na primeira renderização).
* Melhora o tempo de carregamento da página (menor tempo de TTFB e FCP).
* Usa menos memória e CPU, pois os componentes são carregados sob demanda.

#### Implementando Lazy Loading com React.lazy

O React fornece a função React.lazy para carregar componentes de forma assíncrona.

**Exemplo básico com React.lazy e Suspense**

```tsx
import React, { lazy, Suspense } from "react";

// 🔹 Importação dinâmica do componente
const LazyComponent = lazy(() => import("./LazyComponent"));

const App = () => {
  return (
    <div>
      <h1>Minha Aplicação</h1>
      
      {/* 🔹 Suspense define um fallback enquanto o componente carrega */}
      <Suspense fallback={<div>Carregando...</div>}>
        <LazyComponent />
      </Suspense>
    </div>
  );
};

export default App;
```

**Como funciona?**

* O React.lazy carrega o LazyComponent apenas quando necessário.
* O Suspense exibe um fallback (ex.: "Carregando...") até que o componente seja carregado.

#### Lazy Loading com React Router

Quando usamos React Router, podemos carregar páginas sob demanda.

**Exemplo com React.lazy e React Router**

```tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

const Home = lazy(() => import("./Home"));
const About = lazy(() => import("./About"));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<div>Carregando página...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
```

> Melhora a performance, pois cada página só é carregada quando o usuário acessa a rota correspondente.

#### Lazy Loading de imagens e recursos

Podemos carregar imagens e scripts externos apenas quando forem necessários.

**Exemplo de Lazy Loading de imagens**

```tsx
import { useState } from "react";

const LazyImage = ({ src, alt }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div>
      {!loaded && <p>Carregando imagem...</p>}
      <img src={src} alt={alt} onLoad={() => setLoaded(true)} style={{ display: loaded ? "block" : "none" }} />
    </div>
  );
};

export default LazyImage;
```

> A imagem só aparece quando estiver totalmente carregada, evitando layout shifts.

#### Suspense para Dados Assíncronos

O Suspense pode ser usado não apenas para componentes, mas também para requisições assíncronas, usando bibliotecas como React Query e SWR.

**Exemplo com React Suspense e fetch**

```tsx
import { Suspense } from "react";

const fetchData = async () => {
  return new Promise((resolve) =>
    setTimeout(() => resolve("Dados carregados!"), 2000)
  );
};

const DataComponent = async () => {
  const data = await fetchData();
  return <div>{data}</div>;
};

const App = () => {
  return (
    <Suspense fallback={<p>Carregando dados...</p>}>
      <DataComponent />
    </Suspense>
  );
};

export default App;
```

> O Suspense mantém a interface responsiva enquanto os dados são carregados.

#### Comparação: Lazy Loading vs Code Splitting vs SSR

| Técnica | Quando Usar? | Benefícios |
| ------- | ------------ | ---------- |
| Lazy Loading | Componentes raramente usados | Reduz o bundle inicial |
| Code Splitting | Divisão de código entre páginas | Carregamento progressivo |
| Server-Side Rendering (SSR) | SEO e performance | Renderização rápida |

#### Conclusão

* React.lazy e Suspense melhoram a performance ao carregar apenas o necessário.
* Funciona bem com React Router, imagens e requisições assíncronas.
* Combinar Lazy Loading com Code Splitting e SSR resulta em uma aplicação mais otimizada.

### Evitar re-renders com react.memo e useRef

#### O que são re-renderizações desnecessárias?

No React, qualquer mudança de estado ou props em um componente pode forçar sua re-renderização — mesmo que o conteúdo renderizado continue exatamente o mesmo. Isso pode gerar perda de performance, especialmente em componentes grandes ou listas.

#### React.memo – Memorização de Componentes

**O que é?**

React.memo é um HOC (Higher Order Component) que previne re-renderizações se as props não mudarem.

```tsx
const MeuComponente = React.memo((props) => {
  console.log('Renderizou!');
  return <div>{props.valor}</div>;
});
```

**Como funciona?**

* O React compara as props anteriores com as novas usando shallow comparison.
* Se forem iguais, o React pula a renderização do componente.

#### React.memo com comparação customizada

Se as props forem objetos, arrays ou funções, o shallow compare pode falhar. Podemos passar uma função de comparação customizada:

```tsx
const MeuComp = React.memo(Componente, (prevProps, nextProps) => {
  return deepEqual(prevProps.obj, nextProps.obj);
});
```

**Quando não usar React.memo?**

* Quando o componente sempre recebe props diferentes.
* Quando a comparação das props é custosa e mais pesada que o re-render.
* Em componentes pequenos e baratos de renderizar.

#### useRef – Persistência de valores sem re-render

useRef armazena valores mutáveis que não causam re-renderizações ao serem modificados.

```tsx
const contador = useRef(0);
```

#### Comparativo useRef vs useState

|  | useStaet | useRef |
|- | -------- | ------ |
| Causa re-render | Sim | Não |
| Persiste entre renders | Sim | Sim |
| Ideal para | Dados da UI | Referências, timers, etc. |

### Debounce e Throttle para otimizar eventos

Alguns eventos no browser disparam centenas de vezes por segundo. Executar uma função a cada disparo pode:

* Sobrecarregar o processamento (CPU)
* Causar travamentos na interface
* Aumentar o consumo de recursos (rede, memória)
* Prejudicar a experiência do usuário (UX)

#### DEBOUNCE

Debounce adia a execução de uma função até que um tempo de espera tenha passado sem novos eventos.

> Ideal quando queremos reagir somente após o usuário parar de interagir.

Pesquisa em tempo real – só faz a requisição quando o usuário parou de digitar.

```tsx
import { useEffect, useState } from 'react';

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounced(value);
    }, delay);

    return () => clearTimeout(timer); // limpa se o valor mudar antes do tempo
  }, [value, delay]);

  return debounced;
}

// Uso em um componente:
const SearchInput = () => {
  const [input, setInput] = useState('');
  const debouncedSearch = useDebounce(input, 500);

  useEffect(() => {
    if (debouncedSearch) {
      // chama API
      console.log('🔍 Buscando:', debouncedSearch);
    }
  }, [debouncedSearch]);

  return <input onChange={e => setInput(e.target.value)} />;
};
```

#### THROTTLE

Throttle garante que uma função seja chamada no máximo uma vez a cada X milissegundos, mesmo que o evento ocorra várias vezes.

> Ideal para manter uma taxa constante de execução em eventos contínuos (scroll, resize, mouse move).

```tsx
import { useEffect } from 'react';
import throttle from 'lodash.throttle';

const ScrollTracker = () => {
  useEffect(() => {
    const handleScroll = throttle(() => {
      console.log('🌀 Scroll detectado:', window.scrollY);
    }, 500);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return <div style={{ height: '3000px' }}>Role a página</div>;
};
```

#### Diferenças entre Debounce e Throttle

| Característica | Debounce | Throttle |
| -------------- | -------- | -------- |
| Execução |  Após o silêncio do evento |  Periodicamente durante o evento | 
| Ideal para | Input, pesquisa, resize | Scroll, mousemove, resize contínuo | 
| Cancelamento fácil | Sim | Mais complexo | 

**Bibliotecas recomendadas**

* lodash.debounce
* lodash.throttle
* use-debounce – hook React para debounce
* ahooks – coleção de hooks com debounce/throttle prontos

> Sempre use useCallback quando for aplicar debounce/throttle em handlers para evitar recriações desnecessárias da função:

```tsx
const handleResize = useCallback(throttle(() => {
  console.log('Redimensionado');
}, 300), []);
```