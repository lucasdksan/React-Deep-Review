## ESLint, Prettier e editorConfig

Ferramentas como ESLint, Prettier e EditorConfig são essenciais para garantir qualidade de código, legibilidade e consistência em projetos React — especialmente em equipes com múltiplos desenvolvedores.

### ESLint – Linter de código JavaScript/TypeScript

ESLint analisa seu código em tempo real e aponta erros de sintaxe, más práticas e violações de estilo.

```bash
npm install eslint --save-dev

npx eslint --init
```

> Ou configure manualmente:

```jsonc
// .eslintrc.json
{
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  "plugins": ["react", "@typescript-eslint", "react-hooks"],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2022,
    "sourceType": "module",
    "jsx": true
  },
  "rules": {
    "react/react-in-jsx-scope": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  }
}
```

### Prettier – Formatador de código automático

Prettier cuida da formatação do código (espaços, vírgulas, indentação, etc), deixando ele padronizado e legível.

```bash
npm install --save-dev prettier eslint-config-prettier eslint-plugin-prettier
```

> eslint-config-prettier desativa regras do ESLint que conflitam com Prettier
> eslint-plugin-prettier integra Prettier ao ESLint

**Exemplo de configuração:**

```jsonc
// .prettierrc
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "tabWidth": 2,
  "printWidth": 100
}
```

### EditorConfig – Padroniza editores de texto

EditorConfig ajuda a manter regras básicas de formatação entre diferentes IDEs (como VSCode, WebStorm, etc).

```ini
# .editorconfig
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
```

### eslint.config.js

Quando você cria um projeto React com Vite e seleciona ESLint na configuração inicial, ele gera um arquivo chamado eslint.config.js ao invés do tradicional .eslintrc. Esse novo formato faz parte do ESLint Flat Config, uma forma mais moderna, baseada em módulos, que está substituindo o modelo antigo baseado em JSON/YAML.

* **Exemplo típico do eslint.config.js gerado com Vite + React**

```ts
import js from '@eslint/js';
import globals from 'globals';

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      // Suas regras personalizadas aqui
    },
  },
];
```

### Boas práticas com essas ferramentas

* **Rodar ESLint com scripts**

```json
"scripts": {
  "lint": "eslint . --ext .js,.jsx,.ts,.tsx",
  "lint:fix": "eslint . --ext .js,.jsx,.ts,.tsx --fix"
}
```

* **Ativar o formatador ao salvar arquivos no VSCode**

```jsonc
// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

* **Integração com projetos React**

    * Use @typescript-eslint em projetos TypeScript.
    * Em projetos com Vite ou Next.js, integre ESLint no build/lint do CI.
    * Combine ESLint + Prettier no mesmo fluxo com lint-staged e husky para PRs limpos.

