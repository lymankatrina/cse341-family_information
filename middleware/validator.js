const validator = require('../helpers/validate');

const saveIndividuals = (req, res, next) => {
  const validationRule = {
    firstName: 'required|string',
    middleName: 'required|string',
    birthDate: 'string',
    parents: 'required|string',
    phone: 'required|string',
    nationality: 'required|string',
    email: 'required|string',
    household: 'required|string',
   headOfHousehold: 'required|string',
    booksWritten: 'required|string',
    picture:  'required|string'
  },
 

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

const saveHouseholds = (req, res, next) => {
    const validationRule = {
        title: 'required|string',
        author: 'required|string',
        genre: 'required|string',
        publicationYear: 'string',
        isbn: 'required|string',
        copiesAvailable: 'string',
        description: 'required|string'
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
    saveIndividuals,
    saveHouseholds
  };
  
