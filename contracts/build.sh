#!/bin/bash

# Build all Soroban contracts
echo "Building Soroban contracts..."

cd "$(dirname "$0")"

# Build SBT contract
echo "Building SBT contract..."
cd sbt
cargo build --target wasm32-unknown-unknown --release
cd ..

# Build Identity Pool contract
echo "Building Identity Pool contract..."
cd identity-pool
cargo build --target wasm32-unknown-unknown --release
cd ..

# Build Dharma Pool contract
echo "Building Dharma Pool contract..."
cd dharma-pool
cargo build --target wasm32-unknown-unknown --release
cd ..

echo "Build complete! WASM files are in target/wasm32-unknown-unknown/release/"
