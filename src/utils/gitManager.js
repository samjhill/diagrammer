const { execSync } = require('child_process');
const fs = require('fs-extra');

class GitManager {
  constructor(octokit, context) {
    this.octokit = octokit;
    this.context = context;
  }

  async commitChanges(outputPath, commitMessage) {
    try {
      // Check if there are any changes
      const hasChanges = await this.hasChanges(outputPath);
      if (!hasChanges) {
        console.log('No changes to commit');
        return;
      }

      // Stage the changes
      execSync(`git add ${outputPath}`, { stdio: 'inherit' });

      // Commit the changes
      execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });

      // Push the changes
      execSync('git push', { stdio: 'inherit' });

      console.log('Successfully committed and pushed changes');
    } catch (error) {
      console.error('Failed to commit changes:', error.message);
      throw error;
    }
  }

  async hasChanges(outputPath) {
    try {
      const result = execSync(`git status --porcelain ${outputPath}`, { encoding: 'utf8' });
      return result.trim().length > 0;
    } catch (error) {
      return false;
    }
  }

  async getCurrentBranch() {
    try {
      return execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' }).trim();
    } catch (error) {
      return 'main';
    }
  }

  async getRepositoryInfo() {
    return {
      owner: this.context.repo.owner,
      repo: this.context.repo.repo,
      sha: this.context.sha,
      ref: this.context.ref
    };
  }
}

module.exports = { GitManager };
