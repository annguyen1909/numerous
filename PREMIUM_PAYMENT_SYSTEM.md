# Premium Payment System - QR Code Implementation

## Overview
Complete Vietnamese bank transfer payment system using QR codes for Premium subscription management.

## Features Implemented

### 1. **QR Payment Generation**
- **Location**: `/src/lib/vietqr.ts`
- Uses VietQR API to generate dynamic QR codes
- Auto-fills: Bank account, amount, transfer note
- Unique transfer note per user: `PREMIUM-{userId}`
- Supports both monthly (199,000 VND) and yearly (1,199,000 VND) plans

### 2. **Premium Payment Page** 
- **Location**: `/src/app/premium/page.tsx`
- **Component**: `/src/components/premium/PremiumPaymentForm.tsx`
- Plan selection (Monthly/Yearly)
- QR code display with payment details
- Payment confirmation form
- Real-time validation

### 3. **Payment Confirmation API**
- **Location**: `/src/app/api/payment/create/route.ts`
- Creates payment request in database
- Validates transaction details
- Checks duplicate transactions
- Verifies transfer note contains user ID
- Status: "pending" → awaits admin approval

### 4. **Admin Verification Panel**
- **Location**: `/src/app/admin/premium/page.tsx`
- **Component**: `/src/components/admin/AdminPaymentsList.tsx`
- Lists all payment requests (pending/verified/rejected)
- Approve → Sets `user.isPremium = true`, `premiumUntil = now + duration`
- Reject → Marks payment as rejected
- Shows user details, transaction info, screenshot links

### 5. **Security Features**
- ✅ Login required for payment submission
- ✅ Admin-only access to verification panel
- ✅ Transfer note contains user ID for matching
- ✅ Duplicate transaction prevention
- ✅ Premium status check before payment
- ✅ Transaction time validation

## Setup Instructions

### 1. Environment Variables
Add to `.env.local`:

```env
# Bank Configuration
NEXT_PUBLIC_BANK_ID="970422"  # MB Bank
NEXT_PUBLIC_BANK_ACCOUNT_NUMBER="0123456789"
NEXT_PUBLIC_BANK_ACCOUNT_HOLDER="NGUYEN VAN A"

# Admin Emails (comma-separated)
ADMIN_EMAILS="admin@example.com"
NEXT_PUBLIC_ADMIN_EMAILS="admin@example.com"
```

### 2. Run Prisma Migration
The Payment model already exists in your schema. No changes needed.

### 3. Test the Flow

**User Flow:**
1. Visit `/premium` (must be logged in)
2. Select plan (Monthly/Yearly)
3. Scan QR code with banking app
4. Confirm payment with transaction ID
5. Wait for admin approval

**Admin Flow:**
1. Visit `/admin/premium` (admin only)
2. Review pending payments
3. Click "Duyệt" to approve or "Từ chối" to reject
4. User becomes Premium immediately

## API Endpoints

### POST `/api/payment/create`
Create payment request after bank transfer.

**Request:**
```json
{
  "transactionId": "FT24325XXXXXX",
  "transactionTime": "2024-01-15T10:30:00",
  "transferNote": "PREMIUM-ABC12345",
  "amount": 199000,
  "plan": "monthly",
  "screenshotUrl": "https://imgur.com/abc123.png"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Yêu cầu thanh toán đã được gửi...",
  "paymentId": "cmiea0jld0001kovd..."
}
```

### GET `/api/admin/payments?status=pending`
List payment requests (admin only).

**Query Params:**
- `status`: `pending` | `verified` | `rejected` | `all`

**Response:**
```json
{
  "payments": [
    {
      "id": "...",
      "userId": "...",
      "amount": 199000,
      "transactionId": "FT24325...",
      "status": "pending",
      "user": {
        "email": "user@example.com",
        "isPremium": false
      }
    }
  ]
}
```

### POST `/api/admin/payments`
Approve or reject payment (admin only).

**Request:**
```json
{
  "paymentId": "cmiea0jld0001kovd...",
  "action": "approve"  // or "reject"
}
```

## VietQR API Integration

### QR Image Format
```
https://img.vietqr.io/image/{BANK_ID}-{ACCOUNT_NO}-compact2.jpg
  ?amount={AMOUNT}
  &addInfo={TRANSFER_NOTE}
  &accountName={ACCOUNT_NAME}
```

### Common Bank IDs
- **970422**: MB Bank
- **970436**: Vietcombank  
- **970415**: Vietinbank
- **970418**: BIDV
- **970407**: Techcombank

## Database Schema

Payment records stored with:
```typescript
{
  id: string
  userId: string
  amount: number
  transactionId: string
  transactionTime: DateTime
  status: "pending" | "verified" | "rejected"
  notes: JSON  // Contains: plan, transferNote, screenshotUrl
  verifiedAt: DateTime?
  verifiedBy: string?  // Admin email
}
```

## UI Components

### PremiumPaymentForm
- Plan selector (Monthly/Yearly)
- QR code display
- Bank info display
- Payment confirmation form
- Success/error states

### AdminPaymentsList  
- Filter tabs (Pending/Verified/Rejected/All)
- Payment cards with user details
- Approve/Reject buttons
- Real-time status updates

## Security Considerations

✅ **User Validation**: Only logged-in users can submit payments  
✅ **Admin Authorization**: Admin pages check email against whitelist  
✅ **Transfer Note Verification**: Must contain user ID substring  
✅ **Duplicate Prevention**: Checks existing transaction IDs  
✅ **Premium Status Check**: Prevents duplicate subscriptions  
✅ **Transaction Validation**: Zod schema validation on API  

## Testing Checklist

- [ ] User can view QR code after login
- [ ] QR code displays correct amount and transfer note
- [ ] User cannot submit without transaction ID
- [ ] Duplicate transaction IDs are rejected
- [ ] Admin can view pending payments
- [ ] Approve sets user.isPremium = true
- [ ] premiumUntil date calculated correctly
- [ ] Reject marks payment as rejected
- [ ] Premium users redirected from /premium
- [ ] Admin link appears in navbar for admins only

## Production Deployment

1. Set real bank account in environment variables
2. Configure admin emails list
3. Test with small amount first
4. Monitor payment requests daily
5. Set up email notifications (optional enhancement)

## Future Enhancements

- [ ] Auto-verification via banking API webhook
- [ ] Email notifications on payment approval
- [ ] Payment history in user dashboard
- [ ] Refund management
- [ ] Multiple payment methods (Momo, ZaloPay)
- [ ] Recurring subscription auto-renewal

---

**✅ All Requirements Implemented Successfully!**
