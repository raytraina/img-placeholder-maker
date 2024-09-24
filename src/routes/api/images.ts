import express from 'express';
import path from 'path';
import fs from 'fs';
import formidable from 'formidable';
import { makeResizedImage } from '../../utilities/resizer';

const images = express.Router();

images.get('/', async (req, res) => {
    try {
        // Get query parameters from request
        const inFilename = req.query.filename as string; //working
        const width = (req.query.width as unknown) as number; //working
        const height = (req.query.height as unknown) as number; //working

        // First, check if image already exists in thumb folder based on filename and dimensions
        const fileAlreadyExists = fs.existsSync(`./src/assets/thumb/${inFilename}_${width}x${height}.jpg`);
        if (!fileAlreadyExists) {
            console.log('>> Creating new image');
            // Call resize function which uses Sharp module for image processing, FS module for storing
            await makeResizedImage(`${inFilename}`, width, height);
        } else {
            console.log('>> Using existing image')
        }

        // After image has been created, locate the image and return the resource to the browser
        const options = {
            root: path.join(__dirname, '..', '..', 'assets', 'thumb')
        };
        res.status(200).sendFile(`${inFilename}_${width}x${height}.jpg`, options);
        // res.send(`Processing image name <b>${inFilename}.jpg</b> at <b>${width}px wide</b> by <b>${height}px high</b>`);
    } catch(err) {
        console.log(err);
        res.status(500).send(`Oh no! We were unable to resize your image! Verify that you are using a jpg, jpeg, or png, then try again.`);
    }
});

images.post('/upload', async (req, res) => {
    // DONE - Add options for user to upload their own images in the UI
    // TODO - Restrict data types for uploaded images to only use jpg/png OR allow for all image filetypes across application

    // configure formidable to upload new files to the correct location
    const formidableOptions = {
        uploadDir: path.join(__dirname, '..', '..', 'assets', 'full'),
        keepExtensions: true,
    };

    // instantiate form object
    const form = formidable(formidableOptions);

    let fields; let files;
    try {
        // parse form
        [ fields, files ] = await form.parse(req);
        console.log(fields);
        // stringify and re-parse form to retrieve data from persistent file object (formidable)
        const parsedFileData = JSON.parse(JSON.stringify(files.filename))[0];
        const currFilepath = parsedFileData.filepath;
        // construct desired filepath
        const newPath = path.join(__dirname, '..', '..', 'assets', 'full') + `/${parsedFileData.originalFilename}`;

        // rename the incoming file to the file's name
        fs.rename(currFilepath, newPath, () => {
            console.log("\nFile Successfully Renamed!\n");
        });

        /*
        // TODO - allow user to resize and upload in one step
        // DONE - Get query parameters from request
        // const customWidth = (fields.width as unknown) as number; //not currently uusing this approach
        // const customHeight = (fields.width as unknown) as number; //not currently uusing this approach

        // TODO - Call helper to create resized image with sharp and store
        // resizeToNewFile(fileObj, customWidth, customHeight, customFilename);
        // TODO - After image has been created, locate the image and return the resource to the browser
        // const options = {
        //     root: path.join(__dirname, '..', '..', 'assets', 'thumb')
        // };
        // res.status(200).sendFile(`${customFilename}_${parsedFileData.originalFilename}x${customHeight}.jpg`, options);
        */
    } catch (err) {
        console.log(err);
        res.status(500).send(`Oh no! Something happened! Try uploading your file again later.`);
    }

    // Redirect so user can resize their newly uploaded image
    res.redirect('/');
});

export default images;