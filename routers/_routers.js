import { Router } from 'express';

/* === MIDDLEWARE === */
import requestLimitMiddleware from '../middlewares/request-limit.middleware.js';
import authorizationMiddleware from '../middlewares/authorization.middleware.js';

/* === API ROUTERS === */
import authRouter from './auth.router.js';
import productsRouter from './products.router.js';
import cartsRouter from './carts.router.js';

const routers = Router();

routers.use('/auth', requestLimitMiddleware, authRouter);
routers.use('/products', authorizationMiddleware, productsRouter);
routers.use('/carts', authorizationMiddleware, cartsRouter);

export default routers;
