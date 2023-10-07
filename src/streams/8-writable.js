import stream from 'node:stream';

const myWritableStream = new stream.Writable({
    write(chuck, encoding, callback) {
        console.log(chuck.toString());
        callback();
    }
});

process.stdin.pipe(myWritableStream);