const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
mongoose.connect('mongodb://localhost:27017/playbackDB')

const playerStateSchema = new mongoose.Schema({
  isPlaying: Boolean,
  currentTrack: String,
  playlist: [String],
  currentIndex: Number,
});

const PlayerState = mongoose.model('PlayerState', playerStateSchema);

async function getPlayerState() {
  let playerState = await PlayerState.findOne();
  if (!playerState) {
    playerState = new PlayerState({
      isPlaying: false,
      currentTrack: null,
      playlist: [],
      currentIndex: 0,
    });
    await playerState.save();
  }
  return playerState;
}

app.get('/api/player/current', async (req, res) => {
    try {
      const playerState = await getPlayerState();
      res.json({
        isPlaying: playerState.isPlaying,
        currentTrack: playerState.currentTrack
      });
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch player state' });
    }
  });
  
  app.post('/api/player/play', async (req, res) => {
    try {
      const trackId = req.body.trackId;
      const playerState = await getPlayerState();
  
      if (trackId) {
        const trackIndex = playerState.playlist.indexOf(trackId);
        if (trackIndex !== -1) {
          playerState.currentIndex = trackIndex;
        } else {
          playerState.playlist.push(trackId);
          playerState.currentIndex = playerState.playlist.length - 1;
        }
        playerState.currentTrack = trackId;
      } else if (playerState.currentTrack) {
      } else if (playerState.playlist.length > 0) {
        playerState.currentTrack = playerState.playlist[0];
        playerState.currentIndex = 0;
      } else {
        return res.status(400).json({ error: 'No track available to play' });
      }
  
      playerState.isPlaying = true;
      await playerState.save(); 
  
      res.json({ 
        message: 'Playing track ${playerState.currentTrack}', 
        isPlaying: playerState.isPlaying,
        currentTrack: playerState.currentTrack
      });
    } catch (err) {
      res.status(400).json({ error: 'Failed to play track' });
    }
  });
  
  app.post('/api/player/pause', async (req, res) => {
    try {
      const playerState = await getPlayerState();
      playerState.isPlaying = false;
      await playerState.save(); 
  
      res.json({ 
        message: 'Playback paused',
        isPlaying: playerState.isPlaying,
        currentTrack: playerState.currentTrack
      });
    } catch (err) {
      res.status(400).json({ error: 'Failed to pause playback' });
    }
  });
  
  app.post('/api/player/previous', async (req, res) => {
    try {
      const playerState = await getPlayerState();
  
      if (playerState.playlist.length === 0) {
        return res.status(400).json({ error: 'Playlist is empty' });
      }
  
      playerState.currentIndex = (playerState.currentIndex - 1 + playerState.playlist.length) % playerState.playlist.length;
      playerState.currentTrack = playerState.playlist[playerState.currentIndex];
      await playerState.save(); 
  
      res.json({ 
        message: 'Changed to previous track: ${playerState.currentTrack}',
        isPlaying: playerState.isPlaying,
        currentTrack: playerState.currentTrack
      });
    } catch (err) {
      res.status(400).json({ error: 'Failed to switch to previous track' });
    }
  });
  
  app.post('/api/player/next', async (req, res) => {
    try {
      const playerState = await getPlayerState();
  
      if (playerState.playlist.length === 0) {
        return res.status(400).json({ error: 'Playlist is empty' });
      }
  
      playerState.currentIndex = (playerState.currentIndex + 1) % playerState.playlist.length;
      playerState.currentTrack = playerState.playlist[playerState.currentIndex];
      await playerState.save(); 
  
      res.json({ 
        message: 'Changed to next track: ${playerState.currentTrack}',
        isPlaying: playerState.isPlaying,
        currentTrack: playerState.currentTrack
      });
    } catch (err) {
      res.status(400).json({ error: 'Failed to switch to next track' });
    }
  });
  
  app.listen(PORT, () => {
    console.log('Simplified Playback Controls API running on port ${PORT}');
  });
  
