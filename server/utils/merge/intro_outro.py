"""
https://github.com/jiaaro/pydub
Recording
- Set mic volume for between [-12,-6] dB
- Record as mono
- Export as wav (16-bit PCM, default)
"""

from pydub import AudioSegment, effects

dir_ = "/podcasts"

def clean_voice(seg):
    peak_amp = 3.
    res = seg[:5000]
    res = effects.compress_dynamic_range(
        res,
        threshold=-12,  # -12db
        ratio=2.0,  # 2:1
        attack=.2 * 1000,  # .20 seconds
        release=1 * 1000,
        # noise_floor=-40  # need this!
    )
    res = effects.normalize(res, peak_amp)
    return res

music = AudioSegment.from_wav(f"{dir_}/assets/061387196-corporate-technology-hi-tech-e.wav")

intro = AudioSegment.from_wav(f"{dir_}/testing/intro.wav")
intro = clean_voice(intro)

episode = AudioSegment.from_wav(f"{dir_}/testing/episode.wav")
episode = clean_voice(episode)

outro = None

just_music_dur = 3000
music_fade_dur = int(intro.duration_seconds * 1000)

merged = (
    (AudioSegment.silent(just_music_dur) + intro)
    .overlay(
        music[:just_music_dur + music_fade_dur + 1]
            .fade(to_gain=-120, start=just_music_dur, end=music_fade_dur),
        0
    )
    + episode
)

# intro = intro[:5000].fade(to_gain=-120, start=3000, end=float('inf'))
# merged = intro.overlay(episode[20000], position=3000)
# merged = intro[:3000] + intro[3000:20000].append(episode[:10000], crossfade=10000)

merged.export(f"{dir_}/testing/output.mp3", format="mp3")
