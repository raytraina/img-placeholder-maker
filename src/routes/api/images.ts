import express from 'express';

const images = express.Router();

images.get('/', (req, res) => {
    const inFilename = req.query.filename; //working
    const width = req.query.width; //working
    const height = req.query.height; //working
    res.send(`Processing image name <b>${inFilename}</b> at <b>${width}px wide</b> by <b>${height}px high</b>`);
});

export default images;