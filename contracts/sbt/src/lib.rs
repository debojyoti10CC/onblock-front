#![no_std]
use soroban_sdk::{contract, contractimpl, contracttype, Address, BytesN, Env, String};

#[contracttype]
#[derive(Clone)]
pub struct SBT {
    pub owner: Address,
    pub kyc_hash: BytesN<32>,
    pub issued_at: u64,
    pub is_valid: bool,
}

#[contracttype]
pub enum DataKey {
    SBT(Address),
    Admin,
}

#[contract]
pub struct SBTContract;

#[contractimpl]
impl SBTContract {
    /// Initialize the contract with an admin
    pub fn initialize(env: Env, admin: Address) {
        if env.storage().instance().has(&DataKey::Admin) {
            panic!("Already initialized");
        }
        env.storage().instance().set(&DataKey::Admin, &admin);
    }

    /// Issue a new SBT to a user
    /// For demo purposes, anyone can issue (in production, only authorized anchors)
    pub fn issue_sbt(env: Env, owner: Address, kyc_hash: BytesN<32>) -> Result<(), String> {
        owner.require_auth();

        // Check if SBT already exists
        if env.storage().persistent().has(&DataKey::SBT(owner.clone())) {
            return Err(String::from_str(&env, "SBT already exists"));
        }

        let sbt = SBT {
            owner: owner.clone(),
            kyc_hash,
            issued_at: env.ledger().timestamp(),
            is_valid: true,
        };

        env.storage().persistent().set(&DataKey::SBT(owner.clone()), &sbt);
        
        Ok(())
    }

    /// Verify if an SBT exists and is valid
    pub fn verify_sbt(env: Env, owner: Address) -> bool {
        if let Some(sbt) = env.storage().persistent().get::<DataKey, SBT>(&DataKey::SBT(owner)) {
            sbt.is_valid
        } else {
            false
        }
    }

    /// Get SBT details
    pub fn get_sbt(env: Env, owner: Address) -> Option<SBT> {
        env.storage().persistent().get(&DataKey::SBT(owner))
    }

    /// Check if SBT is valid (helper function)
    pub fn is_valid(env: Env, owner: Address) -> bool {
        Self::verify_sbt(env, owner)
    }

    /// Revoke an SBT (for demo, owner can revoke their own)
    pub fn revoke_sbt(env: Env, owner: Address) -> Result<(), String> {
        owner.require_auth();

        if let Some(mut sbt) = env.storage().persistent().get::<DataKey, SBT>(&DataKey::SBT(owner.clone())) {
            sbt.is_valid = false;
            env.storage().persistent().set(&DataKey::SBT(owner), &sbt);
            Ok(())
        } else {
            Err(String::from_str(&env, "SBT not found"))
        }
    }

    /// Prevent transfer - SBTs are soulbound
    /// This is a placeholder to demonstrate the concept
    pub fn transfer(env: Env, _from: Address, _to: Address) -> Result<(), String> {
        Err(String::from_str(&env, "SBTs cannot be transferred"))
    }
}

#[cfg(test)]
mod test {
    use super::*;
    use soroban_sdk::{testutils::Address as _, Env};

    #[test]
    fn test_issue_and_verify_sbt() {
        let env = Env::default();
        let contract_id = env.register_contract(None, SBTContract);
        let client = SBTContractClient::new(&env, &contract_id);

        let admin = Address::generate(&env);
        let user = Address::generate(&env);
        let kyc_hash = BytesN::from_array(&env, &[1u8; 32]);

        // Initialize
        client.initialize(&admin);

        // Issue SBT
        env.mock_all_auths();
        let result = client.issue_sbt(&user, &kyc_hash);
        assert!(result.is_ok());

        // Verify SBT
        assert!(client.verify_sbt(&user));
        assert!(client.is_valid(&user));

        // Get SBT details
        let sbt = client.get_sbt(&user).unwrap();
        assert_eq!(sbt.owner, user);
        assert_eq!(sbt.kyc_hash, kyc_hash);
        assert!(sbt.is_valid);
    }

    #[test]
    fn test_transfer_blocked() {
        let env = Env::default();
        let contract_id = env.register_contract(None, SBTContract);
        let client = SBTContractClient::new(&env, &contract_id);

        let user1 = Address::generate(&env);
        let user2 = Address::generate(&env);

        env.mock_all_auths();
        let result = client.transfer(&user1, &user2);
        assert!(result.is_err());
    }

    #[test]
    fn test_revoke_sbt() {
        let env = Env::default();
        let contract_id = env.register_contract(None, SBTContract);
        let client = SBTContractClient::new(&env, &contract_id);

        let admin = Address::generate(&env);
        let user = Address::generate(&env);
        let kyc_hash = BytesN::from_array(&env, &[1u8; 32]);

        client.initialize(&admin);

        env.mock_all_auths();
        client.issue_sbt(&user, &kyc_hash).unwrap();
        assert!(client.is_valid(&user));

        // Revoke
        client.revoke_sbt(&user).unwrap();
        assert!(!client.is_valid(&user));
    }
}
