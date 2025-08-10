const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const { Pool } = require('pg');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Production security headers
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
  app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
  });
}

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? [process.env.FRONTEND_URL, 'https://study-sync-lp.vercel.app']
    : true,
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Initialize PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DB_URL || 'postgres://postgres:password@localhost:5432/studysync_waitlist',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

// Create waitlist table if it doesn't exist
const initDatabase = async () => {
  try {
    // Test the connection first
    console.log('🔌 Testing database connection...');
    await pool.query('SELECT NOW()');
    console.log('✅ Database connection successful');
    
    // Create the table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS waitlist (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        school TEXT,
        signup_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        confirmed BOOLEAN DEFAULT FALSE,
        confirmation_token TEXT
      )
    `);
    console.log('✅ Database table initialized successfully');
  } catch (err) {
    console.error('❌ Database initialization error:', err);
    console.log('💡 Make sure PostgreSQL is running and the connection details are correct');
    console.log('💡 Current DB_URL:', process.env.DB_URL ? 'Set' : 'Not set');
  }
};

initDatabase();

// Email transporter configuration
const isTestMode = !process.env.EMAIL_USER || process.env.EMAIL_USER === 'your-email@gmail.com';

let transporter;
if (isTestMode) {
  // Test mode - log emails instead of sending
  console.log('🧪 Running in TEST MODE - emails will be logged instead of sent');
  transporter = {
    sendMail: (mailOptions, callback) => {
      console.log('\n📧 EMAIL WOULD BE SENT:');
      console.log('From:', mailOptions.from);
      console.log('To:', mailOptions.to);
      console.log('Subject:', mailOptions.subject);
      console.log('Confirmation Link:', mailOptions.html.match(/href="([^"]*)"/) ? mailOptions.html.match(/href="([^"]*)"/)[1] : 'N/A');
      console.log('-------------------\n');
      callback(null, { messageId: 'test-' + Date.now() });
    }
  };
} else {
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
}

// Email templates
const confirmationEmailHTML = (name, confirmationLink) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Inter', Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; background-color: white; }
    .header { background: linear-gradient(135deg, #2563EB, #1d4ed8); padding: 40px 20px; text-align: center; }
    .logo { color: white; font-size: 28px; font-weight: bold; margin-bottom: 10px; }
    .header-text { color: #e0e7ff; font-size: 16px; }
    .content { padding: 40px 20px; }
    .welcome { font-size: 24px; font-weight: bold; color: #1f2937; margin-bottom: 20px; }
    .message { color: #6b7280; line-height: 1.6; margin-bottom: 30px; }
    .cta-button { display: inline-block; background-color: #FACC15; color: #92400e; padding: 15px 30px; border-radius: 12px; text-decoration: none; font-weight: bold; margin: 20px 0; }
    .benefits { background-color: #f8fafc; padding: 20px; border-radius: 12px; margin: 20px 0; }
    .benefit { display: flex; align-items: center; margin: 10px 0; }
    .benefit-icon { margin-right: 10px; font-size: 20px; }
    .footer { background-color: #1f2937; color: #9ca3af; padding: 20px; text-align: center; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">📚 StudySync</div>
      <div class="header-text">Welcome to the future of collaborative learning!</div>
    </div>
    
    <div class="content">
      <h1 class="welcome">Welcome to StudySync, ${name}! 🎉</h1>
      
      <p class="message">
        Thank you for joining the StudySync waitlist! You're now part of an exclusive group of students 
        who will get early access to the platform that's going to revolutionize how students connect and study together.
      </p>
      
      <div style="text-align: center;">
        <a href="${confirmationLink}" class="cta-button">Confirm Your Email ✨</a>
      </div>
      
      <div class="benefits">
        <h3 style="color: #1f2937; margin-bottom: 15px;">What's Next?</h3>
        <div class="benefit">
          <span class="benefit-icon">⚡</span>
          <span>Get early access before public launch</span>
        </div>
        <div class="benefit">
          <span class="benefit-icon">🎁</span>
          <span>Free premium features for 3 months</span>
        </div>
        <div class="benefit">
          <span class="benefit-icon">👑</span>
          <span>Founder status and special recognition</span>
        </div>
        <div class="benefit">
          <span class="benefit-icon">📧</span>
          <span>Regular updates on development progress</span>
        </div>
      </div>
      
      <p class="message">
        We'll keep you updated on our progress and notify you as soon as StudySync is ready for you to explore.
        Get ready to transform your study experience!
      </p>
    </div>
    
    <div class="footer">
      <p>© 2025 StudySync. Built with ❤️ in collaboration with Tech Bridge.</p>
      <p>If you didn't sign up for this, you can safely ignore this email.</p>
    </div>
  </div>
</body>
</html>
`;

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'StudySync Waitlist API is running' });
});

