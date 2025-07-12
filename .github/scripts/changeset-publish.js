#!/usr/bin/env node

/**
 * Automated Changeset and NPM Publishing Workflow
 * 
 * This script automates the complete package management workflow:
 * 1. Generates changesets based on implementation changes
 * 2. Updates package versions according to semver
 * 3. Generates comprehensive changelogs
 * 4. Publishes packages to NPM registry
 * 5. Creates GitHub releases with release notes
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const { Octokit } = require('@octokit/rest');

class ChangesetPublishManager {
  constructor() {
    this.workspaceRoot = process.cwd();
    this.octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN
    });
    this.repoOwner = process.env.GITHUB_REPOSITORY?.split('/')[0];
    this.repoName = process.env.GITHUB_REPOSITORY?.split('/')[1];
    this.npmToken = process.env.NPM_TOKEN;
    this.npmScope = process.env.NPM_SCOPE || '@arthurcorreadev';
  }

  /**
   * Main execution flow for release process
   */
  async run(options = {}) {
    try {
      console.log('🚀 Starting automated changeset and publish workflow...');
      
      await this.validateEnvironment();
      await this.analyzeChanges();
      await this.generateChangesets(options);
      await this.updateVersions();
      await this.runQualityChecks();
      await this.publishPackages();
      await this.createGitHubRelease();
      
      console.log('✅ Release workflow completed successfully!');
      
    } catch (error) {
      console.error('❌ Release workflow failed:', error.message);
      process.exit(1);
    }
  }

  /**
   * Validate required environment variables and tools
   */
  async validateEnvironment() {
    console.log('🔍 Validating environment...');
    
    const required = ['GITHUB_TOKEN', 'NPM_TOKEN', 'GITHUB_REPOSITORY'];
    const missing = required.filter(env => !process.env[env]);
    
    if (missing.length > 0) {
      throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }

    // Check if we're on main branch
    const currentBranch = execSync('git branch --show-current', { 
      encoding: 'utf8',
      cwd: this.workspaceRoot 
    }).trim();
    
    if (currentBranch !== 'main') {
      throw new Error(`Changeset workflow must run on main branch. Current: ${currentBranch}`);
    }

    // Ensure working directory is clean
    const gitStatus = execSync('git status --porcelain', { 
      encoding: 'utf8',
      cwd: this.workspaceRoot 
    }).trim();
    
    if (gitStatus) {
      throw new Error('Working directory is not clean. Please commit or stash changes.');
    }

    console.log('✅ Environment validation passed');
  }

  /**
   * Analyze recent changes to determine changeset needs
   */
  async analyzeChanges() {
    console.log('📊 Analyzing recent changes...');
    
    // Get commits since last changeset release
    const lastRelease = await this.getLastReleaseTag();
    const commitRange = lastRelease ? `${lastRelease}..HEAD` : 'HEAD~10..HEAD';
    
    const commits = execSync(`git log ${commitRange} --oneline`, {
      encoding: 'utf8',
      cwd: this.workspaceRoot
    }).trim();

    if (!commits) {
      console.log('ℹ️ No new commits found since last release');
      return;
    }

    console.log('📝 Recent commits:');
    console.log(commits);

    // Analyze commit types for changeset recommendations
    const commitLines = commits.split('\n');
    const changeTypes = this.analyzeCommitTypes(commitLines);
    
    console.log('📋 Detected change types:', changeTypes);
    this.detectedChanges = changeTypes;
  }

  /**
   * Analyze commit messages to determine change types
   */
  analyzeCommitTypes(commits) {
    const changes = {
      major: [],
      minor: [],
      patch: []
    };

    commits.forEach(commit => {
      const lowerCommit = commit.toLowerCase();
      
      // Breaking changes
      if (lowerCommit.includes('breaking') || lowerCommit.includes('!:')) {
        changes.major.push(commit);
      }
      // New features
      else if (lowerCommit.startsWith('feat(') || lowerCommit.includes('feat:')) {
        changes.minor.push(commit);
      }
      // Bug fixes, docs, tests, etc.
      else if (
        lowerCommit.startsWith('fix(') || 
        lowerCommit.startsWith('docs(') ||
        lowerCommit.startsWith('test(') ||
        lowerCommit.startsWith('style(') ||
        lowerCommit.startsWith('chore(')
      ) {
        changes.patch.push(commit);
      }
    });

    return changes;
  }

  /**
   * Generate changesets automatically or interactively
   */
  async generateChangesets(options = {}) {
    console.log('📝 Generating changesets...');

    if (options.auto && this.detectedChanges) {
      await this.generateAutoChangesets();
    } else {
      await this.generateInteractiveChangesets();
    }
  }

  /**
   * Generate changesets automatically based on commit analysis
   */
  async generateAutoChangesets() {
    console.log('🤖 Generating automatic changesets...');
    
    const packages = this.getWorkspacePackages();
    const changesets = [];

    // Generate changesets for each affected package
    for (const pkg of packages) {
      const affectedCommits = this.getPackageAffectedCommits(pkg);
      
      if (affectedCommits.length > 0) {
        const changeType = this.determineChangeType(affectedCommits);
        const changeset = this.createChangesetContent(pkg, changeType, affectedCommits);
        changesets.push({ package: pkg, type: changeType, content: changeset });
      }
    }

    // Write changeset files
    for (const changeset of changesets) {
      const filename = this.generateChangesetFilename(changeset.package, changeset.type);
      const filepath = path.join(this.workspaceRoot, '.changeset', filename);
      
      fs.writeFileSync(filepath, changeset.content);
      console.log(`✅ Created changeset: ${filename}`);
    }
  }

  /**
   * Generate changesets interactively
   */
  async generateInteractiveChangesets() {
    console.log('👤 Running interactive changeset generation...');
    
    try {
      execSync('pnpm changeset', { 
        stdio: 'inherit',
        cwd: this.workspaceRoot 
      });
    } catch (error) {
      if (error.status === 1) {
        console.log('ℹ️ No changesets generated (user choice or no changes)');
      } else {
        throw error;
      }
    }
  }

  /**
   * Update package versions based on changesets
   */
  async updateVersions() {
    console.log('📦 Updating package versions...');
    
    try {
      execSync('pnpm changeset version', { 
        stdio: 'inherit',
        cwd: this.workspaceRoot 
      });
      
      console.log('✅ Package versions updated');
    } catch (error) {
      throw new Error(`Failed to update versions: ${error.message}`);
    }
  }

  /**
   * Run comprehensive quality checks before publishing
   */
  async runQualityChecks() {
    console.log('🧪 Running quality checks...');
    
    const checks = [
      { cmd: 'pnpm lint', desc: 'Linting' },
      { cmd: 'pnpm check-types', desc: 'Type checking' },
      { cmd: 'pnpm test', desc: 'Unit tests' },
      { cmd: 'pnpm build', desc: 'Production build' }
    ];

    for (const check of checks) {
      console.log(`🔍 ${check.desc}...`);
      
      try {
        execSync(check.cmd, { 
          stdio: 'inherit',
          cwd: this.workspaceRoot,
          timeout: 300000 // 5 minutes
        });
        console.log(`✅ ${check.desc} passed`);
      } catch (error) {
        throw new Error(`${check.desc} failed: ${error.message}`);
      }
    }
  }

  /**
   * Publish packages to NPM registry
   */
  async publishPackages() {
    console.log('📤 Publishing packages to NPM...');
    
    // Set NPM authentication
    if (this.npmToken) {
      const npmrcPath = path.join(this.workspaceRoot, '.npmrc');
      const npmrcContent = `//registry.npmjs.org/:_authToken=${this.npmToken}\nregistry=https://registry.npmjs.org/\n`;
      fs.writeFileSync(npmrcPath, npmrcContent);
      console.log('🔑 NPM authentication configured');
    }

    try {
      execSync('pnpm changeset publish', { 
        stdio: 'inherit',
        cwd: this.workspaceRoot 
      });
      
      console.log('✅ Packages published successfully');
    } catch (error) {
      throw new Error(`Failed to publish packages: ${error.message}`);
    }
  }

  /**
   * Create GitHub release with generated changelog
   */
  async createGitHubRelease() {
    console.log('🏷️ Creating GitHub release...');
    
    try {
      // Get latest tag (version)
      const latestTag = execSync('git describe --tags --abbrev=0', {
        encoding: 'utf8',
        cwd: this.workspaceRoot
      }).trim();

      // Generate release notes from changelog
      const releaseNotes = await this.generateReleaseNotes(latestTag);

      // Create GitHub release
      await this.octokit.rest.repos.createRelease({
        owner: this.repoOwner,
        repo: this.repoName,
        tag_name: latestTag,
        name: `Release ${latestTag}`,
        body: releaseNotes,
        draft: false,
        prerelease: latestTag.includes('alpha') || latestTag.includes('beta')
      });

      console.log(`✅ GitHub release created: ${latestTag}`);
    } catch (error) {
      console.warn(`⚠️ Failed to create GitHub release: ${error.message}`);
    }
  }

  /**
   * Helper methods
   */
  
  async getLastReleaseTag() {
    try {
      return execSync('git describe --tags --abbrev=0', {
        encoding: 'utf8',
        cwd: this.workspaceRoot
      }).trim();
    } catch {
      return null;
    }
  }

  getWorkspacePackages() {
    const workspaceConfig = JSON.parse(
      fs.readFileSync(path.join(this.workspaceRoot, 'package.json'), 'utf8')
    );
    
    // Simple implementation - in real scenario, parse pnpm-workspace.yaml
    return ['@arthurcorreadev/components-core', '@repo/ui'];
  }

  getPackageAffectedCommits(packageName) {
    // Simplified implementation
    return this.detectedChanges.minor.concat(this.detectedChanges.patch);
  }

  determineChangeType(commits) {
    const hasBreaking = commits.some(c => c.includes('breaking') || c.includes('!:'));
    const hasFeat = commits.some(c => c.includes('feat('));
    
    if (hasBreaking) return 'major';
    if (hasFeat) return 'minor';
    return 'patch';
  }

  createChangesetContent(packageName, changeType, commits) {
    const summary = commits.map(c => `- ${c.split(' ').slice(1).join(' ')}`).join('\n');
    
    return `---
"${packageName}": ${changeType}
---

${summary}
`;
  }

  generateChangesetFilename(packageName, changeType) {
    const timestamp = Date.now();
    const pkgShort = packageName.split('/').pop();
    return `${changeType}-${pkgShort}-${timestamp}.md`;
  }

  async generateReleaseNotes(tag) {
    // Read CHANGELOG.md if it exists
    const changelogPath = path.join(this.workspaceRoot, 'CHANGELOG.md');
    
    if (fs.existsSync(changelogPath)) {
      const changelog = fs.readFileSync(changelogPath, 'utf8');
      const tagSection = this.extractTagSection(changelog, tag);
      
      if (tagSection) {
        return tagSection;
      }
    }

    return `Release ${tag}\n\nAutomated release generated by changeset workflow.`;
  }

  extractTagSection(changelog, tag) {
    const lines = changelog.split('\n');
    const tagLine = lines.findIndex(line => line.includes(tag));
    
    if (tagLine === -1) return null;
    
    const nextTagLine = lines.findIndex((line, idx) => 
      idx > tagLine && line.match(/^#+ \[?\d+\.\d+\.\d+/)
    );
    
    const endLine = nextTagLine === -1 ? lines.length : nextTagLine;
    
    return lines.slice(tagLine + 1, endLine).join('\n').trim();
  }
}

// CLI execution
if (require.main === module) {
  const args = process.argv.slice(2);
  const options = {
    auto: args.includes('--auto'),
    skipTests: args.includes('--skip-tests'),
    dryRun: args.includes('--dry-run')
  };
  
  const manager = new ChangesetPublishManager();
  manager.run(options).catch(console.error);
}

module.exports = ChangesetPublishManager;
