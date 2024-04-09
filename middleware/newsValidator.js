const validator = require('../helpers/validate');

const newsValidator = async (req, res, next) => {
  const validationRule = {
    newsTitle: 'required|string|max:60',
    newsBody: 'required|string',
    status: 'required|in:public,private',
    postedBy: 'required|string',
    dateCreated: 'required|date',
    picture: 'url'
  };

  await validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412)
        .send({
          success: false,
          message: 'Validation failed',
          data: err
        });
      } else {
        next();
      }
    }).catch( err => console.log(err))
}
module.exports = {
  newsValidator
};
