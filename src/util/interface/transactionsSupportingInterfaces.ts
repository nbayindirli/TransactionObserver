interface Account {
    id: string; /* Primary */
    address: string
}

interface LocalTransaction {
    id: string; /* Primary */
    accountId: string;
    toAddress: string;
    fromAddress: string;
    type: string;
    amount: string;
    symbol: string;
    decimal: number;
    timestamp: number;
    txnHash: string;
}

interface TransactionsResponse {
    data: LocalTransaction[],
    count: number
}
