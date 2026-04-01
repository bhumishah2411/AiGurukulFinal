@echo off
echo Starting ChromaDB Server locally on port 8000...
echo Ensure Python is installed and 'pip install chromadb' is executed.
chroma run --path ./chroma_db
pause
