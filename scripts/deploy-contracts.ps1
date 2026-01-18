# Dharma Protocol v2.0 - Contract Deployment Script (PowerShell)
# This script deploys all contracts to Stellar testnet

$ErrorActionPreference = "Stop"

Write-Host "🚀 Dharma Protocol v2.0 - Contract Deployment" -ForegroundColor Cyan
Write-Host "==============================================" -ForegroundColor Cyan
Write-Host ""

# Check if Soroban CLI is installed
try {
    $sorobanVersion = soroban --version 2>&1
    Write-Host "✅ Soroban CLI found: $sorobanVersion" -ForegroundColor Green
    Write-Host ""
} catch {
    Write-Host "❌ Soroban CLI not found!" -ForegroundColor Red
    Write-Host "Install it with: cargo install --locked soroban-cli --version 22.0.1" -ForegroundColor Yellow
    exit 1
}

# Check if deployer key exists
try {
    soroban keys show deployer 2>&1 | Out-Null
    $DEPLOYER_ADDRESS = soroban keys address deployer
    Write-Host "🔑 Using existing deployer: $DEPLOYER_ADDRESS" -ForegroundColor Green
    Write-Host ""
} catch {
    Write-Host "🔑 Creating deployer keypair..." -ForegroundColor Yellow
    soroban keys generate deployer --network testnet
    
    $DEPLOYER_ADDRESS = soroban keys address deployer
    Write-Host "📍 Deployer address: $DEPLOYER_ADDRESS" -ForegroundColor Cyan
    Write-Host ""
    
    Write-Host "💰 Funding account with Friendbot..." -ForegroundColor Yellow
    Invoke-WebRequest -Uri "https://friendbot.stellar.org?addr=$DEPLOYER_ADDRESS" -UseBasicParsing | Out-Null
    Start-Sleep -Seconds 2
    Write-Host "✅ Account funded" -ForegroundColor Green
    Write-Host ""
}

# Build contracts
Write-Host "🔨 Building contracts..." -ForegroundColor Cyan
Push-Location contracts

Write-Host "  📦 Building SBT contract..." -ForegroundColor Yellow
Push-Location sbt
soroban contract build 2>&1 | Out-Null
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to build SBT contract" -ForegroundColor Red
    exit 1
}
Pop-Location

Write-Host "  📦 Building Identity Pool contract..." -ForegroundColor Yellow
Push-Location identity-pool
soroban contract build 2>&1 | Out-Null
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to build Identity Pool contract" -ForegroundColor Red
    exit 1
}
Pop-Location

Write-Host "  📦 Building Dharma Pool contract..." -ForegroundColor Yellow
Push-Location dharma-pool
soroban contract build 2>&1 | Out-Null
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to build Dharma Pool contract" -ForegroundColor Red
    exit 1
}
Pop-Location

Write-Host "✅ All contracts built successfully" -ForegroundColor Green
Write-Host ""

# Deploy contracts
Write-Host "🚀 Deploying contracts to testnet..." -ForegroundColor Cyan
Write-Host ""

Write-Host "  📤 Deploying SBT contract..." -ForegroundColor Yellow
$SBT_ID = soroban contract deploy `
  --wasm sbt/target/wasm32-unknown-unknown/release/sbt.wasm `
  --source deployer `
  --network testnet 2>&1

if ([string]::IsNullOrEmpty($SBT_ID)) {
    Write-Host "❌ Failed to deploy SBT contract" -ForegroundColor Red
    exit 1
}
Write-Host "  ✅ SBT Contract: $SBT_ID" -ForegroundColor Green

Write-Host "  📤 Deploying Identity Pool contract..." -ForegroundColor Yellow
$POOL_ID = soroban contract deploy `
  --wasm identity-pool/target/wasm32-unknown-unknown/release/identity_pool.wasm `
  --source deployer `
  --network testnet 2>&1

if ([string]::IsNullOrEmpty($POOL_ID)) {
    Write-Host "❌ Failed to deploy Identity Pool contract" -ForegroundColor Red
    exit 1
}
Write-Host "  ✅ Identity Pool: $POOL_ID" -ForegroundColor Green

