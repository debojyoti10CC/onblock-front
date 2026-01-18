#![no_std]
use soroban_sdk::{contract, contractimpl, contracttype, Address, Env, String, Vec};

#[contracttype]
#[derive(Clone)]
pub struct Stake {
    pub staker: Address,
    pub spending_limit: i128,      // In stroops
    pub time_bound: u64,           // Unix timestamp
    pub staked_at: u64,
    pub accumulated_fees: i128,
    pub is_active: bool,
}

#[contracttype]
pub enum DataKey {
    Stake(Address),
    SBTContract,
    TotalCapacity,
    ActiveStakers,
}

#[contract]
pub struct IdentityPoolContract;

#[contractimpl]
impl IdentityPoolContract {
    /// Initialize the contract with SBT contract address
    pub fn initialize(env: Env, sbt_contract: Address) {
        if env.storage().instance().has(&DataKey::SBTContract) {
            panic!("Already initialized");
        }
        env.storage().instance().set(&DataKey::SBTContract, &sbt_contract);
        env.storage().instance().set(&DataKey::TotalCapacity, &0i128);
        
        let empty_vec: Vec<Address> = Vec::new(&env);
        env.storage().instance().set(&DataKey::ActiveStakers, &empty_vec);
    }

    /// Stake identity with spending limits
    pub fn stake_identity(
        env: Env,
        staker: Address,
        spending_limit: i128,
        time_bound: u64,
    ) -> Result<(), String> {
        staker.require_auth();

        // Validate spending limits (100-10,000 USDC = 1,000,000 - 100,000,000 stroops)
        if spending_limit < 1_000_000 || spending_limit > 100_000_000 {
            return Err(String::from_str(&env, "Invalid spending limit"));
        }

        // Check if already staked
        if env.storage().persistent().has(&DataKey::Stake(staker.clone())) {
            return Err(String::from_str(&env, "Already staked"));
        }

        // TODO: In production, verify SBT with cross-contract call
        // For demo, we skip this check

        let stake = Stake {
            staker: staker.clone(),
            spending_limit,
            time_bound,
            staked_at: env.ledger().timestamp(),
            accumulated_fees: 0,
            is_active: true,
        };

        env.storage().persistent().set(&DataKey::Stake(staker.clone()), &stake);

        // Update total capacity
        let mut total_capacity: i128 = env.storage().instance().get(&DataKey::TotalCapacity).unwrap_or(0);
        total_capacity += spending_limit;
        env.storage().instance().set(&DataKey::TotalCapacity, &total_capacity);

        // Add to active stakers
        let mut active_stakers: Vec<Address> = env.storage().instance()
            .get(&DataKey::ActiveStakers)
            .unwrap_or(Vec::new(&env));
        active_stakers.push_back(staker);
        env.storage().instance().set(&DataKey::ActiveStakers, &active_stakers);

        Ok(())
    }

    /// Unstake identity and withdraw fees
    pub fn unstake_identity(env: Env, staker: Address) -> Result<i128, String> {
        staker.require_auth();

        if let Some(mut stake) = env.storage().persistent().get::<DataKey, Stake>(&DataKey::Stake(staker.clone())) {
            stake.is_active = false;
            let fees = stake.accumulated_fees;

            // Update total capacity
            let mut total_capacity: i128 = env.storage().instance().get(&DataKey::TotalCapacity).unwrap_or(0);
            total_capacity -= stake.spending_limit;
            env.storage().instance().set(&DataKey::TotalCapacity, &total_capacity);

            // Remove from active stakers
            let mut active_stakers: Vec<Address> = env.storage().instance()
                .get(&DataKey::ActiveStakers)
                .unwrap_or(Vec::new(&env));
            if let Some(index) = active_stakers.iter().position(|a| a == staker.clone()) {
                active_stakers.remove(index as u32);
            }
            env.storage().instance().set(&DataKey::ActiveStakers, &active_stakers);

            env.storage().persistent().set(&DataKey::Stake(staker), &stake);

            Ok(fees)
        } else {
            Err(String::from_str(&env, "Stake not found"))
        }
    }

