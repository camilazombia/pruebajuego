import mongoose, { Schema, models, model } from 'mongoose';

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['student', 'admin', 'teacher', 'blocked', 'suspended', 'aldia'],
    default: 'student',
  },
  registration_number: { type: String, unique: true, sparse: true },
}, { timestamps: true });

export const User = models.User || model('User', UserSchema);
