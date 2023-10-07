import fs from 'node:fs';
import zlib from 'node:zlib';
import { Readable, Stream, Transform, Writable } from 'node:stream';

const data = [
    ['Nome', 'Idade', 'Cidade'],
    ['João', 20, 'São Paulo'],
    ['Maria', 25, 'Rio de Janeiro'],
    ['Maria', 25, 'Rio de Janeiro'],
    ['Maria', 25, 'Rio de Janeiro'],
    ['Maria', 25, 'Rio de Janeiro'],
    ['Maria', 25, 'Rio de Janeiro'],
    ['Maria', 25, 'Rio de Janeiro'],
    ['Maria', 25, 'Rio de Janeiro'],
    ['Maria', 25, 'Rio de Janeiro'],
    ['Maria', 25, 'Rio de Janeiro'],
    ['Maria', 25, 'Rio de Janeiro'],
    ['Maria', 25, 'Rio de Janeiro'],
    ['Maria', 25, 'Rio de Janeiro'],
];

const readableStream = Readable.from(data);
const transformStreamToString = new Transform({
    objectMode: true,
    transform(chunk, encoding, callback) {
        callback(null, `${chunk.join(';')}\n`);
    },
});

const gzipStream = zlib.createGzip();

const writableStream = fs.createWriteStream(`./tmp/data_${Date.now()}.csv.gz`);

const execute = async function () {
    console.log('Begin');
    const begin = Date.now();
    return new Promise((resolve, reject) => {
        readableStream
            .pipe(transformStreamToString)
            .pipe(gzipStream)
            .pipe(writableStream)
            .on('close', () => {
                console.log('End - ms', Date.now() - begin);
                resolve();
            });
    });
};

(async function () {
    await execute();
    console.log('successfully processed')
})();
