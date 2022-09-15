import 'dotenv/config';
import './configs/custom_console.config.js';
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import compression from 'compression';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import routers from './routers/_routers.js';

// ✔ create express server and middleware
const server = express();
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(cors());
server.use(compression());

// ✔ connect with mongo database
const { PORT, MONGO_URI } = process.env;
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, error => {
  const message = 'Mongo database connection';
  if (error) console.Fail(message, error, 'Contact to admin with error detail.');
  else console.Success(message);

  // ✔ connect with routers
  server.use('/api', routers);

  // ✔ serve website with express
  const __dirname = dirname(fileURLToPath(import.meta.url));
  server.use(express.static(path.join(__dirname, './public')));
  server.use(express.static('../public'));
  server.get('*', (_, res) => res.sendFile(path.join(__dirname, './public', 'index.html')));

  // ✔ listen server at the port
  server.listen(PORT, console.Success(`Listening server at the port ${PORT}`));
});

/*
  === AUTH ROUTER ===

  Register User
    url >> /api/auth/register
    opt >> POST
    { "username": "mgwunna", "password": "helloworld", "email": "mgwunna@hello.com", "phone_number": "0977777777", "street_address": "Mandalay", "city": "Myanmar" }

  Sign In User With Data
    url >> /api/auth/sign-in
    opt >> POST
    { "username": "mgwunna", "password": "helloworld" }

  Sign In User With Token
    url >> /api/auth/sign-in
    opt >> GET
    
    X-Token [ header ]
  
  === PRODUCTS ROUTER ===

  Read products
    url >> /api/products
    opt >> GET

  Create products
    url >> /api/products
    opt >> POST
    { "name": "Name", "price": 1500, "description": "Description", "details": "Details", "review": "Review" }

  Update product
    url >> /api/products/{{Product id}}
    opt >> PUT
    { "price": 1000 }

*/



/*



*/