"""
sudo apt install ffmpeg -y
pip install ffmpeg-python
"""

import pdb, re, ffmpeg, shutil
from pathlib import Path

import argparse
parser = argparse.ArgumentParser()
parser.add_argument("-i", required=True)
parser.add_argument("-o", required=True)
args = parser.parse_args()

in_path = Path(args.i).expanduser()
in_str = str(in_path)
folder = list(in_str.split('/'))[-1]

out_path = Path(args.o, folder).expanduser()
if out_path.exists():
    shutil.rmtree(out_path)
out_path.mkdir()

def sort_fnames(fname):
    nums = re.findall(r"/([0-9]+)", fname)
    if not nums: return fname
    return float('.'.join(nums))

files = in_path.glob('**/*.mp4')
files = [str(f) for f in files]
files = sorted(files, key=sort_fnames)
for fname_in in files:
    fname_out = fname_in.replace(in_str, '')
    # Get rid of leading /, for next command
    if fname_out.startswith('/'):
        fname_out = fname_out[1:]
    fname_out = fname_out.replace('/', ' - ').replace('mp4', 'mp3')
    fname_out = str(Path(out_path, fname_out))
    ffmpeg.input(fname_in).output(fname_out).run()