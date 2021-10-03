# Market dApp 

The frontend dApp to access the Market protocol by Market DAO. dApp Developed by Marbase Inc, BVI

## Requirements

- node: `v14.17.0`
- npm: `v6.14.13`

## Notes

<details>
  <summary>How to run the dApp?</summary>

  Add the following values in .env

  ```bash
  REACT_APP_CHAIN_ID=137
  REACT_APP_DEV_API_HOST=YOUR_HOST
  REACT_APP_ALCHEMY_RPC=YOUR_ALCHEMY_RPC_URL
  REACT_APP_INFURA_RPC=YOUR_INFURA_RPC_URL
  VERCEL_URL=YOUR_HOST
  ```

  Install the required packages

  ```bash
  npm install
  ```

  Run the dApp

  ```bash
  npm run start
  ```
</details>

<details>
  <summary>What are the "compiled" folders in src/static?</summary>
  
- The `src/static/compiled` folder has misc. files that are auto generated from scripts like: [rari-tokens-generator](https://github.com/Rari-Capital/rari-tokens-generator)
- You can generate these files using `npm install`.
- These files are gitignored so do not worry about trying to commit them!
 </details>

# LICENSE

Check [./LICENSE](LICENSE)