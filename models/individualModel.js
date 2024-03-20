const mongoose = require('mongoose');

//Using Mongoose for Model Definition - GraphQL
const individualSchema = new mongoose.Schema(
  {
    firstName: String,
    middleName: String,
    lastName: String,
    birthDate: String,
    parents: [String], // Define parents as an array of strings
    phone: String,
    email: String,
    household: String,
    headOfHousehold: String,
    picture: String
  },
  { timestamps: true }
);

const Individual = mongoose.model('Individual', individualSchema);

module.exports = Individual;
