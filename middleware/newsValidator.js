const validator = require('../helpers/validate');
const individual = require('../models/individualModel');
const ObjectId = require('mongoose').Types.ObjectId;

const newsValidator = async (req, res, next) => {
  // const userEmail = req.oidc.user.email;
  // const userId = new ObjectId(req.body.postedBy);
  // const result = await individual.findById(userId);
  
  // if (result.email !== userEmail) {
  //   return res.status(403).send({
  //     success: false,
  //     message: 'Access denied. You can only create, update, or delete news stories that you posted.'
  //   });
  // }

  // const validationRule = {
  //   newsTitle: 'required|string|max:60',
  //   newsBody: 'required|string',
  //   status: 'required|in:public,private',
  //   postedBy: 'required|string',
  //   dateCreated: 'required|date',
  //   picture: 'url'
  // };
next();

//   await validator(req.body, validationRule, {}, (err, status) => {
//     if (!status) {
//       res.status(412).send({
//         success: false,
//         message: 'Validation failed',
//         data: err
//       });
//     } else {
//       next();
//     }
//   });
};

module.exports = { newsValidator };
