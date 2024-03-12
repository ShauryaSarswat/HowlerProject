import {Howl, Howler} from 'howler';

// Setup the new Howl.
const sound = new Howl({
  src: ['/Users/shauryasarswat/Downloads/HowlerApplication/sound.mp3']
});

// Play the sound.
sound.play();

// Change global volume.
Howler.volume(0.5);