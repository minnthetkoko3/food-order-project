import mongoose from 'mongoose';

const CartsModel = mongoose.model(
  'carts',
  new mongoose.Schema({
    customer_id: { type: String, required: true },
    product_name: { type: String, required: true },
    price: { type: Number, required: true },
    qty: { type: Number, required: true },
  }),
);

export default CartsModel;
