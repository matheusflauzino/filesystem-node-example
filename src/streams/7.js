import stream from 'node:stream';
import fs from 'node:fs';
import { createGzip } from 'node:zlib';

const gzip = createGzip();
const streamReadFile = fs.createReadStream('./files-examples/file_example_MP4_1280_10MG.mp4');
const streamWriteFile = fs.createWriteStream(`./tmp/${Date.now()}.mp4.zip`);

let zippedBytes = 0;
const register = new stream.PassThrough();
register.on('data', chuck => zippedBytes += chuck.length);

streamReadFile.pipe(gzip).pipe(register).pipe(streamWriteFile);

streamWriteFile.on('close', () => console.log(`file compressed ${zippedBytes} bytes`))
