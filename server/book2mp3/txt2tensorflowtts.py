"""
pip install tensorflow tensorflowtts soundfile
pip install git+https://github.com/repodiac/german_transliterate
"""

from pathlib import Path
import numpy as np
import soundfile as sf
import yaml
import tensorflow as tf
from tensorflow_tts.inference import TFAutoModel
from tensorflow_tts.inference import AutoProcessor

# import argparse
# parser = argparse.ArgumentParser()
# parser.add_argument("-i", required=True)
# args = parser.parse_args()

# initialize fastspeech2 model.
fastspeech2 = TFAutoModel.from_pretrained("tensorspeech/tts-fastspeech2-ljspeech-en")


# initialize mb_melgan model
mb_melgan = TFAutoModel.from_pretrained("tensorspeech/tts-mb_melgan-ljspeech-en")


# inference
processor = AutoProcessor.from_pretrained("tensorspeech/tts-fastspeech2-ljspeech-en")

in_ = 'frogs.txt'
# in_ = str(Path(args.i).expanduser())
with open(in_) as f:
    lines = f.readlines()
txt = '\n'.join(lines)

input_ids = processor.text_to_sequence(txt)
# fastspeech inference

mel_before, mel_after, duration_outputs, _, _ = fastspeech2.inference(
    input_ids=tf.expand_dims(tf.convert_to_tensor(input_ids, dtype=tf.int32), 0),
    speaker_ids=tf.convert_to_tensor([0], dtype=tf.int32),
    speed_ratios=tf.convert_to_tensor([1.0], dtype=tf.float32),
    f0_ratios =tf.convert_to_tensor([1.0], dtype=tf.float32),
    energy_ratios =tf.convert_to_tensor([1.0], dtype=tf.float32),
)

# melgan inference
audio_before = mb_melgan.inference(mel_before)[0, :, 0]
audio_after = mb_melgan.inference(mel_after)[0, :, 0]

# save to file
sf.write(f'{in_}.before.wav', audio_before, 22050, "PCM_16")
sf.write(f'{in_}.after.wav', audio_after, 22050, "PCM_16")