"""
The goal of this file is to read in @/scripts/episode_inject/splice.json , and splice in some mid-roll ads based on the keys in that file; and to add outro.mp3 to the end. So an input file will be injected with 1 or 2 ads; and 1 outro. The current code is a bit of a mess, and outdated, but you can see what it was attempting to do. So I'm gonna give you some guidelines for what I'm after, and I want you to have Architect mode come up with a game plan, and delegate to Code mode some subtasks for tackling these various parts.

1. splice.json is structured like so. `{ <input filename without .mp3>: { <midroll filename without .mp3>: [start, end] } }`
2. the `start` and `end` from (1) goes like this. That midroll <key>.mp3 will be inserted at `end` in the original file. Then, after the mid-roll, take `start->end` from the original file and duplicate it again. This is to buffer against the harsh interuption; that is, it reminds them what we were talking about before the mid-roll.
3. Do so for however many input files we're working with, they'll look like `scripts/episode_inject/input/<top level key>.mp3`. for each of those, add as many mid-rolls as are keys in that object. Their files will be `scripts/episode_inject/<key>.mp3`. Then finally, add `outro.mp3` to the very end.
4. Some care will be needed, since timestamps may shift as you're augmenting the file. These timestamps in splice.json are based on the *original* file. So be clever.
5. Finally, be very mindful that this code file is very very tight. I'm going to be using it just myself, so it doesn't need to cover each and every edge-case. Fewer lines of code is more improtant to me than more fallbacks and edge-cases.
"""

# Phase 1: Setup and Initialization
import os
import json
from datetime import datetime
import sys
from pydub import AudioSegment
from pydub.exceptions import CouldntDecodeError

# Step 1.2: Constants
BASE_DIR = os.path.dirname(os.path.abspath(__file__)) # Get directory of the script
CONFIG_FILE = os.path.join(BASE_DIR, 'splice.json')
INPUT_DIR = os.path.join(BASE_DIR, 'input')
MIDROLL_DIR = BASE_DIR # Mid-rolls are in the same directory as the script/config
OUTRO_FILE_PATH = os.path.join(BASE_DIR, 'outro.mp3')
OUTPUT_DIR = os.path.join(BASE_DIR, 'output')
OUTPUT_FORMAT = "mp3"
OUTPUT_BITRATE = "128k" # Match original file parameters

# Step 1.3: Helper Functions
def parse_timestamp(ts_str):
    """Converts mm:ss.X, mm:ss.XX, or mm:ss.XXX string to milliseconds."""
    ts_str = ts_str.strip()
    time_parts = ts_str.split(':')
    if len(time_parts) != 2:
        raise ValueError(f"Invalid timestamp format: {ts_str}. Expected mm:ss.XXX")

    minutes = int(time_parts[0])
    sec_ms_parts = time_parts[1].split('.')
    seconds = int(sec_ms_parts[0])

    milliseconds = 0
    if len(sec_ms_parts) > 1:
        ms_part = sec_ms_parts[1]
        if len(ms_part) == 1:
            milliseconds = int(ms_part) * 100
        elif len(ms_part) == 2:
            milliseconds = int(ms_part) * 10
        else:
            milliseconds = int(ms_part[:3]) # Take only first 3 digits

    total_milliseconds = (minutes * 60 + seconds) * 1000 + milliseconds
    return total_milliseconds

def ensure_dir(directory):
    """Creates a directory if it doesn't exist."""
    if not os.path.exists(directory):
        os.makedirs(directory)
        print(f"Created directory: {directory}")

