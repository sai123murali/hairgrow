-- HairGrow App - Supabase Database Schema
-- Run this SQL in your Supabase SQL Editor to set up all tables

-- ============================================
-- TABLES
-- ============================================

-- Daily task completions
CREATE TABLE IF NOT EXISTS daily_checks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  task_key TEXT NOT NULL,         -- e.g. 'm0', 'd1', 'oil', 'bath', 'onion'
  completed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, date, task_key)
);

-- Yoga session completions
CREATE TABLE IF NOT EXISTS yoga_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  pose_index INTEGER NOT NULL,    -- 0-5 matching YOGA_POSES array
  completed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, date, pose_index)
);

-- Monthly progress scores
CREATE TABLE IF NOT EXISTS progress_scores (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  month_index INTEGER NOT NULL,   -- 0-11 (Month 1 to Month 12)
  hair_fall INTEGER CHECK(hair_fall BETWEEN 1 AND 10),
  hairline INTEGER CHECK(hairline BETWEEN 1 AND 10),
  thickness INTEGER CHECK(thickness BETWEEN 1 AND 10),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, month_index)
);

-- User profiles (optional extra info)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  avatar_url TEXT,
  start_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE daily_checks ENABLE ROW LEVEL SECURITY;
ALTER TABLE yoga_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts on re-run)
DROP POLICY IF EXISTS "Users see own checks" ON daily_checks;
DROP POLICY IF EXISTS "Users see own yoga" ON yoga_sessions;
DROP POLICY IF EXISTS "Users see own progress" ON progress_scores;
DROP POLICY IF EXISTS "Users see own profile" ON profiles;

-- Each user can only see their own data
CREATE POLICY "Users see own checks" ON daily_checks FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users see own yoga" ON yoga_sessions FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users see own progress" ON progress_scores FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users see own profile" ON profiles FOR ALL USING (auth.uid() = id);

-- ============================================
-- INDEXES (for better performance)
-- ============================================

CREATE INDEX IF NOT EXISTS idx_daily_checks_user_date ON daily_checks(user_id, date);
CREATE INDEX IF NOT EXISTS idx_yoga_sessions_user_date ON yoga_sessions(user_id, date);
CREATE INDEX IF NOT EXISTS idx_progress_scores_user ON progress_scores(user_id);
