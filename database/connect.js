const mongoose = require('mongoose');

async function connectToDatabase() {
  try {
    await mongoose.connect('mongodb://localhost:27017/pindie');
  } catch (err) {
    console.log('Error database/connect.js');
  }
}

module.exports = {
  connectToDatabase,
};
