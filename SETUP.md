# Quick Setup Guide - Portfolio Backend

## 🚀 Quick Start (5 Minutes)

### Step 1: Install Dependencies
```bash
cd portfolio-backend
npm install
```

### Step 2: Setup Environment Variables

1. Copy `.env.example` to `.env`:
```bash
copy .env.example .env
```

2. Open `.env` and fill in these values:

```env
# MongoDB Atlas Connection String
MONGODB_URI=mongodb+srv://username:password@cluster.xxxxx.mongodb.net/portfolio

# Gmail Configuration
EMAIL_USER=roshanalee5110@gmail.com
EMAIL_PASS=xxxx xxxx xxxx xxxx  # 16-character App Password

# Server Settings
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### Step 3: Get MongoDB Connection String

1. Visit: https://www.mongodb.com/cloud/atlas
2. Sign up/Login (free)
3. Create New Cluster (M0 Free tier)
4. Click "Connect" → "Connect your application"
5. Copy connection string
6. Replace `<password>` with your database password
7. Paste in `.env` file

### Step 4: Get Gmail App Password

**IMPORTANT:** You need App Password, NOT your regular Gmail password!

1. Go to: https://myaccount.google.com/security
2. Enable "2-Step Verification" (if not enabled)
3. After enabling 2FA, scroll down to "App passwords"
4. Click "App passwords"
5. Select "Mail" and "Windows Computer"
6. Click "Generate"
7. Copy the 16-character password (example: `abcd efgh ijkl mnop`)
8. Paste in `.env` as `EMAIL_PASS` (remove spaces)

### Step 5: Run the Server

```bash
npm run dev
```

You should see:
```
✅ MongoDB Connected: cluster0.xxxxx.mongodb.net
✅ Email server is ready to send messages
🚀 Server is running on port 5000
```

### Step 6: Test the API

Open browser and visit:
- http://localhost:5000/api/health
- http://localhost:5000/api/contact/test

Both should return success messages!

### Step 7: Run Frontend

In a new terminal:
```bash
cd props-learning
npm run dev
```

Now test the contact form! 🎉

## ✅ Verification Checklist

- [ ] MongoDB shows "Connected" in terminal
- [ ] Email server shows "ready" in terminal
- [ ] Health endpoint returns success
- [ ] Frontend contact form submits successfully
- [ ] Email received at roshanalee5110@gmail.com
- [ ] Message saved in MongoDB Atlas dashboard

## 🐛 Common Issues

### "MongoDB Connection Error"
- Check if IP is whitelisted in MongoDB Atlas (Network Access → Add IP → Allow from Anywhere)
- Verify connection string has correct password

### "Email configuration error"
- Make sure you're using App Password, not regular password
- Verify 2FA is enabled on Gmail account
- Check EMAIL_USER and EMAIL_PASS in .env

### "CORS Error" in Frontend
- Verify backend is running on port 5000
- Check FRONTEND_URL in .env matches your React app URL

## 📁 File Structure

```
portfolio-backend/
├── config/db.js          # MongoDB connection
├── models/Message.js     # Database schema
├── routes/contact.js     # API routes
├── server.js            # Main server
├── .env                 # Your credentials (SECRET!)
├── .env.example         # Template
└── package.json         # Dependencies
```

## 🎯 Next Steps

1. Test contact form thoroughly
2. Check MongoDB Atlas dashboard to see saved messages
3. Verify emails are being received
4. Deploy to Render/Railway (see README.md)

## 📞 Need Help?

Check the detailed README.md for:
- Complete API documentation
- Deployment instructions
- Advanced troubleshooting
- Security best practices
