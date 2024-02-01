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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const transactionClient_1 = require("../../util/client/transactionClient");
const constants_1 = require("../../util/constants");
const accountClient_1 = require("../../util/client/accountClient");
const APP = (0, express_1.default)();
const PORT = 3000;
const TRANSACTION_CLIENT = new transactionClient_1.TransactionClient(constants_1.Constants.Networks.ETHEREUM);
const ACCOUNT_CLIENT = new accountClient_1.AccountClient();
APP.get('/accounts/:accountId/transactions', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { accountId } = req.params;
    try {
        const response = yield TRANSACTION_CLIENT.getAccountTransactions(accountId);
        res.json(response);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
APP.get('/accounts/:address/create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { address } = req.params;
    try {
        console.log("Callign createAccount");
        const response = yield ACCOUNT_CLIENT.createAccount(address);
        res.json(response);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
APP.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});
