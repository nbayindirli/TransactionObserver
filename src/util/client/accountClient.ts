import { uuidV4 } from 'web3-utils';
import { Constants } from '../constants';
import { FileIOClient } from './fileIOClient';

export class AccountClient {

    private FILE_IO_CLIENT: FileIOClient;

    constructor() {
        this.FILE_IO_CLIENT = new FileIOClient();
    }

    public async createAccount(
        newAccountAddress: string
    ) {
        const functionName = 'createAccount';

        console.log(`Calling createAccount for address (${newAccountAddress})...`);

        const newAccountId: string = uuidV4();

        console.log(`Generated accountId: ${newAccountId}`);

        const newAccountFilepath: string = Constants.formatString(
            Constants.DEFAULT_FILEPATH,
            newAccountId
        );

        console.log(`Generated newAccountFilepath: ${newAccountFilepath}`);

        const newAccount: Account = {
            id: newAccountId,
            address: newAccountAddress
        };

        console.log(`Generated newAccount:`, newAccount);

        const newAccountString = JSON.stringify(
            newAccount,
            null,
            Constants.SPACES_PER_TAB
        );

        this.FILE_IO_CLIENT.writeFile(
            newAccountFilepath,
            newAccountString,
            functionName
        );
    }
}
