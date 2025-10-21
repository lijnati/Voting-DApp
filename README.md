# EthioVote: A Decentralized Voting Web App(Voting-DApp)

A decentralized voting application for the Ethiopian Election 2018.
<!-- Add screenshot -->
![Screenshot](./screenshot1.png)
## Features

- 🗳️ Decentralized voting on Ethereum
- 🔗 MetaMask wallet integration
- 📊 Real-time vote counting and percentages
- 🚫 Prevents double voting

## Prerequisites

Before deploying, make sure you have:

1. **Node.js** (v16 or higher)
2. **MetaMask** wallet with Sepolia ETH
3. **Infura/Alchemy account** (for RPC access)

## Setup & Deployment

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

```bash
# Copy the example environment file
cp .env.example .env

# Edit .env with your values:
# - PRIVATE_KEY: Your wallet private key (with Sepolia ETH)
# - SEPOLIA_RPC_URL: Your Infura/Alchemy Sepolia RPC URL
# - ETHERSCAN_API_KEY: (Optional) For contract verification
```

### 3. Get Sepolia ETH

Get free Sepolia testnet ETH from:
- [Sepolia Faucet](https://sepoliafaucet.com/)
- [Alchemy Sepolia Faucet](https://sepoliafaucet.com/)
- [Infura Sepolia Faucet](https://www.infura.io/faucet)

### 4. Deploy the Contract

```bash
# Compile the contract
npm run compile

# Deploy to Sepolia testnet
npm run deploy:sepolia
```

The deployment script will:
- Deploy the Voting contract with 6 Ethiopian political parties
- Display the contract address
- Save deployment info to `deployment.json`

### 5. Update Frontend

After deployment, update the contract address in `src/hooks/useVoting.js`:

```javascript
const CONTRACT_ADDRESS = 'YOUR_DEPLOYED_CONTRACT_ADDRESS'
```

### 6. Run the DApp

```bash
npm run dev
```

Visit `http://localhost:5173` and connect your MetaMask wallet to start voting!

<!-- ## Contract Verification (Optional)

To verify your contract on Etherscan:

```bash
npm run verify YOUR_CONTRACT_ADDRESS "Prosperity Party" "Ezema Party" "Freedom and Equality Party" "All Ethiopian National Movement" "Balderas Party" "Ethiopian Democratic Party"
```

## Project Structure

```
voting-dapp/
├── contracts/          # Solidity smart contracts
├── scripts/            # Deployment scripts
├── src/
│   ├── components/     # React components
│   ├── hooks/          # Custom React hooks
│   └── contracts/      # Contract ABIs and addresses
├── hardhat.config.js   # Hardhat configuration
└── package.json
```

## Smart Contract

The Voting contract includes:
- **Proposals**: Each with name and vote count
- **Vote tracking**: Prevents double voting
- **Owner controls**: Toggle voting active/inactive
- **Events**: For tracking votes and proposals -->

## Technologies Used

- **Frontend**: React, Vite, Tailwind CSS
- **Blockchain**: viem, Hardhat
- **Network**: Ethereum Sepolia Testnet
- **Wallet**: MetaMask integration

