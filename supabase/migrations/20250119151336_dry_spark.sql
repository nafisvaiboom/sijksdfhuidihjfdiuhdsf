/*
  # Update Users Table Schema

  1. Changes
    - Add Google authentication support
    - Add last login tracking
    - Add indexes for performance

  2. Security
    - Maintain existing RLS policies
*/

-- Add Google ID and last login columns to users table
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'users' AND column_name = 'google_id'
  ) THEN
    ALTER TABLE users ADD COLUMN google_id VARCHAR(255) UNIQUE;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'users' AND column_name = 'last_login'
  ) THEN
    ALTER TABLE users ADD COLUMN last_login TIMESTAMP;
  END IF;
END $$;

-- Add indexes for performance
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes 
    WHERE tablename = 'users' AND indexname = 'idx_google_id'
  ) THEN
    CREATE INDEX idx_google_id ON users(google_id);
  END IF;
END $$;