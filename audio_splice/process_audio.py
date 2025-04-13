import os
import json
from pydub import AudioSegment
import sys

# --- Configuration ---
SPLICE_CONFIG_FILE = 'audio_splice/splice.json'
MIDROLL_FILE = 'audio_splice/walk.mp3'
OUTRO_FILE = 'audio_splice/outro.mp3'
EPISODE_DIR = 'audio_splice'
OUTPUT_DIR = 'audio_splice/output'
# Use '128k' to match original file parameters, or None for pydub default.
OUTPUT_BITRATE = '128k'
# --- End Configuration ---

def parse_timestamp(ts_str):
    """Converts mm.ss.ms or mm.ss string to milliseconds."""
    parts = ts_str.split('.')
    minutes = int(parts[0])
    seconds = int(parts[1])
    milliseconds = int(parts[2]) if len(parts) > 2 else 0
    total_milliseconds = (minutes * 60 + seconds) * 1000 + milliseconds
    return total_milliseconds

def ensure_dir(directory):
    """Creates a directory if it doesn't exist."""
    if not os.path.exists(directory):
        os.makedirs(directory)
        print(f"Created output directory: {directory}")

def process_audio():
    """Processes audio files based on the splice configuration."""
    ensure_dir(OUTPUT_DIR)

    # --- Load Config ---
    try:
        with open(SPLICE_CONFIG_FILE, 'r') as f:
            splice_config = json.load(f)
        print(f"Loaded splice config from {SPLICE_CONFIG_FILE}")
    except FileNotFoundError:
        print(f"Error: Splice config file not found at {SPLICE_CONFIG_FILE}")
        sys.exit(1)
    except json.JSONDecodeError:
        print(f"Error: Could not decode JSON from {SPLICE_CONFIG_FILE}")
        sys.exit(1)

    # --- Load Inserts ---
    try:
        mid_roll = AudioSegment.from_mp3(MIDROLL_FILE)
        print(f"Loaded mid-roll: {MIDROLL_FILE}")
    except FileNotFoundError:
        print(f"Error: Mid-roll file not found at {MIDROLL_FILE}")
        sys.exit(1)
    except Exception as e:
        print(f"Error loading mid-roll {MIDROLL_FILE}: {e}")
        print("Ensure ffmpeg is installed and accessible in your PATH.")
        print("You might need to install it (e.g., 'sudo apt install ffmpeg' or 'brew install ffmpeg').")
        sys.exit(1)

    try:
        outro = AudioSegment.from_mp3(OUTRO_FILE)
        print(f"Loaded outro: {OUTRO_FILE}")
    except FileNotFoundError:
        print(f"Error: Outro file not found at {OUTRO_FILE}")
        sys.exit(1)
    except Exception as e:
        print(f"Error loading outro {OUTRO_FILE}: {e}")
        sys.exit(1)


    # --- Process Episodes ---
    processed_count = 0
    skipped_count = 0
    for filename_base, config in splice_config.items():
        episode_filename = f"{filename_base}.mp3"
        episode_path = os.path.join(EPISODE_DIR, episode_filename)
        output_filename = f"{filename_base}_processed.mp3"
        output_path = os.path.join(OUTPUT_DIR, output_filename)

        if not os.path.exists(episode_path):
            print(f"Skipping: Episode file not found at {episode_path}")
            skipped_count += 1
            continue

        print(f"\nProcessing: {episode_filename}")

        try:
            # Load episode
            episode = AudioSegment.from_mp3(episode_path)
            print(f"  Loaded episode: {episode_path} (Duration: {len(episode)/1000:.2f}s)")

            # Get timestamps
            at_ms = parse_timestamp(config['at'])
            repeat_from_ms = parse_timestamp(config['repeatFrom']) if 'repeatFrom' in config else None

            if at_ms > len(episode):
                 print(f"  Warning: 'at' timestamp ({config['at']}) is beyond episode duration ({len(episode)/1000:.2f}s). Skipping mid-roll insertion for this file.")
                 final_audio = episode + outro # Still add outro
            else:
                # Split episode
                part1 = episode[:at_ms]
                part2 = episode[at_ms:]
                print(f"  Splitting at {config['at']} ({at_ms}ms)")

                # Prepare segments
                segments = [part1, mid_roll]

                # Handle repeat chunk
                if repeat_from_ms is not None:
                    if repeat_from_ms >= at_ms:
                         print(f"  Warning: 'repeatFrom' timestamp ({config['repeatFrom']}) is not before 'at' timestamp ({config['at']}). Skipping repeat.")
                    elif repeat_from_ms < 0:
                         print(f"  Warning: 'repeatFrom' timestamp ({config['repeatFrom']}) is negative. Skipping repeat.")
                    else:
                        repeat_chunk = episode[repeat_from_ms:at_ms]
                        segments.append(repeat_chunk)
                        print(f"  Adding repeat chunk from {config['repeatFrom']} ({repeat_from_ms}ms) to {config['at']} ({at_ms}ms)")

                segments.append(part2)
                segments.append(outro)

                # Concatenate
                print("  Concatenating segments...")
                final_audio = sum(segments) # pydub uses '+' or sum() for concatenation

            # Export
            print(f"  Exporting to: {output_path}")
            final_audio.export(output_path, format="mp3", bitrate=OUTPUT_BITRATE)
            processed_count += 1

        except FileNotFoundError:
             print(f"  Error: Could not find episode file during processing (unexpected): {episode_path}")
        except Exception as e:
            print(f"  Error processing {episode_filename}: {e}")
            print("  Ensure ffmpeg is installed and accessible in your PATH.")


    print(f"\nProcessing complete. Processed: {processed_count}, Skipped: {skipped_count}")

if __name__ == "__main__":
    # --- Installation Check ---
    try:
        from pydub import AudioSegment
    except ImportError:
        print("Error: pydub library not found.")
        print("Please install it using: pip install pydub")
        sys.exit(1)

    # Basic check if ffmpeg *might* be missing, pydub will raise specific errors later if needed
    if not any(os.access(os.path.join(path, 'ffmpeg'), os.X_OK) for path in os.environ["PATH"].split(os.pathsep)):
         if not any(os.access(os.path.join(path, 'ffmpeg.exe'), os.X_OK) for path in os.environ["PATH"].split(os.pathsep)):
            print("Warning: 'ffmpeg' command not found in PATH. pydub requires ffmpeg for MP3 processing.")
            print("Please install ffmpeg and ensure it's in your system's PATH.")
            print("(e.g., 'sudo apt update && sudo apt install ffmpeg' or 'brew install ffmpeg')")
            # Allow script to continue, pydub will fail definitively if it can't use ffmpeg

    process_audio()