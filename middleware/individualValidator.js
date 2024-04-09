const validator = require('../helpers/validate');

const individualValidator = (req, res, next) => {
  const validationRule = {
    firstName: 'required|string',
    middleName: 'required|string',
    lastName: 'required|string',
    birthDate: 'required|string',
    parents: 'array|max:2',
    'parents.*': ['string'],
    email: 'required|string',
    household: 'string',
    headOfHousehold: 'required|boolean'
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

module.exports = { individualValidator };
