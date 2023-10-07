import fs from 'node:fs';


const highWaterMark = 5*1024*1024;

const strmReadFile = fs.createReadStream('./files-examples/file_example_MP4_1280_10MG.mp4', { highWaterMark });

const strmWriteFile = fs.createWriteStream(`./tmp/${Date.now()}.mp4`);


let totalReads = 0;
let totalBytes = 0;

strmReadFile.on('data', chuck => {
    totalReads++;
    totalBytes += chuck.length;
    console.log(`${chuck.length} bytes read`);

    const result = strmWriteFile.write(chuck);
    if (!result) console.log('backpressure!')
})

strmReadFile.on('end', () => strmWriteFile.end());

strmWriteFile.on('clone', chuck => console.log(`End - ${totalReads} reading/${totalBytes} bytes`));


process.stdin.on('data', () => {})