# scripts/refine_drums.py
import os
import librosa
import soundfile as sf
from scipy.signal import butter, sosfiltfilt

def bandpass(y, low, high, sr):
    sos = butter(4, [low, high], btype='band', fs=sr, output='sos')
    return sosfiltfilt(sos, y)

def refine_drums(drums_path, output_dir):
    """
    Split drums.wav into kick, snare, hihat.
    """
    os.makedirs(output_dir, exist_ok=True)
    y, sr = librosa.load(drums_path, sr=None)

    kick = bandpass(y, 40, 250, sr)
    snare = bandpass(y, 150, 2000, sr)
    hihat = bandpass(y, 7500, 20000, sr)

    sf.write(os.path.join(output_dir, "kick.wav"), kick, sr)
    sf.write(os.path.join(output_dir, "snare.wav"), snare, sr)
    sf.write(os.path.join(output_dir, "hihat.wav"), hihat, sr)
