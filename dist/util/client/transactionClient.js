"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionClient = void 0;
const web3_1 = __importDefault(require("web3"));
const constants_1 = require("../constants");
const client_sdk_1 = require("@covalenthq/client-sdk");
const fileIOClient_1 = require("./fileIOClient");
const web3_utils_1 = require("web3-utils");
class TransactionClient {
    constructor(network) {
        this.CURRENT_NETWORK = network.toString();
        let web3Provider;
        switch (network) {
            case constants_1.Constants.Networks.ETHEREUM:
                web3Provider = new web3_1.default.providers.HttpProvider(process.env.ETHEREUM_URL);
                this.COVALENT_CHAIN = 'eth-mainnet';
                break;
            case constants_1.Constants.Networks.ARBITRUM:
                web3Provider = new web3_1.default.providers.HttpProvider(process.env.ARBITRUM_URL);
                this.COVALENT_CHAIN = 'arbitrum-mainnet';
                break;
            default:
                web3Provider = new web3_1.default.providers.HttpProvider(process.env.ETHEREUM_URL);
                this.COVALENT_CHAIN = 'eth-mainnet';
                break;
        }
        this.MAINNET_RPC = new web3_1.default(web3Provider);
        this.COVALENT_CLIENT = new client_sdk_1.CovalentClient(process.env.COVALENT_API_KEY);
        this.FILE_IO_CLIENT = new fileIOClient_1.FileIOClient();
    }
    getAccountTransactions(accountId) {
        var _a, e_1, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`[${this.CURRENT_NETWORK}] Retrieving transactions for account (${accountId})...`);
            const account = this.getAccountForAccountId(accountId);
            const erc20TransfersForWalletAddress = this.COVALENT_CLIENT.BalanceService.getErc20TransfersForWalletAddress(this.COVALENT_CHAIN, account.address, {
                contractAddress: constants_1.Constants.USDC_ETH_MAINNET
            });
            const data = [];
            try {
                for (var _d = true, erc20TransfersForWalletAddress_1 = __asyncValues(erc20TransfersForWalletAddress), erc20TransfersForWalletAddress_1_1; erc20TransfersForWalletAddress_1_1 = yield erc20TransfersForWalletAddress_1.next(), _a = erc20TransfersForWalletAddress_1_1.done, !_a; _d = true) {
                    _c = erc20TransfersForWalletAddress_1_1.value;
                    _d = false;
                    const txn = _c;
                    if (txn.successful === true) {
                        for (const transfer of txn.transfers) {
                            const transaction = {
                                id: (0, web3_utils_1.uuidV4)(),
                                accountId: accountId,
                                toAddress: txn.to_address,
                                fromAddress: txn.from_address,
                                type: this.getTransferType(transfer.transfer_type),
                                amount: transfer.delta.toString(),
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
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = erc20TransfersForWalletAddress_1.return)) yield _b.call(erc20TransfersForWalletAddress_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            console.log(`\n✅ [${this.CURRENT_NETWORK}] Successfully retrieved transactions for account (${accountId}).`);
            return {
                data,
                count: data.length
            };
        });
    }
    getAccountForAccountId(accountId) {
        const functionName = 'getAccountForAccountId';
        const accountFilepath = constants_1.Constants.formatString(constants_1.Constants.DEFAULT_FILEPATH, accountId);
        const accountJson = this.FILE_IO_CLIENT.readFile(accountFilepath, functionName);
        try {
            return JSON.parse(accountJson);
        }
        catch (error) {
            console.log(`⛔️ ${functionName}(): Failed to parse JSON for account: ${accountId}`);
            throw error;
        }
    }
    getTransferType(type) {
        if (type == "OUT")
            return "deposit";
        if (type == "IN")
            return "withdrawal";
        return "null";
    }
}
exports.TransactionClient = TransactionClient;
