## Bem-vindo ao Projeto!

Este README descreve o **novo fluxo de trabalho automatizado** para desenvolvimento neste projeto, utilizando pnpm, Git com estratégia de branching organizada, GitHub Issues para gerenciamento de tarefas, e um **sistema de implementação IA automatizado** que substitui o fluxo manual de commits.

> 🤖 **AI Development Assistant**: Este projeto inclui um assistente de desenvolvimento IA configurado para implementação automatizada. Consulte [.github/docs/IMPLEMENTATION_WORKFLOW.md](.github/docs/IMPLEMENTATION_WORKFLOW.md) para detalhes completos.

### Primeira Utilização do Projeto

Para configurar o projeto pela primeira vez, clone o repositório e instale as dependências utilizando pnpm:

```bash 
pnpm install
```

Após clonar e instalar as dependências, é uma boa prática reescrever o commit inicial do template para um commit que represente o início do *seu* projeto:

```bash
git commit --amend -m "chore(initial-setup): initialize project structure"
git push --force origin main
```

> 📋 **Quick Reference**: Para um resumo rápido do workflow, consulte [.github/WORKFLOW_REFERENCE.md](.github/WORKFLOW_REFERENCE.md)

### Rodando o Ambiente de Desenvolvimento

Para iniciar todos os ambientes de desenvolvimento definidos no projeto (geralmente frontend, backend, etc.), utilize o seguinte comando:

```bash
pnpm dev
```

Para rodar um ambiente de desenvolvimento específico:

```bash
# Para rodar apenas o app web
pnpm --filter web dev

# Para rodar apenas a API
pnpm --filter api dev

# Para construir todos os projetos
pnpm build

# Para executar todos os testes
pnpm test
```

## � **GitFlow Strategy Implementada**

### 🌿 Estrutura de Branches
```
main ←── dev ←── feature/fix branches
```

### 🛡️ Regras de Proteção Automática
- ✅ **main**: Apenas `dev` pode ser mesclada (revisão obrigatória)
- ✅ **dev**: Aceita feature branches (testes obrigatórios)
- 🚫 **Push direto**: Bloqueado em branches protegidas
- 🔧 **Setup**: `pnpm setup:branch-protection`

### ⚡ Setup Inicial (Uma vez apenas)
```bash
# Configure as regras de branch protection
pnpm setup:branch-protection
```

## �🚀 **NOVO FLUXO: Implementação Automatizada com GitFlow**

### ⚡ Implementação Rápida
```bash
# Implementar uma issue automaticamente
pnpm implement <github-issue-url>

# Exemplo
pnpm implement https://github.com/owner/repo/issues/42
```

### 🤖 Como Funciona (Fluxo GitFlow Automático)
1. **Análise da Issue**: Busca detalhes da issue no GitHub API
2. **Checkout para dev**: Garante que a branch base seja `dev`
3. **Pull da branch dev**: Atualiza com as últimas mudanças
4. **Criação de Branch**: Gera branch automaticamente a partir de `dev` seguindo padrão `<type>/<number>-<topic>`
5. **Implementação IA**: Agente IA implementa a solução consultando documentação local
6. **Testes Automatizados**: Executa suite completa de testes e corrige erros
7. **Commits Categorizados**: Gera commits separados por tipo (feat, test, docs, etc.)
8. **PR Automático**: Cria pull request automaticamente direcionando para `dev`
9. **Template PR**: Preenche template de pull request com validação GitFlow

### 📋 Formato de Commits Automatizados
```bash
feat(auth-api): implement user authentication (#31)
test(auth-api): add authentication test suite (#31)
docs(auth-api): update API documentation (#31)
```

### 🎯 Gerenciamento de Tarefas com GitHub Issues

Antes de usar o sistema automatizado, **sempre crie uma Issue** no GitHub. Isso garante:

- ✅ Rastreabilidade completa das tarefas
- ✅ Discussão centralizada sobre requisitos
- ✅ Documentação de contexto para a IA
- ✅ Vinculação entre commits, PRs e objetivos

#### 📝 Criando uma Nova Issue

1. **Acesse o repositório no GitHub** → aba "Issues"
2. **Clique em "New Issue"**
3. **Use templates atualizados** (Feature Request, Bug Report, etc.)
4. **Título em inglês**: `Implement JWT authentication` ou `Fix validation error in form`
5. **Descrição detalhada** incluindo:
   - Contexto e motivação
   - Critérios de aceitação
   - Tarefas específicas (checklist)
   - Screenshots/mockups se aplicável
