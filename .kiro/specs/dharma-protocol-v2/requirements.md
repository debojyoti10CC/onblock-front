# Requirements Document

## Introduction

Dharma Protocol v2.0 is an "Identity as Liquidity" platform that enables AI agents to execute regulated transactions by renting compliance capacity from human identity stakers on the Stellar/Soroban blockchain. The system creates a trust layer where verified humans stake their KYC credentials to provide authorization capacity, which AI agents can temporarily access through zero-knowledge proofs to perform compliant transactions without ever touching private keys or personal identity documents.

## Glossary

- **SBT (Soulbound Token)**: A non-transferable token on Soroban representing verified KYC status
- **Identity Pool**: A Soroban smart contract where users stake their SBT to provide authorization capacity
- **Dharma Pool**: The compliance verification layer that validates authorization capacity using ZK-proofs
- **BOT-X**: The AI agent that autonomously executes transactions using rented compliance
- **ZK-Proof Engine**: Zero-knowledge proof system that verifies compliance capacity without exposing PII
- **Compliance Rail**: Time-bound authorization token that allows an agent to execute regulated transactions
- **Kill Switch**: Instant revocation mechanism that voids an agent's session key
- **SEP-8**: Stellar Ecosystem Proposal 8 standard for regulated asset movement
- **Target Protocol**: The DEX or protocol where the agent executes transactions
- **Human Staker**: A verified user who stakes their identity to earn passive income
- **Query Fee**: The ₹8 fee charged when an agent requests compliance capacity (12% to Dharma, 88% to stakers)

## Requirements

### Requirement 1: Human Identity Verification and Onboarding

**User Story:** As a human staker, I want to verify my identity and receive a soulbound token, so that I can stake my compliance capacity and earn passive income.

#### Acceptance Criteria

1. WHEN a user completes KYC verification through an anchor, THE Identity Pool SHALL issue a non-transferable SBT to the user's Stellar account
2. THE SBT SHALL contain cryptographic attestation of the user's verified KYC status without storing PII on-chain
3. WHEN a user receives an SBT, THE Identity Pool SHALL enable the user to view their token in the staking dashboard
4. THE Identity Pool SHALL reject any attempt to transfer an SBT to another account
5. IF a user's KYC status expires or is revoked, THEN THE Identity Pool SHALL mark the SBT as invalid

### Requirement 2: Identity Staking and Pool Management

**User Story:** As a human staker, I want to stake my SBT with spending limits and time bounds, so that I can control how my identity is used while earning fees.

#### Acceptance Criteria

1. WHEN a user stakes their SBT, THE Identity Pool SHALL record the stake with user-defined spending limits and time-bound permissions
2. THE Identity Pool SHALL display the user's potential APY based on current demand for compliance capacity
3. WHILE a user's SBT is staked, THE Identity Pool SHALL make the compliance capacity available for agent queries
4. THE Identity Pool SHALL enforce spending limits not exceeding the maximum amount specified by the staker
5. WHEN a time-bound permission expires, THE Identity Pool SHALL automatically revoke the compliance capacity

### Requirement 3: Zero-Knowledge Proof Verification

**User Story:** As a human staker, I want my compliance to be verified without exposing my personal information, so that my privacy is protected while enabling agent transactions.

#### Acceptance Criteria

1. WHEN an agent requests compliance capacity, THE ZK-Proof Engine SHALL verify authorization without revealing the staker's PII
2. THE ZK-Proof Engine SHALL generate a cryptographic proof that confirms sufficient compliance capacity exists in the pool
3. THE Dharma Pool SHALL validate ZK-proofs within 2 seconds to enable real-time agent operations
4. IF insufficient compliance capacity exists, THEN THE Dharma Pool SHALL reject the agent's query request
5. THE ZK-Proof Engine SHALL ensure that no PII is transmitted to the agent or Target Protocol

### Requirement 4: Fee Distribution and Revenue Sharing

**User Story:** As a human staker, I want to receive 88% of query fees automatically, so that I earn passive income from my staked identity.

#### Acceptance Criteria

1. WHEN an agent pays a query fee, THE Dharma Pool SHALL distribute 12% to the protocol treasury and 88% to human stakers
2. THE Dharma Pool SHALL calculate each staker's share proportionally based on their staked compliance capacity
3. THE Dharma Pool SHALL execute fee distribution within 5 seconds of query completion
4. THE Dharma Pool SHALL maintain an auditable ledger of all fee distributions on-chain
5. WHEN a staker unstakes their SBT, THE Identity Pool SHALL transfer all accumulated earnings to the staker's account

