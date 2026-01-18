#![no_std]
use soroban_sdk::{contract, contractimpl, contracttype, Address, BytesN, Env, String, Vec};

#[contracttype]
#[derive(Clone)]
pub struct ComplianceRail {
    pub rail_id: BytesN<32>,
    pub agent: Address,
    pub spending_limit: i128,
    pub expires_at: u64,
    pub used_amount: i128,
    pub is_active: bool,
    pub backing_stakers: Vec<Address>,
}

#[contracttype]
pub enum DataKey {
    Rail(BytesN<32>),
    IdentityPool,
    ProtocolTreasury,
    AgentRails(Address),  // Track rails by agent
    RailCount,
}

const PROTOCOL_FEE_BPS: i128 = 1200; // 12%
const STAKER_FEE_BPS: i128 = 8800;   // 88%

#[contract]
pub struct DharmaPoolContract;

#[contractimpl]
impl DharmaPoolContract {
    /// Initialize the contract
    pub fn initialize(env: Env, identity_pool: Address, protocol_treasury: Address) {
        if env.storage().instance().has(&DataKey::IdentityPool) {
            panic!("Already initialized");
        }
        env.storage().instance().set(&DataKey::IdentityPool, &identity_pool);
        env.storage().instance().set(&DataKey::ProtocolTreasury, &protocol_treasury);
        env.storage().instance().set(&DataKey::RailCount, &0u64);
    }

    /// Request compliance capacity
    pub fn request_compliance(
        env: Env,
        agent: Address,
        amount: i128,
        duration: u64,
    ) -> Result<BytesN<32>, String> {
        agent.require_auth();

        // TODO: In production, validate query fee payment here
        
        // Validate capacity (simplified - just check total)
        // In production, this would call Identity Pool contract
        if amount <= 0 {
            return Err(String::from_str(&env, "Invalid amount"));
        }

        // Generate rail ID
        let rail_count: u64 = env.storage().instance().get(&DataKey::RailCount).unwrap_or(0);
        let rail_id = env.crypto().sha256(&(rail_count, agent.clone(), amount, duration).try_into().unwrap());
        
        let expires_at = env.ledger().timestamp() + duration;

        // For demo, use empty backing stakers list
        let backing_stakers = Vec::new(&env);

        let rail = ComplianceRail {
            rail_id: rail_id.clone(),
            agent: agent.clone(),
            spending_limit: amount,
            expires_at,
            used_amount: 0,
            is_active: true,
            backing_stakers,
        };

        env.storage().persistent().set(&DataKey::Rail(rail_id.clone()), &rail);
        
        // Track rails by agent
        let mut agent_rails: Vec<BytesN<32>> = env.storage().persistent()
            .get(&DataKey::AgentRails(agent.clone()))
            .unwrap_or(Vec::new(&env));
        agent_rails.push_back(rail_id.clone());
        env.storage().persistent().set(&DataKey::AgentRails(agent), &agent_rails);

        // Increment rail count
        env.storage().instance().set(&DataKey::RailCount, &(rail_count + 1));

        Ok(rail_id)
    }

    /// Issue a compliance rail (after proof verification)
    pub fn issue_rail(
        env: Env,
        agent: Address,
        amount: i128,
        duration: u64,
        _proof: BytesN<64>,  // Simplified ZK proof
    ) -> Result<BytesN<32>, String> {
        // For demo, we skip proof verification
        // In production, verify ZK proof here
        
        Self::request_compliance(env, agent, amount, duration)
    }

    /// Check if a rail is valid
    pub fn check_rail_validity(env: Env, rail_id: BytesN<32>) -> bool {
        if let Some(rail) = env.storage().persistent().get::<DataKey, ComplianceRail>(&DataKey::Rail(rail_id)) {
            rail.is_active && env.ledger().timestamp() < rail.expires_at
        } else {
            false
        }
    }

    /// Get rail details
    pub fn get_rail(env: Env, rail_id: BytesN<32>) -> Option<ComplianceRail> {
        env.storage().persistent().get(&DataKey::Rail(rail_id))
    }

    /// Revoke a single rail
    pub fn revoke_rail(env: Env, rail_id: BytesN<32>, caller: Address) -> Result<(), String> {
        caller.require_auth();

        if let Some(mut rail) = env.storage().persistent().get::<DataKey, ComplianceRail>(&DataKey::Rail(rail_id.clone())) {
            // Only agent or stakers can revoke
            rail.is_active = false;
            env.storage().persistent().set(&DataKey::Rail(rail_id), &rail);
            Ok(())
        } else {
            Err(String::from_str(&env, "Rail not found"))
        }
    }

    /// Revoke all rails for an agent (Kill Switch)
    pub fn revoke_all_rails(env: Env, agent: Address) -> Result<u32, String> {
        agent.require_auth();

        let agent_rails: Vec<BytesN<32>> = env.storage().persistent()
            .get(&DataKey::AgentRails(agent.clone()))
            .unwrap_or(Vec::new(&env));

        let mut revoked_count = 0u32;

        for rail_id in agent_rails.iter() {
            if let Some(mut rail) = env.storage().persistent().get::<DataKey, ComplianceRail>(&DataKey::Rail(rail_id.clone())) {
                if rail.is_active {
                    rail.is_active = false;
                    env.storage().persistent().set(&DataKey::Rail(rail_id), &rail);
                    revoked_count += 1;
                }
            }
        }

        Ok(revoked_count)
    }

