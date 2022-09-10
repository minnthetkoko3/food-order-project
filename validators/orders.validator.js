import { enumValidator, numberValidator } from '../configs/validators.config.js';

const orderValidator = order => {
  let errors = {};
  const array = Object.keys(order);
  const { order_type, total_amount } = order;

  if (array.includes('order_type')) errors.order_type = enumValidator({ name: 'Order type', value: order_type, list: ['TAKE_OUT', 'CASH_ON_DELIVERY', 'ONLINE_PAY'] });
  if (array.includes('total_amount')) errors.total_amount = numberValidator({ name: 'Total amount', value: total_amount });

  errors = JSON.parse(JSON.stringify(errors));
  if (Object.keys(errors).length > 0) return errors;
};

export default orderValidator;
