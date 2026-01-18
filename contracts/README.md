# Dharma Protocol v2.0 - Smart Contracts

Soroban smart contracts for the Dharma Protocol "Identity as Liquidity" system.

## Prerequisites

1. **Install Rust**: https://rustup.rs/
   ```bash
   curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
   ```

2. **Add WASM target**:
   ```bash
   rustup target add wasm32-unknown-unknown
   ```

3. **Install Soroban CLI**:
   ```bash
   cargo install --locked soroban-cli
   ```

4. **Configure Stellar testnet**:
   ```bash
   soroban network add testnet \
     --rpc-url https://soroban-testnet.stellar.org \
     --network-passphrase "Test SDF Network ; September 2015"
   ```

## Contracts

- **sbt**: Soulbound Token contract for KYC attestation
- **identity-pool**: Identity staking and capacity management
- **dharma-pool**: Compliance rail issuance and fee distribution

## Build

```bash
# Build all contracts
./build.sh

# Or build individually
cd sbt && cargo build --target wasm32-unknown-unknown --release
cd identity-pool && cargo build --target wasm32-unknown-unknown --release
cd dharma-pool && cargo build --target wasm32-unknown-unknown --release
```

## Deploy

```bash
# Deploy SBT contract
soroban contract deploy \
  --wasm target/wasm32-unknown-unknown/release/sbt.wasm \
  --network testnet \
  --source <YOUR_SECRET_KEY>

# Deploy Identity Pool
soroban contract deploy \
  --wasm target/wasm32-unknown-unknown/release/identity_pool.wasm \
  --network testnet \
  --source <YOUR_SECRET_KEY>

# Deploy Dharma Pool
soroban contract deploy \
  --wasm target/wasm32-unknown-unknown/release/dharma_pool.wasm \
  --network testnet \
  --source <YOUR_SECRET_KEY>
```

## Test

```bash
cargo test
```

## Contract Addresses

After deployment, update these in your `.env.local`:

```
NEXT_PUBLIC_SBT_CONTRACT_ID=<deployed_sbt_contract_id>
NEXT_PUBLIC_IDENTITY_POOL_CONTRACT_ID=<deployed_identity_pool_contract_id>
NEXT_PUBLIC_DHARMA_POOL_CONTRACT_ID=<deployed_dharma_pool_contract_id>
```
