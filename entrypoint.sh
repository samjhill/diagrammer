#!/bin/sh

# Set up git configuration
git config --global user.name "diagrammer-bot"
git config --global user.email "diagrammer-bot@users.noreply.github.com"

# Change to workspace directory (where GitHub Actions expects files)
cd /github/workspace

# Run the main script from the action directory
node /action/src/index.js