// Get waitlist statistics
app.get('/api/waitlist/stats', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT COUNT(*) as total, COUNT(CASE WHEN confirmed = true THEN 1 END) as confirmed FROM waitlist'
    );
    const row = result.rows[0];
    res.json({
      total: parseInt(row.total),
      confirmed: parseInt(row.confirmed),
      pending: parseInt(row.total) - parseInt(row.confirmed)
    });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Get all waitlist users (admin endpoint)
app.get('/api/waitlist/users', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name, email, school, signup_date, confirmed FROM waitlist ORDER BY signup_date DESC'
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Join waitlist
app.post('/api/waitlist/join', async (req, res) => {
  const { name, email, school } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  
  const userId = uuidv4();
  const confirmationToken = uuidv4();
  
  try {
    // Insert user into database
    await pool.query(
      'INSERT INTO waitlist (id, name, email, school, confirmation_token) VALUES ($1, $2, $3, $4, $5)',
      [userId, name, email, school || null, confirmationToken]
    );
    
    // Send confirmation email
    const confirmationLink = `${req.protocol}://${req.get('host')}/api/waitlist/confirm/${confirmationToken}`;
    
    const mailOptions = {
      from: process.env.EMAIL_USER || 'noreply@studysync.app',
      to: email,
      subject: '🎉 Welcome to StudySync Waitlist - Confirm Your Email',
      html: confirmationEmailHTML(name, confirmationLink)
    };
    
    transporter.sendMail(mailOptions, (emailErr, info) => {
      if (emailErr) {
        console.error('Email error:', emailErr);
        // Still return success even if email fails
      }
      
      res.status(201).json({
        success: true,
        message: 'Successfully joined waitlist! Please check your email to confirm.',
        userId: userId
      });
    });
    
  } catch (err) {
    if (err.code === '23505') { // PostgreSQL unique constraint violation
      return res.status(409).json({ error: 'Email already registered' });
    }
    console.error('Database error:', err);
    return res.status(500).json({ error: 'Database error' });
  }
});

// Confirm email
app.get('/api/waitlist/confirm/:token', async (req, res) => {
  const { token } = req.params;
  
  try {
    const result = await pool.query(
      'UPDATE waitlist SET confirmed = true WHERE confirmation_token = $1',
      [token]
    );
    
    if (result.rowCount === 0) {
      return res.status(404).send('Invalid confirmation token');
    }
    
    // Redirect to a success page
    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Email Confirmed - StudySync</title>
        <style>
          body { font-family: Inter, Arial, sans-serif; background: linear-gradient(135deg, #2563EB, #1d4ed8); margin: 0; padding: 40px; text-align: center; }
          .container { max-width: 500px; margin: 0 auto; background: white; padding: 40px; border-radius: 20px; }
          .icon { font-size: 60px; margin-bottom: 20px; }
          h1 { color: #1f2937; margin-bottom: 15px; }
          p { color: #6b7280; line-height: 1.6; margin-bottom: 30px; }
          .button { display: inline-block; background: #FACC15; color: #92400e; padding: 15px 30px; border-radius: 12px; text-decoration: none; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="icon">✅</div>
          <h1>Email Confirmed!</h1>
          <p>Thank you for confirming your email. You're now officially on the StudySync waitlist and will be among the first to know when we launch!</p>
          <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}" class="button">Back to StudySync</a>
        </div>
      </body>
      </html>
    `);
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).send('Database error');
  }
});

// Test endpoint - automatically confirm the latest signup (for testing only)
app.post('/api/waitlist/test-confirm', async (req, res) => {
  if (!isTestMode) {
    return res.status(403).json({ error: 'Test endpoint only available in test mode' });
  }
  
  try {
    const result = await pool.query(
      'SELECT * FROM waitlist WHERE confirmed = false ORDER BY signup_date DESC LIMIT 1'
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No unconfirmed signups found' });
    }
    
    const user = result.rows[0];
    
    await pool.query(
      'UPDATE waitlist SET confirmed = true WHERE id = $1',
      [user.id]
    );
    
    res.json({
      success: true,
      message: `Confirmed signup for ${user.email}`,
      user: { name: user.name, email: user.email }
    });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`🚀 StudySync Waitlist API running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📧 Email mode: ${isTestMode ? 'TEST (logging only)' : 'PRODUCTION (sending emails)'}`);
});

// Graceful shutdown handling
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM received, shutting down gracefully...');
  server.close(() => {
    console.log('✅ Server closed');
    pool.end(() => {
      console.log('✅ Database connections closed');
      process.exit(0);
    });
  });
});

process.on('SIGINT', () => {
  console.log('🛑 SIGINT received, shutting down gracefully...');
  server.close(() => {
    console.log('✅ Server closed');
    pool.end(() => {
      console.log('✅ Database connections closed');
      process.exit(0);
    });
  });
});

module.exports = app;
