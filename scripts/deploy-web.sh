#!/bin/bash -e

red=$'\e[1;31m'
green=$'\e[1;32m'
yellow=$'\e[1;33m'
blue=$'\e[1;34m'
magenta=$'\e[1;35m'
cyan=$'\e[1;36m'
cls=$'\e[0m'

APP_NAME=hackathon-killer
PROJECT_DIR="/home/deployer/projects/$APP_NAME"
APP_DIR=$PROJECT_DIR/apps/web

printf "%b\n" "${yellow}Changing dir to: $APP_DIR ${cls}"
cd $APP_DIR

if [[ -n $(git status -s) ]]; then
    printf "%b\n" "${blue}Working directory is not clean, restoring changes... ${cls}"
    git restore .
fi

printf "%b\n" "${green}Updating sources... ${cls}"
git pull origin main

printf "%b\n" "${cyan}Building and redeploying the web container with Docker Compose... ${cls}"
docker-compose up -d --force-recreate --no-deps web

echo 'Done!'
