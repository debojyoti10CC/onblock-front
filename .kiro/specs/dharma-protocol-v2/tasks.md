# Implementation Plan - 12 Hour Sprint

**CRITICAL NOTE**: This is a 12-hour sprint to create a working demo. Strategy: Build a simplified but impressive proof-of-concept that showcases "Identity as Liquidity" with strategic mocking where needed.

**Key Simplifications**:
- Mock ZK-proofs (use simple hash verification instead of full ZK)
- Skip SEP-8 integration (demonstrate concept without full compliance)
- Use simulated agent instead of full AI (scripted behavior)
- Focus on visual demo flow over production-ready code
- Deploy to testnet only

## Phase 1: Foundation & Smart Contracts (Hours 0-4)

- [x] 1. Project setup and boilerplate

  - [x] 1.1 Initialize Next.js frontend with existing components


    - Use existing Next.js setup in workspace
    - Install Stellar SDK: `npm install @stellar/stellar-sdk`
    - Install Freighter wallet adapter
    - Configure Tailwind with existing setup
    - _Requirements: 1.1, 9.1_
  


  - [ ] 1.2 Set up Soroban contract workspace
    - Initialize Rust workspace for contracts: `cargo new --lib dharma-contracts`
    - Add Soroban SDK dependencies to Cargo.toml
    - Configure for testnet deployment

    - Create contract build scripts


    - _Requirements: 1.1, 2.1_

- [ ] 2. Implement minimal SBT contract
  - [ ] 2.1 Create simplified SBT contract
    - Define SBT struct (owner, kyc_hash, issued_at, is_valid)

    - Implement issue_sbt function (no anchor check for demo)
    - Implement verify_sbt function
    - Add simple transfer prevention
    - _Requirements: 1.1, 1.2, 1.4_

  


  - [ ] 2.2 Deploy SBT contract to testnet
    - Build contract with `soroban contract build`
    - Deploy to Stellar testnet
    - Save contract ID for frontend integration
    - _Requirements: 1.1, 1.2_


- [ ] 3. Implement Identity Pool contract
  - [ ] 3.1 Create Identity Pool with staking logic
    - Define Stake struct (staker, spending_limit, accumulated_fees)

    - Implement stake_identity function


    - Implement get_available_capacity function
    - Add simple fee accumulation tracking
    - _Requirements: 2.1, 2.2, 2.3, 4.2_
  
  - [x] 3.2 Deploy Identity Pool to testnet

    - Build and deploy contract
    - Test staking from Stellar CLI
    - Save contract ID
    - _Requirements: 2.1, 2.2_


- [ ] 4. Implement Dharma Pool contract (core logic)
  - [ ] 4.1 Create Dharma Pool with rail issuance
    - Define ComplianceRail struct (rail_id, agent, spending_limit, expires_at)
    - Implement request_compliance function
    - Implement issue_rail function with mock proof verification
    - Add revoke_rail and revoke_all_rails for Kill Switch

    - _Requirements: 3.1, 3.2, 5.1, 5.2, 8.1, 8.2_

  
  - [ ] 4.2 Implement fee distribution
    - Add distribute_fees function with 12%/88% split
    - Implement cross-contract call to Identity Pool for fee updates
    - Keep it simple - proportional distribution to all stakers
    - _Requirements: 4.1, 4.2, 4.3_

  

  - [ ] 4.3 Deploy Dharma Pool to testnet
    - Build and deploy contract
    - Test rail issuance from CLI
    - Verify fee distribution works


    - _Requirements: 3.1, 4.1, 5.1_

## Phase 2: Frontend Dashboard (Hours 4-7)

- [ ] 5. Build core frontend pages
  - [x] 5.1 Create wallet connection and layout

    - Add Freighter wallet connect button to existing layout
    - Create wallet context for state management


    - Add navigation between pages
    - Style with existing Tailwind setup
    - _Requirements: 9.1_
  
  - [x] 5.2 Build simplified onboarding page



    - Create /onboard route
    - Add "Mock KYC" button that auto-issues SBT
    - Display SBT confirmation with contract interaction
    - Show success state with SBT details
    - _Requirements: 1.1, 1.3, 9.1_

  
  - [x] 5.3 Build staking page


    - Create /stake route
    - Add spending limit input (simple number input, 100-10000)
    - Add time-bound selector (dropdown: 1h, 6h, 24h)
    - Display mock APY (hardcoded 15% for demo)
    - Implement stake button with contract call
    - Show staking success with transaction hash
    - _Requirements: 2.1, 2.2, 9.2, 9.3_

- [ ] 6. Build dashboard with Kill Switch
  - [ ] 6.1 Create main dashboard page
    - Create /dashboard route
    - Display staked amount and accumulated fees
    - Show mock APY and earnings projection
    - Add simple transaction history (from contract events)
    - _Requirements: 9.1, 9.4_
  
  - [ ] 6.2 Implement active rails display
    - Create component to list active Compliance Rails
    - Show rail details: agent address, amount, expiration countdown
    - Add usage progress bar for each rail
    - _Requirements: 8.5, 9.4_
  
  - [ ] 6.3 Implement Kill Switch
    - Create large red "KILL SWITCH" button
    - Add confirmation modal with warning
    - Implement revoke_all_rails contract call
    - Show success animation and revoked rails count

    - Add visual feedback (< 1 second)
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_

## Phase 3: Agent Simulation & Integration (Hours 7-10)

