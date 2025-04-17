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
    * [Gerenciamento global de estado com redux (RTK)](/notes/gerenciamento-state.md#gerenciamento-global-de-estado-com-redux-rtk)
        * [Por que usar Redux Toolkit?](/notes/gerenciamento-state.md#por-que-usar-redux-toolkit)
        * [1 Criando um Slice (Gerenciamento de Estado Simplificado)](/notes/gerenciamento-state.md#1-criando-um-slice-gerenciamento-de-estado-simplificado)
        * [2 Configurando a Store do Redux](/notes/gerenciamento-state.md#2-configurando-a-store-do-redux)
        * [3 Configurando o Redux no React](/notes/gerenciamento-state.md#3-configurando-o-redux-no-react)
        * [4 Usando Redux dentro de Componentes](/notes/gerenciamento-state.md#4-usando-redux-dentro-de-componentes)
        * [Gerenciamento de Estados Assíncronos com createAsyncThunk](/notes/gerenciamento-state.md#gerenciamento-de-estados-assíncronos-com-createasyncthunk)
            * [1 Criando um Slice com createAsyncThunk](/notes/gerenciamento-state.md#1-criando-um-slice-com-createasyncthunk)
            * [2 Adicionando o Novo Slice na Store](/notes/gerenciamento-state.md#2-adicionando-o-novo-slice-na-store)
            * [3 Consumindo Dados Assíncronos no Componente](/notes/gerenciamento-state.md#3-consumindo-dados-assíncronos-no-componente)
        * [Redux Toolkit vs. Context API](/notes/gerenciamento-state.md#redux-toolkit-vs-context-api)
    * [React Query (Para cache de dados e revalidação automático)](/notes/gerenciamento-state.md#react-query-para-cache-de-dados-e-revalidação-automático)
        * [Principais Recursos](/notes/gerenciamento-state.md#principais-recursos)
        * [Configurando o QueryClientProvider](/notes/gerenciamento-state.md#configurando-o-queryclientprovider)
        * [useQuery: Buscando Dados e Cache Automático](/notes/gerenciamento-state.md#usequery-buscando-dados-e-cache-automático)
        * [Revalidação Automática (Refetching)](/notes/gerenciamento-state.md#revalidação-automática-refetching)
        * [useMutation: Enviando Dados para a API](/notes/gerenciamento-state.md#usemutation-enviando-dados-para-a-api)
        * [Comparação: React Query vs useEffect + useState](/notes/gerenciamento-state.md#comparação-react-query-vs-useeffect--usestate)
        * [Quando Usar React Query?](/notes/gerenciamento-state.md#quando-usar-react-query)
* [Manipulação de Dados e API´s](/notes/apis.md#manipulação-de-dados-e-apis)
    * [Métodos HTTP e Manipulação de Dados](/notes/apis.md#métodos-http-e-manipulação-de-dados)
    * [Consumo de API com Fetch API (Nativo do JavaScript)](/notes/apis.md#consumo-de-api-com-fetch-api-nativo-do-javascript)
    * [Consumo de API com Axios (Mais robusto)](/notes/apis.md#consumo-de-api-com-axios-mais-robusto)
    * [Otimizando com React Query](/notes/apis.md#otimizando-com-react-query)
    * [useEffect para Chamadas Assíncronas no React](/notes/apis.md#useeffect-para-chamadas-assíncronas-no-react)
        * [Revisão do useEffect](/notes/apis.md#revisão-do-useeffect)
        * [Chamadas Assíncronas no useEffect (Maneira Correta)](/notes/apis.md#chamadas-assíncronas-no-useeffect-maneira-correta)
        * [Evitando Vazamentos de Memória](/notes/apis.md#evitando-vazamentos-de-memória)
        * [Chamadas Assíncronas com Dependências](/notes/apis.md#chamadas-assíncronas-com-dependências)
        * [Evitando Problemas no React 18 (Strict Mode e Renderizações Duplicadas)](/notes/apis.md#evitando-problemas-no-react-18-strict-mode-e-renderizações-duplicadas)
    * [Cache e SWR no React](/notes/apis.md#cache-e-swr-no-react)
        * [O que é Cache e por que ele é importante?](/notes/apis.md#o-que-é-cache-e-por-que-ele-é-importante)
        * [SWR - Stale While Revalidate](/notes/apis.md#swr---stale-while-revalidate)
        * [Como Usar SWR no React?](/notes/apis.md#como-usar-swr-no-react)
        * [Revalidação Automática](/notes/apis.md#revalidação-automática)
        * [Controle Avançado de Cache](/notes/apis.md#controle-avançado-de-cache)
        * [SWR vs React Query - Quando Usar Cada Um?](/notes/apis.md#swr-vs-react-query---quando-usar-cada-um)
    * [Comunicação em Tempo Real no React com WebSockets e SSE](/notes/apis.md#comunicação-em-tempo-real-no-react-com-websockets-e-sse)
        * [WebSockets - Conexão Bidirecional](/notes/apis.md#websockets---conexão-bidirecional)
        * [Server-Sent Events (SSE) - Comunicação Unidirecional](/notes/apis.md#server-sent-events-sse---comunicação-unidirecional)
        * [Comparação entre WebSockets e SSE](/notes/apis.md#comparação-entre-websockets-e-sse)
        * [Conclusão - Quando Usar Cada Um?](/notes/apis.md#conclusão---quando-usar-cada-um)
* [Performance e Otimização](/notes/per.md#performance-e-otimização)
    * [Otimização de Renderizações no React: useMemo e useCallback](/notes/per.md#otimização-de-renderizações-no-react-usememo-e-usecallback)
        * [useMemo – Memoriza Valores Computados](/notes/per.md#usememo--memoriza-valores-computados)
        * [useCallback – Memoriza Funções](/notes/per.md#usecallback--memoriza-funções)
        * [Comparação entre useMemo e useCallback](/notes/per.md#comparação-entre-usememo-e-usecallback)
        * [Conclusão – Quando Usar?](/notes/per.md#conclusão--quando-usar)
    * [Virtualização de Listas no React: react-window e react-virtual](/notes/per.md#virtualização-de-listas-no-react-react-window-e-react-virtual)
        * [O que é Virtualização de Listas?](/notes/per.md#o-que-é-virtualização-de-listas)
        * [Principais bibliotecas para Virtualização no React](/notes/per.md#principais-bibliotecas-para-virtualização-no-react)
        * [Usando react-window para virtualizar uma lista](/notes/per.md#usando-react-window-para-virtualizar-uma-lista)
        * [Como funciona?](/notes/per.md#como-funciona)
        * [VariableSizeList: Lista com altura variável](/notes/per.md#variablesizelist-lista-com-altura-variável)
        * [Usando react-virtual para virtualizar uma lista](/notes/per.md#usando-react-virtual-para-virtualizar-uma-lista)
        * [Comparação entre react-window e react-virtual](/notes/per.md#comparação-entre-react-window-e-react-virtual)
        * [Conclusão](/notes/per.md#conclusão)
    * [Lazy Loading e Suspense no React](/notes/per.md#lazy-loading-e-suspense-no-react)
        * [O que é Lazy Loading?](/notes/per.md#o-que-é-lazy-loading)
        * [Implementando Lazy Loading com React.lazy](/notes/per.md#implementando-lazy-loading-com-reactlazy)
        * [Lazy Loading com React Router](/notes/per.md#lazy-loading-com-react-router)
        * [Lazy Loading de imagens e recursos](/notes/per.md#lazy-loading-de-imagens-e-recursos)
        * [Suspense para Dados Assíncronos](/notes/per.md#suspense-para-dados-assíncronos)
        * [Comparação: Lazy Loading vs Code Splitting vs SSR](/notes/per.md#comparação-lazy-loading-vs-code-splitting-vs-ssr)
        * [Conclusão](/notes/per.md#conclusão-1)
    * [Evitar re-renders com react.memo e useRef](/notes/per.md#evitar-re-renders-com-reactmemo-e-useref)
        * [O que são re-renderizações desnecessárias?](/notes/per.md#o-que-são-re-renderizações-desnecessárias)
        * [React.memo – Memorização de Componentes](/notes/per.md#reactmemo--memorização-de-componentes)
        * [React.memo com comparação customizada](/notes/per.md#reactmemo-com-comparação-customizada)
        * [useRef – Persistência de valores sem re-render](/notes/per.md#useref--persistência-de-valores-sem-re-render)
        * [Comparativo useRef vs useState](/notes/per.md#comparativo-useref-vs-usestate)
    * [Debounce e Throttle para otimizar eventos](/notes/per.md#debounce-e-throttle-para-otimizar-eventos)
        * [DEBOUNCE](/notes/per.md#debounce)
        * [THROTTLE](/notes/per.md#throttle)
        * [Diferenças entre Debounce e Throttle](/notes/per.md#diferenças-entre-debounce-e-throttle)
* [UI/UX e Estilização](/notes/ui.md#uiux-e-estilização)
    * [Acessibilidade (ARIA, foco em teclado)](/notes/ui.md#acessibilidade-aria-foco-em-teclado)
        * [O que é acessibilidade (a11y)?](/notes/ui.md#o-que-é-acessibilidade-a11y)
        * [O que são atributos ARIA?](/notes/ui.md#o-que-são-atributos-aria)
            * [Exemplos práticos com React](/notes/ui.md#exemplos-práticos-com-react)
            * [Elemento visual escondido mas acessível (aria-label)](/notes/ui.md#elemento-visual-escondido-mas-acessível-aria-label)
            * [Campos de formulário com aria-describedby](/notes/ui.md#campos-de-formulário-com-aria-describedby)
            * [role – Declarando a função do elemento](/notes/ui.md#role--declarando-a-função-do-elemento)
            * [aria-live – Feedback dinâmico](/notes/ui.md#aria-live--feedback-dinâmico)
            * [Boas práticas gerais no React](/notes/ui.md#boas-práticas-gerais-no-react)
* [Componentização e Arquitetura](/notes/comp.md#componentização-e-arquitetura)
    * [Padrões de componentes reutilizáveis](/notes/comp.md#padrões-de-componentes-reutilizáveis)
        * [Princípios fundamentais](/notes/comp.md#princípios-fundamentais)
        * [Estratégias Avançadas](/notes/comp.md#estratégias-avançadas)
    * [Composição vs. Herança](/notes/comp.md#composição-vs-herança)
        * [Por que o React prefere composição?](/notes/comp.md#por-que-o-react-prefere-composição)
        * [Padrões de Composição no React](/notes/comp.md#padrões-de-composição-no-react)
            * [O que é um Higher-Order Component (HOC)?](/notes/comp.md#o-que-é-um-higher-order-component-hoc)   
    * [Hooks customizados para lógica reutilizável](/notes/comp.md#hooks-customizados-para-lógica-reutilizável)
        * [Por que criar Hooks customizados?](/notes/comp.md#por-que-criar-hooks-customizados)
        * [Estrutura de um Hook Customizado](/notes/comp.md#estrutura-de-um-hook-customizado)
        * [Hook Customizado mais complexo: useFetch](/notes/comp.md#hook-customizado-mais-complexo-usefetch)
        * [Regras dos Hooks Customizados](/notes/comp.md#regras-dos-hooks-customizados)
        * [Hooks Customizados + Tipagem Genérica (TypeScript)](/notes/comp.md#hooks-customizados--tipagem-genérica-typescript)
        * [Pensamento estratégico](/notes/comp.md#pensamento-estratégico)
    * [Monorepos (Turborepo, Nx)](/notes/comp.md#monorepos-turborepo-nx)
        * [Benefícios de Monorepos](/notes/comp.md#benefícios-de-monorepos)
        * [Principais desafios de Monorepos](/notes/comp.md#principais-desafios-de-monorepos)
        * [Ferramentas para Monorepo Moderno](/notes/comp.md#ferramentas-para-monorepo-moderno)
            * [Turborepo](/notes/comp.md#turborepo)
            * [Nx](/notes/comp.md#nx)
        * [Estrutura típica de um Monorepo moderno (Turbo ou Nx)](/notes/comp.md#estrutura-típica-de-um-monorepo-moderno-turbo-ou-nx)
        * [Configurando um Monorepo na prática](/notes/comp.md#configurando-um-monorepo-na-prática)
        * [Decisões estratégicas](/notes/comp.md#decisões-estratégicas)
        * [Considerações Avançadas](/notes/comp.md#considerações-avançadas)
* [Testes em React](/notes/testes.md#testes-em-react)
    * [Principais ferramentas de teste em React](/notes/testes.md#principais-ferramentas-de-teste-em-react)
    * [Setup típico de testes em projetos React](/notes/testes.md#setup-típico-de-testes-em-projetos-react)
    * [Exemplo de Teste Unitário com React Testing Library](/notes/testes.md#exemplo-de-teste-unitário-com-react-testing-library)
    * [Princípios do RTL (Testing Library)](/notes/testes.md#princípios-do-rtl-testing-library)
    * [Testando Hooks Customizados](/notes/testes.md#testando-hooks-customizados)
    * [Testes End-to-End (E2E)](/notes/testes.md#testes-end-to-end-e2e)
    * [Boas práticas para testes em React](/notes/testes.md#boas-práticas-para-testes-em-react)
* [Referências](#referências)

## Introdução

O React.js é uma biblioteca JavaScript de código aberto desenvolvida pelo Facebook para a criação de interfaces de usuário (UI). Lançado em 2013, o React revolucionou o desenvolvimento web ao introduzir um modelo declarativo baseado em componentes reutilizáveis, tornando a construção de aplicações mais eficiente e organizada.

Uma das principais características do React é o Virtual DOM, que otimiza a atualização da interface ao renderizar apenas as partes do DOM que foram modificadas, melhorando a performance da aplicação. Além disso, o React adota um fluxo de dados unidirecional, o que facilita o gerenciamento do estado da aplicação, principalmente com ferramentas como o React Hooks e bibliotecas como Redux ou Zustand.

## Referências

* [Chat GPT](https://chatgpt.com/)
* [React.Dev](https://pt-br.react.dev/learn/managing-state)
* [Treina Web](https://www.treinaweb.com.br/blog/o-que-e-jsx)
* [Tanstack](https://tanstack.com/query/latest/docs/framework/react/overview)