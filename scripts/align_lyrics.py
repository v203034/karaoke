# scripts/align_lyrics.py
import json
# from aeneas.task import Task
# from aeneas.executetask import ExecuteTask

def align_lyrics(vocal_path, lyrics_path, output_json_path):
    """
    Placeholder: create JSON mapping words to timestamps.
    In practice, you would use aeneas or Whisper timestamps.
    """
    with open(lyrics_path, 'r') as f:
        lyrics = f.read().split()

    # Fake alignment: assign dummy timestamps
    alignment = []
    start = 0
    step = 0.5
    for word in lyrics:
        alignment.append({"text": word, "start": start, "end": start+step})
        start += step

    with open(output_json_path, 'w') as f:
        json.dump(alignment, f)
