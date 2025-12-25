// Example: fetch processed files from backend
fetch('/process')   // endpoint in FastAPI/Flask server that runs pipeline
  .then(res => res.json())
  .then(files => {
      // Update audio sources
      document.getElementById('vocals').src = files.vocals;
      document.getElementById('kick').src = files.kick;
      document.getElementById('snare').src = files.snare;
      document.getElementById('hihat').src = files.hihat;

      // Load MIDI
      fetch(files.midi)
        .then(resp => resp.arrayBuffer())
        .then(arrayBuffer => {
            console.log('MIDI loaded:', arrayBuffer.byteLength, 'bytes');
            // parse and render MIDI visualization here
        });

      // Load lyrics if available
      if (files.lyrics) {
          fetch(files.lyrics)
            .then(resp => resp.json())
            .then(lyricsJson => {
                console.log('Lyrics loaded:', lyricsJson);
                // render karaoke follow-along here
            });
      }
  });
