/*
  # Création des tables initiales
  
  1. Tables créées
    - users: Table des utilisateurs
      - id (uuid, clé primaire)
      - email (text, unique)
      - created_at (timestamp)
      - updated_at (timestamp)
      - name (text)
      - avatar_url (text)
    
  2. Sécurité
    - RLS activé sur la table users
    - Politique permettant aux utilisateurs de lire leurs propres données
*/

CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  name text,
  avatar_url text
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);