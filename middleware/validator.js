const { body, validationResult } = require('express-validator');
const { ObjectId } = require('mongodb');
const mongodb = require('../db/connect');

const anniversaryValidationRules = () => {
  const rules = [
    // couple validation rules
    body('couple')
      .isArray({ min: 2, max: 2 })
      .withMessage('couple must be an array of two individuals')
      .custom(async (value) => {
        const coupleIds = value.map((id) => new ObjectId(id));
        const individuals = await mongodb
          .getDb()
          .db()
          .collection('individuals')
          .find({ _id: { $in: coupleIds } })
          .toArray();
        if (individuals.length !== 2) {
          throw new Error('Both individuals must exist in the individuals collection');
        }
        return true; // Validation passed
      }),
    // anniversary date validation rules
    body('anniversaryDate')
      .notEmpty()
      .isISO8601()
      .withMessage('anniversary date is required and must be a valid date in the YYYY-MM-DD format')
  ];

  return rules;
};

// Place all validation rules above this validate function!
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors
    .array({ onlyFirstError: true })
    .map((err) => extractedErrors.push({ [err.path]: err.msg }));
  return res.status(422).json({
    errors: extractedErrors
  });
};

module.exports = {
  anniversaryValidationRules,
  validate
};
