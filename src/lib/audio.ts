import { Howl } from 'howler';

// Placeholder URLs or Base64 can be used here.
// For now, we will use a simple console log fallback if the sound fails to load, 
// or just simple placeholders.
// Since we don't have actual assets, we'll define the structure and usage.

const SOUNDS = {
  tap: new Howl({
    src: ['https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3'], // Retro blip
    volume: 0.5
  }),
  shuffle: new Howl({
    src: ['https://assets.mixkit.co/active_storage/sfx/2044/2044-preview.mp3'], // Card shuffle
    volume: 0.6
  }),
  flip: new Howl({
    src: ['https://assets.mixkit.co/active_storage/sfx/2042/2042-preview.mp3'], // Card flip
    volume: 0.7
  }),
  dice: new Howl({
    src: ['https://assets.mixkit.co/active_storage/sfx/2046/2046-preview.mp3'], // Dice roll (approx)
    volume: 0.8
  }),
  ambient: new Howl({
    src: ['https://assets.mixkit.co/active_storage/sfx/148/148-preview.mp3'], // White noise/Atmosphere
    loop: true,
    volume: 0.1
  })
};

export const playSound = (type: keyof typeof SOUNDS) => {
  try {
    if (SOUNDS[type]) {
      SOUNDS[type].play();
    } else {
      console.log(`[Audio] Playing sound: ${type}`);
    }
  } catch (err) {
    console.warn(`[Audio] Failed to play sound: ${type}`, err);
  }
};

export const stopSound = (type: keyof typeof SOUNDS) => {
  try {
    if (SOUNDS[type]) {
      SOUNDS[type].stop();
    }
  } catch (err) {
    console.warn(`[Audio] Failed to stop sound: ${type}`, err);
  }
};
