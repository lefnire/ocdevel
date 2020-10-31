FROM node
WORKDIR /app
RUN yarn global add gatsby-cli
#RUN yarn install && yarn build && yarn global add serve
#ENTRYPOINT serve -s build -l tcp://0.0.0.0:80
