const mongoose = require('mongoose');

//Using Mongoose for Model Definition - GraphQL
const individualSchema = new mongoose.Schema(
  {
    firstName: String,
    middleName: String,
    lastName: String,
    birthDate: Date,
    parents: [
      {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Individual'
      }
    ], // Define parents as an array of individualId's
    phone: String,
    email: String,
    household: String,
    headOfHousehold: Boolean,
    picture: String
  },
  { timestamps: true }
);

const Individual = mongoose.model('Individual', individualSchema);

module.exports = Individual;
