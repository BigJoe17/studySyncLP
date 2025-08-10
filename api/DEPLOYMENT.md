# StudySync Waitlist API - Production Deployment Guide

## Prerequisites
- Node.js 18+ installed
- PostgreSQL database (local or cloud)
- Gmail account with App Password configured

## Environment Variables Required

### Required for Production:
```
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
DB_URL=postgres://username:password@host:port/database
FRONTEND_URL=https://your-frontend-domain.com
NODE_ENV=production
PORT=3001
```

## Deployment Platforms

### 1. Railway
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway add postgresql
railway deploy
```

### 2. Heroku
```bash
# Install Heroku CLI and login
heroku create studysync-waitlist-api
heroku addons:create heroku-postgresql:mini
heroku config:set EMAIL_USER=your-email@gmail.com
heroku config:set EMAIL_PASS=your-app-password
heroku config:set FRONTEND_URL=https://your-frontend.com
heroku config:set NODE_ENV=production
git push heroku main
```

### 3. Vercel
```bash
# Install Vercel CLI
npm install -g vercel
vercel
# Follow prompts and add environment variables in dashboard
```

### 4. DigitalOcean App Platform
- Connect your GitHub repository
- Add environment variables in the dashboard
- Deploy

## Local Production Testing
```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your actual values

# Run in production mode
npm run prod
```

## Database Setup
Your PostgreSQL database should have this table:
```sql
CREATE TABLE waitlist (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    school TEXT,
    signup_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    confirmed BOOLEAN DEFAULT FALSE,
    confirmation_token TEXT
);
```

## Health Check
Once deployed, test your API:
- GET `/api/health` - Should return {"status": "OK"}
- The API will automatically create the database table on first run

## Security Notes
- Never commit .env files to git
- Use strong passwords for database
- Enable SSL in production (handled by most platforms automatically)
- Consider rate limiting for production use
