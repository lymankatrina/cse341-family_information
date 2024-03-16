const { body, validationResult } = require('express-validator');
const { ObjectId } = require('mongodb');
const mongodb = require('../db/connect');

const anniversaryValidationRules = () => {
  const rules = [
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
    body('anniversaryDate')
      .notEmpty()
      .withMessage('anniversary date is required')
      .isISO8601()
      .withMessage('anniversary date must be a valid and in the YYYY-MM-DD format')
  ];
  return rules;
};

const newsValidationRules = () => {
  const rules = [
    body('newsTitle')
      .notEmpty()
      .withMessage('Title is required')
      .isString()
      .isLength({ max: 60 })
      .withMessage('Title max length is 60'),
    body('newsBody').notEmpty().isString().withMessage('News body is required'),
    body('status')
      .notEmpty()
      .isIn(['public', 'private'])
      .withMessage(`Status must be either 'public' or 'private'`),
    body('postedBy')
      .notEmpty()
      .isMongoId()
      .withMessage('postedBy is required and should be your individualId'),
    body('dateCreated').notEmpty().withMessage('Date created is required'),
    body('picture').isURL().withMessage('Provide a URL for the picture')
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
  newsValidationRules,
  validate
};
