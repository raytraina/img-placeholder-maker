import express from 'express';
import images from './api/images';

const routes = express.Router();

routes.get('/', (req, res) => {
  res.status(200).send('Try going to a different URL');
});

routes.use('/images', images);

export default routes;
