// Load MIDI and visualize notes (simplified example)
fetch('../data/output/vocals.mid')
  .then(response => response.arrayBuffer())
  .then(arrayBuffer => {
      // Here you can parse MIDI and render it as piano-roll or karaoke highlights
      console.log('MIDI loaded:', arrayBuffer.byteLength, 'bytes');
  });

const vocals = document.getElementById('vocals');
vocals.addEventListener('play', () => {
    console.log('Vocals playing');
});
