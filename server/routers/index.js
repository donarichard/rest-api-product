import express from 'express';
import products from './products';
import reviews from './reviews';

const router = express.Router();

products(router);
reviews(router);    

export default router;
