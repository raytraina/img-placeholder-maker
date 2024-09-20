import express from 'express';

const routes = express.Router();

routes.get('/', (req, res) => {
  res.send('Status: 200 OK');
});

export default routes;
