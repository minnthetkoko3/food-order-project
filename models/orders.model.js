import mongoose from "mongoose";

const OrdersModel = mongoose.model(
  "orders",
  new mongoose.Schema({
    customer_id: { type: String, required: true},
    order_type: { type: String, required: true },
    total_amount: { type: Number, required: true},
  })
);

export default OrdersModel;
