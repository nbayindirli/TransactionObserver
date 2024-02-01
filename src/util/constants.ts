export namespace Constants {
    export enum Networks {
        ETHEREUM = "ETHEREUM",
        ARBITRUM = "ARBITRUM",
    }

    export const DEFAULT_FILEPATH: string = 'database/accounts/{0}.json';

    export const formatString = (s: string, ...values: string[]): string => {
        for (let i = 0; i < values.length; ++i) {
            s = s.replace(`{${i}}`, values[i]);
        }
        return s;
    };

    export const SPACES_PER_TAB: number = 4;
    export const USDC_ETH_MAINNET: string = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48';
}