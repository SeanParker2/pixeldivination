const SOUNDS = {
  tap: new Audio('https://cdn.pixabay.com/download/audio/2022/03/15/audio_223d7d747e.mp3'),
  shuffle: new Audio('https://cdn.pixabay.com/download/audio/2022/03/10/audio_c9b4e5482b.mp3'),
  flip: new Audio('https://cdn.pixabay.com/download/audio/2022/03/24/audio_34b6b663b6.mp3'),
  magic: new Audio('https://cdn.pixabay.com/download/audio/2022/03/24/audio_824e751221.mp3'),
  dice: new Audio('https://assets.mixkit.co/active_storage/sfx/2046/2046-preview.mp3'),
  ambient: new Audio('https://assets.mixkit.co/active_storage/sfx/148/148-preview.mp3'),
};

// Configure loop for ambient
SOUNDS.ambient.loop = true;

export const play = (type: keyof typeof SOUNDS) => {
  try {
    const audio = SOUNDS[type];
    
    // Reset time for one-shot sounds (not ambient if it's already playing? actually ambient should probably not be reset if playing)
    // But for simplicity and matching user request:
    if (type !== 'ambient') {
        audio.currentTime = 0;
    }
    
    // Set volume
    audio.volume = type === 'ambient' ? 0.2 : 0.5;
    
    const playPromise = audio.play();
    if (playPromise !== undefined) {
        playPromise.catch(e => {
            console.warn('Audio play failed:', e);
        });
    }
  } catch (e) {
    // Ignore errors
  }
};

export const playSound = play;

export const stopSound = (type: keyof typeof SOUNDS) => {
  try {
    const audio = SOUNDS[type];
    audio.pause();
    audio.currentTime = 0;
  } catch (e) {
    // Ignore errors
  }
};
