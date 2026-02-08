# Batch EVM Wallet Generator - Testing Guide

##  Local Testing

### 1. Verify Server is Running

\\\ash
# In first terminal (should already be running)
npm run dev

# Output should look like:
#  Next.js 16.1.6 (Turbopack)
# - Local: http://localhost:3000
\\\

### 2. Open Browser

1. Open http://localhost:3000
2. You should see:
   - Title "Batch EVM Wallet Generator"
   - Control panel on left with slider (1-50)
   - Button "Generate X Wallets"
   - Large area on right with message "No Wallets Generated"

### 3. Test Wallet Generation

1. **Move slider** to 5 (or any quantity)
2. **Click button** "Generate 5 Wallets"
3. **Wait** ~300ms while keys are generated
4. **You should see** 5 wallet cards with:
   - Wallet address
   - Private key (masked)
   - "Show" button to reveal key

### 4. Test Copy-to-Clipboard

1. **Click on address field** or **click  button**
2. A checkmark  should appear
3. Address copied to clipboard
4. Try pasting it (Ctrl+V) somewhere to verify

### 5. Test Private Key Show/Hide

1. **Click "Show" button** on wallet card
2. Private key should be revealed
3. Click "Hide" to mask it again

### 6. Test Balance Checking

1. **Wait 1-2 seconds** after generation
2. You should see ETH balance in the card
3. Balance shows in format: "0.5 ETH"
4. Click chain toggle (ETH  Base) to see Base balance

### 7. Test Chain Toggle

1. **Click the ETH/Base button** on wallet card
2. Chain should switch
3. Balance should update for the new chain
4. Last transaction info should change

### 8. Test with 50 Wallets (Stress Test)

1. **Move slider to 50**
2. **Click "Generate 50 Wallets"**
3. **Wait** ~1-2 seconds
4. **All 50 cards should render** without lag
5. **Scroll through** to verify all loaded

### 9. Test Error Handling

1. **Disconnect internet** (disconnect WiFi or turn on airplane mode)
2. **Try to generate wallets**
3. **Wallet generation should still work** (client-side)
4. **Balance checking should show "N/A"**
5. **Reconnect internet** and try again

### 10. Test Responsive Design (Mobile)

1. **Press F12** to open DevTools
2. **Click device toolbar icon** (or Ctrl+Shift+M)
3. **Select iPhone 12 or Galaxy S20**
4. **Verify layout adapts**:
   - Controls should stack vertically
   - Cards should be full width
   - Text should be readable

### 11. Test Copy Multiple Times

1. **Generate 3 wallets**
2. **Click copy on wallet 1**  checkmark appears
3. **Click copy on wallet 2**  checkmark appears
4. **Verify all work independently**

### 12. Browser Compatibility

Test in multiple browsers:
-  Chrome/Edge 90+
-  Firefox 88+
-  Safari 15+
-  Mobile browsers

##  Performance Checklist

- [ ] Page loads in < 2s on 4G
- [ ] Generate 50 wallets takes < 2s
- [ ] No console errors (F12)
- [ ] Responsive on all screen sizes
- [ ] Smooth animations (no jank)

##  Common Issues & Solutions

### Issue: "No Wallets Generated" message doesn't disappear after click

**Solution**: 
- Check browser console (F12) for errors
- Try refresh page (Ctrl+R)
- Verify JavaScript is enabled

### Issue: Balance shows "N/A"

**Solution**:
- Wait 2-3 seconds (API calls take time)
- Check internet connection
- Try refreshing the page
- Balance requests timeout after 5s

### Issue: Private key doesn't show when clicking "Show"

**Solution**:
- Refresh page (Ctrl+R)
- Check browser console for errors
- Try different wallet card
- Verify wallet was successfully generated

### Issue: Copy-to-clipboard doesn't work

**Solution**:
- Works on HTTPS only in production
- Works on localhost:3000 in development
- Try refreshing page
- Verify clipboard permissions granted

##  Pre-Production Checklist

Before deployment:

- [ ] All tests pass locally
- [ ] No console errors (F12)
- [ ] Generate 1 wallet works
- [ ] Generate 50 wallets works
- [ ] Balance checking works (with internet)
- [ ] Copy-to-clipboard works
- [ ] Responsive on mobile
- [ ] Build succeeds: \
pm run build\
- [ ] No TypeScript errors: \
pm run type-check\
- [ ] Git commits are clean
- [ ] .env.local is in .gitignore

##  Command Reference

\\\ash
# Start dev server
npm run dev

# Run production build
npm run build

# Start production server
npm start

# Type check only
npm run type-check

# View build output
npm run build -- --debug
\\\

##  Useful Links

- Local: http://localhost:3000
- DevTools: F12 (or Ctrl+Shift+I)
- Responsive mode: Ctrl+Shift+M
- Vercel: https://vercel.com
- Railway: https://railway.app
- Render: https://render.com
