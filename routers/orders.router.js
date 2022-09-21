import { Router } from 'express';
import orderValidator from '../validators/orders.validator.js';
import OrdersModel from '../models/orders.model.js';
import CartsModel from '../models/carts.model.js';
import OrderItemsModel from '../models/order-items.model.js';

const ordersRouter = Router();

//create read all orders data api

ordersRouter.get('/', async (req,res) => {
  const message = 'order data api';
  try {
    const orders = await OrdersModel.find();
    return console.Success(message).send(res, 200, orders);
  } catch (error) {
    return console.Fail(message, error, 'Contant to admin with error detail.').send(res, 500);
  }
});

// ☐ create create order data api
ordersRouter.post('/', async (req, res) => {
  const message = "create order data api";
  try {
    // ☐ get data from request and validate
    const { _id: customer_id } = req.user;
    const { total_order } = req.body;
    const errors = orderValidator({ total_order});
    if (errors) 
      return console.Error(message, errors, 'Read error detail and try again.').send(res, 400);
    
 
    // ☐ create order data
    const order = new OrdersModel({ total_order });
    const order_id = order._id;

    // ☐ find carts data from database by customer id
    const carts = await CartsModel.find({ customer_id });
    if ( carts.length !== total_order ) 
      return console.Error(message, 'Order items is not equal.', 'Read error detail and try again.').send(res, 400);

    // ☐ create order items data for save and save
    const orderItems = carts.map(cart => ({ ...cart, order_id }));
    console.log(orderItems);
    await OrderItemsModel.insertMany(orderItems);

    // ☐ delete all carts data
    await CartsModel.deleteMany({ customer_id });
    if (CartsModel.deleecount === 0) 
    return console.Error(message, 'No carts data found.', 'May be all deleted.').send(res, 404);
    

    // ☐ save order data and response
    await order.save();
    return console.Success(message).send(res, 200, order);
  } catch (error) {
    // ☐ handle unknown error
    return console.Fail(message, error, 'Contact to admin with error detail.').send(res, 500);
  }
});

export default ordersRouter;

/* 

  Configs => custom console , validator (ulity) , dotenv , check server , auto update server
  Middlewares => request limit , auth middleware
  Models => users 
  public => react build
  routers => apis => get , post => products , carts , orders
  validators => cart , order ,

*/