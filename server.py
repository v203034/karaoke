# server.py (or another Python script)
from pipeline import run_pipeline

# Example: called after user uploads files
song_file = "data/input/user_song.wav"
lyrics_file = "data/input/user_lyrics.txt"

results = run_pipeline(song_file, lyrics_file, out_dir="data/output_user")

print("Files ready for frontend:", results)
