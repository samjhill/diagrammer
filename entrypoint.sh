#!/bin/sh

# Set up git configuration
git config --global user.name "diagrammer-bot"
git config --global user.email "diagrammer-bot@users.noreply.github.com"

# Run the main script
node src/index.js
