# pipeline.py
from scripts.separate_stems import separate
from scripts.refine_drums import refine_drums
from scripts.vocals_to_midi import vocals_to_midi
from scripts.align_lyrics import align_lyrics
import os

def run_pipeline(song_path="data/input/song.wav", lyrics_path="data/input/lyrics.txt", out_dir="data/output"):
    """
    Run full preprocessing pipeline:
    - Stem separation
    - Drum refinement
    - Vocals → MIDI
    - Optional lyrics alignment
    """
    os.makedirs(f"{out_dir}/stems", exist_ok=True)
    os.makedirs(f"{out_dir}/drums", exist_ok=True)

    # 1️⃣ Demucs stem separation
    separate(song_path, f"{out_dir}/stems")

    # 2️⃣ Drum refinement
    refine_drums(f"{out_dir}/stems/drums.wav", f"{out_dir}/drums")

    # 3️⃣ Extract MIDI from vocals
    vocals_to_midi(f"{out_dir}/stems/vocals.wav", f"{out_dir}/vocals.mid")

    # 4️⃣ Optional lyrics alignment
    if os.path.exists(lyrics_path):
        align_lyrics(
            f"{out_dir}/stems/vocals.wav",
            lyrics_path,
            f"{out_dir}/lyrics.json"
        )

    return {
        "vocals": f"{out_dir}/stems/vocals.wav",
        "kick": f"{out_dir}/drums/kick.wav",
        "snare": f"{out_dir}/drums/snare.wav",
        "hihat": f"{out_dir}/drums/hihat.wav",
        "midi": f"{out_dir}/vocals.mid",
        "lyrics": f"{out_dir}/lyrics.json" if os.path.exists(lyrics_path) else None
    }

# 5️⃣ Make it runnable standalone
if __name__ == "__main__":
    results = run_pipeline()
    print("Pipeline completed!")
    print(results)
