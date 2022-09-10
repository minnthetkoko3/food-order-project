import mongoose from 'mongoose';
import { Router } from 'express';
import productsModel from '../models/products.model.js';
import productValidator from '../validators/product.validator.js';

const productsRouter = Router();

// ✔ create read all products api
productsRouter.get('/', async (req, res) => {
  const message = 'Read all products data';
  try {
    // ✔ find all data from database and response
    const products = await productsModel.find();
    return console.Success(message).send(res, 200, products);
  } catch (error) {
    // ✔ handle unknown Error
    return console.Fail(message, error, 'Contact to admin with error detail.').send(res, 500);
  }
});

// ✔ create create product data api
productsRouter.post('/', async (req, res) => {
  const message = 'Create product data';
  try {
    // ✔ get data from request and validate
    const { name, price, description, details, review } = req.body;
    const errors = productValidator({ name, price, description, details, review });
    if (errors) return console.Error(message, errors, 'Read error detail and try again.').send(res, 400);

    // ✔ create product data and save
    const product = new productsModel({ name, price, description, details, review });
    await product.save();
    return console.Success(message).send(res, 200, product);
  } catch (error) {
    if (error.code === 11000) return console.Error(message, 'Name must be unique.', 'Read error detail and try again.').send(res, 400);
    return console.Fail(message, error, 'Contact to admin with error detail.').send(res, 500);
  }
});

// ✔ create update product data api
productsRouter.put('/:id', async (req, res) => {
  const message = 'Update product data';
  try {
    // ✔ get id from request and validate
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) return console.Error(message, 'Product id is invalid.', 'Read error detail and try again.').send(res, 400);

    // ✔ get data from request and validate
    const { name, price, description, details, review } = req.body;
    const update_product = JSON.parse(JSON.stringify({ name, price, description, details, review }));
    const errors = productValidator(update_product);
    if (errors) return console.Error(message, errors, 'Read error detail and try again.').send(res, 400);

    // ✔ find by id and update data from database and response
    const product = await productsModel.findByIdAndUpdate(id, update_product, { new: true });
    if (!product) return console.Error(message, 'Product not found by id.', 'Try again with right id.').send(res, 400);

    return console.Success(message).send(res, 200, product);
  } catch (error) {
    return console.Fail(message, error, 'Contact to admin with error detail.').send(res, 500);
  }
});

export default productsRouter;
