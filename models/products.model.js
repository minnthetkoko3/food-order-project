// ☐ create product model
import mongoose from 'mongoose';

const ProductsModel = mongoose.model(
  'products',
  new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    details: { type: String, required: true },
    review: { type: String },
  }),
);

export default ProductsModel;
