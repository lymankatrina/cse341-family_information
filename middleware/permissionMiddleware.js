const { getAllEmails, getUserByEmail } = require('../controllers/individualController');
const { News } = require('../models/newsModel');
const individual = require('../models/individualModel');
const ObjectId = require('mongoose').Types.ObjectId;

const getEmails = async () => {
  let individuals = await getAllEmails();
  let emails = [];
  for (const individual of individuals) {
    emails.push(individual.email);
  }
  return emails;
};

const validEmail = async (req, res, next) => {
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
  // Production email
  let email = req.oidc.user.email;

  // Dev valid test email
  // const email = "jbdoe@gmail.com";

  // Dev invalid test email
  // const email = "jmjingle@gmail.com";

  const user = await getUserByEmail(email);
  console.log(user.headOfHousehold);
  if (!user.headOfHousehold) {
    res.status(403).send('Access denied.');
    return;
  }
  next();
};

const newsAccessMiddleware = async (req, res, next) => {
  try {
    const userEmail = req.oidc.user.email;
    const userId = new ObjectId(req.body.postedBy);
    const result = await individual.findById(userId);
    console.log(result);
    const news = await News.find();

    const filteredNews = news.filter((newsItem) => {
      return newsItem.status === 'private' && result.email === userEmail;
    });

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
