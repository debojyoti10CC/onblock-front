#!/bin/bash

# Dharma Protocol v2.0 - Contract Deployment Script
# This script deploys all contracts to Stellar testnet

set -e

echo "🚀 Dharma Protocol v2.0 - Contract Deployment"
echo "=============================================="
echo ""

# Check if Soroban CLI is installed
if ! command -v soroban &> /dev/null; then
    echo "❌ Soroban CLI not found!"
    echo "Install it with: cargo install --locked soroban-cli --version 22.0.1"
    exit 1
fi

echo "✅ Soroban CLI found: $(soroban --version)"
echo ""

# Check if deployer key exists
if ! soroban keys show deployer &> /dev/null 2>&1; then
    echo "🔑 Creating deployer keypair..."
    soroban keys generate deployer --network testnet
    
    DEPLOYER_ADDRESS=$(soroban keys address deployer)
    echo "📍 Deployer address: $DEPLOYER_ADDRESS"
    echo ""
    
    echo "💰 Funding account with Friendbot..."
    curl -s "https://friendbot.stellar.org?addr=$DEPLOYER_ADDRESS" > /dev/null
    sleep 2
    echo "✅ Account funded"
    echo ""
else
    DEPLOYER_ADDRESS=$(soroban keys address deployer)
    echo "🔑 Using existing deployer: $DEPLOYER_ADDRESS"
    echo ""
fi

# Build contracts
echo "🔨 Building contracts..."
cd contracts

echo "  📦 Building SBT contract..."
cd sbt
soroban contract build > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo "❌ Failed to build SBT contract"
    exit 1
fi
cd ..

echo "  📦 Building Identity Pool contract..."
cd identity-pool
soroban contract build > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo "❌ Failed to build Identity Pool contract"
    exit 1
fi
cd ..

echo "  📦 Building Dharma Pool contract..."
cd dharma-pool
soroban contract build > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo "❌ Failed to build Dharma Pool contract"
    exit 1
fi
cd ..

echo "✅ All contracts built successfully"
echo ""

# Deploy contracts
echo "🚀 Deploying contracts to testnet..."
echo ""

echo "  📤 Deploying SBT contract..."
SBT_ID=$(soroban contract deploy \
  --wasm sbt/target/wasm32-unknown-unknown/release/sbt.wasm \
  --source deployer \
  --network testnet 2>&1)

if [ -z "$SBT_ID" ]; then
    echo "❌ Failed to deploy SBT contract"
    exit 1
fi
echo "  ✅ SBT Contract: $SBT_ID"

echo "  📤 Deploying Identity Pool contract..."
POOL_ID=$(soroban contract deploy \
  --wasm identity-pool/target/wasm32-unknown-unknown/release/identity_pool.wasm \
  --source deployer \
  --network testnet 2>&1)

if [ -z "$POOL_ID" ]; then
    echo "❌ Failed to deploy Identity Pool contract"
    exit 1
fi
echo "  ✅ Identity Pool: $POOL_ID"

echo "  📤 Deploying Dharma Pool contract..."
DHARMA_ID=$(soroban contract deploy \
  --wasm dharma-pool/target/wasm32-unknown-unknown/release/dharma_pool.wasm \
  --source deployer \
  --network testnet 2>&1)

if [ -z "$DHARMA_ID" ]; then
    echo "❌ Failed to deploy Dharma Pool contract"
    exit 1
fi
echo "  ✅ Dharma Pool: $DHARMA_ID"

echo ""
echo "✅ All contracts deployed successfully"
echo ""

# Initialize contracts
echo "⚙️  Initializing contracts..."
echo ""

echo "  🔧 Initializing SBT contract..."
soroban contract invoke \
  --id $SBT_ID \
  --source deployer \
  --network testnet \
  -- initialize \
  --admin $DEPLOYER_ADDRESS > /dev/null 2>&1

if [ $? -eq 0 ]; then
    echo "  ✅ SBT contract initialized"
else
    echo "  ⚠️  SBT contract may already be initialized"
fi

echo "  🔧 Initializing Identity Pool..."
soroban contract invoke \
  --id $POOL_ID \
  --source deployer \
  --network testnet \
  -- initialize \
  --sbt_contract $SBT_ID > /dev/null 2>&1

if [ $? -eq 0 ]; then
    echo "  ✅ Identity Pool initialized"
else
    echo "  ⚠️  Identity Pool may already be initialized"
fi

echo "  🔧 Initializing Dharma Pool..."
soroban contract invoke \
  --id $DHARMA_ID \
  --source deployer \
  --network testnet \
  -- initialize \
  --identity_pool $POOL_ID \
  --protocol_treasury $DEPLOYER_ADDRESS > /dev/null 2>&1

if [ $? -eq 0 ]; then
    echo "  ✅ Dharma Pool initialized"
else
    echo "  ⚠️  Dharma Pool may already be initialized"
fi

echo ""
echo "✅ All contracts initialized"
echo ""

# Create .env.local file
cd ..
echo "📝 Creating .env.local file..."
cat > .env.local << EOF
# Dharma Protocol v2.0 - Contract Addresses
# Generated on $(date)

NEXT_PUBLIC_SBT_CONTRACT_ID=$SBT_ID
NEXT_PUBLIC_IDENTITY_POOL_CONTRACT_ID=$POOL_ID
NEXT_PUBLIC_DHARMA_POOL_CONTRACT_ID=$DHARMA_ID
NEXT_PUBLIC_STELLAR_NETWORK=TESTNET
NEXT_PUBLIC_DEPLOYER_ADDRESS=$DEPLOYER_ADDRESS
EOF

echo "✅ Environment file created"
echo ""

# Summary
echo "🎉 Deployment Complete!"
echo "======================"
echo ""
echo "📋 Contract Addresses:"
echo "  SBT Contract:      $SBT_ID"
echo "  Identity Pool:     $POOL_ID"
echo "  Dharma Pool:       $DHARMA_ID"
echo ""
echo "👤 Deployer Address:  $DEPLOYER_ADDRESS"
echo ""
echo "🔗 View on Stellar Expert:"
echo "  https://stellar.expert/explorer/testnet/account/$DEPLOYER_ADDRESS"
echo ""
echo "📋 Next Steps:"
echo "  1. Install Freighter wallet extension"
echo "  2. Switch to Stellar testnet in Freighter"
echo "  3. Fund your wallet: https://friendbot.stellar.org"
echo "  4. Start dev server: npm run dev"
echo "  5. Open http://localhost:3000"
echo "  6. Connect wallet and test the MVP!"
echo ""
echo "✨ Your real MVP is ready to use!"