# Step 5.2: Encapsulate Logic
def process_episodes():
    """Processes audio files based on the splice configuration."""
    print(f"Script base directory: {BASE_DIR}")
    print(f"Using config file: {CONFIG_FILE}")
    print(f"Input directory: {INPUT_DIR}")
    print(f"Mid-roll directory: {MIDROLL_DIR}")
    print(f"Outro file: {OUTRO_FILE_PATH}")
    print(f"Output directory: {OUTPUT_DIR}")

    # Step 1.4: Load Configuration
    try:
        with open(CONFIG_FILE, 'r') as f:
            splice_config = json.load(f)
        print(f"Loaded splice config from {CONFIG_FILE}")
    except FileNotFoundError:
        print(f"Error: Splice config file not found at {CONFIG_FILE}")
        sys.exit(1)
    except json.JSONDecodeError as e:
        print(f"Error: Could not decode JSON from {CONFIG_FILE}: {e}")
        sys.exit(1)
    except Exception as e:
        print(f"An unexpected error occurred loading config: {e}")
        sys.exit(1)


    # Step 1.5: Load Outro
    try:
        outro_audio = AudioSegment.from_mp3(OUTRO_FILE_PATH)
        print(f"Loaded outro: {OUTRO_FILE_PATH}")
    except FileNotFoundError:
        print(f"Error: Outro file not found at {OUTRO_FILE_PATH}")
        sys.exit(1)
    except CouldntDecodeError:
         print(f"Error decoding outro file: {OUTRO_FILE_PATH}. Is ffmpeg installed and in PATH?")
         sys.exit(1)
    except Exception as e:
        print(f"Error loading outro {OUTRO_FILE_PATH}: {e}")
        sys.exit(1)

    processed_count = 0
    skipped_count = 0
    error_count = 0

    # Phase 2: Main Processing Loop (Per Input File)
    # Step 2.1: Iterate Inputs
    for input_base, midroll_definitions in splice_config.items():
        print(f"\n--- Processing input base: {input_base} ---")

        # Step 2.2: Construct Paths & Check Input
        input_filename = f"{input_base}.mp3"
        input_path = os.path.join(INPUT_DIR, input_filename)

        if not os.path.exists(input_path):
            print(f"Warning: Input file not found, skipping: {input_path}")
            skipped_count += 1
            continue

        # Step 2.3: Load Original Audio
        try:
            original_audio = AudioSegment.from_mp3(input_path)
            print(f"  Loaded input: {input_path} (Duration: {len(original_audio)/1000:.2f}s)")
        except CouldntDecodeError:
             print(f"  Error decoding input file: {input_path}. Is ffmpeg installed and in PATH?")
             error_count += 1
             continue
        except Exception as e:
            print(f"  Error loading input file {input_path}: {e}")
            error_count += 1
            continue

        # Step 2.4: Prepare Mid-roll Data
        midroll_list = []
        try:
            for mr_base, (start_ts_str, end_ts_str) in midroll_definitions.items():
                start_ts_ms = parse_timestamp(start_ts_str)
                end_ts_ms = parse_timestamp(end_ts_str)
                if start_ts_ms >= end_ts_ms:
                    print(f"  Warning: Mid-roll '{mr_base}' has start timestamp ({start_ts_str}) >= end timestamp ({end_ts_str}). Skipping this mid-roll.")
                    continue
                if end_ts_ms > len(original_audio):
                    print(f"  Warning: Mid-roll '{mr_base}' end timestamp ({end_ts_str} / {end_ts_ms}ms) is beyond input duration ({len(original_audio)/1000:.2f}s). Skipping this mid-roll.")
                    continue
                if start_ts_ms < 0:
                     print(f"  Warning: Mid-roll '{mr_base}' start timestamp ({start_ts_str}) is negative. Skipping this mid-roll.")
                     continue

                midroll_list.append((mr_base, start_ts_ms, end_ts_ms))
        except ValueError as e:
            print(f"  Error parsing timestamp for {input_base}: {e}. Skipping this input file.")
            error_count += 1
            continue
        except Exception as e:
             print(f"  Unexpected error preparing mid-roll data for {input_base}: {e}. Skipping this input file.")
             error_count += 1
             continue


        # Sort by end timestamp (ascending)
        midroll_list.sort(key=lambda item: item[2])
        print(f"  Prepared and sorted {len(midroll_list)} mid-roll definitions.")

        # Step 2.5: Initialize for Segment Building
        final_segments = []
        last_processed_ts = 0

        # Phase 3: Mid-roll Processing Loop
        # Step 3.1: Iterate Sorted Mid-rolls
        for midroll_base, start_ts_ms, end_ts_ms in midroll_list:
            print(f"  Processing mid-roll: {midroll_base} (Repeat: {start_ts_ms}ms - {end_ts_ms}ms)")

            # Step 3.2: Load Mid-roll Audio
            midroll_path = os.path.join(MIDROLL_DIR, f"{midroll_base}.mp3")
            try:
                midroll_audio = AudioSegment.from_mp3(midroll_path)
                print(f"    Loaded mid-roll audio: {midroll_path}")
            except FileNotFoundError:
                print(f"    Warning: Mid-roll file not found, skipping insertion: {midroll_path}")
                continue # Skip this specific mid-roll insertion
            except CouldntDecodeError:
                 print(f"    Warning: Error decoding mid-roll file: {midroll_path}. Skipping insertion.")
                 continue
            except Exception as e:
                print(f"    Warning: Error loading mid-roll {midroll_path}: {e}. Skipping insertion.")
                continue

            # Step 3.3: Extract Segment Before Mid-roll
            # Ensure we don't go backward if timestamps overlap incorrectly after sorting/filtering
            if end_ts_ms < last_processed_ts:
                 print(f"    Warning: Current end timestamp {end_ts_ms}ms is before last processed timestamp {last_processed_ts}ms. This might indicate overlapping definitions in splice.json. Adjusting slice.")
                 # This case shouldn't happen with proper sorting and filtering, but handle defensively.
                 # We effectively skip adding the 'segment_before' for this iteration as it's already covered.
            else:
                segment_before = original_audio[last_processed_ts:end_ts_ms]
                final_segments.append(segment_before)
                print(f"    Added original segment: {last_processed_ts}ms to {end_ts_ms}ms")

            # Step 3.4: Append Mid-roll Audio
            final_segments.append(midroll_audio)
            print(f"    Added mid-roll: {midroll_base}")

            # Step 3.5: Extract and Append Repeat Segment
            # Ensure start_ts_ms is valid relative to end_ts_ms (already checked)
            # and within the bounds of the original audio
            if start_ts_ms < 0 or end_ts_ms > len(original_audio):
                 print(f"    Warning: Invalid repeat segment timestamps ({start_ts_ms}ms - {end_ts_ms}ms) relative to original audio length. Skipping repeat segment.")
            else:
                repeat_segment = original_audio[start_ts_ms:end_ts_ms]
                final_segments.append(repeat_segment)
                print(f"    Added repeat segment: {start_ts_ms}ms to {end_ts_ms}ms")

            # Step 3.6: Update Progress Marker
            last_processed_ts = end_ts_ms # The end of the *original* audio segment just added

        # Phase 4: Finalization and Export
        # Step 4.1: Append Remaining Original Audio
        if last_processed_ts < len(original_audio):
            final_original_segment = original_audio[last_processed_ts:]
            final_segments.append(final_original_segment)
            print(f"  Added remaining original segment: {last_processed_ts}ms to end")
        elif last_processed_ts > len(original_audio):
             print(f"  Warning: Last processed timestamp ({last_processed_ts}ms) exceeds original audio duration ({len(original_audio)}ms). No final segment to add.")


        # Step 4.2: Append Outro
        final_segments.append(outro_audio)
        print("  Added outro")

        # Step 4.3: Concatenate Segments
        print("  Concatenating final segments...")
        if not final_segments:
            print("  Warning: No segments to concatenate. Skipping export for this input.")
            error_count += 1
            continue

        # Start with an empty segment to avoid issues if final_segments is empty (though checked above)
        final_audio = AudioSegment.empty()
        try:
            for segment in final_segments:
                final_audio += segment
        except Exception as e:
            print(f"  Error during segment concatenation for {input_base}: {e}")
            error_count += 1
            continue

        print(f"  Final audio duration: {len(final_audio)/1000:.2f}s")

        # Step 4.4: Construct Output Path
        today_date = datetime.now().strftime('%Y%m%d')
        output_filename = f"{input_base}.{today_date}.mp3"
        output_path = os.path.join(OUTPUT_DIR, output_filename)

        # Step 4.5: Export Final Audio
        try:
            ensure_dir(OUTPUT_DIR) # Ensure output dir exists
            print(f"  Exporting to: {output_path} (Bitrate: {OUTPUT_BITRATE})")
            final_audio.export(output_path, format=OUTPUT_FORMAT, bitrate=OUTPUT_BITRATE)
            print(f"  Successfully exported: {output_path}")
            processed_count += 1
        except Exception as e:
            print(f"  Error exporting final audio for {input_base} to {output_path}: {e}")
            error_count += 1
            continue # Continue to the next input file

    print(f"\n--- Processing Summary ---")
    print(f"Successfully processed: {processed_count}")
    print(f"Skipped (input file missing): {skipped_count}")
    print(f"Errors encountered: {error_count}")
    print(f"--------------------------")


