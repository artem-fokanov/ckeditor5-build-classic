#$env = 'development';
$env = 'production';
docker build --build-arg ENV=$env -t ckeditor5 .

#docker run --rm ckeditor5
$id = docker run -d ckeditor5
docker cp ${id}:/usr/src/app/build/ckeditor.js .\build\ckeditor.js
# FOR DEBUG PURPOSES
#docker cp ${id}:/usr/src/app/node_modules/@ckeditor/ckeditor5-inspector/build/inspector.js .\build\ckeditor-inspector.js
docker rm ${id}
docker container prune -f;
docker image prune -f;