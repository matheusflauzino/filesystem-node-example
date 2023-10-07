import { Request, Response, Router } from "express";
import multer from "multer";
import readline from "readline";

import { Readable } from "stream";

const multerConfig = multer();

const router = Router();

router.get('/', (request: Request, response: Response) => {
    return response.send('Hello');
})

router.post('/products', multerConfig.single('file'), async (request: Request, response: Response) => {

    const { file } = request;
    const { buffer } = file;

    //cria o stream
    const readableFile = new Readable();
    readableFile.push(buffer);
    readableFile.push(null);

    //faz a leitura por linha
    const productsLine = readline.createInterface({
        input: readableFile
    });

    for await (let line of productsLine) {
        const productLineSplit = line.split(";");
        console.log(productLineSplit[1])
    }



    return response.send();
})

export { router };