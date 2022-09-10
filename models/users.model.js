import mongoose from 'mongoose';

// ✔ create user model
const UsersModel = mongoose.model(
  'users',
  new mongoose.Schema(
    {
      username: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      email: { type: String, lowercase: true, unique: true },
      phone_number: { type: Number },
      street_address: { type: String },
      city: { type: String },
    },
    { versionKey: false },
  ),
);

export default UsersModel;
