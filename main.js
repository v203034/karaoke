const uploadForm = document.getElementById('uploadForm');
const vocalsPlayer = document.getElementById('vocals');
const kickPlayer = document.getElementById('kick');
const snarePlayer = document.getElementById('snare');
const hihatPlayer = document.getElementById('hihat');
const midiVisual = document.getElementById('midi-visual');
const lyricsDisplay = document.getElementById('lyrics-display');

const COLAB_URL = "https://alba-artiest-raelene.ngrok-free.dev/process"; // Colab endpoint

uploadForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('song', document.getElementById('songInput').files[0]);
    const lyricsFile = document.getElementById('lyricsInput').files[0];
    if (lyricsFile) formData.append('lyrics', lyricsFile);

    const response = await fetch(`${COLAB_URL}/process`, {
        method: 'POST',
        body: formData
    });
    const data = await response.json();

    vocalsPlayer.src = data.vocals;
    kickPlayer.src = data.kick;
    snarePlayer.src = data.snare;
    hihatPlayer.src = data.hihat;

    if (data.midi) {
        fetch(data.midi)
          .then(res => res.arrayBuffer())
          .then(buf => console.log("MIDI loaded:", buf.byteLength));
    }
    if (data.lyrics) {
        fetch(data.lyrics)
          .then(res => res.json())
          .then(json => lyricsDisplay.innerHTML = json.map(w => `<span>${w.text}</span>`).join(' '));
    }
});
