# 🎉 Premium QR Payment System - Quick Start Guide

## ✅ What's Been Implemented

### 1️⃣ **VietQR Payment Generation** (`/src/lib/vietqr.ts`)
- Dynamic QR code generation using VietQR API
- Automatic bank info encoding
- Unique transfer note: `PREMIUM-{userId}`
- Support for Monthly (199k) and Yearly (1.199M) plans

### 2️⃣ **Premium Payment Page** (`/premium`)
- Beautiful QR code display
- Plan selection UI (Monthly/Yearly)
- Payment confirmation form
- Real-time validation
- Success/error handling

### 3️⃣ **Payment API** (`/api/payment/create`)
- Creates payment requests in database
- Validates transaction details
- Prevents duplicates
- Verifies transfer note format
- Status: pending → verified/rejected

### 4️⃣ **Admin Panel** (`/admin/premium`)
- Lists all payment requests
- Filter by status (Pending/Verified/Rejected/All)
- Approve → User becomes Premium instantly
- Reject → Payment marked as rejected
- Full audit trail (who approved, when)

### 5️⃣ **Security & UX**
- ✅ Login required for payments
- ✅ Admin-only verification panel
- ✅ Transfer note validation
- ✅ Duplicate prevention
- ✅ Premium status checks
- ✅ Pending payment notifications in dashboard
- ✅ Admin link in navbar (for admins only)

---

## 🚀 How to Use

### **For Users:**

1. **Go to Premium Page**
   ```
   /premium
   ```

2. **Select Plan**
   - Monthly: 199,000 VND
   - Yearly: 1,199,000 VND (40% off)

3. **Scan QR Code**
   - Open banking app
   - Scan the QR code
   - Confirm payment

4. **Submit Confirmation**
   - Enter transaction ID
   - Enter transaction time
   - (Optional) Upload screenshot link
   - Click "Xác Nhận Thanh Toán"

5. **Wait for Approval**
   - Check dashboard for status
   - Usually approved in 5-10 minutes
   - Receive Premium access immediately after approval

### **For Admins:**

1. **Access Admin Panel**
   ```
   /admin/premium
   ```

2. **Review Payments**
   - See all pending requests
   - Check transaction details
   - Verify against bank statement

3. **Approve or Reject**
   - Click "✓ Duyệt" to approve
   - Click "✗ Từ chối" to reject
   - User is notified instantly

---

## ⚙️ Configuration

### **Step 1: Set Environment Variables**

Create `.env.local` with:

```env
# Your Bank Account Info
NEXT_PUBLIC_BANK_ID="970422"              # Bank ID (970422 = MB Bank)
NEXT_PUBLIC_BANK_ACCOUNT_NUMBER="0123456789"
NEXT_PUBLIC_BANK_ACCOUNT_HOLDER="NGUYEN VAN A"

# Admin Configuration
ADMIN_EMAILS="your-admin-email@example.com"
NEXT_PUBLIC_ADMIN_EMAILS="your-admin-email@example.com"
```

### **Step 2: Test Locally**

```bash
npm run dev
```

Visit:
- User flow: `http://localhost:3000/premium`
- Admin panel: `http://localhost:3000/admin/premium`

### **Step 3: Deploy**

All environment variables must be set in your hosting platform (Vercel, Railway, etc.)

---

## 📊 Payment Flow Diagram

```
┌─────────────┐
│    USER     │
│   Visits    │
│  /premium   │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Selects   │
│    Plan     │
│ (1M or 12M) │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Scans     │
│  QR Code    │
│  in Bank    │
│     App     │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Confirms   │
│  Payment    │
│    with     │
│ Transaction │
│     ID      │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   STATUS:   │
│   PENDING   │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│    ADMIN    │
│   Reviews   │
│  in Panel   │
└──────┬──────┘
       │
       ├─────────────┐
       ▼             ▼
  ┌─────────┐  ┌─────────┐
  │ APPROVE │  │ REJECT  │
  └────┬────┘  └────┬────┘
       │            │
       ▼            ▼
  ┌─────────┐  ┌─────────┐
  │ Premium │  │ Payment │
  │ ACTIVE  │  │ DENIED  │
  └─────────┘  └─────────┘
```

