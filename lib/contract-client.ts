import {
  Contract,
  TransactionBuilder,
  Networks,
  BASE_FEE,
  Address,
  nativeToScVal,
  scValToNative,
  Horizon,
  rpc,
} from '@stellar/stellar-sdk';
import { STELLAR_CONFIG } from './stellar-config';

const server = new rpc.Server(STELLAR_CONFIG.sorobanRpcUrl);

export class ContractClient {
  private sbtContract: Contract | null = null;
  private identityPoolContract: Contract | null = null;
  private dharmaPoolContract: Contract | null = null;

  constructor() {
    // Only initialize contracts if IDs are provided
    if (STELLAR_CONFIG.contracts.sbt) {
      this.sbtContract = new Contract(STELLAR_CONFIG.contracts.sbt);
    }
    if (STELLAR_CONFIG.contracts.identityPool) {
      this.identityPoolContract = new Contract(STELLAR_CONFIG.contracts.identityPool);
    }
    if (STELLAR_CONFIG.contracts.dharmaPool) {
      this.dharmaPoolContract = new Contract(STELLAR_CONFIG.contracts.dharmaPool);
    }
  }

  private ensureContractsInitialized() {
    if (!this.sbtContract || !this.identityPoolContract || !this.dharmaPoolContract) {
      throw new Error(
        'Contracts not deployed. Please run the deployment script first:\n' +
        'Windows: .\\scripts\\deploy-contracts.ps1\n' +
        'Mac/Linux: ./scripts/deploy-contracts.sh'
      );
    }
  }

  // SBT Contract Methods
  async issueSBT(userAddress: string, kycHash: string): Promise<string> {
    this.ensureContractsInitialized();
    const account = await server.getAccount(userAddress);
    
    const transaction = new TransactionBuilder(account, {
      fee: BASE_FEE,
      networkPassphrase: Networks.TESTNET,
    })
      .addOperation(
        this.sbtContract!.call(
          'issue_sbt',
          Address.fromString(userAddress).toScVal(),
          nativeToScVal(kycHash, { type: 'bytes' })
        )
      )
      .setTimeout(30)
      .build();

    const prepared = await server.prepareTransaction(transaction);
    return prepared.toXDR();
  }

  async verifySBT(userAddress: string): Promise<boolean> {
    this.ensureContractsInitialized();
    try {
      const account = await server.getAccount(userAddress);
      
      const transaction = new TransactionBuilder(account, {
        fee: BASE_FEE,
        networkPassphrase: Networks.TESTNET,
      })
        .addOperation(
          this.sbtContract!.call(
            'verify_sbt',
            Address.fromString(userAddress).toScVal()
          )
        )
        .setTimeout(30)
        .build();

      const result = await server.simulateTransaction(transaction);
      
      if (rpc.Api.isSimulationSuccess(result)) {
        return scValToNative(result.result!.retval);
      }
      return false;
    } catch (error) {
      console.error('Error verifying SBT:', error);
      return false;
    }
  }

  // Identity Pool Methods
  async stakeIdentity(
    userAddress: string,
    spendingLimit: number,
    timeBound: number
  ): Promise<string> {
    this.ensureContractsInitialized();
    const account = await server.getAccount(userAddress);
    
    const transaction = new TransactionBuilder(account, {
      fee: BASE_FEE,
      networkPassphrase: Networks.TESTNET,
    })
      .addOperation(
        this.identityPoolContract!.call(
          'stake_identity',
          Address.fromString(userAddress).toScVal(),
          nativeToScVal(spendingLimit * 10000000, { type: 'i128' }),
          nativeToScVal(timeBound, { type: 'u64' })
        )
      )
      .setTimeout(30)
      .build();

    const prepared = await server.prepareTransaction(transaction);
    return prepared.toXDR();
  }

  async getStake(userAddress: string): Promise<any> {
    this.ensureContractsInitialized();
    try {
      const account = await server.getAccount(userAddress);
      
      const transaction = new TransactionBuilder(account, {
        fee: BASE_FEE,
        networkPassphrase: Networks.TESTNET,
      })
        .addOperation(
          this.identityPoolContract!.call(
            'get_stake',
            Address.fromString(userAddress).toScVal()
          )
        )
        .setTimeout(30)
        .build();

      const result = await server.simulateTransaction(transaction);
      
      if (rpc.Api.isSimulationSuccess(result)) {
        return scValToNative(result.result!.retval);
      }
      return null;
    } catch (error) {
      console.error('Error getting stake:', error);
      return null;
    }
  }

