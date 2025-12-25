document.getElementById('uploadForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('song', document.getElementById('songInput').files[0]);
    const lyricsFile = document.getElementById('lyricsInput').files[0];
    if (lyricsFile) formData.append('lyrics', lyricsFile);

    // Send to backend for processing
    const response = await fetch('/process', { method: 'POST', body: formData });
    const files = await response.json(); // {vocals: "...", kick: "...", snare: "...", hihat: "...", midi: "...", lyrics: "..."}

    // Update audio and MIDI sources dynamically
    document.getElementById('vocals').src = files.vocals;
    document.getElementById('kick').src = files.kick;
    document.getElementById('snare').src = files.snare;
    document.getElementById('hihat').src = files.hihat;

    fetch(files.midi)
      .then(res => res.arrayBuffer())
      .then(arrayBuffer => {
          console.log('MIDI loaded:', arrayBuffer.byteLength, 'bytes');
          // render MIDI visualization
      });
});
