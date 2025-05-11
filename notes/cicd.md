## Github Actions para CI/CD

### O que é CI/CD?

* CI (Continuous Integration): processo de integrar e validar automaticamente mudanças de código com testes e builds a cada commit/pull request.
* CD (Continuous Delivery/Deployment): processo de entregar essas mudanças para ambientes de produção ou homologação automaticamente após validação.

### Pipeline CI/CD

Uma pipeline em desenvolvimento de software é uma sequência automatizada de etapas que guia o código desde o desenvolvimento até a entrada e/ou implantação. Cada etapa da pipeline executa tarefas específicas, como compilação, testes e deploy

### Benefícios em projetos React

* Garante que cada PR/teste/deploy passe por uma pipeline controlada.
* Evita regressões com testes automatizados.
* Permite publicação automática em ambientes como Vercel, Netlify, Firebase, ou S3.
* Facilita a colaboração em equipe com feedback instantâneo.

### GitHub Actions: visão geral

GitHub Actions permite criar workflows automatizados através de arquivos .yml na pasta .github/workflows.

GitHub Actions é uma plataforma de integração contínua e entrega contínua (CI/CD) que permite automatizar a sua compilação, testar e pipeline de implantação. É possível criar fluxos de trabalho que criam e testam cada pull request no seu repositório, ou implantar pull requests mesclados em produção.


