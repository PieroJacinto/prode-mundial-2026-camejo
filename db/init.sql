-- =============================================
-- PRODE MUNDIAL 2026 — init.sql
-- Cátedra Camejo | FIUBA 2026
-- =============================================

CREATE TABLE IF NOT EXISTS usuarios (
  id            SERIAL PRIMARY KEY,
  nombre        VARCHAR(100) NOT NULL,
  email         VARCHAR(150) UNIQUE NOT NULL,
  password      VARCHAR(255) NOT NULL,
  matecitos      INT          DEFAULT 1000,  -- se asignan al registrarse, nunca se recargan
  created_at    TIMESTAMP    DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS partidos (
  id               SERIAL PRIMARY KEY,
  equipo1          VARCHAR(100) NOT NULL,    -- primer equipo del fixture
  equipo2          VARCHAR(100) NOT NULL,    -- segundo equipo del fixture
  fase             VARCHAR(20)  NOT NULL CHECK (fase IN ('grupos', 'octavos', 'cuartos', 'semifinal', 'final')),
  goles_equipo1    INT,                      -- NULL hasta que se juegue
  goles_equipo2    INT,                      -- NULL hasta que se juegue
  fecha            TIMESTAMP    NOT NULL,
  finalizado       BOOLEAN      DEFAULT FALSE
);

-- Apuesta simple: quién gana o empate
-- Empate solo válido en fase de grupos (lo valida el backend)
CREATE TABLE IF NOT EXISTS apuestas (
  id                 SERIAL PRIMARY KEY,
  usuario_id         INT NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  partido_id         INT NOT NULL REFERENCES partidos(id) ON DELETE CASCADE,
  resultado_apostado VARCHAR(10) NOT NULL CHECK (resultado_apostado IN ('equipo1', 'empate', 'equipo2')),
  monto              INT NOT NULL,        -- fichas apostadas
  cuota_final        DECIMAL(5,2),        -- se calcula al cerrar el partido (parimutuel)
  ganancia           INT DEFAULT 0,       -- se actualiza al finalizar el partido
  created_at         TIMESTAMP DEFAULT NOW(),
  UNIQUE(usuario_id, partido_id)          -- una apuesta de resultado por partido
);

-- Apuesta exacta: marcador específico (ej: 2-1)
-- Paga mucho más porque es difícil de acertar
CREATE TABLE IF NOT EXISTS apuestas_marcador (
  id             SERIAL PRIMARY KEY,
  usuario_id     INT NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  partido_id     INT NOT NULL REFERENCES partidos(id) ON DELETE CASCADE,
  goles_equipo1  INT NOT NULL,            -- goles predichos para equipo1
  goles_equipo2  INT NOT NULL,            -- goles predichos para equipo2
  monto          INT NOT NULL,            -- fichas apostadas
  cuota_final    DECIMAL(5,2),            -- se calcula al cerrar (pozo entre los que acertaron exacto)
  ganancia       INT DEFAULT 0,           -- se actualiza al finalizar el partido
  created_at     TIMESTAMP DEFAULT NOW(),
  UNIQUE(usuario_id, partido_id)          -- una apuesta de marcador por partido
);

-- Apuestas antes del torneo: campeón y goleador
CREATE TABLE IF NOT EXISTS apuestas_especiales (
  id         SERIAL PRIMARY KEY,
  usuario_id INT NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  tipo       VARCHAR(20) NOT NULL CHECK (tipo IN ('campeon', 'goleador')),
  valor      VARCHAR(100) NOT NULL,       -- nombre del equipo o jugador apostado
  resuelta   BOOLEAN DEFAULT FALSE,
  ganancia   INT DEFAULT 0,              -- se actualiza al finalizar el torneo
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(usuario_id, tipo)               -- una apuesta por tipo por usuario
);

-- =============================================
-- DATOS DE PRUEBA
-- =============================================

INSERT INTO usuarios (nombre, email, password) VALUES
  ('Juan Perez',   'juan@gmail.com',   '$2b$10$X066tq1JaRhE9pytNqJki.n65DRBVTcY4x8wgeFyHCAy4S04r5dBC'),
  ('Maria Lopez',  'maria@gmail.com',  '$2b$10$X066tq1JaRhE9pytNqJki.n65DRBVTcY4x8wgeFyHCAy4S04r5dBC'),
  ('Carlos Gomez', 'carlos@gmail.com', '$2b$10$X066tq1JaRhE9pytNqJki.n65DRBVTcY4x8wgeFyHCAy4S04r5dBC');

-- FASE DE GRUPOS — 72 partidos
-- Horarios en UTC-3 (Argentina)

INSERT INTO partidos (equipo1, equipo2, fase, fecha) VALUES

-- GRUPO A
('Mexico',          'Sudafrica',       'grupos', '2026-06-11 16:00:00'),
('Corea del Sur',   'Rep. Checa',      'grupos', '2026-06-12 02:00:00'),
('Rep. Checa',      'Sudafrica',       'grupos', '2026-06-18 16:00:00'),
('Mexico',          'Corea del Sur',   'grupos', '2026-06-19 02:00:00'),
('Sudafrica',       'Corea del Sur',   'grupos', '2026-06-25 02:00:00'),
('Mexico',          'Rep. Checa',      'grupos', '2026-06-25 02:00:00'),

-- GRUPO B
('Canada',          'Bosnia y Herz.',  'grupos', '2026-06-12 16:00:00'),
('Qatar',           'Suiza',           'grupos', '2026-06-13 16:00:00'),
('Suiza',           'Bosnia y Herz.',  'grupos', '2026-06-18 16:00:00'),
('Canada',          'Qatar',           'grupos', '2026-06-18 22:00:00'),
('Suiza',           'Canada',          'grupos', '2026-06-24 16:00:00'),
('Bosnia y Herz.',  'Qatar',           'grupos', '2026-06-24 16:00:00'),

-- GRUPO C
('Brasil',          'Marruecos',       'grupos', '2026-06-13 22:00:00'),
('Haiti',           'Escocia',         'grupos', '2026-06-14 01:00:00'),
('Escocia',         'Marruecos',       'grupos', '2026-06-19 22:00:00'),
('Brasil',          'Haiti',           'grupos', '2026-06-20 01:00:00'),
('Marruecos',       'Haiti',           'grupos', '2026-06-24 22:00:00'),
('Escocia',         'Brasil',          'grupos', '2026-06-24 22:00:00'),

-- GRUPO D
('Estados Unidos',  'Paraguay',        'grupos', '2026-06-13 02:00:00'),
('Australia',       'Turquia',         'grupos', '2026-06-14 04:00:00'),
('Estados Unidos',  'Australia',       'grupos', '2026-06-19 19:00:00'),
('Turquia',         'Paraguay',        'grupos', '2026-06-20 04:00:00'),
('Paraguay',        'Australia',       'grupos', '2026-06-26 02:00:00'),
('Turquia',         'Estados Unidos',  'grupos', '2026-06-26 02:00:00'),

-- GRUPO E
('Alemania',        'Curazao',         'grupos', '2026-06-14 17:00:00'),
('Costa de Marfil', 'Ecuador',         'grupos', '2026-06-14 23:00:00'),
('Alemania',        'Costa de Marfil', 'grupos', '2026-06-20 20:00:00'),
('Ecuador',         'Curazao',         'grupos', '2026-06-21 00:00:00'),
('Curazao',         'Costa de Marfil', 'grupos', '2026-06-25 20:00:00'),
('Ecuador',         'Alemania',        'grupos', '2026-06-25 20:00:00'),

-- GRUPO F
('Paises Bajos',    'Japon',           'grupos', '2026-06-14 20:00:00'),
('Suecia',          'Tunez',           'grupos', '2026-06-15 02:00:00'),
('Paises Bajos',    'Suecia',          'grupos', '2026-06-20 17:00:00'),
('Tunez',           'Japon',           'grupos', '2026-06-21 04:00:00'),
('Japon',           'Suecia',          'grupos', '2026-06-25 23:00:00'),
('Tunez',           'Paises Bajos',    'grupos', '2026-06-25 23:00:00'),

-- GRUPO G
('Belgica',         'Egipto',          'grupos', '2026-06-15 19:00:00'),
('Iran',            'Nueva Zelanda',   'grupos', '2026-06-16 01:00:00'),
('Belgica',         'Iran',            'grupos', '2026-06-21 19:00:00'),
('Nueva Zelanda',   'Egipto',          'grupos', '2026-06-22 01:00:00'),
('Egipto',          'Iran',            'grupos', '2026-06-27 19:00:00'),
('Nueva Zelanda',   'Belgica',         'grupos', '2026-06-27 19:00:00'),

-- GRUPO H
('Espana',          'Cabo Verde',      'grupos', '2026-06-15 16:00:00'),
('Arabia Saudita',  'Uruguay',         'grupos', '2026-06-15 22:00:00'),
('Espana',          'Arabia Saudita',  'grupos', '2026-06-21 16:00:00'),
('Uruguay',         'Cabo Verde',      'grupos', '2026-06-21 22:00:00'),
('Cabo Verde',      'Arabia Saudita',  'grupos', '2026-06-28 23:00:00'),
('Uruguay',         'Espana',          'grupos', '2026-06-28 23:00:00'),

-- GRUPO I
('Francia',         'Senegal',         'grupos', '2026-06-16 19:00:00'),
('Irak',            'Noruega',         'grupos', '2026-06-16 22:00:00'),
('Francia',         'Irak',            'grupos', '2026-06-22 21:00:00'),
('Noruega',         'Senegal',         'grupos', '2026-06-23 00:00:00'),
('Senegal',         'Irak',            'grupos', '2026-06-28 19:00:00'),
('Noruega',         'Francia',         'grupos', '2026-06-28 19:00:00'),

-- GRUPO J
('Argentina',       'Argelia',         'grupos', '2026-06-17 01:00:00'),
('Austria',         'Jordania',        'grupos', '2026-06-17 04:00:00'),
('Argentina',       'Austria',         'grupos', '2026-06-22 17:00:00'),
('Jordania',        'Argelia',         'grupos', '2026-06-23 03:00:00'),
('Argelia',         'Austria',         'grupos', '2026-06-29 23:00:00'),
('Jordania',        'Argentina',       'grupos', '2026-06-29 23:00:00'),

-- GRUPO K
('Portugal',        'RD Congo',        'grupos', '2026-06-17 17:00:00'),
('Uzbekistan',      'Colombia',        'grupos', '2026-06-18 02:00:00'),
('Portugal',        'Uzbekistan',      'grupos', '2026-06-23 17:00:00'),
('Colombia',        'RD Congo',        'grupos', '2026-06-24 02:00:00'),
('RD Congo',        'Uzbekistan',      'grupos', '2026-06-29 19:00:00'),
('Colombia',        'Portugal',        'grupos', '2026-06-29 19:00:00'),

-- GRUPO L
('Inglaterra',      'Croacia',         'grupos', '2026-06-17 20:00:00'),
('Ghana',           'Panama',          'grupos', '2026-06-17 23:00:00'),
('Inglaterra',      'Ghana',           'grupos', '2026-06-23 20:00:00'),
('Panama',          'Croacia',         'grupos', '2026-06-23 23:00:00'),
('Croacia',         'Ghana',           'grupos', '2026-06-30 23:00:00'),
('Panama',          'Inglaterra',      'grupos', '2026-06-30 23:00:00');