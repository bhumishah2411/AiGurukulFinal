@echo off
set "NODE_PATH=C:\Program Files\nodejs"
set "PATH=%NODE_PATH%;%PATH%"

echo 🪔 Starting AI Gurukul...

echo [1/2] Starting Backend...
start cmd /k "cd backend && node server.js"

echo [2/2] Starting Frontend...
start cmd /k "cd frontend && npx live-server --port=3000 --host=localhost"

echo ✨ Done! Your browser should open automatically on http://localhost:3000
pause
