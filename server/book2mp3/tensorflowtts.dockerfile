FROM tensorflow/tensorflow:2.3.1-gpu
RUN apt-get update
RUN apt-get install -y wget git libsndfile1
RUN pip install \
    #git+https://github.com/TensorSpeech/TensorflowTTS.git \
    TensorFlowTTS \
    git+https://github.com/repodiac/german_transliterate \
    PyPDF2 \
    pdfminer.six

WORKDIR /workspace