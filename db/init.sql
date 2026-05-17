CREATE TABLE IF NOT EXISTS usuarios (
  id             SERIAL PRIMARY KEY,
  nombre         VARCHAR(100)  NOT NULL,
  email          VARCHAR(150)  UNIQUE NOT NULL,
  password       VARCHAR(255)  NOT NULL,
  puntos_totales INT           DEFAULT 0,
  saldo_virtual  INT           DEFAULT 1000,
  created_at     TIMESTAMP     DEFAULT NOW()
);

-- Datos de prueba
INSERT INTO usuarios (nombre, email, password) VALUES
  ('Juan Perez',   'juan@gmail.com',   '1234'),
  ('Maria Lopez',  'maria@gmail.com',  '1234'),
  ('Carlos Gomez', 'carlos@gmail.com', '1234');