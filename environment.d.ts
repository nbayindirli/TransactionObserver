/* eslint-disable no-var */

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PRIVATE_KEY: string;

            COVALENT_API_KEY: string;

            ETHEREUM_URL: string;
            ARBITRUM_URL: string;
        }
    }
}

export {};
