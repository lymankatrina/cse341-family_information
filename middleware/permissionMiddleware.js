const { getAllEmails, getUserByEmail } = require('../controllers/individualController');
const { News } = require('../models/newsModel');

const getEmails = async () => {
  let individuals = await getAllEmails();
  let emails = [];
  for (const individual of individuals) {
    emails.push(individual.email);
  }
  return emails;
};

const validUserEmail = async (req, res, next) => {
  // Production email
  const email = req.oidc.user.email;

  // Dev valid email test
  // let email = "jbdoe@gmail.com";

  // Dev invalid email test
  // let email = "fjdkslifosa@gmail.com"

  const validEmails = await getEmails();

  if ((!email) in validEmails) {
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

    const news = await News.find();

    const filteredNews = news.filter((newsItem) => {
      return newsItem.status === 'private' && newsItem.postedBy === userEmail;
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

module.exports = { validUserEmail, validHeadOfHousehold, newsAccessMiddleware };
