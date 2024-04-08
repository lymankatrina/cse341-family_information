const ObjectId = require('mongoose').Types.ObjectId;
const validator = require('../helpers/validate');

function isValidObjectId(id) {
  if (ObjectId.isValid(id)) {
    if (String(new ObjectId(id)) === id) return true;
    return false;
  }
  return false;
}

const householdValidator = (req, res, next) => {
  const validationRule = {
    streetAddress: 'required|string',
    city: 'required|string',
    state: 'required|string',
    zip: 'required|string',
    country: 'required|string',
    headOfHousehold: 'required|array',
    residents: 'required|array'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

// WIP
function isValidAddress(address) {
  return true;
}

// WIP
function isValidHousehold(household) {
  return true;
}

module.exports = { isValidObjectId, isValidAddress, isValidHousehold };
