import { Router } from 'express';
import mongoose from 'mongoose';
import cartValidator from '../validators/carts.validator.js';
import cartsModel from '../models/carts.model.js';

const cartsRouter = Router();

// ✔ create create cart data api
cartsRouter.post('/', async (req, res) => {
  const message = 'Create cart data api';
  try {
    // ✔ get data from request and validate
    const { _id: customer_id } = req.user;
    const { product_name, price, qty } = req.body;
    const errors = cartValidator({ customer_id, product_name, price, qty });
    if (errors) return console.Error(message, errors, 'Read error detail and try again.').send(res, 400);

    // ✔ create cart data and save
    const cart = new cartsModel({ _id, customer_id, product_name, price, qty });
    await cart.save();
    return console.Success(message).send(res, 200, cart);
  } catch (error) {
    // ✔ handle unknown error
    return console.Fail(message, error, 'contact to admin with error detail,').send(res, 500);
  }
});

// ✔ create read all carts api
cartsRouter.get('/', async (req, res) => {
  const message = 'Read all carts data api';
  try {
    // ✔ find all data from database by customer id
    const { _id: customer_id } = req.user;
    const carts = await cartsModel.find({ customer_id });
    return console.Success(message).send(res, 200, carts);
  } catch (error) {
    // ✔ handle unknown error
    return console.Fail(message, error, 'Contact to admin.').send(res, 500);
  }
});

// ✔ create update cart data api
cartsRouter.put('/:id', async (req, res) => {
  const message = 'Update cart data api';
  try {
    // ✔ get id from request and validate
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) return console.Error(message, 'Cart id is invalid.', 'Read error detail and try again.').send(res, 401);

    // ✔ get data from request and validate
    const { product_name, price, qty } = req.body;
    const update_cart = JSON.parse(JSON.stringify({ product_name, price, qty }));
    const errors = cartValidator(update_cart);
    if (errors) return console.Error(message, errors, 'Read error detail and try again.').send(res, 400);

    // ✔ find by id and update data from database
    const cart = await cartsModel.findByIdAndUpdate(id, update_cart, { new: true });
    if (!cart) return console.Error(message, 'Product not found by id.', 'Try again with right id.').send(res, 400);
    return console.Success(message).send(res, 200, cart);
  } catch (error) {
    // ✔ handle unknown error
    return console.Fail(message, error, ' contact to admin with error detail').send(res, 500);
  }
});

export default cartsRouter;
