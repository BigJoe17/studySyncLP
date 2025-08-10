-- StudySync Waitlist Database Setup
-- Run this script in your PostgreSQL database to create the database and table

-- Create database (run this as postgres superuser)
CREATE DATABASE studysync_waitlist;

-- Connect to the database and create the table
\c studysync_waitlist;

-- Create waitlist table
CREATE TABLE IF NOT EXISTS waitlist (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    school TEXT,
    signup_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    confirmed BOOLEAN DEFAULT FALSE,
    confirmation_token TEXT
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_confirmed ON waitlist(confirmed);
CREATE INDEX IF NOT EXISTS idx_waitlist_signup_date ON waitlist(signup_date);

-- Grant permissions (optional, adjust username as needed)
-- GRANT ALL PRIVILEGES ON DATABASE studysync_waitlist TO your_username;
-- GRANT ALL PRIVILEGES ON TABLE waitlist TO your_username;
