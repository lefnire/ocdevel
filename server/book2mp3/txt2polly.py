"""
pip install tensorflow tensorflowtts soundfile
pip install git+https://github.com/repodiac/german_transliterate
"""
import os
os.environ['AWS_PROFILE'] = 'vivi'
os.environ['AWS_DEFAULT_REGION'] = 'us-east-1'

import boto3, argparse, os
from pathlib import Path

parser = argparse.ArgumentParser()
parser.add_argument("-i", required=True)
args = parser.parse_args()

polly = client = boto3.client('polly')

in_ = str(Path(args.i).expanduser())
fname = in_.split('/')[-1]
with open(in_) as f:
    lines = f.readlines()
txt = '\n'.join(lines)

## -- Direct
# response = polly.synthesize_speech(
#     VoiceId='Salli',
#     OutputFormat='mp3',
#     Text=txt
# )
# with open(in_.replace('.txt', '.mp3'), 'wb') as f:
#     f.write(response['AudioStream'].read())

## -- To S3
polly.start_speech_synthesis_task(
    Engine='neural',
    LanguageCode='en-US',
    # LexiconNames=[
    #     'string',
    # ],
    OutputFormat='mp3', #'json'|'mp3'|'ogg_vorbis'|'pcm',
    OutputS3BucketName='',
    OutputS3KeyPrefix=f"{fname}.mp3",
    # SampleRate='string',
    # SnsTopicArn='string',
    # SpeechMarkTypes=[
    #     'sentence'|'ssml'|'viseme'|'word',
    # ],
    Text=txt,
    # TextType='ssml'|'text',
    VoiceId='Salli', # 'Aditi'|'Amy'|'Astrid'|'Bianca'|'Brian'|'Camila'|'Carla'|'Carmen'|'Celine'|'Chantal'|'Conchita'|'Cristiano'|'Dora'|'Emma'|'Enrique'|'Ewa'|'Filiz'|'Gabrielle'|'Geraint'|'Giorgio'|'Gwyneth'|'Hans'|'Ines'|'Ivy'|'Jacek'|'Jan'|'Joanna'|'Joey'|'Justin'|'Karl'|'Kendra'|'Kevin'|'Kimberly'|'Lea'|'Liv'|'Lotte'|'Lucia'|'Lupe'|'Mads'|'Maja'|'Marlene'|'Mathieu'|'Matthew'|'Maxim'|'Mia'|'Miguel'|'Mizuki'|'Naja'|'Nicole'|'Olivia'|'Penelope'|'Raveena'|'Ricardo'|'Ruben'|'Russell'|'Salli'|'Seoyeon'|'Takumi'|'Tatyana'|'Vicki'|'Vitoria'|'Zeina'|'Zhiyu'
)