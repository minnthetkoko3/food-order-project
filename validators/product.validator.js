import { stringValidator, numberValidator } from '../configs/validators.config.js';

// ✔ create product validator
const productValidator = products => {
  let errors = {};
  const array = Object.keys(products);
  const { name, price, description, details, review } = products;

  if (array.includes('name')) errors.name = stringValidator({ name: 'Name', value: name, min: 2, max: 15 });
  if (array.includes('price')) errors.price = numberValidator({ name: 'Price', value: price });
  if (array.includes('description')) errors.description = stringValidator({ name: 'Description', value: description, min: 5, max: 200 });
  if (array.includes('details')) errors.details = stringValidator({ name: 'Details', value: details, min: 5, max: 150 });
  if (array.includes('review')) errors.review = stringValidator({ name: 'Review', value: review, min: 5, max: 120 });

  errors = JSON.parse(JSON.stringify(errors));
  if (Object.keys(errors).length > 0) return errors;
};

export default productValidator;
