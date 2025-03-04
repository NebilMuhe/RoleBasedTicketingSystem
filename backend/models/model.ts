import * as mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  FirstName: {
    type: String,
    required: true,
    trim: true,
  },
  MiddleName: {
    type: String,
    required: true,
    trim: true,
  },
  LastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  PhoneNumber: {
    type: String,
    required: true,
    unique: true, 
    trim: true,
  },
  Password: {
    type: String,
    required: true,
  },
  Role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
}, { timestamps: true });


const UserModel = mongoose.model('User', UserSchema);

export { UserModel };
