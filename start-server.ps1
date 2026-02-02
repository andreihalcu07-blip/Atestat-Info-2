# Start a simple HTTP server for local testing (PowerShell)
# Usage: Right-click this file -> Run with PowerShell, or open PowerShell in the folder and run:
#   .\start-server.ps1

# Try using the Python launcher first
if (Get-Command py -ErrorAction SilentlyContinue) {
    Write-Host "Starting server on http://localhost:8000 using py -m http.server" -ForegroundColor Cyan
    py -m http.server 8000
}
elseif (Get-Command python -ErrorAction SilentlyContinue) {
    Write-Host "Starting server on http://localhost:8000 using python -m http.server" -ForegroundColor Cyan
    python -m http.server 8000
}
else {
    Write-Host "Python not found. If you have Node.js, run: npx http-server -p 8000" -ForegroundColor Yellow
    Write-Host "Or install Python from https://www.python.org/downloads/" -ForegroundColor Yellow
}
