import fs from 'node:fs';
import { createGzip } from 'node:zlib';

const strmReadFile = fs.createReadStream('./files-examples/file_example_MP4_1280_10MG.mp4');
const strmWriteFile = fs.createWriteStream(`./tmp/${Date.now()}.mp4.zip`);


const gzip = createGzip();

strmReadFile.pipe(gzip).pipe(strmWriteFile);

strmWriteFile.on('clone', () => console.log(`File compress`))