const mongoose = require('mongoose');

const deviceTokenSchema = new mongoose.Schema(
  {
    userId: { type: String }, // can store any identifier from mobile app
    token: { type: String, required: true, unique: true },
    platform: { type: String, enum: ['ios', 'android', 'web'], required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model('DeviceToken', deviceTokenSchema);

