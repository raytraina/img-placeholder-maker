import express from 'express';

const app = express();
const port = 3001;

app.get('/api', (req, resp) => {
    resp.send('Status: 200 OK');
});

app.listen(port, () => {
    console.log('Server started');
});