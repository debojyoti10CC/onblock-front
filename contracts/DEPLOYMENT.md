# Quick Deployment Guide

## Step 1: Install Prerequisites (if not already installed)

```bash
# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source $HOME/.cargo/env

# Add WASM target
rustup target add wasm32-unknown-unknown

# Install Soroban CLI
cargo install --locked soroban-cli

# Configure testnet
soroban network add testnet \
  --rpc-url https://soroban-testnet.stellar.org \
  --network-passphrase "Test SDF Network ; September 2015"
```

## Step 2: Create a Stellar Account

```bash
# Generate a new keypair
soroban keys generate deployer --network testnet

# Get the public key
soroban keys address deployer

# Fund the account (visit https://laboratory.stellar.org/#account-creator?network=test)
# Or use the friendbot:
curl "https://friendbot.stellar.org?addr=$(soroban keys address deployer)"
```

## Step 3: Build Contracts

```bash
cd contracts

# Build SBT
cd sbt
soroban contract build
cd ..

# Build Identity Pool
cd identity-pool
soroban contract build
cd ..

# Build Dharma Pool
cd dharma-pool
soroban contract build
cd ..
```

## Step 4: Deploy Contracts

```bash
# Deploy SBT
SBT_ID=$(soroban contract deploy \
  --wasm sbt/target/wasm32-unknown-unknown/release/sbt.wasm \
  --source deployer \
  --network testnet)
echo "SBT Contract: $SBT_ID"

# Deploy Identity Pool
POOL_ID=$(soroban contract deploy \
  --wasm identity-pool/target/wasm32-unknown-unknown/release/identity_pool.wasm \
  --source deployer \
  --network testnet)
echo "Identity Pool Contract: $POOL_ID"

# Deploy Dharma Pool
DHARMA_ID=$(soroban contract deploy \
  --wasm dharma-pool/target/wasm32-unknown-unknown/release/dharma_pool.wasm \
  --source deployer \
  --network testnet)
echo "Dharma Pool Contract: $DHARMA_ID"
```

## Step 5: Initialize Contracts

```bash
# Initialize SBT (set yourself as admin)
soroban contract invoke \
  --id $SBT_ID \
  --source deployer \
  --network testnet \
  -- initialize \
  --admin $(soroban keys address deployer)

# Initialize Identity Pool
soroban contract invoke \
  --id $POOL_ID \
  --source deployer \
  --network testnet \
  -- initialize \
  --sbt_contract $SBT_ID

# Initialize Dharma Pool
soroban contract invoke \
  --id $DHARMA_ID \
  --source deployer \
  --network testnet \
  -- initialize \
  --identity_pool $POOL_ID
```

## Step 6: Update Frontend Config

Create `.env.local` in the project root:

```bash
NEXT_PUBLIC_SBT_CONTRACT_ID=$SBT_ID
NEXT_PUBLIC_IDENTITY_POOL_CONTRACT_ID=$POOL_ID
NEXT_PUBLIC_DHARMA_POOL_CONTRACT_ID=$DHARMA_ID
NEXT_PUBLIC_STELLAR_NETWORK=TESTNET
```

## Quick Test

```bash
# Issue an SBT to yourself
soroban contract invoke \
  --id $SBT_ID \
  --source deployer \
  --network testnet \
  -- issue_sbt \
  --owner $(soroban keys address deployer) \
  --kyc_hash 0000000000000000000000000000000000000000000000000000000000000001

# Verify the SBT
soroban contract invoke \
  --id $SBT_ID \
  --source deployer \
  --network testnet \
  -- verify_sbt \
  --owner $(soroban keys address deployer)
```

## Troubleshooting

- **"contract not found"**: Make sure you deployed the contract and saved the ID
- **"insufficient balance"**: Fund your account with more XLM from friendbot
- **"authorization failed"**: Make sure you're using the correct source account
- **Build errors**: Ensure Rust and wasm32 target are installed correctly
