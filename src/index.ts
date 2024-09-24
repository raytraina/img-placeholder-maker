import express from 'express';
import fs from 'fs';
import routes from './routes/index';

export const app = express();
const port = 3001;

// Using express.urlencoded middleware
app.use(express.urlencoded({
    extended: true
}))

const assetFolder = './src/assets/full/';

app.get('/', (req, res) => {
    try {
        const availableFilenames = fs.readdirSync(assetFolder).map(file => {
            return file.split('.')[0];
            // return file.slice(0,-4);
        });
        
        const fileOptionsString = availableFilenames.map(name => {
            return `<option value="${name}">${name}</option>`
        })

        const formString1 = `
        <div>
            <h2>Image Resizing Tool</h2>
            <h4>Choose an image and enter your desired dimensions<br/>
                <span style="font-weight:200">Note: Your file will be converted to a jpg upon resizing</span>
            </h4>
            <form action="/api/images" method="GET">
                <label for="filename">Filename:</label><br/>
                <select name="filename" id="filename" required>
                    ${fileOptionsString}
                </select><br/><br/>
                <label for="width">Width in pixels:</label><br/>
                <input type="number" id="width" name="width" required><br/><br/>
                <label for="height">Height in pixels:</label><br/>
                <input type="number" id="height" name="height" required><br/><br/>
                <button type="submit">Resize!</button>
            </form>
        </div><br/>`
        
        const formString2 = `
        <div>
            <h2>Add a Custom Image</h2>
            <h4>Please use the below form to upload your image, then you will be able to select and resize the image using the tool above<br/>
                <span style="font-weight:200">Note: We are currently only accepting .jpg, .jpeg, &amp; .png files</span>
            </h4>
            <form action="/api/images/upload" enctype="multipart/form-data" method="POST">
                <label for="filename">Upload your own image:</label><br/>
                <input type="file" id="filename" name="filename" required><br/><br/>
                <button type="submit">Upload!</button>
            </form>
        </div>`
        

        res.status(200).send(formString1+formString2);
    } catch(err) {
        console.log(err);
        res.status(500).send(`Oh no! Something happened! Try again later.`);
    }
});

app.use('/api', routes);

app.listen(port, () => {
    console.log('Server started');
});