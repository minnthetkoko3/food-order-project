import jwt from 'jsonwebtoken';
import UsersModel from '../models/users.model.js';

const { JWT_SECRET } = process.env;

const authorizationMiddleware = async (req, res, next) => {
  const message = 'Authorization middleware';
  try {
    // ✔ get token from request and decode
    const token = req.headers['x-token'];
    if (!token) return console.Error(message, 'Token is required.', 'Add token in request headers.').send(res, 400);
    const decode = jwt.decode(token, JWT_SECRET);
    if (!decode) return console.Error(message, 'Token is invalid.', 'Try again with right token.').send(res, 400);
    const { _id } = decode;

    // ✔ find user data from database by id
    const user = await UsersModel.findById(_id, { password: 0 });

    // ✔ save data in request user
    req.user = user;
    return next();
  } catch (error) {
    // ✔ handle unknown error
    return console.Fail(message, error, 'Contact to admin with error detail.').send(res, 500);
  }
};

export default authorizationMiddleware;
