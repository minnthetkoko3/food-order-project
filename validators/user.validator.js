import { stringValidator } from '../configs/validators.config.js';

// ✔ create user validator
const userValidator = user => {
  let errors = {};
  const array = Object.keys(user);
  const { username, password, email, phone_number, street_address, city } = user;

  if (array.includes('username')) errors.username = stringValidator({ name: 'Username', value: username, min: 5, max: 60 });
  if (array.includes('password')) errors.password = stringValidator({ name: 'Password', value: password, min: 5, max: 60 });
  if (array.includes('email')) errors.email = stringValidator({ name: 'Email', value: email, min: 5, max: 60 });
  if (array.includes('phone_number')) errors.phone_number = stringValidator({ name: 'Phone number', value: phone_number, min: 5, max: 15 });
  if (array.includes('street_address')) errors.street_address = stringValidator({ name: 'Street address', value: street_address, min: 3, max: 70 });
  if (array.includes('city')) errors.city = stringValidator({ name: 'city', value: city, min: 1, max: 30 });

  errors = JSON.parse(JSON.stringify(errors));
  if (Object.keys(errors).length > 0) return errors;
};

export default userValidator;
