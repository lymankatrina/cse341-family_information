const { ObjectId } = require('mongoose').Types;
const Individual = require('../models/individualModel');

const anniversaryRules = () => {
  const rules = {
    couple: [
      'required',
      'array',
      'size:2',
      async (attribute, value, fails) => {
        const coupleIds = value.map((id) => new ObjectId(id));
        const individuals = await Individual.find({ _id: { $in: coupleIds } });
        if (individuals.length !== 2) {
          fails('Both individuals must exist in the individuals collection');
        }
      }
    ],
    anniversaryDate: 'required|date|date_format:YYYY-MM-DD'
  };
  return rules;
};

module.exports = {anniversaryRules};
