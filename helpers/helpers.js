const Individual = require('../models/individualModel.js');

// Helper function to find individuals by id
const findIndividualsByIds = async (individualId) => {
  const individuals = await Individual.find({ _id: { $in: individualId } });
  return individuals;
};

// Helper function to format anniversary data
const formatAnniversary = async (anniversary) => {
  const individuals = await Individual.find({ _id: { $in: anniversary.couple } });
  const coupleNames = individuals.map(formatIndividualName);
  const formattedDate = anniversary.anniversaryDate.toISOString().split('T')[0];
  return { anniversaryId: anniversary._id, couple: coupleNames, formattedDate };
};

// Helper function to format individual name
const formatIndividualName = (individual) => ({
  firstName: individual.firstName,
  lastName: individual.lastName
});

// Helper function to format news stories
async function formatNews(news) {
  const author = await Individual.findById(news.postedBy);
  const dateCreated = news.dateCreated ? news.dateCreated.toISOString().split('T')[0] : null;
  const shortNewsBody =
    news.newsBody.length > 100 ? news.newsBody.substring(0, 100) + '...' : news.newsBody;
  return {
    newsId: news._id,
    postedBy: `${author.firstName} ${author.lastName}`,
    dateCreated: dateCreated,
    newsTitle: news.newsTitle,
    newsBody: shortNewsBody,
    status: news.status,
    picture: news.picture
  };
}

function handleServerError(res, error) {
  console.error('Error:', error);
  res.status(500).json({ error: 'Internal server error' });
}

// Helper function to calculate age
function calculateAge(birthDate) {
  const today = new Date();
  let age = today.getUTCFullYear() - birthDate.getUTCFullYear();
  const month = today.getUTCMonth() - birthDate.getUTCMonth();
  if (month < 0 || (month === 0 && today.getUTCDate() < birthDate.getUTCDate())) {
    age--;
  }
  return age;
}

// Helper function to format birthday data
function formatBirthdayIndividual(individual) {
  const birthDate = individual.birthDate;
  return {
    fullName: `${individual.firstName} ${individual.middleName ? individual.middleName + ' ' : ''}${individual.lastName}`,
    birthMonth: birthDate.getUTCMonth() + 1,
    birthDay: birthDate.getUTCDate(),
    age: calculateAge(birthDate)
  };
}

module.exports = {
  formatAnniversary,
  formatIndividualName,
  formatNews,
  handleServerError,
  findIndividualsByIds,
  calculateAge,
  formatBirthdayIndividual
};
