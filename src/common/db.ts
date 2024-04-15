const mongoose = require('mongoose');

const uri =
  'mongodb+srv://admin:admin@block-back.9kaoybl.mongodb.net/?retryWrites=true&w=majority&appName=BLOCK-BACK';

export const connectDb = async () => mongoose.connect(uri);
