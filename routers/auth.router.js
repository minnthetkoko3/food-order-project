import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UsersModel from '../models/users.model.js';
import userValidator from '../validators/user.validator.js';

const authRouter = Router();
const { JWT_SECRET } = process.env;

authRouter.get('/', (req, res) => res.send(' hello '));

// ✔ create register api
authRouter.post('/register', async (req, res) => {
  const message = 'Register api';
  try {
    // ✔ get data from request and validate
    const { username, password, email, phone_number, street_address, city } = req.body;
    const errors = userValidator({ username, password, email, phone_number, street_address, city });
    if (errors) return console.Error(message, errors, 'Read error detail and try again.').send(res, 400);
    // console.Error(message, errors, 'read error detail and try again.').send(res, 400);

    // ✔ bcrypt password
    const hashPassword = await bcrypt.hash(password, await bcrypt.genSalt(10));

    // ✔ create data and response without password
    const user = new UsersModel({ username, password: hashPassword, email, phone_number, street_address, city });
    await user.save();
    return console.Success(message).send(res, 200, { ...user._doc, password: undefined });
  } catch (error) {
    if (error.code === 11000) return console.Error(message, 'User name or email must be unique.', 'Read error detail and try again.').send(res, 400);
    return console.Fail(message, error, 'Contact to admin with error detail.').send(res, 500);
  }
});

// ✔ create sign in with token api
authRouter.get('/sign-in', async (req, res) => {
  const message = 'Sign in with token api';
  try {
    // ✔ get token from request and decode [ if error response error ]
    const token = req.headers['x-token'];
    const decode = jwt.decode(token, JWT_SECRET);
    if (!decode) return console.Error(message, 'Token is invalid.', 'Try again with another token.').send(res, 400);
    const { _id } = decode;

    // ✔ find user data in database by id
    const user = await UsersModel.findById(_id, { password: 0 });
    if (!user) return console.Error(message, 'User not found', 'Read error detail and try again.').send(res, 404);

    // ✔ response data
    return console.Success(message).send(res, 200, user);
  } catch (error) {
    // ✔ handle unknown error
    return console.Fail(message, error, 'Contact to admin with error detail.').send(res, 500);
  }
});

// ✔ create sign in with data api
authRouter.post('/sign-in', async (req, res) => {
  const message = 'Sign in with data api';
  try {
    // ✔ get data from request and validate [ if errors response error ]
    const { username, password } = req.body;
    const errors = userValidator({ username, password });
    if (errors) return console.Error(message, errors, 'Read error detail and try again.').send(res, 400);

    // ✔ find user data in database by username
    const user = await UsersModel.findOne({ username });
    if (!user) return console.Error(message, 'Username or password is incorrect.', 'Try again with another.').send(res, 400);

    // ✔ compare password with bcrypt
    const compare = await bcrypt.compare(password, user.password);
    if (!compare) return console.Error(message, 'Username or password is incorrect.', 'Try again with another.').send(res, 400);

    // ✔ generate jwt token
    const token = jwt.sign({ _id: user._id }, JWT_SECRET);

    // ✔ response data
    return console.Success(message).send(res, 200, { ...user._doc, password: undefined }, { token });
  } catch (error) {
    // ✔ handle unknown error
    return console.Fail(message, error, 'Contact to admin with error detail.').send(res, 500);
  }
});

export default authRouter;
