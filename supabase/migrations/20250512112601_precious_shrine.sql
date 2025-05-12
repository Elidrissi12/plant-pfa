/*
  # Création de la table des signalements
  
  1. Tables créées
    - disease_sightings: Table des signalements de maladies
      - id (uuid, clé primaire)
      - disease_id (référence vers diseases)
      - user_id (référence vers users)
      - location_lat (float)
      - location_lng (float)
      - image_url (text)
      - notes (text)
      - verified (boolean)
      - created_at (timestamp)
    
  2. Sécurité
    - RLS activé
    - Politique permettant la lecture publique
    - Politique permettant aux utilisateurs de créer leurs propres signalements
*/

CREATE TABLE IF NOT EXISTS disease_sightings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  disease_id uuid REFERENCES diseases(id),
  user_id uuid REFERENCES auth.users(id),
  location_lat float8 NOT NULL,
  location_lng float8 NOT NULL,
  image_url text,
  notes text,
  verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE disease_sightings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Sightings are viewable by everyone"
  ON disease_sightings
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Users can create own sightings"
  ON disease_sightings
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);