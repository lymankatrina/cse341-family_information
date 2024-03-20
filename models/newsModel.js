const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  newsTitle: {
    type: String,
    required: true,
    maxlength: 60
  },
  newsBody: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['public', 'private']
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Individual',
    required: true
  },
  dateCreated: {
    type: Date,
    default: Date.now,
    required: true
  },
  picture: {
    type: String
  }
});

const News = mongoose.model('News', newsSchema);

module.exports = News;
