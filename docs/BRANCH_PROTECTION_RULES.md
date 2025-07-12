# 🔒 Branch Protection Rules Configuration

## 📋 GitFlow Strategy

Este projeto segue a estratégia **GitFlow** com as seguintes regras:

### 🌿 Estrutura de Branches

```
main ←── dev ←── feature/fix branches
```

### 📏 Regras de Branch Protection

#### 🛡️ Branch `main`
- ✅ **Require pull request reviews** (1 reviewer)
- ✅ **Dismiss stale PR approvals when new commits are pushed**
- ✅ **Require status checks to pass before merging**
- ✅ **Require branches to be up to date before merging**
- ✅ **Require signed commits**
- ✅ **Include administrators** (enforce for admins too)
- ✅ **Restrict pushes that create files** (prevent direct pushes)
- ❌ **Allow force pushes** (disabled)
- ❌ **Allow deletions** (disabled)

**Mergeable Branches**: Apenas `dev`

#### 🔧 Branch `dev`
- ✅ **Require pull request reviews** (1 reviewer)
- ✅ **Require status checks to pass before merging**
- ✅ **Require branches to be up to date before merging**
- ❌ **Allow force pushes** (disabled)
- ❌ **Allow deletions** (disabled)

**Mergeable Branches**: Feature/fix branches (`feat/*`, `fix/*`, `docs/*`, etc.)

### 🔄 Workflow Rules

#### 1. **Criação de Feature Branches**
- Todas as branches de feature/fix **DEVEM** ser criadas a partir de `dev`
- Nomenclatura: `feat/123-description`, `fix/456-bug-name`, `docs/789-update`

#### 2. **Pull Requests**
- Feature branches → `dev` (automático via script)
- `dev` → `main` (manual, após acúmulo de features)

#### 3. **Merge Strategy**
- **Squash and merge** para feature branches → dev
- **Merge commit** para dev → main (preserva histórico)

### 🤖 Automação

#### Script de Implementação
```bash
# Cria branch a partir de dev e abre PR automaticamente
pnpm implement <issue-url>
```

#### Comportamento Automático:
1. 🔄 Checkout e pull da branch `dev`
2. 🌿 Cria nova branch a partir de `dev`
3. ⚙️ Implementa as mudanças (via AI)
4. 🧪 Executa testes completos
5. 📝 Gera commits categorizados
6. 🔄 Cria PR automaticamente: `feature-branch → dev`

### 📋 Status Checks Obrigatórios

#### Para `main`:
- ✅ **Build Success** (`ci/build`)
- ✅ **All Tests Pass** (`ci/test`)
- ✅ **Lint Check** (`ci/lint`)
- ✅ **Type Check** (`ci/types`)
- ✅ **Security Scan** (`ci/security`)

#### Para `dev`:
- ✅ **Build Success** (`ci/build`)
- ✅ **All Tests Pass** (`ci/test`)
- ✅ **Lint Check** (`ci/lint`)

### 🚨 Enforcement

#### Restrições Rígidas:
- 🚫 **Nenhum push direto** para `main` ou `dev`
- 🚫 **Force push desabilitado** em branches protegidas
- 🚫 **Deleção desabilitada** para branches principais
- ✅ **Administradores seguem as mesmas regras**

#### Exceções:
- 🆘 **Hotfixes críticos**: Podem usar branch `hotfix/*` com aprovação emergencial
- 🔧 **Releases**: Branch `release/*` pode ser mesclada em `main` após `dev`

### 📊 Configuração via GitHub API

Para aplicar essas regras automaticamente:

```bash
# Configurar via script (requer GITHUB_TOKEN com admin)
pnpm setup:branch-protection
```

### 🔍 Monitoramento

#### Métricas de Qualidade:
- 📈 **Coverage mínimo**: 80%
- 🐛 **Zero vulnerabilidades críticas**
- ⚡ **Build time** < 5 minutos
- 🧪 **Test time** < 2 minutos

---

## 📚 Referências

- [GitHub Branch Protection](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/defining-the-mergeability-of-pull-requests/about-protected-branches)
- [GitFlow Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)
- [Conventional Commits](https://www.conventionalcommits.org/)
