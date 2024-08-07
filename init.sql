-- Create the database if it does not exist
CREATE DATABASE IF NOT EXISTS stretch_db;

-- Switch to the stretch_db database
USE stretch_db;

-- Create the users table if it doesn't exist
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted BOOLEAN DEFAULT FALSE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  salt VARCHAR(255) NOT NULL,
  sessionToken TEXT DEFAULT NULL,
  refreshToken TEXT DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS timer_sets (
  id INT PRIMARY KEY AUTO_INCREMENT,
  userId INT NOT NULL,
  name VARCHAR(255),
  loops BOOLEAN DEFAULT FALSE,
  globalRest BOOLEAN DEFAULT TRUE,
  globalTime INT DEFAULT 0,
  timerOrder JSON DEFAULT '[]' NOT NULL,
  FOREIGN KEY (userId) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS timers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  userId INT NOT NULL,
  setId INT NOT NULL,
  timeMs BIGINT NOT NULL,
  type VARCHAR(255) NOT NULL,
  FOREIGN KEY (userId) REFERENCES users(id),
  FOREIGN KEY (setId) REFERENCES timer_sets(id)
);

CREATE TABLE sessionTokens (
    id SERIAL PRIMARY KEY,
    userId INTEGER NOT NULL,
    sessionToken VARCHAR(255) NOT NULL,
    issuedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    expiresAt TIMESTAMP NOT NULL,
    revoked BOOLEAN NOT NULL DEFAULT FALSE,
    ipAddress VARCHAR(45),
    userAgent TEXT,
    FOREIGN KEY (userId) REFERENCES users(id)
);

CREATE TABLE refreshTokens (
    id SERIAL PRIMARY KEY,
    userId INTEGER NOT NULL,
    refreshToken VARCHAR(255) NOT NULL,
    issuedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    expiresAt TIMESTAMP NOT NULL,
    revoked BOOLEAN NOT NULL DEFAULT FALSE,
    ipAddress VARCHAR(45),
    userAgent TEXT,
    FOREIGN KEY (userId) REFERENCES users(id)
);




-- Insert a user if the email doesn't already exist
INSERT INTO users (email, password, salt)
SELECT 'user@example.com', '$2b$10$w42/IEP6a7zG1KpiNjJj2OmMJHLk9/uLtj/NWMFiYTZ419PGFedtW', '$2b$10$w42/IEP6a7zG1KpiNjJj2O'
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'user@example.com');

INSERT INTO timer_sets (userId,name,timerOrder) VALUES
(1,"Warmup",'["1","2"]');

-- Insert example data
INSERT INTO timers ( userId, setId, timeMs ,type) VALUES
(1,1,10000,"stretch"),
(1,1,2000,"rest");

-- Check if the stretchapp user exists
CREATE USER IF NOT EXISTS 'stretchapp'@'%' IDENTIFIED BY 'root#root';
GRANT ALL PRIVILEGES ON stretch_db.* TO 'stretchapp'@'%';
FLUSH PRIVILEGES;

SHOW TABLES;
SELECT * FROM users\G;
SELECT * FROM timer_sets\G;
SELECT * FROM timers\G;
