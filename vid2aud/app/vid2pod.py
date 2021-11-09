import glob, re, uuid, os, subprocess, boto3, hashlib
import urllib.parse
from email.utils import format_datetime
from datetime import datetime, timedelta
from mutagen.mp3 import MP3  # pip install mutagen

URL = "https://www.youtube.com/watch?v=1iEYrHiHpRY&list=PLbpi6ZahtOH7WFEYxB4kUB2QwsshALAwy"
BUCKET = "lefnire-scratch"
DOMAIN = "https://ocdevel.com/custom_casts"

def run_cmd(cmd):
    if type(cmd) is list:
        cmd = ' '.join(cmd)
    print(cmd)
    res = os.popen(cmd).readlines()
    return [r.replace('\n', '') for r in res]


def hash(s):
    return hashlib.md5(s.encode('utf-8')).hexdigest()


def rfc2822(d):
    # Podcasts use rfc2822?  'ddd, DD MMM YYYY 00:00:00' => "Wed, 07 Nov 2018 00:00:00"
    # https://stackoverflow.com/questions/3453177/convert-python-datetime-to-rfc-2822
    return format_datetime(d)


def cleanstr(s):
    # return re.sub('[^0-9a-zA-Z ]+', '', s)
    return re.sub('[<>&]', '', s)


def urlencode(s):
    # Better way?
    return urllib.parse.quote(s)


ptitle = run_cmd(f"yt-dlp -e {URL}")[0]
pid = hash(ptitle)
today = datetime.today()
purl = DOMAIN
plink = f"{purl}/{pid}/feed.xml"
pfeed = plink
pdate = rfc2822(today)
# TODO
pimg = ""
pdesc = ""
pcopyright = ""
pkeywords = ""

xml = f"""<?xml version="1.0" encoding="utf-8"?>
<rss xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
    <channel>
        <title>{ptitle}</title>
        <link>{plink}</link>
        <image>
            <url>{pimg}</url>
            <title>{ptitle}</title>
            <link>{plink}</link>
        </image>
        <description>{pdesc}</description>
        <language>en-us</language>
        <copyright>{pcopyright}</copyright>
        <atom:link href="{pfeed}" rel="self" type="application/rss+xml"/>
        <lastBuildDate>{pdate}</lastBuildDate>
        <itunes:author>X</itunes:author>
        <itunes:summary>{pdesc}</itunes:summary>
        <itunes:subtitle>{pdesc}</itunes:subtitle>
        <itunes:owner>
            <itunes:name>X</itunes:name>
            <itunes:email>x@y.com</itunes:email>
        </itunes:owner>
        <itunes:explicit>No</itunes:explicit>
        <itunes:keywords>{pkeywords}</itunes:keywords>
        <itunes:image href="{pimg}"/>
        <itunes:category text="Technology">
          <itunes:category text="Software How-To"/>
        </itunes:category>
        <pubDate>{pdate}</pubDate>
"""
cmd = [
    "yt-dlp",
    "-f worstaudio",  # don't need quality
    "--extract-audio",
    "--audio-format mp3",
    "--keep-video",  # deletion takes forever for some reason. Files will go with server-death anyway
    "--restrict-filenames"  # ascii
    '-o "%(autonumber)s-%(title)s.%(ext)s',
    URL
]
run_cmd(cmd)
i = 0
for fname in run_cmd("ls *.mp3"):
    ftitle = cleanstr(fname[:-4])  # remove '.mp3'
    fdate = rfc2822(today - timedelta(days=i))
    fguid = hash(ftitle)
    audio = MP3(fname)
    ffileurl = f"{purl}/{urlencode(fname)}"
    ffilelen = os.path.getsize(fname)
    ffiletype = "audio/mpeg"
    fduration = audio.info.length

    # TODO
    fdesc = ""

    xml += f"""<item>
        <title>{ftitle}</title>
        <link>{ffileurl}</link>
        <pubDate>{fdate}</pubDate>
        <description>{fdesc}</description>
        <enclosure url="{ffileurl}" length="{ffilelen}" type="{ffiletype}"/>
        <guid>{fguid}</guid>
        <itunes:duration>{fduration}</itunes:duration>
        <itunes:subtitle>{fdesc}</itunes:subtitle>
        <itunes:summary>{fdesc}</itunes:summary>
        <itunes:image href="{pimg}"/>
        <itunes:keywords>{pkeywords}</itunes:keywords>
        <itunes:explicit>no</itunes:explicit>
    </item>"""
    i += 1
    run_cmd(f'aws s3 cp "{fname}" "s3://{BUCKET}/{pid}/{fname}"')

xml += f"""
    </channel>
</rss>
"""

with open(f"feed.xml", "w", encoding='utf-8') as f:
    f.write(xml)
run_cmd(f"aws s3 cp feed.xml s3://{BUCKET}/{pid}/feed.xml")
