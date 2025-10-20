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

      // Ensure we're in the git root directory
      try {
        const gitRoot = execSync('git rev-parse --show-toplevel', { encoding: 'utf8' }).trim();
        if (gitRoot && gitRoot !== process.cwd()) {
          console.log(`Changing to git root directory: ${gitRoot}`);
          process.chdir(gitRoot);
        }
      } catch (error) {
        console.log('Could not determine git root, staying in current directory');
      }

      // Show current git status and environment
      console.log('=== Git Environment Debug ===');
      console.log('Current working directory:', process.cwd());
      try {
        console.log('Git root directory:', execSync('git rev-parse --show-toplevel', { encoding: 'utf8' }).trim());
      } catch (e) {
        console.log('Could not get git root:', e.message);
      }
      try {
        console.log('Git remote origin:', execSync('git remote get-url origin', { encoding: 'utf8' }).trim());
      } catch (e) {
        console.log('Could not get git remote:', e.message);
      }
      try {
        console.log('Current branch:', execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' }).trim());
      } catch (e) {
        console.log('Could not get current branch:', e.message);
      }
      console.log('=============================');
      
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
      // First check if .git directory exists
      const fs = require('fs');
      if (fs.existsSync('.git')) {
        console.log('Found .git directory');
        return true;
      }
      
      // Also try the git command approach
      execSync('git rev-parse --git-dir', { stdio: 'pipe' });
      console.log('Git repository detected via git command');
      return true;
    } catch (error) {
      console.log('Git repository detection failed:', error.message);
      
      // Additional debugging
      console.log('Current working directory:', process.cwd());
      console.log('Contents of current directory:');
      try {
        const fs = require('fs');
        const files = fs.readdirSync('.');
        console.log(files);
      } catch (e) {
        console.log('Could not list directory contents:', e.message);
      }
      
      // Check if we're in a subdirectory of a git repo
      try {
        execSync('git rev-parse --show-toplevel', { stdio: 'pipe' });
        console.log('Found git repository in parent directory');
        return true;
      } catch (parentError) {
        console.log('No git repository found in parent directories');
        
        // Final fallback: check if we're in a GitHub Actions environment
        // and try to initialize git if needed
        if (process.env.GITHUB_ACTIONS === 'true' && process.env.GITHUB_WORKSPACE) {
          console.log('Running in GitHub Actions, attempting to initialize git...');
          try {
            // Change to the GitHub workspace directory
            process.chdir(process.env.GITHUB_WORKSPACE);
            console.log('Changed to GitHub workspace:', process.env.GITHUB_WORKSPACE);
            
            // Check if git is available now
            execSync('git rev-parse --git-dir', { stdio: 'pipe' });
            console.log('Git repository now available in GitHub workspace');
            return true;
          } catch (workspaceError) {
            console.log('Git still not available in GitHub workspace:', workspaceError.message);
            return false;
          }
        }
        
        return false;
      }
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
