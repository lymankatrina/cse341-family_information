const Validator = require('validatorjs');

const validate = (input, rules, res, next) => {
  const validation = new Validator(input, rules);

  if (validation.fails()) {
    return res.status(422).json({
      errors: validation.errors.all()
    });
  }

  return next();
};

module.exports = { validate };
