@echo off
chcp 65001 >nul
echo ========================================================
echo   Mohamed El-Qalshany Portfolio — Automated GitHub Push
echo ========================================================
echo.

where git >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Git is not installed or not in PATH!
    echo Please install Git from https://git-scm.com/
    pause
    exit /b 1
)

echo Please paste your GitHub repository URL:
echo (Example: https://github.com/mohamedelqalshany/portfolio.git)
echo.
set /p REPO_URL="Repository URL: "

if "%REPO_URL%"=="" (
    echo [ERROR] No repository URL provided!
    pause
    exit /b 1
)

echo.
echo [1/4] Initializing Git repository...
git init
git branch -M main

echo [2/4] Staging all files...
git add -A

echo [3/4] Committing files...
git commit -m "feat: official portfolio for Mohamed El-Qalshany"

echo [4/4] Pushing to GitHub (%REPO_URL%)...
git remote remove origin >nul 2>nul
git remote add origin %REPO_URL%
git push -u origin main --force

if %errorlevel% equ 0 (
    echo.
    echo ========================================================
    echo   SUCCESS! All files have been uploaded to GitHub!
    echo ========================================================
    echo Now open Cloudflare Pages and connect to this repository.
) else (
    echo.
    echo [ERROR] Failed to push to GitHub. 
    echo Please check your internet connection and GitHub credentials.
)

echo.
pause