6. **Branch sugerida**: O template sugere o nome da branch seguindo padrão
7. **Documentação relevante**: Template inclui referências à documentação
8. **Labels apropriadas**: `enhancement`, `bug`, `frontend`, `backend`, etc.

### 🌿 Estratégia GitFlow Automatizada

O sistema automatizado segue a estratégia **GitFlow** com nomenclatura padronizada:

**Estrutura de Branches**:
```
main (produção) ←── dev (desenvolvimento) ←── feature/fix branches
```

**Padrão de Nomenclatura**: `<type>/<issue-number>-<topic>`

**Exemplos**:
- `feat/31-auth-api` - Nova funcionalidade de autenticação
- `fix/42-login-error` - Correção de erro de login  
- `docs/15-api-guide` - Atualização de documentação
- `test/28-user-auth` - Melhorias em testes

**Tipos Suportados**:
- `feat` - Nova funcionalidade
- `fix` - Correção de bugs
- `docs` - Documentação
- `test` - Testes
- `style` - Estilização
- `refactor` - Refatoração
- `chore` - Manutenção

**Fluxo Automático**:
1. 🔄 Todas as feature branches são criadas a partir de `dev`
2. 🎯 PRs são automaticamente direcionados: `feature → dev`
3. 📦 Releases são feitos manualmente: `dev → main`

### 🚀 Fluxo de Desenvolvimento GitFlow — Passo a Passo

#### ⚡ Etapa 1: Implementação Automatizada com GitFlow

1. **Crie uma Issue** descrevendo a tarefa no GitHub
2. **Execute o comando de implementação**:
   ```bash
   pnpm implement https://github.com/owner/repo/issues/42
   ```
3. **O sistema executará automaticamente**:
   - ✅ Checkout para branch `dev`
   - ✅ Pull das últimas mudanças de `dev`
   - ✅ Criação de branch: `feat/42-jwt-authentication`
   - ✅ Implementação via IA consultando documentação
   - ✅ Execução completa da suite de testes
   - ✅ Correção automática de erros encontrados
   - ✅ Geração de commits categorizados
   - ✅ **Criação automática de PR**: `feat/42-jwt-authentication → dev`
   - ✅ Template de PR preenchido com validação GitFlow

#### 🔍 Etapa 2: Revisão Automática (GitFlow Enforced)

1. **PR já criado automaticamente** direcionando para `dev`:
   ```bash
   # Verificar o PR criado
   git log --oneline  # Ver commits gerados
   git diff dev       # Ver diferenças com dev
   ```

2. **GitHub Actions validará automaticamente**:
   - ✅ Nomenclatura da branch (`feat/42-jwt-authentication`)
   - ✅ Target correto do PR (`feat/42-* → dev`)
   - ✅ Quality gates (lint, tests, build, types)
   - ✅ Security scan (se aplicável)

3. **Revisão e aprovação**:
   - Template de PR já preenchido
   - Checklist GitFlow incluído
   - Validação automática de qualidade
   - Aprovação necessária antes do merge

#### 📦 Etapa 3: Release Process (dev → main)

**⚠️ Processo reservado para maintainers após acúmulo de features em `dev`**

1. **Verificar estabilidade da branch `dev`**:
   ```bash
   git checkout dev
   git pull origin dev
   
   # Testes finais antes do release
   pnpm test
   pnpm build
   ```

2. **Criar PR manual de release**: `dev → main`
   - Título: `🚀 Release: Merge dev to main`
   - Incluir changelog das features/fixes
   - Listar todas as Issues resolvidas

3. **Após aprovação e merge em `main`**:
   ```bash
   git checkout main
   git pull origin main
   
   # Executar automação de release
   pnpm changeset:auto
   ```

4. **Sistema executará automaticamente**:
   - Análise de commits desde último release
   - Geração de changesets baseado nos tipos
   - Atualização de versões (semantic versioning)
   - Publicação NPM de packages
   - Criação de GitHub release

#### 🔧 Etapa 2: Desenvolvimento

1. **Faça suas alterações** seguindo as especificações da Issue

2. **Teste localmente** antes de commitar:
   ```bash
   # Execute os testes
   pnpm test
   
   # Verifique o lint
   pnpm lint
   
   # Execute o build
   pnpm build
   ```

3. **Commits incrementais** usando Commitizen:
   ```bash
   git add .
   pnpm commit
   ```
   
   **⚠️ Importante**: 
#### 🚨 Hotfixes Urgentes (Exceção ao GitFlow)

Para correções críticas que precisam ir direto para produção:

1. **Crie Issue com label `hotfix`**

