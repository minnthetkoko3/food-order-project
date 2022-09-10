import { stringValidator, numberValidator } from '../configs/validators.config.js';

const cartsValidator = carts => {
  let errors = {};
  const array = Object.keys(carts);
  const { customer_id, product_name, price, qty } = carts;

  if (array.includes('customer_id')) errors.customer_id = stringValidator({ name: 'Customer id', value: customer_id });
  if (array.includes('product_name')) errors.product_name = stringValidator({ name: 'Product name', value: product_name, min: 2, max: 15 });
  if (array.includes('price')) errors.price = numberValidator({ name: 'Price', value: price });
  if (array.includes('qty')) errors.qty = numberValidator({ name: 'Qty', value: qty });

  errors = JSON.parse(JSON.stringify(errors));
  if (Object.keys(errors).length > 0) return errors;
};

export default cartsValidator;