### Requirement 5: AI Agent Authorization and Compliance Rental

**User Story:** As an AI agent (BOT-X), I want to rent compliance capacity through time-bound ZK-proofs, so that I can execute regulated transactions autonomously without holding private keys.

#### Acceptance Criteria

1. WHEN BOT-X identifies a transaction opportunity, THE agent SHALL request a Compliance Rail from the Dharma Pool
2. THE Dharma Pool SHALL issue a time-bound ZK-proof that authorizes the agent to execute transactions within spending limits
3. THE agent SHALL submit the query fee payment before receiving the Compliance Rail
4. WHILE the Compliance Rail is active, THE agent SHALL execute transactions on the Target Protocol using the authorization
5. WHEN the time-bound period expires, THE Dharma Pool SHALL automatically invalidate the Compliance Rail

### Requirement 6: DEX Integration and Transaction Execution

**User Story:** As an AI agent, I want to execute swaps on a Stellar DEX using rented compliance, so that I can perform regulated transactions without direct KYC.

#### Acceptance Criteria

1. WHEN BOT-X receives a valid Compliance Rail, THE agent SHALL connect to the Target Protocol DEX
2. THE agent SHALL execute swap transactions within the spending limits defined by the Compliance Rail
3. THE Target Protocol SHALL accept the ZK-proof as valid authorization for regulated asset movement
4. THE agent SHALL complete transactions without accessing the human staker's private keys or identity documents
5. IF a transaction exceeds spending limits, THEN THE Target Protocol SHALL reject the transaction

### Requirement 7: SEP-8 Compliance Integration

**User Story:** As a protocol operator, I want to integrate SEP-8 standards for regulated assets, so that all transactions comply with Stellar ecosystem requirements.

#### Acceptance Criteria

1. THE Dharma Pool SHALL implement SEP-8 approval server logic for regulated asset transfers
2. WHEN an agent requests asset movement, THE Dharma Pool SHALL validate compliance capacity before approving the transaction
3. THE Dharma Pool SHALL communicate with SEP-8 compliant anchors to ensure regulatory requirements are met
4. THE Dharma Pool SHALL reject transactions that violate SEP-8 compliance rules
5. THE Dharma Pool SHALL log all SEP-8 approval decisions for audit purposes

### Requirement 8: Instant Revocation and Kill Switch

**User Story:** As a human staker, I want to instantly revoke an agent's access to my compliance capacity, so that I maintain full control over my staked identity.

#### Acceptance Criteria

1. WHEN a staker activates the Kill Switch, THE Identity Pool SHALL immediately void all active Compliance Rails associated with their SBT
2. THE Identity Pool SHALL execute revocation within 1 second of the Kill Switch activation
3. WHEN a Compliance Rail is revoked, THE agent SHALL be unable to execute any further transactions using that authorization
4. THE Identity Pool SHALL notify the agent that their Compliance Rail has been revoked
5. THE Identity Pool SHALL allow the staker to view all active Compliance Rails before revocation

### Requirement 9: Dashboard and User Interface

**User Story:** As a human staker, I want a dashboard to manage my staked identity and view earnings, so that I can monitor my participation in the protocol.

#### Acceptance Criteria

1. THE dashboard SHALL display the user's SBT status, staking amount, and current APY
2. THE dashboard SHALL allow users to set spending limits between 0 and 10,000 USDC
3. THE dashboard SHALL allow users to set time-bound permissions between 1 hour and 30 days
4. THE dashboard SHALL display real-time earnings from query fees
5. THE dashboard SHALL provide a one-click Kill Switch button to revoke all active authorizations

### Requirement 10: End-to-End Transaction Flow

**User Story:** As a protocol user, I want to see a complete flow from staking to agent execution to fee earning, so that I understand the value proposition of the protocol.

#### Acceptance Criteria

1. THE system SHALL support the complete flow: Human Stakes → Agent Scans Market → Agent Rents Compliance → Agent Swaps → Human Earns Fee
2. THE system SHALL complete the entire flow within 30 seconds for a typical swap transaction
3. THE system SHALL provide transaction status updates at each stage of the flow
4. THE system SHALL record all flow events on-chain for transparency and auditability
5. WHEN the flow completes successfully, THE system SHALL display the earned fees to the human staker
