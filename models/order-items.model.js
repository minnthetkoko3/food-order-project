import mongoose from 'mongoose';

const OrderItemsModel = mongoose.model(
  'order-items',
  new mongoose.Schema({
    order_id: { type: String, required: true },
    customer_id: { type: String, required: true },
    productname: { type: String, required: true },
    price: { type: Number, required: true },
    qty: { type: Number, required: true },
  }),
);

export default OrderItemsModel;
