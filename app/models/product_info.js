'user strict';

const mongoose = require('mongoose');
const mongodbConfig = require('../../config/mongodb.js');

const ProductSchema = mongoose.Schema({
  id: {type: Number, unique: true, required: true},
  description: {type: String},
}, {
  timestamps: true
});

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(mongodbConfig.url, {
  useNewUrlParser: true,
  useCreateIndex: true,
}).then(() => {
  console.log("Successfully connected to mongodb database");
}).catch((err) => {
  console.log('Could not connect to mongodb database. Exiting now...', err);
  process.exit();
});

module.exports = mongoose.model('ProductInfo', ProductSchema);