    /// Get available capacity in the pool
    pub fn get_available_capacity(env: Env) -> i128 {
        env.storage().instance().get(&DataKey::TotalCapacity).unwrap_or(0)
    }

    /// Get stake details
    pub fn get_stake(env: Env, staker: Address) -> Option<Stake> {
        env.storage().persistent().get(&DataKey::Stake(staker))
    }

    /// Calculate mock APY (15% for demo)
    pub fn calculate_apy(env: Env) -> u32 {
        1500 // 15.00% in basis points
    }

    /// Claim accumulated earnings
    pub fn claim_earnings(env: Env, staker: Address) -> Result<i128, String> {
        staker.require_auth();

        if let Some(mut stake) = env.storage().persistent().get::<DataKey, Stake>(&DataKey::Stake(staker.clone())) {
            let fees = stake.accumulated_fees;
            stake.accumulated_fees = 0;
            env.storage().persistent().set(&DataKey::Stake(staker), &stake);
            Ok(fees)
        } else {
            Err(String::from_str(&env, "Stake not found"))
        }
    }

    /// Add fees to a staker (called by Dharma Pool)
    pub fn add_fees(env: Env, staker: Address, amount: i128) -> Result<(), String> {
        // In production, verify caller is Dharma Pool contract
        
        if let Some(mut stake) = env.storage().persistent().get::<DataKey, Stake>(&DataKey::Stake(staker.clone())) {
            stake.accumulated_fees += amount;
            env.storage().persistent().set(&DataKey::Stake(staker), &stake);
            Ok(())
        } else {
            Err(String::from_str(&env, "Stake not found"))
        }
    }

    /// Get all active stakers
    pub fn get_active_stakers(env: Env) -> Vec<Address> {
        env.storage().instance()
            .get(&DataKey::ActiveStakers)
            .unwrap_or(Vec::new(&env))
    }

    /// Check if staker is active
    pub fn is_active(env: Env, staker: Address) -> bool {
        if let Some(stake) = env.storage().persistent().get::<DataKey, Stake>(&DataKey::Stake(staker)) {
            stake.is_active && env.ledger().timestamp() < stake.time_bound
        } else {
            false
        }
    }
}

#[cfg(test)]
mod test {
    use super::*;
    use soroban_sdk::{testutils::Address as _, Env};

    #[test]
    fn test_stake_and_unstake() {
        let env = Env::default();
        let contract_id = env.register_contract(None, IdentityPoolContract);
        let client = IdentityPoolContractClient::new(&env, &contract_id);

        let sbt_contract = Address::generate(&env);
        let staker = Address::generate(&env);

        client.initialize(&sbt_contract);

        env.mock_all_auths();
        
        // Stake
        let result = client.stake_identity(&staker, &10_000_000, &(env.ledger().timestamp() + 86400));
        assert!(result.is_ok());

        // Check capacity
        assert_eq!(client.get_available_capacity(), 10_000_000);

        // Check stake
        let stake = client.get_stake(&staker).unwrap();
        assert_eq!(stake.spending_limit, 10_000_000);
        assert!(stake.is_active);

        // Unstake
        let fees = client.unstake_identity(&staker).unwrap();
        assert_eq!(fees, 0);
        assert_eq!(client.get_available_capacity(), 0);
    }

    #[test]
    fn test_fee_accumulation() {
        let env = Env::default();
        let contract_id = env.register_contract(None, IdentityPoolContract);
        let client = IdentityPoolContractClient::new(&env, &contract_id);

        let sbt_contract = Address::generate(&env);
        let staker = Address::generate(&env);

        client.initialize(&sbt_contract);

        env.mock_all_auths();
        client.stake_identity(&staker, &10_000_000, &(env.ledger().timestamp() + 86400)).unwrap();

        // Add fees
        client.add_fees(&staker, &1_000_000).unwrap();

        let stake = client.get_stake(&staker).unwrap();
        assert_eq!(stake.accumulated_fees, 1_000_000);

        // Claim fees
        let claimed = client.claim_earnings(&staker).unwrap();
        assert_eq!(claimed, 1_000_000);

        let stake = client.get_stake(&staker).unwrap();
        assert_eq!(stake.accumulated_fees, 0);
    }
}
