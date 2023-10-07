import fs from 'node:fs';
import zlib from 'node:zlib';
import { Transform, Writable } from 'node:stream';

let count = 0;

const readableStream = fs.createReadStream('./tmp/organizations-1000000.csv', 'utf-8');
const gzipStream = zlib.createGzip();
const writableStream = fs.createWriteStream(`./tmp/compress_${Date.now()}.csv.gz`)

const execute = (async function () {
    console.log('Begin');
    const begin = Date.now();
    return new Promise((resolve, reject) => {
        readableStream
            .pipe(gzipStream)
            .pipe(writableStream)
            .on('close', () => {
                console.log('End - ms', Date.now() - begin);
                resolve();
            });
    });
});

(async function () {
    await execute();
    console.log('fim');
    console.log('Total', count);
})();
