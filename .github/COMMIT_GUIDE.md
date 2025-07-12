# 🤖 Automated Implementation Workflow

## 🔧 New Implementation Flow

### ⚡ Quick Start
```bash
# Implement an issue automatically
pnpm implement <github-issue-url>

# Example
pnpm implement https://github.com/owner/repo/issues/42
```

## � How It Works

### 1. **Issue Processing**
- Fetches issue details from GitHub API
- Analyzes labels and content
- Generates appropriate branch name following pattern: `<type>/<number>-<topic>`

### 2. **Automated Implementation**
- Creates feature branch automatically
- Consults local documentation in `.github/docs/`
- Implements solution using AI agent
- Follows existing code patterns and conventions

### 3. **Quality Assurance**
- Runs comprehensive test suite:
  - `pnpm lint` - Code style validation
  - `pnpm check-types` - TypeScript type checking
  - `pnpm test` - Unit tests
  - `pnpm test:e2e` - End-to-end tests
  - `pnpm build` - Production build verification
  - `pnpm dev` - Development server validation
- Automatically fixes errors found
- Retries until all tests pass

### 4. **Categorized Commits**
- Analyzes changed files by type
- Creates separate commits for each category:
  - `feat(branch-name): title (#issue-number)` - Implementation files
  - `test(branch-name): title (#issue-number)` - Test files
  - `docs(branch-name): title (#issue-number)` - Documentation
  - `style(branch-name): title (#issue-number)` - Styling changes
  - `fix(branch-name): title (#issue-number)` - Bug fixes
  - `chore(branch-name): title (#issue-number)` - Configuration

### 5. **PR Template Preparation**
- Pre-fills pull request template with implementation details
- Includes what was implemented
- Notes any deviations from original issue
- Lists additional improvements made

## 📋 Branch Naming Convention

### Pattern: `<type>/<issue-number>-<topic>`

**Examples:**
- `feat/31-auth-api` - Feature implementation
- `fix/42-login-error` - Bug fix
- `docs/15-api-guide` - Documentation update
- `test/28-user-auth` - Test improvements

**Types:**
- `feat` - New features
- `fix` - Bug fixes
- `docs` - Documentation
- `test` - Testing
- `style` - Styling/formatting
- `refactor` - Code refactoring
- `chore` - Maintenance tasks

## 📚 Documentation Integration

### Automatic Consultation
The implementation agent automatically references:
- `.github/docs/nest/` - Backend patterns and practices
- `.github/docs/next/` - Frontend development guides
- `.github/docs/turbo/` - Monorepo configuration
- `apps/*/docs/` - Project-specific documentation
- `packages/*/docs/` - Package-specific guides

### Local Documentation Structure
```
.github/docs/           # Global documentation
├── nest/              # NestJS backend guides
├── next/              # Next.js frontend guides
└── turbo/             # Turbo monorepo docs

apps/*/docs/           # App-specific documentation
packages/*/docs/       # Package-specific documentation
```

## � Commit Message Format

### Template: `<type>(<branch>): <title> (#<issue-number>)`

**Examples:**
```bash
feat(auth-api): implement user authentication (#31)
test(auth-api): add authentication test suite (#31)
docs(auth-api): update API documentation (#31)
fix(login-error): resolve session timeout issue (#42)
```

## ⚙️ Configuration

### Environment Variables
```env
# Required for GitHub API access
GITHUB_TOKEN=your_github_token
GITHUB_REPOSITORY=owner/repo-name
```

### Prerequisites
- Node.js 18+
- pnpm workspace
- GitHub repository with issues
- Local documentation structure

## 🎯 Issue Templates

### Updated Templates
- **Titles in English** for consistency
- **Branch naming suggestions** included
- **Documentation references** for implementation guidance
- **Acceptance criteria** clearly defined

### Required Labels
- `enhancement` - Feature requests
- `bug` - Bug reports
- `documentation` - Documentation updates
- `frontend` / `backend` / `api` - Component classification

## 🧪 Quality Gates

### Automated Checks
- [ ] All linting rules pass
- [ ] TypeScript compilation successful
- [ ] Unit tests pass with 100% success rate
- [ ] E2E tests complete successfully
- [ ] Production build generates without errors
- [ ] Development server starts correctly

### Error Resolution
- Automatic error detection and fixing
- AI-powered solution suggestions
- Retry mechanism for transient failures
- Manual intervention prompts for critical issues

## 🚀 Benefits

### For Developers
- ✅ Consistent commit history
- ✅ Automated quality assurance
- ✅ Reduced manual testing overhead
- ✅ Pre-filled PR templates
- ✅ Documentation-driven development

### For Project
- ✅ Standardized implementation workflow
- ✅ Improved code quality
- ✅ Better traceability (issue → commits → PR)
- ✅ Reduced human error
- ✅ Faster iteration cycles

## 🔧 Manual Override

### Traditional Workflow (if needed)
```bash
# Create branch manually
git checkout -b feat/31-auth-api

# Make changes
# ...

# Commit manually (follows same format)
git commit -m "feat(auth-api): implement user authentication (#31)"
```

## � Support

### Troubleshooting
1. **API Rate Limits**: Ensure GITHUB_TOKEN has sufficient permissions
2. **Branch Conflicts**: Tool will detect and prompt for resolution
3. **Test Failures**: Review error logs and consult documentation
4. **Documentation**: Check `.github/docs/` for guidance

### Getting Help
- Create issue with `workflow` label for process problems
- Use `documentation` label for guide improvements
- Include error logs and environment details

---

## 🏷️ Legacy Information

### Previous Commit Tools (Removed)
- ~~Commitizen~~ - Replaced by automated workflow
- ~~Interactive commit prompts~~ - Now handled by implementation script
- ~~Manual commit message formatting~~ - Auto-generated from issue details

### Migration Notes
- Remove `pnpm commit` from scripts
- Use `pnpm implement <issue-url>` instead
- Existing commit validation (commitlint) remains active
- PR templates updated with new format
- **docs**: Mudanças na documentação
- **style**: Formatação, ponto e vírgula, etc
- **refactor**: Refatoração de código
- **test**: Adição ou modificação de testes
- **chore**: Tarefas de manutenção

## 🤖 Automação GitHub Actions

### Commitlint Action
- Executa em todo push/PR
- Valida últimos 10 commits
- Falha se commits não seguirem padrão

### Release Action
- Executa apenas na branch `main`
- Atualiza versões automaticamente
- Cria commits de release

## 📁 Estrutura de Arquivos

```
├── .changeset/
│   └── config.json              # Configuração do changeset
├── .github/
│   └── workflows/
│       ├── commitlint.yml       # CI para validação de commits
│       └── release.yml          # CI para releases automáticos
├── commitlint.config.js         # Configuração do commitlint
└── package.json                 # Scripts e dependências
```

## 🔗 Fluxo Recomendado

1. **Desenvolvimento**: Faça suas alterações
2. **Changeset**: `pnpm changeset` (se mudança significativa)
3. **Commit**: `pnpm commit` (commit interativo)
4. **Push**: `git push`
5. **Release**: Automático na branch main
