import express from 'express';
import { resizeToNewFile, checkForExisting, saveNewThumb } from '../../utilities/resizer';

const images = express.Router();

images.get('/', (req, res) => {
    const inFilename = req.query.filename as string; //working
    const width = (req.query.width as unknown) as number; //working
    const height = (req.query.height as unknown) as number; //working

    let firstCheck = checkForExisting(`${inFilename}`, width, height);
    console.log(firstCheck);
    
    // let resized = resizeToNewFile(firstCheck, width, height, inFilename);
    // console.log(resized)
    
    // First, check if image already exists in thumb folder based on filename and dimensions
    /*
    let finalImage;

    let imageExists = checkForExisting(inFilename, width, height);

    if (imageExists) {
        finalImage = imageExists;
    } else {
        let tempImage = resizeToNewFile(inFilename, width, height);
        finalImage = saveNewThumb(tempImage);
    }
    // If file exists, 
        // serve image at url in the browser
    // ELSE
        // call resizeToNewFile
        // store with saveNewThumb
        // serve image at url in the browser

    res.send(finalImage);
    // I KNOW THIS IS WRONG
    // res.send(`<img src=${finalImage}>`);
    */
    // res.send(`Processing image name <b>${inFilename}.jpg</b> at <b>${width}px wide</b> by <b>${height}px high</b>`);
});

export default images;