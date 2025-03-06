# Revisão React

Revisão de forma mais profunda sobre React

![Banner ReactJs](/github/reactJS.png)

# Sumário

* [Introdução](#introdução)
* [Fundamentos do React](/notes/fundamentos.md#fundamentos-do-react)
    * [JSX](/notes/fundamentos.md#jsx)
        * [Como o JSX Funciona por Baixo dos Panos?](/notes/fundamentos.md#como-o-jsx-funciona-por-baixo-dos-panos)
        * [Características do JSX](/notes/fundamentos.md#características-do-jsx)
    * [Componentes funcionais e class componentes](/notes/fundamentos.md#componentes-funcionais-e-class-componentes)
* [Gerenciamento de Estados](/notes/gerenciamento-state.md#gerenciamento-de-estado)
    * [O que é Estado no React?](/notes/gerenciamento-state.md#o-que-é-estado-no-react)
    * [Gerenciamento de Estado Local](/notes/gerenciamento-state.md#gerenciamento-de-estado-local)
    * [Entendendo useState, useEffect e o Ciclo de Vida no React](/notes/gerenciamento-state.md#entendendo-usestate-useeffect-e-o-ciclo-de-vida-no-react)
        * [1. ``useState``: Gerenciamento de Estado](/notes/gerenciamento-state.md#1-usestate-gerenciamento-de-estado)
        * [2. ``useEffect``: Lidando com Efeitos Colaterais](/notes/gerenciamento-state.md#2-useeffect-lidando-com-efeitos-colaterais)
        * [Conclusão](/notes/gerenciamento-state.md#conclusão)
    * [Ciclo de Vida](/notes/gerenciamento-state.md#ciclo-de-vida)
        * [Fases do Ciclo de Vida no React](/notes/gerenciamento-state.md#fases-do-ciclo-de-vida-no-react)
        * [Fase de Montagem (Creation)](/notes/gerenciamento-state.md#fase-de-montagem-creation)
        * [Fase de Atualização (Update)](/notes/gerenciamento-state.md#fase-de-atualização-update)
        * [Fase de Desmontagem (Unmount)](/notes/gerenciamento-state.md#fase-de-desmontagem-unmount)
        * [Resumo do Ciclo de Vida](/notes/gerenciamento-state.md#resumo-do-ciclo-de-vida)
    * [useReducer para estados mais complexos](/notes/gerenciamento-state.md#usereducer-para-estados-mais-complexos)
        * [O que é useReducer?](/notes/gerenciamento-state.md#o-que-é-usereducer)
        * [Exemplo Simples: Contador com useReducer](/notes/gerenciamento-state.md#exemplo-simples-contador-com-usereducer)
        * [Quando Usar useReducer em Vez de useState?](/notes/gerenciamento-state.md#quando-usar-usereducer-em-vez-de-usestate)
        * [Gerenciando Estado Complexo](/notes/gerenciamento-state.md#gerenciando-estado-complexo)
        * [Exemplo Prático: Carrinho de Compras](/notes/gerenciamento-state.md#exemplo-prático-carrinho-de-compras)
    * [Context API (useContext)](/notes/gerenciamento-state.md#context-api-usecontext)
        * [Como o Context API Funciona?](/notes/gerenciamento-state.md#como-o-context-api-funciona)
        * [Exemplo Simples: Tema Claro/Escuro](/notes/gerenciamento-state.md#exemplo-simples-tema-claroescuro)
        * []()
* [Referências](#referências)

## Introdução

O React.js é uma biblioteca JavaScript de código aberto desenvolvida pelo Facebook para a criação de interfaces de usuário (UI). Lançado em 2013, o React revolucionou o desenvolvimento web ao introduzir um modelo declarativo baseado em componentes reutilizáveis, tornando a construção de aplicações mais eficiente e organizada.

Uma das principais características do React é o Virtual DOM, que otimiza a atualização da interface ao renderizar apenas as partes do DOM que foram modificadas, melhorando a performance da aplicação. Além disso, o React adota um fluxo de dados unidirecional, o que facilita o gerenciamento do estado da aplicação, principalmente com ferramentas como o React Hooks e bibliotecas como Redux ou Zustand.

## Referências

* [Chat GPT](https://chatgpt.com/)
* [Treina Web](https://www.treinaweb.com.br/blog/o-que-e-jsx)
* [React.Dev](https://pt-br.react.dev/learn/managing-state)