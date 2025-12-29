# Registry DApp

A full-featured decentralized application built with Solidity smart contracts and React frontend. This DApp allows users to register themselves with personal information and manage token transfers with registration-based restrictions.

## 🚀 Features

- **User Registration**: Register with name, age, city, and status
- **Token Management**: ERC20 token with transfer restrictions
- **Owner Controls**: Contract owner can manage user statuses
- **Modern UI**: Beautiful React interface with Web3 integration
- **Polygon Amoy**: Deployed on Polygon Amoy testnet

## 📋 Contract Details

- **Contract Address**: `0x67CA0bB7b8fcEB31DEa951990571CBe0E0918366`
- **Network**: Polygon Amoy Testnet
- **Token Symbol**: TT (testtoken)
- **Initial Supply**: 1,000,000 TT

## 🛠 Technology Stack

- **Smart Contract**: Solidity ^0.8.20
- **Frontend**: React.js
- **Web3 Library**: Ethers.js
- **Development**: Hardhat
- **Network**: Polygon Amoy Testnet

## 📦 Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- MetaMask wallet
- Some MATIC tokens on Polygon Amoy testnet

### 1. Clone and Install Dependencies

```bash
# Install main project dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### 2. Environment Setup

The `.env` file is already configured with:
- Private key for deployment
- RPC endpoint for Polygon Amoy
- API keys for verification

### 3. Compile Smart Contract

```bash
npm run compile
```

### 4. Deploy Contract (Already Deployed)

The contract is already deployed at `0x67CA0bB7b8fcEB31DEa951990571CBe0E0918366`

To deploy again:
```bash
npm run deploy
```

### 5. Run Frontend

```bash
cd frontend
npm start
```

The application will open at `http://localhost:3000`

## 🎯 How to Use

### 1. Connect Wallet
- Click "Connect Wallet" button
- Approve MetaMask connection
- Make sure you're on Polygon Amoy testnet

### 2. Register User
- Fill in your name, age (minimum 20), city
- Set your active status
- Click "Register" and confirm transaction

### 3. Transfer Tokens
- Enter recipient address (must be registered and active)
- Enter amount to transfer
- Click "Transfer" and confirm transaction

### 4. Owner Functions (if you're the contract owner)
- Change user status (active/inactive)
- Manage user permissions

## 🔧 Smart Contract Functions

### Public Functions

- `userRegister(name, age, city, status)`: Register a new user
- `transfer(to, amount)`: Transfer tokens (with restrictions)
- `balanceOf(address)`: Check token balance
- `users(address)`: Get user information

### Owner Functions

- `changeUserStatus(userAddr, status)`: Update user status

### Transfer Restrictions

- Sender must be registered and active (except contract owner)
- Receiver must be registered and active
- Minimum age requirement: 20 years

## 🌐 Network Configuration

### Polygon Amoy Testnet
- **Chain ID**: 80002
- **RPC URL**: https://rpc-amoy.polygon.technology/
- **Block Explorer**: https://amoy.polygonscan.com/

### Add to MetaMask
1. Open MetaMask
2. Click network dropdown
3. Add network manually:
   - Network Name: Polygon Amoy
   - RPC URL: https://rpc-amoy.polygon.technology/
   - Chain ID: 80002
   - Currency Symbol: MATIC
   - Block Explorer: https://amoy.polygonscan.com/

## 📁 Project Structure

```
registry-dapp/
├── contracts/
│   └── Registry.sol          # Main smart contract
├── scripts/
│   ├── deploy.js            # Deployment script
│   └── verify.js            # Verification script
├── frontend/
│   ├── src/
│   │   ├── App.js           # Main React component
│   │   └── App.css          # Styling
│   └── public/              # Static files
├── hardhat.config.js        # Hardhat configuration
├── package.json             # Dependencies
├── .env                     # Environment variables
└── deployment.json          # Deployment information
```

## 🔍 Contract Verification

The contract is deployed and can be viewed on Polygon Amoy explorer:
https://amoy.polygonscan.com/address/0x67CA0bB7b8fcEB31DEa951990571CBe0E0918366

## 🎨 UI Features

- **Responsive Design**: Works on desktop and mobile
- **Modern Styling**: Gradient backgrounds and glass morphism
- **Real-time Updates**: Automatic balance and status updates
- **Error Handling**: User-friendly error messages
- **Owner Badge**: Special UI for contract owner

## 🚨 Important Notes

- Users must be at least 20 years old to register
- Only registered and active users can receive tokens
- Contract owner can send tokens without registration
- All transfers require both sender and receiver to be active

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues:
1. Check MetaMask is connected to Polygon Amoy
2. Ensure you have MATIC for gas fees
3. Verify you meet age requirements (20+)
4. Check transaction status on block explorer

## 🎉 Success!

Your Registry DApp is now fully deployed and ready to use! The smart contract is live on Polygon Amoy testnet with a beautiful React frontend interface.

**Contract Address**: `0x67CA0bB7b8fcEB31DEa951990571CBe0E0918366`
**Frontend**: Ready to run with `npm start` in the frontend directory