@echo off
echo Cleaning .next directory...
if exist ".next" rmdir /s /q ".next"
echo Starting Next.js development server...
npm run dev
