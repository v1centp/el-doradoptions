const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://dbUser:1234@cluster0.ogkzglt.mongodb.net/Options', (err) => {
  if (!err)
    console.log('MongoDB-mongoose connection working boy 🦍');
  else
    console.log('Error in DB connection : ', err);
});

module.exports = mongoose;