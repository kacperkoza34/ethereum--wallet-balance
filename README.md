# Blockchain Wallet Application

This project is a test task implementation of a web-based blockchain wallet that interacts with the Ethereum Rinkeby test network. The wallet provides functionalities for connecting and managing wallets, transferring funds, and viewing balances.

## Features

### Core Functionality
1. **Connect to MetaMask Wallet**  
   - Detects and connects to a MetaMask wallet.

2. **Network Management**  
   - Detects network changes in MetaMask.  
   - Supports only Ethereum networks, specifically the Rinkeby test network.

3. **Wallet Management**  
   - Detects wallet changes in MetaMask.  
   - Allows disconnecting from the wallet.

4. **Balance Retrieval**  
   - Retrieves the ETH balance.  
   - Retrieves ERC-20 token balance for the token address specified in the `.env` file.

5. **Funds Transfer**  
   - Sends ETH to another wallet.  
   - Sends ERC-20 tokens to another wallet.

6. **Routing**  
   - Home page to connect the wallet.  
   - Wallet details page displaying balances and other information.  
   - Transfer page to send funds.

### Technical Specifications
- **Framework:** React
- **State Management:** Redux Toolkit
- **Styling:** Tailwind
- **Blockchain Communication:** Ethers.js
- **Environment Variable Support:** Reads ERC-20 token address from `VITE_ERC_20_ADDRESS`. If retrieval fails, the wallet operates with ETH only.
- **TypeScript:** TypeScript implementation for type safety and improved developer experience.

---

## Getting Started

### Prerequisites
Ensure you have the following installed:
- Node.js (v16 or higher)
- npm or pnpm
- MetaMask browser extension

### Installation
1. Clone the repository:
   ```bash
   git clone git@github.com:kacperkoza34/ethereum-wallet-balance.git
   cd ethereum-wallet-balance
   git checkout develop
  ```

2. Install dependencies
  ```
  pnpm install
  ```

3. Configure the environment:
```
VITE_ERC_20_ADDRESS=0xYourTokenAddress
```

4. Start the development server:
```
pnpm run dev
```

5. Open the app in your browser at http://http://localhost:5173.

### Scripts
- pnpm run dev: Starts the development server.
- pnpm run build: Builds the application for production.
- pnpm run preview: Previews the production build locally.