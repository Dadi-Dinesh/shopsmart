#!/bin/bash
# setup_environment.sh
# 
# Purpose: Prepares a raw Ubuntu AWS EC2 instance for the ShopSmart deployment.
# This script is strictly IDEMPOTENT. It produces the same successful 
# result whether run once or one hundred times.

echo "========== Starting Idempotent Environment Setup =========="

# 1. Update package lists
echo "1. Checking package lists..."
sudo apt-get update -yqq

# 2. Install Git Idempotently
# Check if the 'git' command exists. If it doesn't, install it.
if ! command -v git &> /dev/null; then
    echo "Git not found. Installing Git..."
    sudo apt-get install -y git
else
    echo "Git is already installed. Skipping."
fi

# 3. Install Node.js & npm Idempotently
if ! command -v node &> /dev/null; then
    echo "Node.js not found. Installing Node.js v18..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
else
    echo "Node.js is already installed. Skipping."
fi

# 4. Install PM2 (Process Manager) Idempotently
if ! command -v pm2 &> /dev/null; then
    echo "PM2 not found. Installing PM2 globally..."
    sudo npm install -g pm2
else
    echo "PM2 is already installed. Skipping."
fi

# 5. Create deployment directory idempotently 
# 'mkdir -p' succeeds gracefully even if the directory already exists.
echo "5. Preparing deployment directory..."
sudo mkdir -p /var/www/shopsmart

# Ensure the current ubuntu user owns the directory to prevent permission errors
sudo chown -R $USER:$USER /var/www/shopsmart

echo "========== Environment setup complete! =========="