Write-Host "  📤 Deploying Dharma Pool contract..." -ForegroundColor Yellow
$DHARMA_ID = soroban contract deploy `
  --wasm dharma-pool/target/wasm32-unknown-unknown/release/dharma_pool.wasm `
  --source deployer `
  --network testnet 2>&1

if ([string]::IsNullOrEmpty($DHARMA_ID)) {
    Write-Host "❌ Failed to deploy Dharma Pool contract" -ForegroundColor Red
    exit 1
}
Write-Host "  ✅ Dharma Pool: $DHARMA_ID" -ForegroundColor Green

Write-Host ""
Write-Host "✅ All contracts deployed successfully" -ForegroundColor Green
Write-Host ""

# Initialize contracts
Write-Host "⚙️  Initializing contracts..." -ForegroundColor Cyan
Write-Host ""

Write-Host "  🔧 Initializing SBT contract..." -ForegroundColor Yellow
soroban contract invoke `
  --id $SBT_ID `
  --source deployer `
  --network testnet `
  -- initialize `
  --admin $DEPLOYER_ADDRESS 2>&1 | Out-Null

if ($LASTEXITCODE -eq 0) {
    Write-Host "  ✅ SBT contract initialized" -ForegroundColor Green
} else {
    Write-Host "  ⚠️  SBT contract may already be initialized" -ForegroundColor Yellow
}

Write-Host "  🔧 Initializing Identity Pool..." -ForegroundColor Yellow
soroban contract invoke `
  --id $POOL_ID `
  --source deployer `
  --network testnet `
  -- initialize `
  --sbt_contract $SBT_ID 2>&1 | Out-Null

if ($LASTEXITCODE -eq 0) {
    Write-Host "  ✅ Identity Pool initialized" -ForegroundColor Green
} else {
    Write-Host "  ⚠️  Identity Pool may already be initialized" -ForegroundColor Yellow
}

Write-Host "  🔧 Initializing Dharma Pool..." -ForegroundColor Yellow
soroban contract invoke `
  --id $DHARMA_ID `
  --source deployer `
  --network testnet `
  -- initialize `
  --identity_pool $POOL_ID `
  --protocol_treasury $DEPLOYER_ADDRESS 2>&1 | Out-Null

if ($LASTEXITCODE -eq 0) {
    Write-Host "  ✅ Dharma Pool initialized" -ForegroundColor Green
} else {
    Write-Host "  ⚠️  Dharma Pool may already be initialized" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "✅ All contracts initialized" -ForegroundColor Green
Write-Host ""

# Create .env.local file
Pop-Location
Write-Host "📝 Creating .env.local file..." -ForegroundColor Yellow

$envContent = @"
# Dharma Protocol v2.0 - Contract Addresses
# Generated on $(Get-Date)

NEXT_PUBLIC_SBT_CONTRACT_ID=$SBT_ID
NEXT_PUBLIC_IDENTITY_POOL_CONTRACT_ID=$POOL_ID
NEXT_PUBLIC_DHARMA_POOL_CONTRACT_ID=$DHARMA_ID
NEXT_PUBLIC_STELLAR_NETWORK=TESTNET
NEXT_PUBLIC_DEPLOYER_ADDRESS=$DEPLOYER_ADDRESS
"@

$envContent | Out-File -FilePath ".env.local" -Encoding UTF8

Write-Host "✅ Environment file created" -ForegroundColor Green
Write-Host ""

# Summary
Write-Host "🎉 Deployment Complete!" -ForegroundColor Cyan
Write-Host "======================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📋 Contract Addresses:" -ForegroundColor Yellow
Write-Host "  SBT Contract:      $SBT_ID"
Write-Host "  Identity Pool:     $POOL_ID"
Write-Host "  Dharma Pool:       $DHARMA_ID"
Write-Host ""
Write-Host "👤 Deployer Address:  $DEPLOYER_ADDRESS" -ForegroundColor Yellow
Write-Host ""
Write-Host "🔗 View on Stellar Expert:" -ForegroundColor Cyan
Write-Host "  https://stellar.expert/explorer/testnet/account/$DEPLOYER_ADDRESS"
Write-Host ""
Write-Host "📋 Next Steps:" -ForegroundColor Yellow
Write-Host "  1. Install Freighter wallet extension"
Write-Host "  2. Switch to Stellar testnet in Freighter"
Write-Host "  3. Fund your wallet: https://friendbot.stellar.org"
Write-Host "  4. Start dev server: npm run dev"
Write-Host "  5. Open http://localhost:3000"
Write-Host "  6. Connect wallet and test the MVP!"
Write-Host ""
Write-Host "✨ Your real MVP is ready to use!" -ForegroundColor Green
