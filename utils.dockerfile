FROM python
RUN apt-get update -y && apt-get install -y wget ffmpeg
RUN pip install \
    # mutagen \
    pdfminer.six \
    google-cloud-texttospeech \
    pydub \
    ffmpeg-python

# will be mounted
RUN mkdir /app
WORKDIR /app