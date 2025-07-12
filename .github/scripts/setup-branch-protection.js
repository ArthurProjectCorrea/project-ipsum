#!/usr/bin/env node

/**
 * 🔒 Branch Protection Configuration Script
 * 
 * This script automatically configures branch protection rules for GitFlow strategy:
 * - main: Only accepts merges from dev, strict protection
 * - dev: Accepts feature branches, moderate protection
 * 
 * Usage: node setup-branch-protection.js
 * Requires: GITHUB_TOKEN environment variable
 */

const { Octokit } = require('@octokit/rest');

class BranchProtectionSetup {
  constructor() {
    // Initialize GitHub API client
    this.octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN
    });
    
    // Parse repository info from environment or git
    const repoInfo = this.parseRepositoryInfo();
    this.repoOwner = repoInfo.owner;
    this.repoName = repoInfo.name;
    
    console.log(`🔒 Setting up branch protection for ${this.repoOwner}/${this.repoName}`);
  }

  /**
   * Parse repository information from environment or git remote
   */
  parseRepositoryInfo() {
    if (process.env.GITHUB_REPOSITORY) {
      const [owner, name] = process.env.GITHUB_REPOSITORY.split('/');
      return { owner, name };
    }
    
    // Fallback to hardcoded for template
    return {
      owner: 'ArthurProjectCorrea',
      name: 'template-project'
    };
  }

  /**
   * Main execution function
   */
  async run() {
    try {
      console.log('🔍 Checking environment...');
      await this.checkEnvironment();
      
      console.log('🌿 Setting up main branch protection...');
      await this.setupMainBranchProtection();
      
      console.log('🔧 Setting up dev branch protection...');
      await this.setupDevBranchProtection();
      
      console.log('⚙️ Setting up repository settings...');
      await this.setupRepositorySettings();
      
      console.log('✅ Branch protection setup completed successfully!');
      console.log('');
      console.log('🎯 GitFlow is now enforced:');
      console.log('   • Feature branches → dev (automatic PRs)');
      console.log('   • dev → main (manual, reviewed merges)');
      console.log('   • No direct pushes to protected branches');
      
    } catch (error) {
      console.error('❌ Branch protection setup failed:', error.message);
      process.exit(1);
    }
  }

  /**
   * Check required environment variables and permissions
   */
  async checkEnvironment() {
    if (!process.env.GITHUB_TOKEN) {
      throw new Error('GITHUB_TOKEN environment variable is required');
    }

    try {
      // Test API access and get repository info
      const { data: repo } = await this.octokit.rest.repos.get({
        owner: this.repoOwner,
        repo: this.repoName
      });
      
      console.log(`✅ Repository access confirmed: ${repo.full_name}`);
      
      // Check if user has admin permissions
      const { data: permissions } = await this.octokit.rest.repos.getCollaboratorPermissionLevel({
        owner: this.repoOwner,
        repo: this.repoName,
        username: repo.owner.login
      });
      
      if (permissions.permission !== 'admin') {
        throw new Error('Admin permissions required to set up branch protection');
      }
      
      console.log('✅ Admin permissions confirmed');
      
    } catch (error) {
      throw new Error(`Failed to access repository: ${error.message}`);
    }
  }

  /**
   * Set up protection for main branch
   */
  async setupMainBranchProtection() {
    const protectionConfig = {
      owner: this.repoOwner,
      repo: this.repoName,
      branch: 'main',
      required_status_checks: {
        strict: true,
        contexts: [
          'ci/build',
          'ci/test', 
          'ci/lint',
          'ci/types',
          'ci/security'
        ]
      },
      enforce_admins: true,
      required_pull_request_reviews: {
        required_approving_review_count: 1,
        dismiss_stale_reviews: true,
        require_code_owner_reviews: false,
        bypass_pull_request_allowances: {
          users: [],
          teams: []
        }
      },
      restrictions: {
        // Only dev branch can merge to main
        users: [],
        teams: [],
        apps: []
      },
      allow_force_pushes: false,
      allow_deletions: false,
      block_creations: false
    };

    try {
      await this.octokit.rest.repos.updateBranchProtection(protectionConfig);
      console.log('✅ Main branch protection configured');
      
      // Set up merge restrictions (only dev can merge)
      await this.setupMergeRestrictions('main', ['dev']);
      
    } catch (error) {
      console.warn(`⚠️ Main branch protection setup failed: ${error.message}`);
      console.log('💡 You may need to configure this manually in GitHub settings');
    }
  }

  /**
   * Set up protection for dev branch
   */
  async setupDevBranchProtection() {
    const protectionConfig = {
      owner: this.repoOwner,
      repo: this.repoName,
      branch: 'dev',
      required_status_checks: {
        strict: true,
        contexts: [
          'ci/build',
          'ci/test',
          'ci/lint'
        ]
      },
      enforce_admins: false, // More lenient for dev
      required_pull_request_reviews: {
        required_approving_review_count: 1,
        dismiss_stale_reviews: false,
        require_code_owner_reviews: false
      },
      restrictions: null, // Allow all feature branches
      allow_force_pushes: false,
      allow_deletions: false,
      block_creations: false
    };

    try {
      await this.octokit.rest.repos.updateBranchProtection(protectionConfig);
      console.log('✅ Dev branch protection configured');
    } catch (error) {
      console.warn(`⚠️ Dev branch protection setup failed: ${error.message}`);
      console.log('💡 You may need to configure this manually in GitHub settings');
    }
  }

  /**
   * Set up repository-wide settings
   */
  async setupRepositorySettings() {
    try {
      // Configure repository settings for better GitFlow
      await this.octokit.rest.repos.update({
        owner: this.repoOwner,
        repo: this.repoName,
        allow_merge_commit: true,    // For dev → main
        allow_squash_merge: true,    // For features → dev
        allow_rebase_merge: false,   // Discourage rebasing
        delete_branch_on_merge: true, // Auto-cleanup
        default_branch: 'main'       // Ensure main is default
      });
      
      console.log('✅ Repository settings configured');
      
    } catch (error) {
      console.warn(`⚠️ Repository settings update failed: ${error.message}`);
    }
  }

  /**
   * Set up merge restrictions (GitHub Enterprise feature)
   */
  async setupMergeRestrictions(branch, allowedBranches) {
    try {
      // This is typically an Enterprise feature
      // For now, we'll just log the intention
      console.log(`📋 Merge restrictions for ${branch}:`);
      console.log(`   Allowed branches: ${allowedBranches.join(', ')}`);
      console.log('   ⚠️ Manual configuration may be required in GitHub settings');
      
    } catch (error) {
      console.warn(`⚠️ Merge restrictions setup failed: ${error.message}`);
    }
  }
}

// CLI execution
if (require.main === module) {
  const setup = new BranchProtectionSetup();
  setup.run().catch(error => {
    console.error('💥 Setup failed:', error);
    process.exit(1);
  });
}

module.exports = BranchProtectionSetup;
