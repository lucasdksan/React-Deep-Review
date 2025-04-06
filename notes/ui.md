## UI/UX e Estilização

### Acessibilidade (ARIA, foco em teclado)

A acessibilidade (a11y) é um aspecto essencial no desenvolvimento de aplicações React (e web em geral), e o uso de atributos ARIA (Accessible Rich Internet Applications) é uma das principais ferramentas para garantir que pessoas com deficiências consigam interagir com os conteúdos da interface.

#### O que é acessibilidade (a11y)?

A acessibilidade na web significa criar experiências inclusivas que possam ser utilizadas por todos os usuários, incluindo pessoas com:

* Deficiência visual (ex: cegueira, baixa visão)
* Deficiência auditiva
* Dificuldades motoras
* Dificuldades cognitivas

#### O que são atributos ARIA?

ARIA é um conjunto de atributos HTML que ajudam tecnologias assistivas (como leitores de tela) a entender a semântica e o comportamento de componentes interativos que não são naturalmente acessíveis.

**Exemplos de atributos:**

* role
* aria-label
* aria-hidden
* aria-expanded
* aria-live
* aria-pressed
* aria-describedby
* aria-labelledby

##### Exemplos práticos com React

**Botão customizado com aria-pressed**

```tsx
const ToggleButton = () => {
  const [on, setOn] = useState(false);

  return (
    <button
      aria-pressed={on}
      onClick={() => setOn(prev => !prev)}
    >
      {on ? 'Ativado' : 'Desativado'}
    </button>
  );
};
```

> aria-pressed informa ao leitor de tela que o botão está em estado alternável.

##### Elemento visual escondido mas acessível (aria-label)

```tsx
<button aria-label="Fechar menu">
  <span aria-hidden="true">❌</span>
</button>
```

> O ícone ❌ é ignorado por tecnologias assistivas, mas o botão ainda é lido como “Fechar menu”.

##### Campos de formulário com aria-describedby

```tsx
<label htmlFor="email">Email</label>
<input id="email" type="email" aria-describedby="emailHelp" />
<small id="emailHelp">Nunca compartilhamos seu email com ninguém.</small>
```

> O leitor de tela lê o input e também o texto auxiliar.

##### role – Declarando a função do elemento

Use role para indicar a função semântica quando usar elementos genéricos (div, span) que não possuem semântica própria:

```tsx
<div role="alert">Erro ao salvar</div>
```

##### aria-live – Feedback dinâmico

Usado para atualizações de conteúdo que precisam ser lidas automaticamente:

```tsx
<div aria-live="polite">{mensagemDeErro}</div>
```

> “polite” = aguarda o leitor de tela terminar antes de ler a nova mensagem.

##### Boas práticas gerais no React

* Use elementos HTML semânticos (<button>, <nav>, <form>, <ul>) sempre que possível
* Sempre use label com htmlFor para inputs
* Use tabIndex={0} em elementos customizados para torná-los focáveis
* Cuidado com aria-hidden="true" — ele realmente oculta da acessibilidade
* Evite esconder conteúdos com display: none se quiser que leitores de tela leiam