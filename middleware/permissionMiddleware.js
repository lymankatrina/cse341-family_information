const mongoose = require('mongoose');
const { getAllEmails, getUserByEmail } = require('../controllers/individualController');
const { News } = require('../models/newsModel');

const getEmails = async () => {
  let individuals = await getAllEmails();
  return individuals.map(individual => individual.email);
};

const validEmail = async (req) => {
  const email = req.oidc.user.email;
  const validEmails = await getEmails();
  return validEmails.includes(email);
};
 
const validUserEmail = async (req, res, next) => {
  const isValidUser = await validEmail(req, res, next);
  if(!isValidUser) {
    res.status(403).send('Access denied.');
    return;
  }
  next();
};

const validHeadOfHousehold = async (req, res, next) => {
  let email = req.oidc.user.email;

    const user = await getUserByEmail(email)
    if (!user.headOfHousehold) {
        res.status(403).send("Access denied");
        return;
    }
    next();
}

const newsAccessMiddleware = async (req, res, next) => {
  try {
    const userEmail = req.oidc.user.email;
    const user = await getUserByEmail(userEmail);
    const userId = new mongoose.Types.ObjectId(user._id);
    const publicNews = await News.find({ status: 'public' });
    const privateNews = await News.find({ postedBy: userId, status: 'private' });
    const filteredNews = publicNews.concat(privateNews);
    req.filteredNews = filteredNews;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).send({
      success: false,
      message: 'Internal server error'
    });
  }
};

module.exports = { validEmail, validUserEmail, validHeadOfHousehold, newsAccessMiddleware };