# Phase 5: Script Execution Boilerplate
if __name__ == "__main__":
    # Step 5.4: (Optional) Dependency Checks
    try:
        from pydub import AudioSegment
    except ImportError:
        print("Error: pydub library not found.")
        print("Please install it using: pip install pydub")
        sys.exit(1)

    # Basic check for ffmpeg in PATH (pydub relies on it)
    ffmpeg_found = False
    for path_dir in os.environ.get("PATH", "").split(os.pathsep):
        if os.path.exists(os.path.join(path_dir, 'ffmpeg')) or os.path.exists(os.path.join(path_dir, 'ffmpeg.exe')):
            ffmpeg_found = True
            break

    if not ffmpeg_found:
        print("\nWarning: 'ffmpeg' command not found in your system's PATH.")
        print("pydub requires ffmpeg (or libav) to process audio files like MP3.")
        print("Please install ffmpeg and ensure it's accessible.")
        print("  - On Debian/Ubuntu: sudo apt update && sudo apt install ffmpeg")
        print("  - On macOS (using Homebrew): brew install ffmpeg")
        print("  - On Windows: Download from ffmpeg.org and add to PATH.")
        print("The script will attempt to run, but may fail during audio loading/exporting.\n")

    # Step 5.3: Call Main Function
    process_episodes()