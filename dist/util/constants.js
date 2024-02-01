"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Constants = void 0;
var Constants;
(function (Constants) {
    let Networks;
    (function (Networks) {
        Networks["ETHEREUM"] = "ETHEREUM";
        Networks["ARBITRUM"] = "ARBITRUM";
    })(Networks = Constants.Networks || (Constants.Networks = {}));
    Constants.DEFAULT_FILEPATH = 'database/accounts/{0}.json';
    Constants.formatString = (s, ...values) => {
        for (let i = 0; i < values.length; ++i) {
            s = s.replace(`{${i}}`, values[i]);
        }
        return s;
    };
    Constants.SPACES_PER_TAB = 4;
    Constants.USDC_ETH_MAINNET = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48';
})(Constants || (exports.Constants = Constants = {}));
