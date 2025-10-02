use starknet::ContractAddress;
#[starknet::interface]
trait IVesuPool<TContractState> {
    fn supply(
        ref self: TContractState,
        asset: ContractAddress,
        amount: u256,
        on_behalf_of: ContractAddress,
        referral_code: u16,
    ) -> bool;
    fn withdraw(
        ref self: TContractState, asset: ContractAddress, amount: u256, to: ContractAddress,
    ) -> u256;
    fn get_user_balance(
        self: @TContractState, user: ContractAddress, asset: ContractAddress,
    ) -> u256;
    fn get_reserve_normalized_income(self: @TContractState, asset: ContractAddress) -> u256;
}
#[starknet::interface]
pub trait IBitcoinYieldVault<TContractState> {
    // This allows the user to make deposits
    fn deposit(ref self: TContractState, amount: u256);
}
#[derive(Drop, starknet::Event)]
struct Deposit {
    #[key]
    user: ContractAddress,
    amount: u256,
    timestamp: u64,
}
#[derive(Drop, starknet::Event)]
struct VesuDepositExecuted {
    amount: u256,
    timestamp: u64,
}


#[starknet::contract]
mod BitCoinYieldVault {
    use openzeppelin::token::erc20::interface::{IERC20Dispatcher, IERC20DispatcherTrait};
    use starknet::storage::{
        Map, StoragePathEntry, StoragePointerReadAccess, StoragePointerWriteAccess,
    };
    use starknet::{ContractAddress, get_block_timestamp, get_caller_address, get_contract_address};
    use super::{Deposit, IVesuPoolDispatcher, IVesuPoolDispatcherTrait, VesuDepositExecuted};
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
        is_paused: bool,
    }
    // we need to set this when deploying the contract
    // so let's pass them to the constructor
    #[constructor]
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
        self.is_paused.write(false);
    }
    // Events we want to emit
    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        Deposit: Deposit,
        VesuDepositExecuted: VesuDepositExecuted,
    }


    #[abi(embed_v0)]
    impl BitcoinYieldVaultImpl of super::IBitcoinYieldVault<ContractState> {
        fn deposit(ref self: ContractState, amount: u256) {
            assert(!self.is_paused.read(), 'Contract is paused');
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
            self._deposit_to_vesu(amount);
            self.emit(Deposit { user: caller, amount, timestamp });
        }
    }
    //internal functions
    #[generate_trait]
    impl InternalFunctions of InternalFunctionsTrait {
        fn _deposit_to_vesu(ref self: ContractState, amount: u256) {
            let contract = get_contract_address();
            let usdc_address = self.usdc_token.read();
            let vesu_address = self.vesu_pool.read();

            //we need to approve Vesu to spend our USDC
            let usdc = IERC20Dispatcher { contract_address: usdc_address };
            usdc.approve(vesu_address, amount);

            // Step 2: Call Vesu's supply function
            let vesu = IVesuPoolDispatcher { contract_address: vesu_address };
            // let's make a supply of usdc to vesu on behalf of our contract
            // for now the referal code is 0
            let success = vesu.supply(usdc_address, amount, contract, 0);

            assert(success, 'Vesu deposit failed');
            self.emit(VesuDepositExecuted { amount, timestamp: get_block_timestamp() });
        }
    }
}
