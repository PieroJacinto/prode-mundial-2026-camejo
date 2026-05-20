CREATE TABLE IF NOT EXISTS usuarios (
  id             SERIAL PRIMARY KEY,
  nombre         VARCHAR(100)  NOT NULL,
  email          VARCHAR(150)  UNIQUE NOT NULL,
  password       VARCHAR(255)  NOT NULL,
  puntos_totales INT           DEFAULT 0,
  saldo_virtual  INT           DEFAULT 1000,
  created_at     TIMESTAMP     DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS equipos (
  id     SERIAL PRIMARY KEY,
  pais VARCHAR(100) NOT NULL,
  grupo  VARCHAR(1) NOT NULL -- VALE LA PENA AGREGAR UN ARRAY CON LOS JUGADORES?
);

CREATE TABLE IF NOT EXISTS partidos (
  id               SERIAL PRIMARY KEY,
  equipo_local_id  INT REFERENCES equipos(id),
  equipo_visitante_id INT REFERENCES equipos(id),
  fase             VARCHAR(50) NOT NULL CHECK (fase IN ('Grupos', 'Octavos', 'Cuartos', 'Semifinales', 'Final')),
  goles_local      INT, -- Lo dejamos vacío (NULL) hasta que se juegue
  goles_visitante  INT, 
  fecha            TIMESTAMP NOT NULL,
  finalizado       BOOLEAN DEFAULT FALSE -- arranca en falso (no se jugó)
);
-- Datos de prueba
INSERT INTO usuarios (nombre, email, password) VALUES
  ('Juan Perez',   'juan@gmail.com',   '1234'),
  ('Maria Lopez',  'maria@gmail.com',  '1234'),
  ('Carlos Gomez', 'carlos@gmail.com', '1234');
