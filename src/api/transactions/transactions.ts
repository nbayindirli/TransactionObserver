import express, { Request, Response } from 'express';
import { TransactionClient } from '../../util/client/transactionClient';
import { Constants } from '../../util/constants';
import { AccountClient } from '../../util/client/accountClient';

const APP = express();
const PORT = 3000;

const TRANSACTION_CLIENT = new TransactionClient(
    Constants.Networks.ETHEREUM
);

const ACCOUNT_CLIENT = new AccountClient();

APP.get('/accounts/:accountId/transactions', async (req: Request, res: Response) => {
    const { accountId } = req.params;
    try {
        const response = await TRANSACTION_CLIENT.getAccountTransactions(accountId);
        res.json(response);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

APP.get('/accounts/:address/create', async (req: Request, res: Response) => {
    const { address } = req.params;
    try {
        console.log("Callign createAccount")
        const response = await ACCOUNT_CLIENT.createAccount(
            address
        );
        res.json(response);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

APP.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});
