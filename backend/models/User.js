const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    username: { type: String, required: true, unique: true },
    gender: { type: String, enum: ['male', 'female', 'other'], default: 'other' },
    image: { type: String },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true },
);

userSchema.methods.toClient = function toClient() {
  return {
    id: this._id.toString(),
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    username: this.username,
    gender: this.gender,
    image: this.image || '',
    role: this.role,
  };
};

module.exports = mongoose.model('User', userSchema);

