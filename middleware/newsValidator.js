const validator = require('../helpers/validate');

const newsValidator = async (req, res, next) => {
  const userEmail = req.oidc.user.email;

  if (req.body.postedBy !== userEmail) {
    return res.status(403).send({
      success: false,
      message: 'Access denied. You can only create, update, or delete news stories that you posted.'
    });
  }

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

module.exports = { newsValidator };
