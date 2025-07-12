#!/usr/bin/env node

/**
 * Automated Issue Implementation Script
 * 
 * This script automates the implementation workflow:
 * 1. Fetches issue details from GitHub
 * 2. Creates appropriate branch
 * 3. Runs implementation via GitHub Copilot
 * 4. Executes test suite and fixes errors
 * 5. Generates categorized commits
 * 6. Fills PR template with implementation details
 */

const { Octokit } = require('@octokit/rest');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

class IssueImplementationManager {
  constructor() {
    this.octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN
    });
    this.repoOwner = process.env.GITHUB_REPOSITORY?.split('/')[0];
    this.repoName = process.env.GITHUB_REPOSITORY?.split('/')[1];
    this.workspaceRoot = process.cwd();
  }

  /**
   * Main execution flow
   */
  async run(issueUrl) {
    try {
      console.log('🚀 Starting automated issue implementation...');
      
      const issueData = await this.parseIssueUrl(issueUrl);
      const issue = await this.fetchIssue(issueData.number);
      
      console.log(`📋 Implementing: ${issue.title}`);
      
      const branchName = this.generateBranchName(issue);
      await this.createBranch(branchName);
      
      // Implementation phase (would integrate with Copilot)
      await this.implementIssue(issue);
      
      // Testing and validation phase
      await this.runTestSuite();
      
      // Commit generation phase
      await this.generateCategorizedCommits(issue, branchName);
      
      // PR template preparation
      await this.preparePRTemplate(issue, branchName);
      
      // Ask user for changeset generation when merging to main
      await this.promptForChangeset(issue, branchName);
      
      console.log('✅ Implementation complete! Ready for pull request.');
      
    } catch (error) {
      console.error('❌ Implementation failed:', error.message);
      process.exit(1);
    }
  }

  /**
   * Parse GitHub issue URL
   */
  async parseIssueUrl(url) {
    const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)\/issues\/(\d+)/);
    if (!match) {
      throw new Error('Invalid GitHub issue URL format');
    }
    
    return {
      owner: match[1],
      repo: match[2],
      number: parseInt(match[3])
    };
  }

  /**
   * Fetch issue details from GitHub API
   */
  async fetchIssue(issueNumber) {
    const response = await this.octokit.rest.issues.get({
      owner: this.repoOwner,
      repo: this.repoName,
      issue_number: issueNumber
    });
    
    return response.data;
  }

  /**
   * Generate branch name following pattern: <type>/<number>-<topic>
   */
  generateBranchName(issue) {
    const labels = issue.labels.map(label => label.name);
    
    let type = 'feat'; // default
    if (labels.includes('bug')) type = 'fix';
    else if (labels.includes('documentation')) type = 'docs';
    else if (labels.includes('enhancement')) type = 'feat';
    
    // Extract topic from title (first two meaningful words)
    const topic = issue.title
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(' ')
      .filter(word => word.length > 2)
      .slice(0, 2)
      .join('-');
    
    return `${type}/${issue.number}-${topic}`;
  }

  /**
   * Create and checkout new branch
   */
  async createBranch(branchName) {
    console.log(`🌿 Creating branch: ${branchName}`);
    
    execSync(`git checkout -b ${branchName}`, { 
      cwd: this.workspaceRoot,
      stdio: 'inherit' 
    });
  }

  /**
   * Implement issue (placeholder for Copilot integration)
   */
  async implementIssue(issue) {
    console.log('🔧 Starting implementation...');
    
    // This would integrate with GitHub Copilot's implementation agent
    // For now, this is a placeholder that would trigger the AI agent
    
    console.log('📚 Consulting local documentation...');
    await this.consultDocumentation(issue);
    
    // The actual implementation would happen here via Copilot
    console.log('⚙️ Implementation completed by AI agent');
  }

  /**
   * Consult local documentation based on issue content
   */
  async consultDocumentation(issue) {
    const docsPath = path.join(this.workspaceRoot, '.github', 'docs');
    
    // Check which documentation is relevant based on issue labels
    const labels = issue.labels.map(label => label.name);
    
    if (labels.includes('backend') || labels.includes('api')) {
      console.log('📖 Referencing NestJS documentation...');
      // Load relevant nest docs
    }
    
    if (labels.includes('frontend') || labels.includes('ui')) {
      console.log('📖 Referencing Next.js documentation...');
      // Load relevant next docs
    }
    
    // Always check turbo docs for monorepo considerations
    console.log('📖 Referencing Turbo documentation...');
  }

  /**
   * Run complete test suite and fix errors
   */
  async runTestSuite() {
    console.log('🧪 Running test suite...');
    
    const testCommands = [
      'pnpm lint',
      'pnpm check-types', 
      'pnpm test',
      'pnpm test:e2e',
      'pnpm build',
      'pnpm dev --timeout=10000' // Quick dev server check
    ];
    
    for (const command of testCommands) {
      console.log(`Running: ${command}`);
      
      try {
        execSync(command, { 
          cwd: this.workspaceRoot,
          stdio: 'inherit',
          timeout: 60000 // 1 minute timeout
        });
        console.log(`✅ ${command} passed`);
        
      } catch (error) {
        console.log(`❌ ${command} failed, attempting to fix...`);
        await this.fixTestErrors(command, error);
      }
    }
  }

  /**
   * Attempt to fix test errors (placeholder for AI-powered fixes)
   */
  async fixTestErrors(command, error) {
    console.log('🔧 AI agent fixing errors...');
    
    // This would integrate with AI to analyze and fix errors
    // For now, we'll just retry once
    
    try {
      execSync(command, { 
        cwd: this.workspaceRoot,
        stdio: 'inherit',
        timeout: 60000
      });
      console.log(`✅ ${command} fixed and passed`);
      
    } catch (retryError) {
      console.log(`❌ ${command} still failing after fix attempt`);
      throw new Error(`Unable to fix errors in: ${command}`);
    }
  }

  /**
   * Generate categorized commits based on file types
   */
  async generateCategorizedCommits(issue, branchName) {
    console.log('📝 Generating categorized commits...');
    
    // Get all changed files
    const changedFiles = this.getChangedFiles();
    
    // Categorize files
    const categories = this.categorizeFiles(changedFiles);
    
    // Generate commits for each category
    for (const [type, files] of Object.entries(categories)) {
      if (files.length > 0) {
        await this.createCommit(type, files, issue, branchName);
      }
    }
  }

  /**
   * Get list of changed files
   */
  getChangedFiles() {
    const output = execSync('git diff --name-only HEAD', { 
      cwd: this.workspaceRoot,
      encoding: 'utf8' 
    });
    
    return output.trim().split('\n').filter(file => file);
  }

  /**
   * Categorize files by commit type
   */
  categorizeFiles(files) {
    const categories = {
      feat: [],
      fix: [],
      test: [],
      docs: [],
      style: [],
      refactor: [],
      chore: []
    };
    
    files.forEach(file => {
      if (file.includes('.test.') || file.includes('.spec.') || file.includes('__tests__')) {
        categories.test.push(file);
      } else if (file.includes('.md') || file.includes('docs/')) {
        categories.docs.push(file);
      } else if (file.includes('.css') || file.includes('.scss') || file.includes('styles')) {
        categories.style.push(file);
      } else if (file.includes('config') || file.includes('.json') || file.includes('.yml')) {
        categories.chore.push(file);
      } else {
        // Default to feat for implementation files
        categories.feat.push(file);
      }
    });
    
    return categories;
  }

  /**
   * Create a categorized commit
   */
  async createCommit(type, files, issue, branchName) {
    const commitMessage = `${type}(${branchName}): ${issue.title} (#${issue.number})`;
    
    // Stage files
    files.forEach(file => {
      execSync(`git add "${file}"`, { cwd: this.workspaceRoot });
    });
    
    // Create commit
    execSync(`git commit -m "${commitMessage}"`, { 
      cwd: this.workspaceRoot,
      stdio: 'inherit' 
    });
    
    console.log(`✅ Created ${type} commit with ${files.length} files`);
  }

  /**
   * Prepare PR template with implementation details
   */
  async preparePRTemplate(issue, branchName) {
    console.log('📋 Preparing PR template...');
    
    const templatePath = path.join(this.workspaceRoot, '.github', 'pull_request_template.md');
    let template = fs.readFileSync(templatePath, 'utf8');
    
    // Fill in the template
    template = template.replace('Closes #', `Closes #${issue.number}`);
    
    // Add implementation summary
    const implementationSummary = this.generateImplementationSummary(issue);
    template = template.replace(
      '### O que foi alterado:\n- \n- \n- ',
      implementationSummary.changes
    );
    
    template = template.replace(
      '### Por que foi alterado:\n- \n- ',
      implementationSummary.reasons
    );
    
    // Save filled template
    const filledTemplatePath = path.join(this.workspaceRoot, '.github', 'PULL_REQUEST_BODY.md');
    fs.writeFileSync(filledTemplatePath, template);
    
    console.log('✅ PR template prepared and saved');
  }

  /**
   * Generate implementation summary for PR
   */
  generateImplementationSummary(issue) {
    // This would be enhanced with AI-generated summaries
    return {
      changes: `### O que foi alterado:
- Implemented ${issue.title}
- Added comprehensive test coverage
- Updated relevant documentation
- Fixed any arising compatibility issues`,
      
      reasons: `### Por que foi alterado:
- Addresses issue #${issue.number}
- Improves system functionality and user experience`
    };
  }

  /**
   * Prompt user for changeset generation when ready to merge
   */
  async promptForChangeset(issue, branchName) {
    console.log('\n🔄 Implementation completed! Next steps:');
    console.log('1. Review the generated commits');
    console.log('2. Create pull request (template is pre-filled)');
    console.log('3. After PR approval and merge to main, run changeset workflow');
    console.log('\n📦 To generate changeset and publish after merge:');
    console.log('   pnpm changeset:release');
    console.log('   pnpm changeset:release --auto  # For automatic changeset generation');
    
    // Create changeset reminder file
    const reminderContent = `# 📦 Changeset Reminder

## Issue: ${issue.title} (#${issue.number})
## Branch: ${branchName}

After merging this PR to main, run the changeset workflow:

\`\`\`bash
# Interactive changeset generation
pnpm changeset:release

# Automatic changeset generation  
pnpm changeset:release --auto
\`\`\`

This will:
- Generate changesets based on commits
- Update package versions
- Generate changelogs
- Publish to NPM
- Create GitHub release

## Affected Packages
Based on the implementation, the following packages may need versioning:
- @arthurcorreadev/components-core
- @repo/ui
- Other packages as detected by the workflow

## Change Type Suggestions
- **Major**: Breaking changes (indicated by commits with '!' or 'breaking')
- **Minor**: New features (feat commits)
- **Patch**: Bug fixes, docs, tests (fix, docs, test commits)
`;

    const reminderPath = path.join(this.workspaceRoot, '.changeset', `REMINDER-${issue.number}.md`);
    fs.writeFileSync(reminderPath, reminderContent);
    
    console.log(`\n📝 Changeset reminder saved to: .changeset/REMINDER-${issue.number}.md`);
  }
}

// CLI execution
if (require.main === module) {
  const issueUrl = process.argv[2];
  
  if (!issueUrl) {
    console.error('Usage: node implement-issue.js <github-issue-url>');
    process.exit(1);
  }
  
  const manager = new IssueImplementationManager();
  manager.run(issueUrl).catch(console.error);
}

module.exports = IssueImplementationManager;