2. **Branch a partir da `main`**:
   ```bash
   git checkout main
   git pull origin main
   git checkout -b hotfix/45-security-patch
   ```

3. **Desenvolva a correção** e **teste extensivamente**

4. **PR direto para `main`** com revisão obrigatória

5. **Após merge, faça cherry-pick para `dev`**:
   ```bash
   git checkout dev
   git cherry-pick <commit-hash-do-hotfix>
   git push origin dev
   ```

#### � Validações Automáticas (GitHub Actions)

O sistema GitFlow inclui validações automáticas que rodam em cada PR:

**Branch Naming Validation**:
- ✅ Valida padrão: `feat/123-description`, `fix/456-bug-name`
- ❌ Rejeita: `feature-auth`, `bugfix`, `my-branch`

**PR Target Validation**:
- ✅ Feature branches → `dev`
- ✅ Apenas `dev` → `main`
- ❌ Feature branches → `main` (bloqueado)

**Quality Gates**:
- ✅ Lint check (`pnpm lint`)
- ✅ Type check (`pnpm check-types`)
- ✅ Build success (`pnpm build`)
- ✅ Test suite (`pnpm test`)
- ✅ Security scan (para main branch)

**Status obrigatórios para merge**:
- ✅ Todos os checks passando
- ✅ Pelo menos 1 aprovação
- ✅ Branch atualizada com target
## 📦 **Changeset & Publicação Automatizada**

### 🔄 Após Implementação e Merge
```bash
# Gerar changeset e publicar automaticamente
pnpm changeset:auto

# Gerar changeset interativo
pnpm changeset:release

# Teste sem publicar (dry run)
pnpm release:dry-run
```

### 🤖 Fluxo Completo de Release
1. **Análise de Mudanças**: Sistema analisa commits desde último release
2. **Geração de Changesets**: Cria changesets baseado nos tipos de commit
3. **Atualização de Versões**: Aplica semantic versioning automaticamente
4. **Testes de Qualidade**: Executa suite completa antes da publicação
5. **Publicação NPM**: Publica packages no registro `@arthurcorreadev`
6. **GitHub Release**: Cria release com changelog automático

### 📦 Packages Publicados
- **@arthurcorreadev/components-core**: Biblioteca de componentes React
- **@repo/ui**: Componentes internos do workspace

### 🔐 Configuração Necessária
```env
NPM_TOKEN=seu_token_npm
GITHUB_TOKEN=seu_token_github
NPM_SCOPE=@arthurcorreadev
```

### 🔥 Hotfixes Urgentes

Para correções críticas que precisam ir direto para produção:

1. **Crie Issue com label `hotfix`**

2. **Branch a partir da main**:
   ```bash
   git checkout main
   git pull origin main
   git checkout -b hotfix/45-security-patch
   ```

3. **Desenvolva a correção** e **teste extensivamente**

4. **PR direto para main** com revisão obrigatória

5. **Após merge, faça cherry-pick para develop**:
   ```bash
   git checkout develop
   git cherry-pick <commit-hash-do-hotfix>
   git push origin develop
   ```

### 🎯 Boas Práticas e Convenções

#### 📝 Commits
- **Sempre use `pnpm commit`** para commits interativos padronizados
- **Inclua número da Issue**: `feat(auth): implement JWT validation (#42)`
### 🎯 Boas Práticas GitFlow Automatizado

#### 📝 Issues (Ponto de Partida)
- **Sempre crie Issues** antes de implementar
- **Título em inglês**: `Implement JWT authentication`
- **Use templates** (Feature Request, Bug Report)
- **Labels apropriadas**: `enhancement`, `bug`, `frontend`, `backend`
- **Descrição detalhada** com critérios de aceitação

#### 🤖 Automação
- **Use `pnpm implement <issue-url>`** em vez de fluxo manual
- **Confie no sistema**: IA consulta documentação e implementa
- **Revise PRs automáticos** antes de aprovar
- **Deixe o sistema fazer**: commits, testes, PRs são automáticos

#### 🔀 Pull Requests (Automáticos)
- **PRs são criados automaticamente** direcionando `feature → dev`
- **Templates preenchidos automaticamente** com validação GitFlow
- **Sempre revisão obrigatória** antes do merge
- **GitHub Actions validam** qualidade e nomenclatura
- **Squash merge** para histórico limpo

#### 🛡️ Branch Protection (Enforced)
- **Nenhum push direto** em `main` ou `dev`
- **Nomenclatura obrigatória**: `feat/123-description`
- **Quality gates obrigatórios**: lint, tests, build, types
- **Revisão necessária** para todos os merges

