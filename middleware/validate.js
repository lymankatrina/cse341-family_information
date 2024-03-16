const validator = require('../helpers/validate');

const saveIndividual = (req, res, next) => {
  const validationRule = {
    firstName: 'required|string',
    middleName: 'required|string',
    lastName: 'required|string',
    birthDate: 'required|string',
    parents: 'required|string',
    email: 'required|string',
    household: 'required|Number', // Removed space before Number
    headOfHousehold: 'required|string',
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

module.exports = {
  saveIndividual // Corrected function name
};
