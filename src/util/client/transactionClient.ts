import Web3, { Web3BaseProvider } from 'web3';
import { Constants } from '../constants';
import { BlockTransactionWithContractTransfers, Chain, CovalentClient, Transaction } from "@covalenthq/client-sdk";
import { FileIOClient } from './fileIOClient';
import { uuidV4 } from 'web3-utils';

export class TransactionClient {

    private MAINNET_RPC: Web3;
    private COVALENT_CLIENT: CovalentClient;
    private COVALENT_CHAIN: Chain;
    private CURRENT_NETWORK: string;
    private FILE_IO_CLIENT: FileIOClient;

    constructor(network: Constants.Networks) {
        this.CURRENT_NETWORK = network.toString();

        let web3Provider: Web3BaseProvider;

        switch (network) {
            case Constants.Networks.ETHEREUM:
                web3Provider = new Web3.providers.HttpProvider(process.env.ETHEREUM_URL);
                this.COVALENT_CHAIN = 'eth-mainnet';
                break;
            case Constants.Networks.ARBITRUM:
                web3Provider = new Web3.providers.HttpProvider(process.env.ARBITRUM_URL);
                this.COVALENT_CHAIN = 'arbitrum-mainnet';
                break;
            default:
                web3Provider = new Web3.providers.HttpProvider(process.env.ETHEREUM_URL);
                this.COVALENT_CHAIN = 'eth-mainnet';
                break;
        }

        this.MAINNET_RPC = new Web3(web3Provider);
        this.COVALENT_CLIENT = new CovalentClient(process.env.COVALENT_API_KEY);
        this.FILE_IO_CLIENT = new FileIOClient();
    }

    public async getAccountTransactions(
        accountId: string
    ): Promise<TransactionsResponse> {
        console.log(`[${this.CURRENT_NETWORK}] Retrieving transactions for account (${accountId})...`);

        const account: Account = this.getAccountForAccountId(accountId);

        const erc20TransfersForWalletAddress: AsyncIterable<BlockTransactionWithContractTransfers>= this.COVALENT_CLIENT.BalanceService.getErc20TransfersForWalletAddress(
            this.COVALENT_CHAIN,
            account.address,
            {
                contractAddress: Constants.USDC_ETH_MAINNET
            }
        );

        const data: LocalTransaction[] = [];

        for await (const txn of erc20TransfersForWalletAddress) {
            if (txn.successful === true) {
                for (const transfer of txn.transfers) {

                    const transaction: LocalTransaction = {
                        id: uuidV4(),
                        accountId: accountId,
                        toAddress: txn.to_address,
                        fromAddress: txn.from_address,
                        type: this.getTransferType(transfer.transfer_type),
                        amount: transfer.delta!.toString(),
                        symbol: transfer.contract_ticker_symbol,
                        decimal: transfer.contract_decimals,
                        timestamp: txn.block_signed_at.getTime(),
                        txnHash: txn.tx_hash,
                    };

                    data.push(transaction);

                    console.log('Pushed transaction to response:', transaction);
                }
            }
        }

        console.log(`\n✅ [${this.CURRENT_NETWORK}] Successfully retrieved transactions for account (${accountId}).`);

        return {
            data,
            count: data.length
        };
    }

    private getAccountForAccountId(
        accountId: string
    ): Account {
        const functionName = 'getAccountForAccountId';

        const accountFilepath: string = Constants.formatString(
            Constants.DEFAULT_FILEPATH,
            accountId
        );

        const accountJson = this.FILE_IO_CLIENT.readFile(
            accountFilepath,
            functionName
        );

        try {
            return JSON.parse(accountJson);
        } catch (error: any) {
            console.log(
                `⛔️ ${functionName}(): Failed to parse JSON for account: ${accountId}`
            );
            throw error;
        }
    }

    private getTransferType(
        type: string
    ): string {
        if (type == "OUT") return "deposit";
        if (type == "IN") return "withdrawal";

        return "null";
    }
}
