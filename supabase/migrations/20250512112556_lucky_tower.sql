/*
  # Création de la table des maladies
  
  1. Tables créées
    - diseases: Table des maladies des plantes
      - id (uuid, clé primaire)
      - name (text)
      - scientific_name (text)
      - description (text)
      - symptoms (text[])
      - causes (text[])
      - treatments (text[])
      - prevention (text[])
      - affected_plants (text[])
      - images (text[])
      - severity (text)
      - created_at (timestamp)
      - updated_at (timestamp)
    
  2. Sécurité
    - RLS activé sur la table diseases
    - Politique permettant la lecture publique
    - Politique permettant la modification par les administrateurs
*/

CREATE TABLE IF NOT EXISTS diseases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  scientific_name text,
  description text,
  symptoms text[],
  causes text[],
  treatments text[],
  prevention text[],
  affected_plants text[],
  images text[],
  severity text CHECK (severity IN ('low', 'medium', 'high')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE diseases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Diseases are viewable by everyone"
  ON diseases
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Diseases are insertable by authenticated users"
  ON diseases
  FOR INSERT
  TO authenticated
  WITH CHECK (true);