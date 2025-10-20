#!/bin/sh

# Set up git configuration
git config --global user.name "diagrammer-bot"
git config --global user.email "diagrammer-bot@users.noreply.github.com"

# Fix git ownership issues in Docker containers
echo "Configuring git safe directories..."
git config --global --add safe.directory /github/workspace
if [ -n "$GITHUB_WORKSPACE" ] && [ "$GITHUB_WORKSPACE" != "/github/workspace" ]; then
  git config --global --add safe.directory "$GITHUB_WORKSPACE"
fi

# Change to workspace directory (where GitHub Actions expects files)
cd /github/workspace

# Run the main script from the action directory
node /action/src/index.js
