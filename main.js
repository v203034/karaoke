const uploadForm = document.getElementById('uploadForm');
const vocalsPlayer = document.getElementById('vocals');
const kickPlayer = document.getElementById('kick');
const snarePlayer = document.getElementById('snare');
const hihatPlayer = document.getElementById('hihat');
const midiVisual = document.getElementById('midi-visual');
const lyricsDisplay = document.getElementById('lyrics-display');

let isProcessing = false;  // prevents multiple submissions

uploadForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (isProcessing) return; // ignore subsequent clicks
    isProcessing = true;

    const submitButton = uploadForm.querySelector('button[type="submit"]');
    submitButton.disabled = true;

    const formData = new FormData();
    formData.append('song', document.getElementById('songInput').files[0]);
    const lyricsFile = document.getElementById('lyricsInput').files[0];
    if (lyricsFile) formData.append('lyrics', lyricsFile);

    // Replace with the current ngrok URL printed in Colab
    const NGROK_URL = "https://alba-artiest-raelene.ngrok-free.dev";

    try {
        const response = await fetch(`${NGROK_URL}/process`, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error(`Server returned ${response.status}`);
        }

        const data = await response.json();

        if (data.error) {
            alert(data.error);
            return;
        }

        // Set audio sources
        vocalsPlayer.src = data.vocals;
        kickPlayer.src = data.kick;
        snarePlayer.src = data.snare;
        hihatPlayer.src = data.hihat;

        // Load MIDI
        if (data.midi) {
            fetch(data.midi)
                .then(res => res.arrayBuffer())
                .then(arrayBuffer => {
                    console.log('MIDI loaded:', arrayBuffer.byteLength, 'bytes');
                    // TODO: render piano-roll or karaoke highlights
                });
        }

        // Load lyrics
        if (data.lyrics) {
            fetch(data.lyrics)
                .then(res => res.json())
                .then(json => {
                    lyricsDisplay.innerHTML = json.map(word => `<span>${word.text}</span>`).join(' ');
                });
        }

    } catch (err) {
        alert("Error contacting the server: " + err.message);
    } finally {
        isProcessing = false;
        submitButton.disabled = false;
    }
});
