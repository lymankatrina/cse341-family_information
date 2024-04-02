const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  newsTitle: {
    type: String,
    required: true,
    maxlength: 60,
    example: 'Sharpley Family Update'
  },
  newsBody: {
    type: String,
    required: true,
    example: 'This is an update from the Sharpley Family.'
  },
  status: {
    type: String,
    required: true,
    enum: ['public', 'private'],
    example: 'public'
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Individual',
    required: true,
    example: 'individualId'
  },
  dateCreated: {
    type: Date,
    default: Date.now,
    required: true,
    example: '2024-03-29'
  },
  picture: {
    type: String,
    example: 'https://example.com/image.jpg'
  }
});

const News = mongoose.model('News', newsSchema);

module.exports = { News };
