# Portfolio Backend Server

Complete Node.js + Express backend for portfolio contact form with MongoDB storage and email notifications.

## 🚀 Features

- ✅ Contact form message handling
- ✅ MongoDB database storage
- ✅ Email notifications via Gmail
- ✅ Input validation
- ✅ CORS enabled
- ✅ Error handling
- ✅ Professional email templates

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account (free tier)
- Gmail account with App Password enabled

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
cd portfolio-backend
npm install
```

### 2. MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account or sign in
3. Create a new cluster (free tier M0)
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Replace `<password>` with your database password
7. Replace `<dbname>` with `portfolio` or your preferred name

Example:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
```

### 3. Gmail App Password Setup

**Important:** You MUST use an App Password, not your regular Gmail password.

#### Steps to create Gmail App Password:

1. Go to your Google Account: https://myaccount.google.com/
2. Click on "Security" in the left sidebar
3. Enable **2-Step Verification** (if not already enabled)
4. After enabling 2FA, go back to Security
5. Scroll down to "2-Step Verification"
6. Scroll to bottom and click "App passwords"
7. Select "Mail" and "Windows Computer" (or Other)
8. Click "Generate"
9. Copy the 16-character password (no spaces)
10. Use this password in your `.env` file

### 4. Environment Variables

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Edit `.env` and add your credentials:
```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/portfolio
EMAIL_USER=roshanalee5110@gmail.com
EMAIL_PASS=your_16_character_app_password_here
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

## 🏃‍♂️ Running the Server

### Development Mode (with auto-restart):
```bash
npm run dev
```

### Production Mode:
```bash
npm start
```

The server will start on `http://localhost:5000`

## 📡 API Endpoints

### Health Check
```
GET /api/health
```
Response:
```json
{
  "success": true,
  "message": "Server is running!",
  "timestamp": "2025-12-29T10:00:00.000Z"
}
```

### Test Contact API
```
GET /api/contact/test
```

### Send Contact Message
```
POST /api/contact/send
```
Request Body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, I'd like to discuss a project..."
}
```

Success Response:
```json
{
  "success": true,
  "message": "Message sent successfully!",
  "data": {
    "id": "message_id",
    "timestamp": "2025-12-29T10:00:00.000Z"
  }
}
```

## 🧪 Testing

### Using Browser/Postman:

1. Start the server: `npm run dev`
2. Test health endpoint: `http://localhost:5000/api/health`
3. Test contact endpoint with POST request to `http://localhost:5000/api/contact/send`

### Using curl:
```bash
curl -X POST http://localhost:5000/api/contact/send \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "This is a test message"
  }'
```

## 📁 Project Structure

```
portfolio-backend/
├── config/
│   └── db.js              # MongoDB connection
├── models/
│   └── Message.js         # Message schema
├── routes/
│   └── contact.js         # Contact routes
├── .env                   # Environment variables (DO NOT COMMIT)
├── .env.example           # Environment template
├── .gitignore            # Git ignore rules
├── package.json          # Dependencies
├── server.js             # Main server file
└── README.md             # This file
```

## 🚀 Deployment

### Option 1: Render (Recommended - Free)

1. Push code to GitHub
2. Go to [Render](https://render.com)
3. Create new "Web Service"
4. Connect your GitHub repository
5. Add environment variables in Render dashboard
6. Deploy!

### Option 2: Railway

1. Go to [Railway](https://railway.app)
2. Create new project from GitHub
3. Add environment variables
4. Deploy automatically

### Option 3: Heroku

```bash
heroku create portfolio-backend
heroku config:set MONGODB_URI=your_uri
heroku config:set EMAIL_USER=your_email
heroku config:set EMAIL_PASS=your_app_password
git push heroku main
```

## 🔒 Security Notes

- ✅ Never commit `.env` file
- ✅ Use App Password, not regular Gmail password
- ✅ Keep MongoDB connection string private
- ✅ Enable CORS only for your frontend domain in production
- ✅ Use environment variables for all sensitive data

## 🐛 Troubleshooting

### MongoDB Connection Error
- Check if your IP is whitelisted in MongoDB Atlas
- Verify connection string is correct
- Ensure database user has proper permissions

### Email Not Sending
- Verify you're using App Password, not regular password
- Check if 2FA is enabled on Gmail
- Verify EMAIL_USER and EMAIL_PASS in .env

### CORS Error
- Check FRONTEND_URL in .env matches your React app URL
- Ensure frontend is making requests to correct backend URL

## 📞 Support

If you encounter any issues, check:
1. Server logs for error messages
2. MongoDB Atlas dashboard for connection issues
3. Gmail security settings for email issues

## 📝 License

MIT
