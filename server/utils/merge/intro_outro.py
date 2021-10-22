"""
https://github.com/jiaaro/pydub
Recording
- Record about 50% mic gain, mono
- Reduce silence (Effect > Silence reduction | highlight long silence (make one if needed) | generate profile | select-all | apply)
- Apply voice macro (saved to Drive). Just in case:
    1. Compressor(-16,-35,3:1,.20,1.0)
    2. Limiter(limit-to=-3.00)
    3. Loudness Normalization(-20LUFS)
- Export as wav (16-bit PCM, default)

If exporting mp3 from Audacity, (1) forced mono (2) constant (CBR) (3) 96kbs+ (seems low, I'm using 128+)

# TODO 28 broken
# TODO re-do first half as layers, like later half
# TODO ensure exported only selected audio, not full file
"""
from pydub import AudioSegment, effects
dir_ = "/podcasts"

####### TODO Edit these!
EPISODE = f"{dir_}/mla/14/dept.filtered.wav"
OUTPUT = f"{dir_}/mp3s/mla.014.20201021.mp3"
meta = dict(
    title='MLA 014 Machine Learning Server',
    track=44,
    year=2021,
#############
    artist='OCDevel',
    album='Machine Learning Guide',
)
music = AudioSegment.from_wav(f"{dir_}/misc/intro/061387196-corporate-technology-hi-tech-e.wav")
intro = AudioSegment.from_wav(f"{dir_}/misc/intro/filtered.wav")
episode = AudioSegment.from_wav(EPISODE)
outro = None

just_music = 1000
fade = 1000
music_loud_at = 16000

intro = AudioSegment.silent(just_music) + intro + AudioSegment.silent(fade)
episode = intro + episode
intro_dur = int(intro.duration_seconds * 1000)
music = (music
    .fade(start=just_music, end=just_music + fade, to_gain=-10)
    .fade(start=music_loud_at - 500, end=music_loud_at + 1000, to_gain=-12)
    .fade(start=intro_dur - fade, end=intro_dur, to_gain=-30)
)[:intro_dur]

## Episode 9 just does "Killed". Manually insert it into aup3 instead
# music.overlay(intro, 0).set_channels(1).export(f"{dir_}/misc/intro/combined.wav", format="wav")
# exit(0)

merged = episode.overlay(music, 0)

# TODO metadata
(merged
    .set_channels(1)  # mono
    .export(
        OUTPUT,
        format="mp3",
        codec=None,
        bitrate='128k',  # sets `-b:a 128k`, which is constant bitrate (what we want)
        parameters=None,
        tags=meta,
        id3v2_version='4',
        cover=None
    )
)
