CREATE TABLE IF NOT EXISTS Users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    profile_picture VARCHAR(255),
    subscription_type VARCHAR(50) DEFAULT 'free',
    subscription_expiry DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Podcasts (
    podcast_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    host VARCHAR(255),
    genre VARCHAR(100),
    language VARCHAR(50) DEFAULT 'Arabic',
    episode_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Episodes (
    episode_id SERIAL PRIMARY KEY,
    podcast_id INT REFERENCES Podcasts(podcast_id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    duration INT,
    file_url VARCHAR(255) NOT NULL,
    ai_transcription TEXT,
    release_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO Podcasts (title, host, genre) VALUES
('TechTalk', 'Ahmed Youssef', 'Technology'),
('HealthFirst', 'Salma Nour', 'Health');