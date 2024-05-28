const mongoose = require('mongoose');

const userModel = require('./user');
const categoryModel = require('./category');

const gameSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true, // Ensure the title field is unique
  },
  description: {
    type: String,
    required: true,
  },
  developer: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: userModel,
    },
  ],
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: categoryModel,
    },
  ],
});

// Static method to find games by category
gameSchema.statics.findGameByCategory = function (category) {
  return this.find({}) // Execute search for all games
    .populate({
      path: 'categories',
      match: { name: category },
    })
    .populate({
      path: 'users',
      select: '-password',
    })
    .then((games) => {
      // Filter by the presence of the desired category
      return games.filter((game) => game.categories.length > 0);
    });
};

// Pre-save hook to check for duplicate game titles
gameSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('title')) {
    const existingGame = await this.constructor.findOne({ title: this.title });
    if (existingGame) {
      const error = new Error('Игра с таким названием уже существует');
      error.statusCode = 400;
      return next(error);
    }
  }
  next();
});

module.exports = mongoose.model('game', gameSchema);
