"""
pip install google-cloud-texttospeech pdfminer.six
"""

"""
Args & constants
"""
import pdb, os, shutil, re, argparse, pickle
from pdfminer.high_level import extract_text
from PyPDF2 import PdfFileReader, PdfFileWriter
from pdfminer.high_level import extract_text, extract_pages

parser = argparse.ArgumentParser()
parser.add_argument('--pdf', action='store_true')
parser.add_argument('--mp3', action='store_true')
parser.add_argument('--wipe', action='store_true')
parser.add_argument('--clean', action='store_true')
parser.add_argument('--start-at', type=int, default=0)
parser.add_argument('--name', type=str, default='reframing')
args = parser.parse_args()

PDF = f"{os.getcwd()}/{args.name}.pdf"
PKL = f"{os.getcwd()}/{args.name}.pkl"
TXT_BEFORE = f"{os.getcwd()}/{args.name}.before.txt"
TXT_AFTER = f"{os.getcwd()}/{args.name}.after.txt"
OUT = f"{os.getcwd()}/{args.name}"
if args.wipe:
    if os.path.exists(OUT):
        shutil.rmtree(OUT, ignore_errors=True)
    os.mkdir(OUT)


"""
Parse PDF
"""
PDF = f"{os.getcwd()}/social_influence.pdf"
OUT = f"{os.getcwd()}/p1.pdf"

n_pages = PdfFileReader(PDF).getNumPages()

pages_before = []
pages = []

def clean_text(txt, i):
    if not args.clean: return txt
    # remove page numbers
    # txt = txt.replace('\n', ' ')
    txt = re.sub(r"^\b[0-9]+\b", " ", txt)
    txt = re.sub(r"\b[0-9]+\b$", " ", txt)
    return txt

if args.pdf or not os.path.exists(PKL):
    with open(PDF, "rb") as pdf, open(PKL, "wb") as pkl, open(TXT_BEFORE, "w") as txt_before, open(TXT_AFTER, "w") as txt_after:
        print("\nExtracting PDF Text\n")
        empty = 0  # TODO use for p in doc.pages
        i = 0
        try:
            while True:
                page = extract_text(pdf, page_numbers=[i])
                if not page:
                    if empty > 10: break
                    empty += 1
                    continue
                pages_before.append(page)
                page = clean_text(page, i)
                pages.append(page)
                print(i)
                i += 1
        except Exception as e: print(e)
        pickle.dump(pages, pkl)
        txt_before.writelines(pages_before)
        txt_after.writelines(pages)
with open(PKL, "rb") as pkl:
    pages = pickle.load(pkl)


"""
GCP TTS
"""
if not args.mp3: exit(0)
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = "/app/book2mp3/personal-gcp.json"
# from google.cloud import texttospeech
from google.cloud import texttospeech_v1beta1 as texttospeech

# Instantiates a client
client = texttospeech.TextToSpeechClient()

def tts(txt, pageno):
    # Set the text input to be synthesized
    synthesis_input = texttospeech.SynthesisInput(text=txt)

    # Build the voice request, select the language code ("en-US") and the ssml
    # voice gender ("neutral")
    voice = texttospeech.VoiceSelectionParams(
        language_code="en-US", ssml_gender=texttospeech.SsmlVoiceGender.NEUTRAL
    )

    # Select the type of audio file you want returned
    audio_config = texttospeech.AudioConfig(
        audio_encoding=texttospeech.AudioEncoding.MP3
    )

    # Perform the text-to-speech request on the text input with the selected
    # voice parameters and audio file type
    response = client.synthesize_speech(
        input=synthesis_input, voice=voice, audio_config=audio_config
    )

    # The response's audio_content is binary.
    # Write the response to the output file.
    with open(f"{OUT}/{pageno}.mp3", "wb") as out_:
        out_.write(response.audio_content)


with open(PDF, 'rb') as in_:
    print("\nGCP TTS\n")
    i = args.start_at
    running = None
    for page in pages:
        tts(page, i)
        print(i)
        i += 1

