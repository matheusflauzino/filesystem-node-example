import fs from 'node:fs';


process.stdin.pipe(fs.createWriteStream('./tmp/file.txt'));