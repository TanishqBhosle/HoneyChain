$RootDir = $PSScriptRoot

Write-Host "Setting up Database..."
Set-Location -Path "$RootDir"
pnpm --filter @honey-chain/database generate
pnpm --filter @honey-chain/database seed

Write-Host "Starting Web and API services..."
Start-Process powershell.exe -ArgumentList "-NoExit", "-Command", "Set-Location '$RootDir'; pnpm dev"

Write-Host "Starting AI service..."
Start-Process powershell.exe -ArgumentList "-NoExit", "-Command", "Set-Location '$RootDir\services\ai-service'; uvicorn app.main:app --port 8000"

