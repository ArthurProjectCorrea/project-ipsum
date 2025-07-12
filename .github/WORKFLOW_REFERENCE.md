# 🚀 Workflow Quick Reference

## 📋 Processo Básico

### 1. Início (Issue → Branch)
```bash
# 1. Criar/pegar Issue no GitHub
# 2. Checkout develop
git checkout develop && git pull origin develop

# 3. Criar branch baseada na issue
git checkout -b feat/42-implement-jwt-auth
git push -u origin feat/42-implement-jwt-auth
```

### 2. Desenvolvimento
```bash
# Fazer mudanças...
pnpm test && pnpm lint && pnpm build

# Commit usando Commitizen
git add .
pnpm commit  # feat(auth): implement JWT validation (#42)
git push origin feat/42-implement-jwt-auth
```

### 3. Pull Request
```bash
# 1. Criar PR no GitHub (feat/42-xxx → develop)
# 2. Usar template de PR
# 3. Referenciar Issue: "Closes #42"
# 4. Aguardar review e merge
```

### 4. Release (main branch)
```bash
# 1. PR develop → main
# 2. Após merge:
git checkout main && git pull
pnpm changeset version
git add . && pnpm commit
git push && pnpm release
```

## 🔧 Comandos Úteis

```bash
# Setup inicial
pnpm install

# Desenvolvimento
pnpm dev                    # Rodar todos os apps
pnpm --filter web dev      # Rodar só o frontend
pnpm --filter api dev      # Rodar só a API

# Qualidade
pnpm lint                  # Linting
pnpm test                  # Testes
pnpm build                 # Build
pnpm check-types          # TypeScript

# Versionamento
pnpm changeset            # Registrar mudança
pnpm changeset version   # Gerar versões
pnpm release             # Publicar pacotes

# Git helpers
pnpm commit              # Commit interativo
```

## 📝 Convenções

### Branches
- `feat/42-short-description` - Nova funcionalidade
- `fix/38-bug-description` - Correção de bug  
- `hotfix/45-urgent-fix` - Correção urgente
- `docs/23-update-readme` - Documentação
- `chore/12-update-deps` - Tarefas de manutenção

### Commits
- `feat(scope): description (#42)` - Nova funcionalidade
- `fix(scope): description (#38)` - Correção
- `docs: description (#23)` - Documentação
- `chore: description (#12)` - Manutenção

### Labels
- `enhancement` - Nova funcionalidade
- `bug` - Correção de bug
- `documentation` - Documentação
- `hotfix` - Correção urgente
- `breaking-change` - Mudança que quebra compatibilidade

## 🆘 Problemas Comuns

### Merge Conflicts
```bash
git checkout develop
git pull origin develop
git checkout sua-branch
git rebase develop
# Resolver conflitos
git add . && git rebase --continue
git push --force-with-lease
```

### Esqueceu de referenciar Issue
- Edite a descrição do PR
- Adicione "Closes #42"

### Changeset não funciona
```bash
pnpm changeset add  # Force adicionar
```

## 🎯 Fluxo Resumido

1. **Issue** → Criar/pegar tarefa
2. **Branch** → `feat/42-description`
3. **Code** → Desenvolver + testes
4. **Commit** → `pnpm commit` com referência à issue
5. **PR** → Review + merge para develop
6. **Release** → Develop → main com versionamento