  async getAvailableCapacity(): Promise<number> {
    this.ensureContractsInitialized();
    try {
      const dummyAccount = await server.getAccount(
        'GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWHF'
      );
      
      const transaction = new TransactionBuilder(dummyAccount, {
        fee: BASE_FEE,
        networkPassphrase: Networks.TESTNET,
      })
        .addOperation(
          this.identityPoolContract!.call('get_available_capacity')
        )
        .setTimeout(30)
        .build();

      const result = await server.simulateTransaction(transaction);
      
      if (rpc.Api.isSimulationSuccess(result)) {
        return scValToNative(result.result!.retval) / 10000000;
      }
      return 0;
    } catch (error) {
      console.error('Error getting capacity:', error);
      return 0;
    }
  }

  // Dharma Pool Methods
  async requestCompliance(
    agentAddress: string,
    amount: number,
    duration: number
  ): Promise<string> {
    this.ensureContractsInitialized();
    const account = await server.getAccount(agentAddress);
    
    const transaction = new TransactionBuilder(account, {
      fee: BASE_FEE,
      networkPassphrase: Networks.TESTNET,
    })
      .addOperation(
        this.dharmaPoolContract!.call(
          'request_compliance',
          Address.fromString(agentAddress).toScVal(),
          nativeToScVal(amount * 10000000, { type: 'i128' }),
          nativeToScVal(duration, { type: 'u64' })
        )
      )
      .setTimeout(30)
      .build();

    const prepared = await server.prepareTransaction(transaction);
    return prepared.toXDR();
  }

  async revokeAllRails(userAddress: string): Promise<string> {
    this.ensureContractsInitialized();
    const account = await server.getAccount(userAddress);
    
    const transaction = new TransactionBuilder(account, {
      fee: BASE_FEE,
      networkPassphrase: Networks.TESTNET,
    })
      .addOperation(
        this.dharmaPoolContract!.call(
          'revoke_all_rails',
          Address.fromString(userAddress).toScVal()
        )
      )
      .setTimeout(30)
      .build();

    const prepared = await server.prepareTransaction(transaction);
    return prepared.toXDR();
  }

  async getAgentRails(agentAddress: string): Promise<any[]> {
    this.ensureContractsInitialized();
    try {
      const account = await server.getAccount(agentAddress);
      
      const transaction = new TransactionBuilder(account, {
        fee: BASE_FEE,
        networkPassphrase: Networks.TESTNET,
      })
        .addOperation(
          this.dharmaPoolContract!.call(
            'get_agent_rails',
            Address.fromString(agentAddress).toScVal()
          )
        )
        .setTimeout(30)
        .build();

      const result = await server.simulateTransaction(transaction);
      
      if (rpc.Api.isSimulationSuccess(result)) {
        return scValToNative(result.result!.retval) || [];
      }
      return [];
    } catch (error) {
      console.error('Error getting agent rails:', error);
      return [];
    }
  }

  async getUserRails(userAddress: string): Promise<any[]> {
    this.ensureContractsInitialized();
    try {
      const account = await server.getAccount(userAddress);
      
      const transaction = new TransactionBuilder(account, {
        fee: BASE_FEE,
        networkPassphrase: Networks.TESTNET,
      })
        .addOperation(
          this.dharmaPoolContract!.call(
            'get_user_rails',
            Address.fromString(userAddress).toScVal()
          )
        )
        .setTimeout(30)
        .build();

      const result = await server.simulateTransaction(transaction);
      
      if (rpc.Api.isSimulationSuccess(result)) {
        return scValToNative(result.result!.retval) || [];
      }
      return [];
    } catch (error) {
      console.error('Error getting user rails:', error);
      return [];
    }
  }

  // Helper: Submit signed transaction
  async submitTransaction(signedXDR: string): Promise<any> {
    const transaction = TransactionBuilder.fromXDR(signedXDR, Networks.TESTNET);
    
    const response = await server.sendTransaction(transaction as any);
    
    if (response.status === 'PENDING') {
      let getResponse = await server.getTransaction(response.hash);
      
      // Poll for result
      while (getResponse.status === rpc.Api.GetTransactionStatus.NOT_FOUND) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        getResponse = await server.getTransaction(response.hash);
      }
      
      if (getResponse.status === rpc.Api.GetTransactionStatus.SUCCESS) {
        return {
          success: true,
          hash: response.hash,
          result: getResponse.returnValue,
        };
      }
    }
    
    throw new Error('Transaction failed');
  }
}

export const contractClient = new ContractClient();
