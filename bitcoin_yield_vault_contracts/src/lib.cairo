#[starknet::interface]
pub trait IBitcoinYieldVault<TContractState> {
    // This allows the user to make deposits
    fn deposit(ref self: TContractState, amount: u256);
}


#[starknet::contract]
mod BitCoinYieldVault {
    use openzeppelin::token::erc20::interface::{IERC20Dispatcher, IERC20DispatcherTrait};
    use starknet::storage::{
        Map, StoragePathEntry, StoragePointerReadAccess, StoragePointerWriteAccess,
    };
    use starknet::{ContractAddress, get_block_timestamp, get_caller_address, get_contract_address};


    #[storage]
    struct Storage {
        owner: ContractAddress,
        usdc_token: ContractAddress,
        vesu_pool: ContractAddress,
        //Vesu receipt token
        vesu_shares: u256,
        // we need to track the deposits a user makes
        user_deposits: Map<ContractAddress, u256>,
        user_timestamps: Map<ContractAddress, u64>,
        total_deposited: u256,
    }
    // we need to set this when deploying the contract
    // so let's pass them to the constructor
    fn constructor(
        ref self: ContractState,
        owner: ContractAddress,
        usdc_token: ContractAddress,
        vesu_pool: ContractAddress,
    ) {
        self.owner.write(owner);
        self.usdc_token.write(usdc_token);
        self.vesu_pool.write(vesu_pool);
        self.total_deposited.write(0);
    }
    // Events we want to emit
    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        Deposit: Deposit,
    }

    #[derive(Drop, starknet::Event)]
    struct Deposit {
        #[key]
        user: ContractAddress,
        amount: u256,
        timestamp: u64,
    }

    #[abi(embed_v0)]
    impl BitcoinYieldVaultImpl of super::IBitcoinYieldVault<ContractState> {
        fn deposit(ref self: ContractState, amount: u256) {
            assert(amount > 0, 'Amount must be greater than 0!');
            //get the caller address
            let caller = get_caller_address();
            let contract = get_contract_address();
            let timestamp = get_block_timestamp();
            // Now we can get usdc from the user to the vault

            let usdc = IERC20Dispatcher { contract_address: self.usdc_token.read() };
            let success = usdc.transfer_from(caller, contract, amount);
            assert(success, 'USDC transfer failed');

            // update the storage
            let current_deposit = self.user_deposits.entry(caller).read();
            self.user_deposits.entry(caller).write(current_deposit + amount);
            if current_deposit == 0 {
                self.user_timestamps.entry(caller).write(timestamp);
            }
            let total = self.total_deposited.read();
            self.total_deposited.write(total + amount);
            self.emit(Deposit { user: caller, amount, timestamp });
        }
    }
}
