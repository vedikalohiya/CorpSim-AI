/**
 * Web Speech API Voice Synthesis & Speech Recognition Service
 */

export function speakText(text, voiceType = 'female') {
  if (!('speechSynthesis' in window)) {
    console.warn('Browser does not support Web Speech API synthesis.');
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1.0;
  utterance.pitch = voiceType === 'female' ? 1.1 : 0.9;

  const voices = window.speechSynthesis.getVoices();
  if (voices.length > 0) {
    const englishVoices = voices.filter(v => v.lang.startsWith('en'));
    if (englishVoices.length > 0) {
      utterance.voice = voiceType === 'female' 
        ? (englishVoices.find(v => v.name.includes('Female') || v.name.includes('Google') || v.name.includes('Zira')) || englishVoices[0])
        : (englishVoices.find(v => v.name.includes('Male') || v.name.includes('David')) || englishVoices[0]);
    }
  }

  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

export function startVoiceRecognition(onResultCallback, onErrorCallback) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    if (onErrorCallback) onErrorCallback('Speech recognition is not supported in this browser.');
    return null;
  }

  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'en-US';

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    if (onResultCallback) onResultCallback(transcript);
  };

  recognition.onerror = (event) => {
    if (onErrorCallback) onErrorCallback(event.error);
  };

  recognition.start();
  return recognition;
}
