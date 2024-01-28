# Cryptyping Social Network Project

## Project Overview

The CryptoPrediction project is a social network platform focused on cryptocurrency price predictions. The aim is to enhance the credibility of influencers in the crypto space and prevent scams. The platform enables users to make predictions on cryptocurrency prices, and their success in these predictions affects their ranking on the platform.

## Key Components

### Frontend Pages

- **`bet-form-vottun.js`**: This page integrates the smart contract with Vottun's API, serving as the primary interface for users to make predictions.
- **`bet-form-rootstock.js`**: An alternative frontend page that interacts with the smart contract deployed on Rootstock, providing a different user experience from the Vottun API integration.

### Smart Contract

- **`SmartContract_crypty.sol`**:
  - Deployed on Rootstock Testnet via Hardhat at `0x66D0e6a7C01F579D4Ad12B8424C8404A49b932D4`. This deployment was chosen due to compatibility issues encountered on Vottun's Rootstock network.
  - Also deployed on Polygon Mumbai through Vottun as a fallback option.

## Project Goals

- **Ranking System**: Create a system where the accuracy of users' predictions on cryptocurrency prices affects their ranking.
- **Influencer Credibility**: Highlight credible influencers by tracking the success rate of their predictions.
- **Scam Prevention**: Deter deceptive practices in the crypto space through transparent and verifiable tracking of prediction outcomes.

## Current Status and Next Steps

The next critical phase involves connecting the `SmartContract_crypty.sol` functions with both frontend implementations (`bet-form-vottun.js` and `bet-form-rootstock.js`), ensuring fluid interaction between the users' frontend activities and the smart contract logic.

## Contributing

Contributions, especially in the areas of smart contract integration and user experience enhancement, are welcome.

## License

This project is licensed under the MIT License.

## Example Vottun API calls

