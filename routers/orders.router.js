import { Router } from 'express';
import orderValidator from '../validators/orders.validator.js';
import OrdersModel from '../models/orders.model.js';
import CartsModel from '../models/carts.model.js';
import OrderItemsModel from '../models/order-items.model.js';

const ordersRouter = Router();

// ☐ create create order data api
ordersRouter.post('/', async (req, res) => {
  try {
    // ☐ get data from request and validate
    const { _id: customer_id } = req.user;
    const { total_order } = req.body;
    const errors = orderValidator({});
    if (errors) 
      
    return console.Error(message, errors, 'Read error detail and try again.').send(res, 400);

    // total_order
    
 
    // ☐ create order data
    const order = new OrdersModel({});
    const order_id = order_id;

    // ☐ find carts data from database by customer id
    const carts = await CartsModel.find({ customer_id });
    // if ( carts.length !== total_order ) return console.Error(message, 'Order items is not equal.', 'Read error detail and try again.').send(res, 400)

    // ☐ create order items data for save and save
    const orderItems = carts.map(cart => ({ ...cart, order_id }));
    await OrderItemsModel.insertMany(orderItems);

    // ☐ delete all carts data
    await CartsModel.deleteMany({ customer_id });
    
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
