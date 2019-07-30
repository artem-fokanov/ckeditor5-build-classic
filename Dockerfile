FROM node:10

ARG ENV

# Create app directory
WORKDIR /usr/src/app

#RUN npm init

#COPY package*.json ./
COPY package*.json webpack.config.js ./

RUN npm install

COPY src/ src/

#RUN ./node_modules/.bin/webpack --mode development
RUN ./node_modules/.bin/webpack --mode $ENV

#CMD ["./node_modules/.bin/webpack", "--mode development"]

#ENTRYPOINT ["./node_modules/.bin/webpack", "--mode=development"]
ENTRYPOINT ["/usr/src/app/node_modules/.bin/webpack"]
CMD ["help"]

# BUILD & RUN
#docker build -t ckeditor5 .
#$id = docker run -d ckeditor5
#docker cp ${id}:/usr/src/app/build/ckeditor.js .\build\ckeditor.js
#docker cp ${id}:/usr/src/app/node_modules/@ckeditor/ckeditor5-inspector/build/inspector.js .\build\ckeditor-inspector.js
#docker rm ${id}