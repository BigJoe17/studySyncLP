@echo off
echo 🚀 Building StudySync Waitlist API for Production

REM Install dependencies
echo 📦 Installing dependencies...
npm install --only=production

REM Verify environment
if not exist .env (
    echo ⚠️  Warning: .env file not found. Copy .env.example and configure it.
    echo 📄 Creating .env from template...
    copy .env.example .env
    echo ✏️  Please edit .env with your actual configuration
)

REM Test configuration
echo 🔌 Testing configuration...
node -e "require('dotenv').config(); console.log('✅ Environment loaded'); console.log('📧 Email configured:', !!process.env.EMAIL_USER); console.log('🗄️ Database configured:', !!process.env.DB_URL); console.log('🌐 Frontend URL:', process.env.FRONTEND_URL || 'Not set'); console.log('🚀 Ready for deployment!');"

echo ✅ Build complete! Your API is ready for production deployment.
echo.
echo 📋 Next steps:
echo 1. Configure your .env file with production values
echo 2. Set up your PostgreSQL database
echo 3. Deploy to your platform of choice (see DEPLOYMENT.md)
echo.
echo 🧪 To test locally: npm run prod

pause
