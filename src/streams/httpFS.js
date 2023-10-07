import fs from 'fs';
import http from 'http';

const server = http.createServer((req, res) => {
    console.log('Request successfully');

    fs.readFile('./files-examples/file_example_MP4_1280_10MG.mp4', (err, content) => {
        if(err) {
            console.log(err);
            return;
        }

        console.log('File sending')
        res.writeHead(200, { "Content-Type": "video/mp4"});
        res.end(content);
    });
})

server.listen(8080, () => console.log("Ok"))