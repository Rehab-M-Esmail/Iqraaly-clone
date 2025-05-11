This document outlines the SQL schema for Iqraaly

```sql
CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    profile_picture VARCHAR(255),
    subscription_type ENUM('free', 'premium') DEFAULT 'free',
    subscription_expiry DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Podcasts (
    podcast_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    host VARCHAR(255),
    genre VARCHAR(100),
    language VARCHAR(50) DEFAULT 'Arabic',
    episode_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Episodes (
    episode_id SERIAL PRIMARY KEY,
    podcast_id INT REFERENCES Podcasts(podcast_id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    duration INT,
    file_url VARCHAR(255) NOT NULL,
    ai_transcription TEXT,
    release_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Reviews (
    review_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES Users(user_id) ON DELETE CASCADE,
    book_id INT REFERENCES Audiobooks(book_id) ON DELETE CASCADE,
    podcast_id INT REFERENCES Podcasts(podcast_id) ON DELETE CASCADE,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE PlaybackHistory (
    history_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES Users(user_id) ON DELETE CASCADE,
    book_id INT REFERENCES Audiobooks(book_id) ON DELETE SET NULL,
    episode_id INT REFERENCES Episodes(episode_id) ON DELETE SET NULL,
    progress INT, -- in seconds
    last_played TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Downloads (
    download_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES Users(user_id) ON DELETE CASCADE,
    book_id INT REFERENCES Audiobooks(book_id) ON DELETE CASCADE,
    episode_id INT REFERENCES Episodes(episode_id) ON DELETE CASCADE,
    download_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Recommendations (
    recommendation_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES Users(user_id) ON DELETE CASCADE,
    recommended_book_id INT REFERENCES Audiobooks(book_id) ON DELETE CASCADE,
    recommended_podcast_id INT REFERENCES Podcasts(podcast_id) ON DELETE CASCADE,
    ai_reason TEXT, -- Explanation from AI
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
