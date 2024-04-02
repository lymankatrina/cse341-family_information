const ObjectId = require('mongoose').Types.ObjectId;

function isValidObjectId(id) {
  if (ObjectId.isValid(id)) {
    if (String(new ObjectId(id)) === id) return true;
    return false;
  }
  return false;
}

// WIP
function isValidAddress(address) {
  return true;
}

// WIP
function isValidHousehold(household) {
  return true;
}

module.exports = { isValidObjectId, isValidAddress, isValidHousehold };
