const mongoose = require('mongoose');

const anniversarySchema = new mongoose.Schema({
  couple: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Individual'
    }
  ],
  anniversaryDate: {
    type: Date,
    required: true
  }
});

const Anniversary = mongoose.model('Anniversary', anniversarySchema);

module.exports = { Anniversary };
