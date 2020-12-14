export default {
  id: '20201213-video2audio',
  date: '2020-12-13',
  title: "Convert video files to mp3",
  body: `
Many of the video resources I recommend are so well orated, they can be listened to (rather than watched) without much loss from the learner. These days you can just use whatever video app and just listen to it. But you may prefer the files as mp3 - easier to sort & organize, prevents lock-screen video-stopping, etc. 

#### Convert videos to mp3
Install ffmpeg (\`sudo apt-get install ffmpeg\` on Ubuntu, [instructions](https://ffmpeg.org/download.html) for other OSs). Then in the video folder, run the following (replacing \`.mp4\` with the video extension)
\`\`\`
for f in *.mp4; do ffmpeg -i "$f" "\${f%.mp4}.mp3" && rm "$f"; done
\`\`\`

Then load onto your mp3 player. I use [Smart Audiobook Player](https://play.google.com/store/apps/details?id=ak.alizandro.smartaudiobookplayer&hl=en_US&gl=US)

#### Download YouTube playlists 
Some of the video resources I recommend are iTunes courses, hosted as playlists on YouTube. Setup [youtube-dl](https://github.com/rg3/youtube-dl) then run: 
\`\`\`
youtube-dl -x youtube.com/playlist?list=<EDIT THIS>
\`\`\`

Then follow the section above to convert to mp3.
`
}