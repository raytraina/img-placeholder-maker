import express from 'express';
import routes from './routes/index';

const app = express();
const port = 3001;

app.get('/', (req, res) => {
    res
    .status(200)
    .send(`
            <h2>Image Resizing Tool</h2>
            <h4>Choose an image and enter your desired dimensions</h4>
            <form action="/api/images" method="GET">
                <label for="filename">Filename:</label><br/>
                <select name="filename" id="filename">
                    <option value="encenadaport">encenadaport</option>
                    <option value="fjord">fjord</option>
                    <option value="icelandwaterfall">icelandwaterfall</option>
                    <option value="palmtunnel">palmtunnel</option>
                    <option value="santamonica">santamonica</option>
                </select><br/><br/>
                <label for="width">Width in pixels:</label><br/>
                <input type="number" id="width" name="width"><br/><br/>
                <label for="height">Height in pixels:</label><br/>
                <input type="number" id="height" name="height"><br/><br/>
                <button type="submit">Resize!</button>
            </form>
        `)
});

app.use('/api', routes);

app.listen(port, () => {
    console.log('Server started');
});