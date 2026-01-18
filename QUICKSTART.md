# Quick Start Guide

Get Dharma Protocol v2.0 running in 2 minutes!

## Prerequisites

- Node.js 18+ installed
- npm or pnpm installed

## Installation

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open browser
# Navigate to http://localhost:3000
```

That's it! The demo is ready to use with mock data.

## Demo Flow

1. **Home** (`/`) - Overview of features
2. **Onboard** (`/onboard`) - Mock KYC and SBT issuance
3. **Stake** (`/stake`) - Configure limits and stake
4. **Dashboard** (`/dashboard`) - View earnings and Kill Switch
5. **Agent** (`/agent`) - Monitor BOT-X activity

## Optional: Connect Wallet

1. Install [Freighter Wallet](https://www.freighter.app/)
2. Create/import a Stellar testnet account
3. Click "Connect Wallet" in the navigation

## Optional: Deploy Contracts

See [contracts/DEPLOYMENT.md](contracts/DEPLOYMENT.md) for full instructions.

```bash
# Install Rust and Soroban CLI
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
rustup target add wasm32-unknown-unknown
cargo install --locked soroban-cli

# Build contracts
cd contracts
cd sbt && soroban contract build && cd ..
cd identity-pool && soroban contract build && cd ..
cd dharma-pool && soroban contract build && cd ..

# Deploy (see DEPLOYMENT.md for details)
```

## Project Structure

```
├── app/              # Next.js pages
├── components/       # React components
├── contracts/        # Soroban smart contracts
├── lib/             # Utilities and config
└── docs/            # Documentation
```

## Key Files

- `README.md` - Complete documentation
- `DEMO.md` - 5-minute demo guide
- `PROGRESS.md` - Development progress
- `SUMMARY.md` - Project summary
- `contracts/DEPLOYMENT.md` - Contract deployment

## Troubleshooting

### Port already in use
```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
npm run dev -- -p 3001
```

### Dependencies not installing
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Wallet not connecting
- Make sure Freighter is installed
- Check that you're on testnet
- Refresh the page

## Next Steps

1. **Demo**: Follow [DEMO.md](DEMO.md) for presentation guide
2. **Deploy**: See [contracts/DEPLOYMENT.md](contracts/DEPLOYMENT.md)
3. **Customize**: Edit `lib/stellar-config.ts` for configuration

## Support

- Check [README.md](README.md) for detailed documentation
- Review [PROGRESS.md](PROGRESS.md) for implementation details
- See [SUMMARY.md](SUMMARY.md) for project overview

---

**Ready to demo in 2 minutes!** 🚀
