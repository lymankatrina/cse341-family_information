

const mongoose = require('mongoose');

const householdSchema = new mongoose.Schema({
  streetAddress: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true },
  country: { type: String, required: true },
  headOfHousehold: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Individual'
    }
  ],
  residents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Individual'
    }
  ]
});

const Household = mongoose.model('Household', householdSchema);
module.exports = Household;
