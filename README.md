# Transaction Observer Service
A basic API to create user accounts & lookup token transaction history for those accounts.

## Usage

### Create API

#### Description
API to create a new user account.

To create a new user database entry, call
```
GET /accounts/<USER_ADDRESS>/transactions
```
where `USER_ADDRESS` is the users hexidecimal address, e.g. `0xABC...123`

### Transactions API
#### Description
API to query a user's token transactions.

To create a new user entry in the database, call
```
PUT /accounts/<USER_ACCOUNT_ID>/transactions
```
where `USER_ACCOUNT_ID` is the UUID generated for the user's account by the /create API.

---

### Future Optimisations
- Network token support
- Token-type specification on query
- Remote blob-store for variable account/transfer data, stored alongside account files
  - Currently represented by the `/database` directory here
- Account-type specification, e.g. EOA vs Multisig
- Allow arbitrary query for all ERC20 tokens
- Validation on incoming path params
- If hosted on a remote machine, CMS or similar for handling API keys
- Include local testing
