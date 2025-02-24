-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(36) PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  google_id VARCHAR(255) UNIQUE,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMP,
  INDEX idx_user_email (email),
  INDEX idx_google_id (google_id)
);

-- Create domains table
CREATE TABLE IF NOT EXISTS domains (
  id VARCHAR(36) PRIMARY KEY,
  domain VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_domain_name (domain)
);

-- Create temporary emails table
CREATE TABLE IF NOT EXISTS temp_emails (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  domain_id VARCHAR(36) NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (domain_id) REFERENCES domains(id) ON DELETE CASCADE,
  INDEX idx_temp_email (email),
  INDEX idx_user_id (user_id),
  INDEX idx_expiry (expires_at)
);

-- Create received emails table
CREATE TABLE IF NOT EXISTS received_emails (
  id VARCHAR(36) PRIMARY KEY,
  temp_email_id VARCHAR(36) NOT NULL,
  from_email VARCHAR(255) NOT NULL,
  subject TEXT,
  body LONGTEXT,
  received_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (temp_email_id) REFERENCES temp_emails(id) ON DELETE CASCADE,
  INDEX idx_temp_email_id (temp_email_id),
  INDEX idx_received_at (received_at)
);

-- Create email attachments table
CREATE TABLE IF NOT EXISTS email_attachments (
  id VARCHAR(36) PRIMARY KEY,
  email_id VARCHAR(36) NOT NULL,
  filename VARCHAR(255) NOT NULL,
  content_type VARCHAR(100),
  size BIGINT,
  url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (email_id) REFERENCES received_emails(id) ON DELETE CASCADE,
  INDEX idx_email_id (email_id),
  INDEX idx_attachment_filename (filename)
);

-- Create custom messages table
CREATE TABLE IF NOT EXISTS custom_messages (
  id VARCHAR(36) PRIMARY KEY,
  message TEXT NOT NULL,
  type ENUM('info', 'warning', 'success', 'error') NOT NULL DEFAULT 'info',
  is_active BOOLEAN DEFAULT TRUE,
  created_by VARCHAR(36) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_active_messages (is_active),
  INDEX idx_created_at (created_at)
);

-- Create user dismissed messages table
CREATE TABLE IF NOT EXISTS user_dismissed_messages (
  user_id VARCHAR(36) NOT NULL,
  message_id VARCHAR(36) NOT NULL,
  dismissed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, message_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (message_id) REFERENCES custom_messages(id) ON DELETE CASCADE,
  INDEX idx_user_dismissals (user_id, dismissed_at)
);