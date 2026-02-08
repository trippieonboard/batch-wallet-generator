# Batch EVM Wallet Generator for Farcaster

A production-ready Next.js application for generating batch EVM wallets with multi-chain balance checking and transaction history lookup. Built for Farcaster Frames v2 integration.

## Features

 **Batch Wallet Generation**
- Generate 1-50 EVM wallets in a single batch operation
- Client-side key generation using Web Crypto API (via Viem)
- Secure: Private keys never transmitted to server

 **Security-First Architecture**
- All private key generation happens exclusively on the client-side
- Masked private key display (shows first 4 + last 4 characters)
- No server-side key storage or processing
- TypeScript strict mode for type safety

 **Multi-Chain Support**
- Ethereum mainnet balance checking
- Base (L2) balance checking
- Transaction history via Blockscout explorers
- Parallel RPC requests with caching (30-second TTL)

 **Wallet Analytics**
- Real-time balance display in ETH/USD
- Last transaction information
- Chain-specific wallet insights
- Rate-limited API access (courtesy delays)

 **Modern UI/UX**
- Dark theme (zinc-950) with smooth animations
- Responsive grid layout
- Real-time loading states
- Copy-to-clipboard functionality
- Accessibility-first component design

## Tech Stack

- **Framework**: Next.js 16.1.6 (App Router, Turbopack)
- **Language**: TypeScript 5 (strict mode)
- **Styling**: Tailwind CSS 4
- **Cryptography**: Viem 2.45+
- **State Management**: Zustand 5.0+
- **Icons**: Lucide React
- **APIs**: Cloudflare ETH RPC, Base RPC, Blockscout

## Installation

### Prerequisites
- Node.js 18+ or 20+
- npm 9+ or pnpm 8+
- Git 2.0+

### Local Setup

\\\ash
# Clone repository
git clone https://github.com/trippieonboard/batch-wallet-generator.git
cd batch-wallet-generator

# Install dependencies
npm install

# Set up environment (optional)
cp .env.example .env.local

# Run development server
npm run dev
\\\

Visit \http://localhost:3000\ in your browser.

## Usage

### Basic Workflow

1. **Adjust wallet count** using the slider (1-50)
2. **Click "Generate X Wallets"** to create batch
3. **View wallet details**:
   - Address (clickable, copies to clipboard)
   - Private key (masked, toggle to reveal)
   - ETH/Base balances
   - Last transaction info
4. **Switch chains** using the toggle button on each card
5. **Copy wallet data** with visual feedback

### API Endpoints

#### GET \/api/balance?address=0x...&chain=eth|base\
Fetch wallet balance for specific chain.

#### GET \/api/tx-history?address=0x...&chain=eth|base\
Fetch last transaction from Blockscout.

## Architecture

### Client-Side (Security-Critical)
- **Wallet Generation**: Uses Viem's \generatePrivateKey()\ (CSPRN via Web Crypto API)
- **Key Storage**: Only in browser memory (lost on page refresh)
- **Key Display**: Masked format for security

### Server-Side (Read-Only)
- **Balance Queries**: RPC calls to public endpoints
- **Transaction Lookup**: Blockscout API (no private data)
- **Rate Limiting**: Respect API quotas with delays

### Caching Strategy
- **Balance Cache**: 30-second TTL per address
- **Block Cache**: Prevents duplicate parallel requests
- **Graceful Degradation**: Returns cached/fallback data on API errors

## Building for Production

\\\ash
npm run build
\\\

### Deployment Options

#### Railway (Recommended)
1. Connect GitHub repo to Railway
2. Auto-deploys on push to main branch

#### Render.com
1. Connect GitHub repo
2. Set build command: \
pm run build\
3. Set start command: \
pm start\

#### Docker
\\\ash
docker build -t batch-wallet-generator .
docker run -p 3000:3000 batch-wallet-generator
\\\

#### Vercel
\\\ash
npm i -g vercel
vercel
\\\

## Security Considerations

### Private Key Handling
- **Generation**: Exclusively client-side using Web Crypto API
- **Storage**: In-memory only (lost on page refresh)
- **Transmission**: Never sent to server
- **Display**: Masked format (first 4 + last 4 chars)

### Best Practices
1. Don't share generated wallets in untrusted environments
2. Private key display is masked by default for a reason
3. Use separate wallets for testing vs. production funds
4. Don't expose \.env.local\ with sensitive keys

## Testing

\\\ash
npm run dev
\\\

### Manual Test Checklist
- [ ] Generate 1 wallet
- [ ] Generate 50 wallets
- [ ] Verify private key mask/unmask
- [ ] Check balance on ETH chain
- [ ] Check balance on Base chain
- [ ] Verify chain toggle works
- [ ] Test copy-to-clipboard
- [ ] Check responsive on mobile

## Troubleshooting

### \
pm run dev\ fails
\\\ash
rm -r node_modules package-lock.json
npm install
npm run dev
\\\

### Wallet balance shows "N/A"
- Check RPC endpoint is responsive
- Verify wallet address is valid
- Wait 30s for cache expiration

## License

MIT License

## Support

-  Email: tonestrippy@gmail.com
-  Twitter: [@trippieonboard](https://twitter.com/trippieonboard)
-  GitHub: [@trippieonboard](https://github.com/trippieonboard)

---

**Made with  by trippieonboard**

Last Updated: February 2026
