"""
Audio Transcription Script

This script transcribes audio files using OpenAI's API, handling files longer than
the 1500-second limit by splitting them into smaller chunks, processing each chunk,
and combining the results.

Requirements:
- pydub (requires ffmpeg to be installed)
- openai
"""

import os
import math
from pydub import AudioSegment
import tempfile
from openai import OpenAI

# Configuration
MAX_DURATION = 1450  # Maximum duration in seconds for OpenAI transcription (slightly under 1500 for safety)
AUDIO_FILE_PATH = "./audio.mp3"  # Path to the input audio file
OUTPUT_FILE_PATH = "./transcript.mdx"  # Path to save the transcription

# System prompt for processing the transcription
SYSTEM_PROMPT = """
I'll give you transcripts of my podcast episodes. I want you to then give me two things for each: 
1. A 2 sentence teaser
2. A podcast show-notes in Markdown format.  Give actual code, wrapped in triple back-ticks.

Don't mention "the host" or "in this episode" - no 3rd person or meta analysis. Just raw data and facts. Don't use any marketing language; again, raw data. Don't add any meta details from the episode, eg podcast updates or what comes next. For the show-notes, don't just make it an overview of topics covered; actually print the salient information.
"""


def split_audio(audio_path, chunk_duration=MAX_DURATION):
    """
    Split an audio file into chunks of specified duration.
    
    Args:
        audio_path (str): Path to the audio file
        chunk_duration (int): Maximum duration of each chunk in seconds
        
    Returns:
        list: List of audio chunks
    """
    print(f"Loading audio file: {audio_path}")
    audio = AudioSegment.from_file(audio_path)
    
    # Calculate number of chunks needed
    total_duration_seconds = len(audio) / 1000  # pydub uses milliseconds
    num_chunks = math.ceil(total_duration_seconds / chunk_duration)
    
    print(f"Audio duration: {total_duration_seconds:.2f} seconds")
    print(f"Splitting into {num_chunks} chunks of {chunk_duration} seconds each")
    
    # Split the audio into chunks
    chunks = []
    for i in range(num_chunks):
        start_ms = i * chunk_duration * 1000
        end_ms = min((i + 1) * chunk_duration * 1000, len(audio))
        chunk = audio[start_ms:end_ms]
        chunks.append(chunk)
    
    return chunks


def transcribe_chunk(chunk, index, client):
    """
    Transcribe a single audio chunk using OpenAI's API.
    
    Args:
        chunk (AudioSegment): Audio chunk to transcribe
        index (int): Index of the chunk for ordering
        client (OpenAI): OpenAI client instance
        
    Returns:
        tuple: (index, transcription text)
    """
    # Create a temporary file for this chunk
    with tempfile.NamedTemporaryFile(suffix='.mp3', delete=False) as temp_file:
        chunk_path = temp_file.name
        chunk.export(chunk_path, format="mp3")
    
    try:
        print(f"Transcribing chunk {index+1}...")
        with open(chunk_path, "rb") as audio_file:
            transcription = client.audio.transcriptions.create(
                model="whisper-1",
                # model="gpt-4o-transcribe",
                file=audio_file,
                response_format='text'
            )
        
        # Clean up the temporary file
        os.unlink(chunk_path)
        # print('transcription', transcription)
        return transcription
    except Exception as e:
        print(f"Error transcribing chunk {index+1}: {e}")
        # Clean up the temporary file
        os.unlink(chunk_path)
        return f"[Error transcribing chunk {index+1}: {e}]"


def process_transcription(transcription, client):
    """
    Process the transcription using OpenAI's completion API.
    
    Args:
        transcription (str): The full transcription text
        client (OpenAI): OpenAI client instance
        
    Returns:
        str: Processed response from OpenAI
    """
    print("Processing transcription with OpenAI...")
    completion = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": transcription}
        ]
    )
    
    return completion.choices[0].message.content


def main():
    """Main function to orchestrate the transcription process."""
    # Initialize OpenAI client
    client = OpenAI()
    
    # Step 1: Split the audio into chunks
    chunks = split_audio(AUDIO_FILE_PATH)
    
    # Step 2: Transcribe each chunk sequentially
    transcriptions = []
    for i, chunk in enumerate(chunks):
        text = transcribe_chunk(chunk, i, client)
        transcriptions.append(text)
    
    # Step 3: Combine all transcriptions
    full_transcription = " ".join(transcriptions)
    
    # Step 4: Save the transcription to a file
    with open(OUTPUT_FILE_PATH, "w") as f:
        f.write(full_transcription)
    
    print(f"Full transcription saved to {OUTPUT_FILE_PATH}")
    
    # Step 5: Process the transcription (optional)
    processed_text = process_transcription(full_transcription, client)
    print("Processing complete. Response:")
    print(processed_text)
    
    return full_transcription


if __name__ == "__main__":
    main()