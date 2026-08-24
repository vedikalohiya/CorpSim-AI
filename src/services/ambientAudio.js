/**
 * Ambient Corporate Office Soundscape Service using Web Audio API
 */

let audioCtx = null;
let isPlaying = false;
let masterGain = null;
let humOsc = null;

export function toggleAmbientOfficeAudio() {
  if (isPlaying) {
    stopAmbientOfficeAudio();
    return false;
  } else {
    startAmbientOfficeAudio();
    return true;
  }
}

export function startAmbientOfficeAudio() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return false;

    if (!audioCtx) {
      audioCtx = new AudioContext();
    }

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(0.08, audioCtx.currentTime); // Gentle low volume
    masterGain.connect(audioCtx.destination);

    // Low frequency HVAC office room hum
    humOsc = audioCtx.createOscillator();
    humOsc.type = 'sine';
    humOsc.frequency.setValueAtTime(60, audioCtx.currentTime); // 60Hz gentle hum
    humOsc.connect(masterGain);
    humOsc.start();

    isPlaying = true;
    return true;
  } catch (e) {
    console.error('Web Audio API error:', e);
    return false;
  }
}

export function stopAmbientOfficeAudio() {
  if (humOsc) {
    try {
      humOsc.stop();
      humOsc.disconnect();
    } catch (e) {}
    humOsc = null;
  }
  isPlaying = false;
}

export function getAudioState() {
  return isPlaying;
}
