1. Users Collection (Includes Subscription Support)
{
    "_id": "ObjectId",
    "username": "user123",
    "email": "user@example.com",
    "password_hash": "hashed_password",
    "profile_picture": "profile.jpg",
    "subscription": {
        "type": "free", // or "premium"
        "expiry": "2025-03-30" // Date in ISO format
    },
    "created_at": "timestamp" // ISO date
}
2. Audiobooks Collection (Enhanced with AI Metadata)

{
    "_id": "ObjectId",
    "title": "Book Title",
    "author": "Author Name",
    "narrator": "Narrator Name",
    "genre": "Self-Help",
    "language": "Arabic",
    "duration": 320, // Duration in minutes
    "file_url": "path/to/audio.mp3",
    "ai_summary": "This book covers...",
    "ai_transcription": "Full text transcription here...",
    "created_at": "timestamp" // ISO date
}

3. Podcasts Collection

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
4. Reviews Collection
{
    "_id": "ObjectId",
    "user_id": "ObjectId",
    "book_id": "ObjectId", // Optional, if reviewing an audiobook
    "podcast_id": "ObjectId", // Optional, if reviewing a podcast
    "rating": 4, // Rating between 1 and 5
    "comment": "Great audiobook!",
    "created_at": "timestamp" // ISO date
}
5. Playback History Collection

{
    "_id": "ObjectId",
    "user_id": "ObjectId",
    "content": {
        "type": "audiobook", // or "podcast"
        "id": "ObjectId" // ID of the audiobook or podcast episode
    },
    "progress": 1250, // Progress in seconds
    "last_played": "timestamp" // ISO date
}

6. Downloads Collection (For Offline Mode)
{
    "_id": "ObjectId",
    "user_id": "ObjectId",
    "downloads": [
        {
            "type": "audiobook", // or "podcast"
            "id": "ObjectId", // ID of the audiobook or podcast episode
            "timestamp": "timestamp" // ISO date
        }
    ]
}
7. AI Recommendations Collection
{
    "_id": "ObjectId",
    "user_id": "ObjectId",
    "recommendations": [
        {
            "book_id": "ObjectId", // Optional, if recommending an audiobook
            "podcast_id": "ObjectId", // Optional, if recommending a podcast
            "ai_reason": "Based on your past listens..."
        }
    ],
    "created_at": "timestamp" // ISO date
}