#### 🧪 Qualidade Automática
```bash
# Executado automaticamente pelo sistema:
pnpm lint          # Code style validation
pnpm test          # Test suite execution  
pnpm build         # Build verification
pnpm check-types   # TypeScript validation
```

**Não é mais necessário rodar manualmente** - o sistema executa tudo automaticamente!

### 📦 Configurando e Publicando Pacotes no npm

Este guia descreve como configurar e publicar pacotes individuais do seu monorepo (ex: bibliotecas de UI ou utilitários) no registro npm.

#### 1. Configuração do `package.json` do Pacote

Para cada pacote que você deseja publicar (ex: `packages/ui`), configure o `package.json`:

```json
{
  "name": "@your-scope/ui",
  "version": "0.1.0",
  "private": false,
  "files": ["dist"],
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.js",
      "types": "./dist/index.d.ts"
    },
    "./styles.css": "./dist/styles.css"
  },
  "publishConfig": {
    "access": "public"
  },
  "scripts": {
    "build": "tsup"
  }
}
```

#### 2. Login e Publicação

```bash
# Login no npm (uma vez apenas)
npm login

# Fluxo de release
pnpm changeset              # Declarar mudanças
pnpm changeset version     # Atualizar versões
pnpm release              # Publicar pacotes
git push --follow-tags    # Enviar tags
```

#### 3. Verificação

Após publicação, verifique em `https://www.npmjs.com/package/@your-scope/package-name`

### 🔄 CI/CD e Automação

O projeto inclui GitHub Actions para:

- **Commitlint**: Valida mensagens de commit automaticamente
- **Release**: Automatiza versionamento e publicação na branch main
- **Tests**: Executa testes em PRs (configure conforme necessário)

Workflows localizados em `.github/workflows/`:
- `commitlint.yml`: Validação de commits
- `release.yml`: Automação de releases

### 🚨 Troubleshooting GitFlow Automatizado

#### ❌ Branch Protection Setup Falha
```bash
# Verifique se tem token com admin permissions
echo $GITHUB_TOKEN

# Execute setup novamente
pnpm setup:branch-protection
```

#### ❌ PR Criado com Target Errado
```bash
# O sistema sempre cria PRs: feature → dev
# Se aparecer main como target, cancele e recrie:
git checkout dev
git pull origin dev
pnpm implement <issue-url>
```

#### ❌ GitHub Actions Falhando
```bash
# Verifique quality gates localmente:
pnpm lint          # Deve passar
pnpm test          # Deve passar  
pnpm build         # Deve passar
pnpm check-types   # Deve passar

# Se algo falha, o sistema tenta corrigir automaticamente
```

#### ❌ Branch Naming Inválida
```bash
# Sistema usa padrão automático: feat/123-description
# Se precisar ajustar manualmente:
git branch -m feat/123-new-description
git push origin -u feat/123-new-description
```

#### ❌ Merge Conflicts em dev
```bash
git checkout dev
git pull origin dev
git checkout sua-branch
git rebase dev

# Resolver conflitos manualmente
git add .
git rebase --continue
git push --force-with-lease origin sua-branch
```

#### ❌ Implementação IA Falha
```bash
# Re-execute o comando:
pnpm implement <issue-url>

# Se persistir, verifique:
# 1. Issue existe e está acessível
# 2. GITHUB_TOKEN configurado
# 3. Documentação local disponível
```

---

## 🎯 **Resumo do Fluxo GitFlow Automatizado**

### ✅ **Setup Único (Uma vez apenas)**
```bash
pnpm setup:branch-protection  # Configura regras de proteção
```

### 🚀 **Desenvolvimento Diário**
```bash
pnpm implement <github-issue-url>  # Implementa automaticamente
```

### 📦 **Release (Maintainers)**
```bash
# Após acúmulo de features em dev:
# 1. Criar PR manual: dev → main
# 2. Após merge:
pnpm changeset:auto  # Release automático
```

### 🔒 **Enforcement Automático**
- ✅ Branches criadas a partir de `dev`
- ✅ PRs automáticos direcionados para `dev`
- ✅ Quality gates obrigatórios
- ✅ Nomenclatura de branches validada
- ✅ Nenhum push direto em branches protegidas

### 📚 **Documentação Completa**
- [GitFlow Implementation Summary](./docs/GITFLOW_IMPLEMENTATION_SUMMARY.md)
- [Branch Protection Rules](./docs/BRANCH_PROTECTION_RULES.md)
- [Implementation Workflow](./docs/IMPLEMENTATION_SUMMARY.md)

**O template agora força as melhores práticas automaticamente!** 🎯