- [ ] 7. Create simulated AI agent
  - [ ] 7.1 Build simple agent script
    - Create Node.js script (not full AI, just scripted behavior)
    - Implement Stellar SDK integration
    - Add agent wallet with test XLM
    - Create mock "market scanning" with console logs
    - _Requirements: 5.1, 6.1_
  
  - [ ] 7.2 Implement compliance request flow
    - Add function to call Dharma Pool request_compliance
    - Pay mock query fee (0.1 XLM for demo)
    - Receive and store Compliance Rail
    - Log rail details to console
    - _Requirements: 5.1, 5.2, 5.3_
  
  - [ ] 7.3 Implement mock swap execution
    - Create function to simulate DEX swap
    - Use Compliance Rail for authorization
    - Execute simple path payment on Stellar testnet
    - Log transaction success
    - _Requirements: 6.1, 6.2, 6.4_
  
  - [x] 7.4 Add agent monitoring page

    - Create /agent route in frontend
    - Display agent status (running/stopped)
    - Show active rails and recent transactions
    - Add start/stop buttons (triggers agent script)
    - Display live logs from agent
    - _Requirements: 5.4, 6.1_

- [ ] 8. Integrate all components end-to-end
  - [x] 8.1 Connect frontend to deployed contracts



    - Update contract IDs in frontend config
    - Test all contract interactions from UI
    - Verify transaction signing with Freighter
    - Fix any integration issues
    - _Requirements: 9.1, 9.2, 9.3, 9.4_
  
  - [ ] 8.2 Test complete user flow
    - Test: Connect wallet → Mock KYC → Receive SBT
    - Test: Stake identity with limits
    - Test: View dashboard and earnings
    - Test: Agent requests compliance
    - Test: Agent executes swap
    - Test: Fees distributed to staker
    - Test: Kill Switch revokes rails
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_
  
  - [ ] 8.3 Add visual polish
    - Add loading spinners for transactions
    - Implement toast notifications for success/errors
    - Add smooth transitions between states
    - Create simple animations for key actions
    - _Requirements: 9.1, 9.2, 9.3, 9.4_

## Phase 4: Demo Preparation (Hours 10-12)

- [ ] 9. Prepare demo environment
  - [ ] 9.1 Create demo accounts
    - Set up 2-3 test Stellar accounts with testnet XLM
    - Pre-stake identity on one account
    - Fund agent wallet
    - Test all accounts work correctly
    - _Requirements: 10.1, 10.2_
  
  - [ ] 9.2 Create demo script
    - Write step-by-step demo flow
    - Prepare talking points for each step
    - Time the demo (aim for 3-5 minutes)
    - Practice demo flow 2-3 times
    - _Requirements: 10.1, 10.2, 10.3_

- [ ] 10. Record demo video
  - [ ] 10.1 Record screen capture
    - Record complete flow: stake → agent scans → swap → earnings → Kill Switch
    - Narrate each step explaining the concept
    - Show contract interactions on Stellar Expert
    - Highlight key features (privacy, control, earnings)
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_
  
  - [ ] 10.2 Create backup slides
    - Create 5-7 slides explaining concept
    - Include architecture diagram
    - Add demo screenshots
    - Prepare for live demo backup
    - _Requirements: 10.1, 10.2_

- [ ] 11. Final polish and deployment
  - [ ] 11.1 Deploy frontend to Vercel
    - Push code to GitHub
    - Deploy to Vercel with one-click
    - Test deployed version
    - Fix any production issues
    - _Requirements: 10.1_
  
  - [ ] 11.2 Create README and documentation
    - Write clear README with project description
    - Add setup instructions
    - Include demo video link
    - Document contract addresses
    - Add architecture diagram
    - _Requirements: 10.1, 10.2_
  
  - [ ] 11.3 Final testing
    - Test complete flow on deployed site
    - Verify all contracts work on testnet
    - Check agent script runs correctly
    - Ensure demo is stable
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_

## Success Criteria

By the end of 12 hours, you should have:

✅ **Working Smart Contracts**: SBT, Identity Pool, Dharma Pool deployed to Stellar testnet
✅ **Functional Frontend**: Onboarding, staking, dashboard with Kill Switch
✅ **Agent Demo**: Simulated agent that requests compliance and executes swaps
✅ **End-to-End Flow**: Complete demo from stake to earnings
✅ **Video Demo**: 3-5 minute recorded demonstration
✅ **Deployed Site**: Live demo on Vercel
✅ **Documentation**: Clear README explaining the project

## What We're Skipping (Can Add Later)

- Full ZK-SNARK implementation (using simple hash verification)
- SEP-8 compliance integration (concept demonstrated without full implementation)
- Real AI agent with LangChain (using scripted behavior)
- Comprehensive testing (focus on demo stability)
- Advanced UI animations (keep it clean and functional)
- Multi-staker proportional distribution (simplified to equal distribution)
- Production security audits (testnet only)

## Time Management Tips

- **Hour 0-1**: Project setup, don't get stuck on tooling
- **Hour 1-3**: Smart contracts, keep them minimal
- **Hour 3-4**: Deploy contracts, test with CLI
- **Hour 4-6**: Frontend core pages, focus on functionality
- **Hour 6-7**: Dashboard and Kill Switch, make it visual
- **Hour 7-9**: Agent simulation, keep it simple
- **Hour 9-10**: Integration and testing, fix critical bugs only
- **Hour 10-11**: Demo prep and recording
- **Hour 11-12**: Deploy, document, final polish

**Remember**: A working simple demo beats a broken complex one. Focus on the core "Identity as Liquidity" story!
