import stream from 'node:stream';

const myTransformStream = new stream.Transform({
    transform(chuck, encoding, callback) {
        this.push(chuck.toString().toUpperCase());
        callback();
    }
})

process.stdin.pipe(myTransformStream).pipe(process.stdout);