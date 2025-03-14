# MongoDB Schema Documentation

This document outlines the MongoDB schema for  Iqraaly.


## 1. Users Collection (Includes Subscription Support)
{
    "_id": "ObjectId",
    "username": "user123",
    "email": "user@example.com",
    "password_hash": "hashed_password",
    "profile_picture": "profile.jpg",
    "subscription": {
        "type": "premium", // or "free"
        "expiry": "2025-03-30" // Date in ISO format
    },
    "created_at": "timestamp" // ISO date
}

## 2. Podcasts Collection
{
    "_id": "ObjectId",
    "title": "Podcast Name",
    "host": "Host Name",
    "genre": "Technology",
    "language": "Arabic",
    "episodes": [
        {
            "episode_id": "ObjectId",
            "title": "Episode 1",
            "duration": 45, // Duration in minutes
            "file_url": "path/to/audio.mp3",
            "ai_transcription": "Episode transcript...",
            "release_date": "timestamp" // ISO date
        }
    ],
    "created_at": "timestamp" // ISO date
}


