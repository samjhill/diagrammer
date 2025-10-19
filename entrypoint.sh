#!/bin/sh

# Set up git configuration
git config --global user.name "diagrammer-bot"
git config --global user.email "diagrammer-bot@users.noreply.github.com"

# Change to action directory and run the main script
cd /action
node src/index.js
