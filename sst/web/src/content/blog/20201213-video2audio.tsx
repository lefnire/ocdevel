export default {
  id: '20201213-video2audio',
  date: '2020-12-13',
  title: "Convert video files to mp3",
  body: `
Many of the video resources I recommend are so well orated, they can be listened to (rather than watched) without much loss from the learner. These days you can just use whatever video app and just listen to it. But you may prefer the files as mp3 - easier to sort & organize, prevents lock-screen video-stopping, etc. 

#### Download YouTube playlists 
Some of the video resources I recommend are iTunes courses, hosted as playlists on YouTube. Setup [youtube-dl](https://github.com/rg3/youtube-dl) then run: 

\`\`\`
youtube-dl -o "%(autonumber)s-%(title)s.%(ext)s" -f worstaudio -x --audio-format mp3 youtube.com/playlist?list=<EDIT THIS>
\`\`\`

I use \`worstaudio\` because I'm not an audiophile when listening to spoken word, the quality is just fine. Otherwise you can use \`bestaudio\` - look at the youtube-dl docs. 

#### Convert videos to mp3
If you already have video files (eg mp4), you can convert them to audio to add to your audio-player. Install ffmpeg (\`sudo apt-get install ffmpeg\` on Ubuntu, [instructions](https://ffmpeg.org/download.html) for other OSs). Then in the video folder, run the following (replacing \`.mp4\` with the video extension)
\`\`\`
for f in *.mp4; do ffmpeg -i "$f" "\${f%.mp4}.mp3" && rm "$f"; done
\`\`\`

#### Audio player

After one of the above steps, load onto your mp3 player. I use [Smart Audiobook Player](https://play.google.com/store/apps/details?id=ak.alizandro.smartaudiobookplayer&hl=en_US&gl=US). You need to get the files to your phone, [steps for Android](https://support.google.com/android/answer/9064445?hl=en). Put these in a folder (best to create one), open Smart Audiobook on your phone, select that folder as the "root" folder, and click Sync.
`
}