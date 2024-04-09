const mongoose = require('mongoose');
const { getAllEmails, getUserByEmail } = require('../controllers/individualController');
const { News } = require('../models/newsModel');
const Individual = require('../models/individualModel');

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
    // Get the current users email address.
    const userEmail = req.oidc.user.email;
    console.log(userEmail);
    // Find the individual id that matches the current users email address.
    const user = await getUserByEmail(userEmail);
    const userId = new mongoose.Types.ObjectId(user._id);
    console.log(userId);
    
    // Get all the public news
    const publicNews = await News.find({ status: 'public' });

    // Get private news authored by current user
    const privateNews = await News.find({ postedBy: userId, status: 'private' });

    // Combine public and private news items.
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
