/*
  # Air-Typing System Database Schema

  1. New Tables
    - `typing_sessions`
      - `id` (uuid, primary key) - Unique session identifier
      - `session_name` (text) - Optional name for the session
      - `typed_text` (text) - The complete text typed in this session
      - `word_count` (integer) - Number of words typed
      - `character_count` (integer) - Number of characters typed
      - `duration_seconds` (integer) - Session duration in seconds
      - `created_at` (timestamptz) - Session creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp
    
    - `user_preferences`
      - `id` (uuid, primary key) - Unique preference identifier
      - `sensitivity` (numeric) - Gesture sensitivity (0.0 to 1.0)
      - `hover_delay` (integer) - Milliseconds to wait before key selection
      - `autocorrect_enabled` (boolean) - Enable/disable autocorrect
      - `autocomplete_enabled` (boolean) - Enable/disable autocomplete
      - `created_at` (timestamptz) - Preference creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on all tables
    - Add policies for public access (no auth required for demo)
*/

CREATE TABLE IF NOT EXISTS typing_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_name text DEFAULT '',
  typed_text text DEFAULT '',
  word_count integer DEFAULT 0,
  character_count integer DEFAULT 0,
  duration_seconds integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS user_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sensitivity numeric DEFAULT 0.7,
  hover_delay integer DEFAULT 800,
  autocorrect_enabled boolean DEFAULT true,
  autocomplete_enabled boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE typing_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read typing sessions"
  ON typing_sessions FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert typing sessions"
  ON typing_sessions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update typing sessions"
  ON typing_sessions FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete typing sessions"
  ON typing_sessions FOR DELETE
  USING (true);

CREATE POLICY "Anyone can read user preferences"
  ON user_preferences FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert user preferences"
  ON user_preferences FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update user preferences"
  ON user_preferences FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete user preferences"
  ON user_preferences FOR DELETE
  USING (true);

CREATE INDEX IF NOT EXISTS typing_sessions_created_at_idx ON typing_sessions(created_at DESC);
CREATE INDEX IF NOT EXISTS user_preferences_created_at_idx ON user_preferences(created_at DESC);