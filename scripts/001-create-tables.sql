-- Create user_daily_usage table to track contact views per user per day
CREATE TABLE IF NOT EXISTS user_daily_usage (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  usage_date DATE NOT NULL DEFAULT CURRENT_DATE,
  contacts_viewed INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, usage_date)
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_user_daily_usage_user_date ON user_daily_usage(user_id, usage_date);
