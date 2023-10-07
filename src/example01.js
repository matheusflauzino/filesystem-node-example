import fs from 'node:fs';
import csv from 'csv-parser';
import { Transform, Writable } from 'node:stream';

let count = 0;

const readableStream = fs.createReadStream('./organizations-2000000.csv');
const transformStreamToObject = csv({ separator: ';' });
const transformStreamToString = new Transform({
    objectMode: true,
    transform(chunk, encoding, callback) {
        callback(null, JSON.stringify(chunk));
    },
});

const writableStream = new Writable({
    write(chunk, encoding, callback) {
        const string = chunk.toString();
        const data = JSON.parse(string);
        //console.log(data);
        count++;
        callback();
    },
});

const execute = (async function () {
    console.log('Begin');
    const begin = Date.now();
    return new Promise((resolve, reject) => {
        readableStream
            .pipe(transformStreamToObject)
            .pipe(transformStreamToString)
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