---

## 🗂️ File Structure

```
src/
├── app/
│   ├── premium/page.tsx          # Premium subscription page with QR
│   ├── admin/premium/page.tsx    # Admin verification panel
│   └── api/
│       ├── payment/create/route.ts    # Create payment request
│       └── admin/payments/route.ts    # Admin list/approve/reject
├── components/
│   ├── premium/
│   │   └── PremiumPaymentForm.tsx     # QR display + confirmation form
│   └── admin/
│       └── AdminPaymentsList.tsx      # Admin payment management UI
└── lib/
    └── vietqr.ts                      # VietQR utilities
```

---

## 🔐 Security Features

| Feature | Status | Description |
|---------|--------|-------------|
| Authentication | ✅ | Login required to submit payment |
| Admin Authorization | ✅ | Email whitelist for admin access |
| Transfer Note Validation | ✅ | Must contain user ID |
| Duplicate Prevention | ✅ | Checks existing transaction IDs |
| Premium Check | ✅ | Prevents double subscriptions |
| Audit Trail | ✅ | Tracks who approved and when |

---

## 📱 Screenshots Guide

### User Flow:
1. **Premium Page**: Select plan, view QR
2. **Banking App**: Scan QR, auto-filled info
3. **Confirmation Form**: Enter transaction ID
4. **Dashboard**: See "Pending" notification

### Admin Flow:
1. **Admin Panel**: List of pending payments
2. **Payment Details**: User info, transaction details
3. **Actions**: Approve or Reject buttons
4. **History**: View verified/rejected payments

---

## 🎯 Testing Checklist

Before going live:

- [ ] Test QR code generation with real bank
- [ ] Verify auto-fill works in banking app
- [ ] Submit test payment with small amount
- [ ] Check admin panel receives request
- [ ] Approve payment and verify user becomes premium
- [ ] Check premiumUntil date is correct
- [ ] Test reject functionality
- [ ] Verify duplicate prevention works
- [ ] Check pending notification in dashboard
- [ ] Test admin link visibility (admins only)

---

## 🆘 Troubleshooting

### QR Code Not Displaying?
- Check `NEXT_PUBLIC_BANK_ID` is set correctly
- Verify VietQR API is accessible
- Try different bank ID if current one fails

### Admin Can't Access Panel?
- Verify email is in `ADMIN_EMAILS` environment variable
- Check `NEXT_PUBLIC_ADMIN_EMAILS` matches for client-side check
- Restart dev server after changing env vars

### Payment Not Appearing?
- Check user is logged in
- Verify transfer note matches format
- Check database for payment record
- Look for errors in browser console

### User Not Becoming Premium?
- Verify admin clicked "Approve" button
- Check `user.isPremium` in database
- Check `premiumUntil` date is in future
- Clear browser cache and reload

---

## 📞 Support

For issues or questions:
1. Check `PREMIUM_PAYMENT_SYSTEM.md` for detailed docs
2. Review error messages in browser console
3. Check server logs for API errors
4. Test with admin account first

---

## ✨ Success!

Your Premium QR payment system is fully implemented and ready to use! 🎉

**What's Working:**
✅ QR code generation with VietQR API  
✅ Plan selection (Monthly/Yearly)  
✅ Payment confirmation flow  
✅ Admin verification panel  
✅ Automatic Premium activation  
✅ Security and validation  
✅ Beautiful Vietnamese UI  

**Next Steps:**
1. Configure your real bank account
2. Set admin emails
3. Test with small amount
4. Deploy to production
5. Monitor payments daily

---

**🚀 Ready to accept Premium subscriptions!**
