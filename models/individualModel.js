module.exports = (mongoose) => {
  const individual = mongoose.model(
    'individual',
    mongoose.Schema(
      {
        firstName: String,
        middleName: String,
        lastName: String,
        birthDate: String,
        parents: String,
        phone: Number,
        email: String,  
        household: Number,
        headOfHousehold: String,
        picture: String

        
      },
      { timestamps: true }
    )
  );

  return individual;
};

const mongoose = require('mongoose');


//Using Mongoose for Model Definition - GraphQL
const individualSchema = new mongoose.Schema({
  firstName: String,
  middleName: String,
  lastName: String,
  birthDate: String,
  parents: String,
  phone: Number,
  email: String,  
  household: Number,
  headOfHousehold: String,
  picture: String
});

const individual = mongoose.model('individual', individualSchema);

module.exports = individual;
