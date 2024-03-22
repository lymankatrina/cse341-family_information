const validator = require('../helpers/validate');
const anniversaryValidator = async (req, res, next) => {
  const validationRule = {
    couple: 'required|array|size:2',
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
