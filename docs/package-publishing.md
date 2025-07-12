# 📦 Package Publishing Workflow

## 🔄 Complete Publishing Flow

This document describes the automated package publishing workflow for `@arthurcorreadev` scoped packages.

## 🚀 Quick Start

### After Implementation (Merge to Main)
```bash
# Interactive changeset generation
pnpm changeset:release

# Automatic changeset generation (recommended)
pnpm changeset:auto

# Dry run (test without publishing)
pnpm release:dry-run
```

## 📋 Workflow Steps

### 1. **Implementation Phase**
- Create issue on GitHub
- Run `pnpm implement <issue-url>`
- Review and merge PR to main

### 2. **Release Phase** (After merge)
- Run changeset workflow
- System analyzes commits since last release
- Generates appropriate version bumps
- Updates changelogs
- Publishes to NPM
- Creates GitHub release

### 3. **Automatic Publication**
- GitHub Actions monitors main branch
- Detects changesets automatically
- Runs quality checks
- Publishes packages
- Creates releases

## 📦 Package Configuration

### Core Components Package
- **Name**: `@arthurcorreadev/components-core`
- **Description**: Core React components library
- **Registry**: NPM Public Registry
- **Scope**: `@arthurcorreadev`

### Package Structure
```
packages/components-core/
├── src/                    # Source code
├── docs/                   # Documentation
├── package.json           # Package configuration
├── tsconfig.json          # TypeScript config
├── tsup.config.ts         # Build configuration
└── README.md              # Package documentation
```

## 🔄 Version Management

### Semantic Versioning
- **Major** (x.0.0): Breaking changes
- **Minor** (0.x.0): New features
- **Patch** (0.0.x): Bug fixes

### Automatic Detection
```javascript
// Breaking changes
feat!: new authentication system
feat(api)!: change user schema

// Features  
feat(ui): add new button component
feat(core): implement modal system

// Fixes
fix(button): resolve hover state
fix(modal): fix z-index issue
```

### Changeset Generation
```bash
# Manual changeset creation
pnpm changeset

# Automatic based on commits
pnpm changeset:auto
```

## 🔐 Authentication Setup

### NPM Token
```bash
# Create NPM access token
npm login
npm token create --access public

# Add to environment
NPM_TOKEN=npm_xxxxxxxxxxxxxxxx
```

### GitHub Token
```bash
# Create GitHub personal access token with:
# - repo (full access)
# - write:packages
# - read:org (if organization)

GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxx
```

## 🏗️ Build Configuration

### Tsup Configuration
```typescript
// tsup.config.ts
export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom"],
  banner: {
    js: '"use client";',
  },
});
```

### Package.json Configuration
```json
{
  "name": "@arthurcorreadev/components-core",
  "private": false,
  "publishConfig": {
    "access": "public",
    "registry": "https://registry.npmjs.org/"
  },
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.js",
      "types": "./dist/index.d.ts"
    }
  }
}
```

## 🤖 GitHub Actions Integration

### Automatic Publishing
```yaml
# .github/workflows/release-publish.yml
on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  release:
    - Quality checks (lint, test, build)
    - Changeset detection
    - Version updates
    - NPM publishing
    - GitHub release creation
```

### Quality Gates
- ✅ ESLint validation
- ✅ TypeScript compilation
- ✅ Unit test execution
- ✅ Production build verification
- ✅ Package bundle analysis

## 📊 Release Process

### 1. Preparation
```bash
# Ensure clean working directory
git status

# Ensure on main branch
git checkout main
git pull origin main
```

### 2. Changeset Creation
```bash
# Interactive (recommended for complex changes)
pnpm changeset

# Automatic (for routine releases)
pnpm changeset:auto
```

### 3. Version Updates
```bash
# Update package versions
pnpm version-packages

# Review changes
git diff
```

### 4. Publishing
```bash
# Publish to NPM
pnpm release

# Or use automated workflow
pnpm changeset:release
```

## 📈 Monitoring & Analytics

### NPM Package Stats
- Download metrics
- Version adoption
- User feedback

### GitHub Release Notes
- Automatic changelog generation
- Breaking change highlights
- Migration guides

## 🔧 Troubleshooting

### Common Issues

#### NPM Authentication
```bash
# Check authentication
npm whoami

# Re-authenticate
npm login

# Verify token permissions
npm token list
```

#### Build Failures
```bash
# Clean and rebuild
pnpm clean
pnpm build

# Check dependencies
pnpm install --frozen-lockfile
```

#### Version Conflicts
```bash
# Reset changeset state
rm -rf .changeset/*.md

# Regenerate changesets
pnpm changeset
```

### Debug Commands
```bash
# Dry run publishing
pnpm changeset publish --dry-run

# Verbose changeset info
pnpm changeset status --verbose

# Check package contents
npm pack --dry-run
```

## 📚 Best Practices

### Changeset Guidelines
1. **Clear descriptions**: Explain what changed and why
2. **Breaking changes**: Always document breaking changes
3. **Migration guides**: Include upgrade instructions
4. **Security fixes**: Mark security-related changes

### Version Strategy
- **Patch**: Bug fixes, dependency updates
- **Minor**: New features, backwards compatible
- **Major**: Breaking changes, API changes

### Documentation
- Update README.md for new features
- Include code examples
- Document breaking changes
- Provide migration guides

## 🔗 External Resources

- [Changesets Documentation](https://github.com/changesets/changesets)
- [NPM Publishing Guide](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [Semantic Versioning](https://semver.org/)
- [GitHub Actions Marketplace](https://github.com/marketplace/actions/changeset-release-action)
