/*
  # Création de la table des diagnostics
  
  1. Tables créées
    - diagnostics: Table des diagnostics de plantes
      - id (uuid, clé primaire)
      - user_id (référence vers users)
      - plant_name (text)
      - disease_id (référence vers diseases)
      - confidence (float)
      - image_url (text)
      - notes (text)
      - treatment_applied (text[])
      - status (text)
      - location_lat (float)
      - location_lng (float)
      - created_at (timestamp)
    
  2. Sécurité
    - RLS activé
    - Politique permettant aux utilisateurs de gérer leurs propres diagnostics
*/

CREATE TABLE IF NOT EXISTS diagnostics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  plant_name text NOT NULL,
  disease_id uuid REFERENCES diseases(id),
  confidence float8,
  image_url text,
  notes text,
  treatment_applied text[],
  status text CHECK (status IN ('healthy', 'infected', 'treated', 'cured')),
  location_lat float8,
  location_lng float8,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE diagnostics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own diagnostics"
  ON diagnostics
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own diagnostics"
  ON diagnostics
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own diagnostics"
  ON diagnostics
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own diagnostics"
  ON diagnostics
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);