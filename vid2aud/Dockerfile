FROM lambci/lambda:build-python3.8

RUN yum install -y wget

# ffmpeg - https://blog.samuca.com/en/how-to-install-ffmpeg-on-a-amazon-linux-ami/
RUN mkdir -v -p /usr/local/bin/ffmpeg && \
  cd /usr/local/bin/ffmpeg && \
  wget https://johnvansickle.com/ffmpeg/releases/ffmpeg-release-i686-static.tar.xz && \
  tar -v -xf ffmpeg-release-i686-static.tar.xz --strip-components=1 && \
  rm -v -f ffmpeg-release-i686-static.tar.xz && \
  ln -snf /usr/local/bin/ffmpeg/ffmpeg /usr/bin/ffmpeg && \
  ln -snf /usr/local/bin/ffmpeg/ffpropbe /usr/bin/ffpropbe

RUN pip install yt-dlp mutagen boto3
#    ffmpeg-python

COPY app /app
WORKDIR /app