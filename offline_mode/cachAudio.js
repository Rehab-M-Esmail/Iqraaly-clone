const cacheAudio = (audio_url) => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.active.postMessage({
        type: 'CACHE_AUDIO',
        url: audio_url,
      });
    });
  }
};
export default cacheAudio;