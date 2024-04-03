const validator = require('../helpers/validate');
const Individual = require('../models/individualModel');

const anniversaryValidator = async (req, res, next) => {

  const invalidIndividualIds = [];
  for (const id of req.body.couple) {
    const individual = await Individual.findById(id);
    if (!individual) {
      invalidIndividualIds.push(id);
    }
  }

  if (invalidIndividualIds.length > 0) {
    return res.status(412).send({
      success: false,
      message: 'Validation failed',
      data: {
        'couple.*': invalidIndividualIds.map(id => `${id} does not exist`)
      }
    });
  }

  const validationRule = {
    couple: 'required|array|size:2', 
    'couple.*': ['required', 'string'],
    anniversaryDate: 'required|date'
  };

  await validator(req.body, validationRule, {}, (err, status) => {
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

module.exports = { anniversaryValidator };
