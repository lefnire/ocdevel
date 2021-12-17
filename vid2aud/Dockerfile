FROM public.ecr.aws/lambda/python:3.8
#FROM lambci/lambda:build-python3.8

RUN yum -y update && yum -y install wget tar gzip xz unzip

# AWS CLI
RUN wget https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip && \
    unzip awscli-exe-linux-x86_64.zip && \
    ./aws/install && \
    rm awscli-exe-linux-x86_64.zip

# ffmpeg - https://blog.samuca.com/en/how-to-install-ffmpeg-on-a-amazon-linux-ami/
RUN mkdir -v -p /usr/local/bin/ffmpeg && \
    cd /usr/local/bin/ffmpeg && \
    wget https://johnvansickle.com/ffmpeg/releases/ffmpeg-release-i686-static.tar.xz && \
    tar -v -xf ffmpeg-release-i686-static.tar.xz --strip-components=1 && \
    rm -v -f ffmpeg-release-i686-static.tar.xz && \
    ln -snf /usr/local/bin/ffmpeg/ffmpeg /usr/bin/ffmpeg && \
    ln -snf /usr/local/bin/ffmpeg/ffpropbe /usr/bin/ffpropbe

RUN pip install yt-dlp mutagen boto3 pdfminer.six pypdf2
#    ffmpeg-python

#RUN yum install -y git && \
#    cd /tmp && \
#    git clone https://github.com/r0oth3x49/acloud-dl.git && \
#    cd acloud-dl && pip install -r requirements.txt

COPY ./task ${LAMBDA_TASK_ROOT}
CMD [ "app.handler" ]