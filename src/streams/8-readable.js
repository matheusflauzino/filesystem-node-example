import stream from 'node:stream';

let idx = 0;
const data = ['Matheu\n', 'Pontes\n', 'Node\n'];

const myReadableStream = new stream.Readable({
    read(size) {
        this.push(data[idx++]);
        if(idx > data.length) this.push(null);
    }
})

myReadableStream.pipe(process.stdout);