const { execSync } = require('child_process');

class GitManager {
  constructor(octokit, context) {
    this.octokit = octokit;
    this.context = context;
  }

  async commitChanges(outputPath, commitMessage) {
    try {
      console.log(`Attempting to commit changes in: ${outputPath}`);
      
      // Check if we're in a git repository
      if (!await this.isGitRepository()) {
        console.log('Not in a git repository, skipping commit');
        return;
      }

      // Show current git status
      console.log('Current git status:');
      try {
        execSync('git status --short', { stdio: 'inherit' });
      } catch (error) {
        console.log('Could not get git status:', error.message);
      }

      // Check if there are any changes
      const hasChanges = await this.hasChanges(outputPath);
      if (!hasChanges) {
        console.log('No changes to commit');
        return;
      }

      // Configure git user if not already set
      await this.configureGitUser();

      // Show what files will be added
      console.log(`Files to be added: ${outputPath}`);
      try {
        execSync(`git status --porcelain ${outputPath}`, { stdio: 'inherit' });
      } catch (error) {
        console.log('Could not check file status:', error.message);
      }

      // Stage the changes
      console.log('Staging changes...');
      execSync(`git add ${outputPath}`, { stdio: 'inherit' });

      // Check staged changes
      console.log('Staged changes:');
      try {
        execSync('git diff --cached --name-only', { stdio: 'inherit' });
      } catch (error) {
        console.log('Could not check staged changes:', error.message);
      }

      // Commit the changes
      console.log('Committing changes...');
      execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });

      // Push the changes
      console.log('Pushing changes...');
      execSync('git push', { stdio: 'inherit' });

      console.log('Successfully committed and pushed changes');
    } catch (error) {
      console.error('Failed to commit changes:', error.message);
      console.error('Error details:', error);
      // Don't throw error, just log it
      console.log('Continuing without committing changes');
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

  async isGitRepository() {
    try {
      execSync('git rev-parse --git-dir', { stdio: 'pipe' });
      return true;
    } catch (error) {
      return false;
    }
  }

  async configureGitUser() {
    try {
      // Check if git user is already configured
      execSync('git config user.name', { stdio: 'pipe' });
      execSync('git config user.email', { stdio: 'pipe' });
    } catch (error) {
      // Configure git user if not set
      execSync('git config user.name "diagrammer-bot"', { stdio: 'inherit' });
      execSync('git config user.email "diagrammer-bot@users.noreply.github.com"', { stdio: 'inherit' });
    }
  }
}

module.exports = { GitManager };
