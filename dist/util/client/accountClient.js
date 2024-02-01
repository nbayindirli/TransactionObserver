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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountClient = void 0;
const web3_utils_1 = require("web3-utils");
const constants_1 = require("../constants");
const fileIOClient_1 = require("./fileIOClient");
class AccountClient {
    constructor() {
        this.FILE_IO_CLIENT = new fileIOClient_1.FileIOClient();
    }
    createAccount(newAccountAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            const functionName = 'createAccount';
            console.log(`Calling createAccount for address (${newAccountAddress})...`);
            const newAccountId = (0, web3_utils_1.uuidV4)();
            console.log(`Generated accountId: ${newAccountId}`);
            const newAccountFilepath = constants_1.Constants.formatString(constants_1.Constants.DEFAULT_FILEPATH, newAccountId);
            console.log(`Generated newAccountFilepath: ${newAccountFilepath}`);
            const newAccount = {
                id: newAccountId,
                address: newAccountAddress
            };
            console.log(`Generated newAccount:`, newAccount);
            const newAccountString = JSON.stringify(newAccount, null, constants_1.Constants.SPACES_PER_TAB);
            this.FILE_IO_CLIENT.writeFile(newAccountFilepath, newAccountString, functionName);
        });
    }
}
exports.AccountClient = AccountClient;
