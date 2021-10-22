import {resources} from "../resources";

export default {
  title: 'Natural Language Processing 1',
  episode: 18,
  created: "2017-06-25",
  guid: "d8ebdbe6640d0d34f12778f90b91db8d",
  file: {},
  libsynEpisode: 5479957,
  resources: [
    resources.speech_and_nlp,
    resources.stanford_nlp,
    resources.nltk
  ],
  teaser: 'Introduction to Natural Language Processing (NLP) topics.',
  body: `
_Errata_: 22:21 "cat & car different by one word" should be "different by one letter"

Syntax vs Semantics

Parts
- Corpus
- Lexicon
- Morphology
  - Lemmas & Stems (reduce morphological variation; lemmatization more sophisticated)
  - Tokens
  - Stop words
  - Edit-distance
  - Word sense disambiguation

Syntax / Tasks
- Info Extraction (POS, NER, Relationship extraction)
- Parsing

Goals
- Spell check
- Classification
  - Tagging (topic modeling / keyword extraction)
  - Sentiment analysis
- Search / relevance, document similarity
- Natural language understanding
  - Question answering
  - Textual entailment
  - Machine Translation (AI-complete)
  - NLU vs NLP
- Natural language generation
  - Image captioning
  - Chatbots
  - Automatic summarization
- Won't cover
  - Optical character recognition (OCR)
  - Speech (TTS, STT, Segmentation, Diarization)`
}