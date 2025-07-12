# 📚 Documentação do Projeto

## 📁 Localização da Documentação

Toda a documentação do projeto está centralizada na pasta [`docs/`](./docs/).

### 📋 Principais Documentos

#### Resumos de Implementação
- **[Workflow Automatizado](./docs/IMPLEMENTATION_SUMMARY.md)** - Resumo completo das mudanças no fluxo de implementação IA
- **[Changeset & NPM Publishing](./docs/CHANGESET_IMPLEMENTATION_SUMMARY.md)** - Sistema de versionamento e publicação automática

#### Guias Técnicos
- **[Turborepo Documentation](./docs/README.md)** - Configuração e melhores práticas do monorepo
- **[Package Publishing](./docs/package-publishing.md)** - Workflow de publicação NPM
- **[Implementation Workflow](./docs/IMPLEMENTATION_WORKFLOW.md)** - Detalhes do fluxo automatizado

#### Documentação por Projeto
- **[Web App](./apps/web/docs/)** - Next.js frontend documentation
- **[API](./apps/api/docs/)** - NestJS backend documentation
- **[UI Components](./packages/ui/docs/)** - Biblioteca de componentes interna
- **[Core Components](./packages/components-core/docs/)** - Biblioteca NPM `@arthurcorreadev/components-core`

## 🚀 Quick Start

### Para Desenvolvedores
1. **Leia**: [Implementation Summary](./docs/IMPLEMENTATION_SUMMARY.md)
2. **Configure**: Variáveis de ambiente conforme [.env.example](./.env.example)
3. **Use**: `pnpm implement <issue-url>` para implementar automaticamente

### Para Release Management
1. **Leia**: [Changeset Implementation](./docs/CHANGESET_IMPLEMENTATION_SUMMARY.md)
2. **Configure**: NPM_TOKEN e GITHUB_TOKEN
3. **Use**: `pnpm changeset:auto` para releases automáticos

## 📞 Suporte

Para dúvidas específicas, consulte a documentação correspondente:
- **Workflow Issues**: [Implementation Workflow](./docs/IMPLEMENTATION_WORKFLOW.md)
- **Publishing Issues**: [Package Publishing](./docs/package-publishing.md)
- **Monorepo Issues**: [Turborepo Docs](./docs/README.md)