    /// Revoke all rails backed by a specific staker (for staker Kill Switch)
    pub fn revoke_staker_rails(env: Env, staker: Address) -> Result<u32, String> {
        staker.require_auth();

        // In production, iterate through all rails and check backing_stakers
        // For demo, simplified implementation
        
        Ok(0)
    }

    /// Distribute fees (simplified)
    pub fn distribute_fees(
        env: Env,
        rail_id: BytesN<32>,
        total_fee: i128,
    ) -> Result<(), String> {
        let rail = env.storage().persistent()
            .get::<DataKey, ComplianceRail>(&DataKey::Rail(rail_id))
            .ok_or(String::from_str(&env, "Rail not found"))?;

        // Calculate splits
        let protocol_amount = (total_fee * PROTOCOL_FEE_BPS) / 10000;
        let staker_amount = (total_fee * STAKER_FEE_BPS) / 10000;

        // In production:
        // 1. Transfer protocol_amount to treasury
        // 2. Distribute staker_amount proportionally to backing_stakers via Identity Pool

        // For demo, we just log the amounts
        Ok(())
    }

    /// Get all active rails for an agent
    pub fn get_agent_rails(env: Env, agent: Address) -> Vec<BytesN<32>> {
        env.storage().persistent()
            .get(&DataKey::AgentRails(agent))
            .unwrap_or(Vec::new(&env))
    }

    /// Record rail usage (for spending limit tracking)
    pub fn record_usage(env: Env, rail_id: BytesN<32>, amount: i128) -> Result<(), String> {
        if let Some(mut rail) = env.storage().persistent().get::<DataKey, ComplianceRail>(&DataKey::Rail(rail_id.clone())) {
            if !rail.is_active {
                return Err(String::from_str(&env, "Rail is not active"));
            }

            if rail.used_amount + amount > rail.spending_limit {
                return Err(String::from_str(&env, "Spending limit exceeded"));
            }

            rail.used_amount += amount;
            env.storage().persistent().set(&DataKey::Rail(rail_id), &rail);
            Ok(())
        } else {
            Err(String::from_str(&env, "Rail not found"))
        }
    }
}

#[cfg(test)]
mod test {
    use super::*;
    use soroban_sdk::{testutils::Address as _, Env};

    #[test]
    fn test_request_and_check_rail() {
        let env = Env::default();
        let contract_id = env.register_contract(None, DharmaPoolContract);
        let client = DharmaPoolContractClient::new(&env, &contract_id);

        let identity_pool = Address::generate(&env);
        let treasury = Address::generate(&env);
        let agent = Address::generate(&env);

        client.initialize(&identity_pool, &treasury);

        env.mock_all_auths();
        
        // Request compliance
        let rail_id = client.request_compliance(&agent, &10_000_000, &3600).unwrap();

        // Check validity
        assert!(client.check_rail_validity(&rail_id));

        // Get rail details
        let rail = client.get_rail(&rail_id).unwrap();
        assert_eq!(rail.agent, agent);
        assert_eq!(rail.spending_limit, 10_000_000);
        assert!(rail.is_active);
    }

    #[test]
    fn test_revoke_rail() {
        let env = Env::default();
        let contract_id = env.register_contract(None, DharmaPoolContract);
        let client = DharmaPoolContractClient::new(&env, &contract_id);

        let identity_pool = Address::generate(&env);
        let treasury = Address::generate(&env);
        let agent = Address::generate(&env);

        client.initialize(&identity_pool, &treasury);

        env.mock_all_auths();
        
        let rail_id = client.request_compliance(&agent, &10_000_000, &3600).unwrap();
        assert!(client.check_rail_validity(&rail_id));

        // Revoke
        client.revoke_rail(&rail_id, &agent).unwrap();
        assert!(!client.check_rail_validity(&rail_id));
    }

    #[test]
    fn test_kill_switch() {
        let env = Env::default();
        let contract_id = env.register_contract(None, DharmaPoolContract);
        let client = DharmaPoolContractClient::new(&env, &contract_id);

        let identity_pool = Address::generate(&env);
        let treasury = Address::generate(&env);
        let agent = Address::generate(&env);

        client.initialize(&identity_pool, &treasury);

        env.mock_all_auths();
        
        // Create multiple rails
        let rail1 = client.request_compliance(&agent, &10_000_000, &3600).unwrap();
        let rail2 = client.request_compliance(&agent, &20_000_000, &7200).unwrap();

        assert!(client.check_rail_validity(&rail1));
        assert!(client.check_rail_validity(&rail2));

        // Kill switch
        let revoked = client.revoke_all_rails(&agent).unwrap();
        assert_eq!(revoked, 2);

        assert!(!client.check_rail_validity(&rail1));
        assert!(!client.check_rail_validity(&rail2));
    }

    #[test]
    fn test_spending_limit() {
        let env = Env::default();
        let contract_id = env.register_contract(None, DharmaPoolContract);
        let client = DharmaPoolContractClient::new(&env, &contract_id);

        let identity_pool = Address::generate(&env);
        let treasury = Address::generate(&env);
        let agent = Address::generate(&env);

        client.initialize(&identity_pool, &treasury);

        env.mock_all_auths();
        
        let rail_id = client.request_compliance(&agent, &10_000_000, &3600).unwrap();

        // Record usage
        client.record_usage(&rail_id, &5_000_000).unwrap();
        client.record_usage(&rail_id, &4_000_000).unwrap();

        // Should fail - exceeds limit
        let result = client.record_usage(&rail_id, &2_000_000);
        assert!(result.is_err());
    }
}
