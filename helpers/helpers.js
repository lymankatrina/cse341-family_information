// helpers/helpers.js
const Individual = require('../models/individualModel.js');

// Helper function to find individuals by id
const findIndividualsByIds = async (individualId) => {
  const individuals = await Individual.find({ _id: { $in: individualId } });
  return individuals;
};

// Helper function to format anniversary data
const formatAnniversary = async (anniversary) => {
  const individuals = await Individual.find({ _id: { $in: anniversary.couple } });
  const coupleNames = individuals.map(formatFullName);
  const formattedDate = anniversary.anniversaryDate.toISOString().split('T')[0];
  return { anniversaryId: anniversary._id, couple: coupleNames, formattedDate };
};

// Helper function to format individual name
const formatFullName = (individual) => `${individual.firstName} ${individual.lastName}`;

// Helper function to format news stories
async function formatNews(news) {
  const author = await Individual.findById(news.postedBy);
  const dateCreated = news.dateCreated ? news.dateCreated.toISOString().split('T')[0] : null;
  const shortNewsBody =
    news.newsBody.length > 100 ? news.newsBody.substring(0, 100) + '...' : news.newsBody;
  return {
    newsId: news._id,
    postedBy: formatFullName(author),
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
    const dob = new Date(birthDate); // Convert birthdate to a Date object
    dob.setUTCHours(0, 0, 0, 0);
    today.setUTCHours(0, 0, 0, 0);
  
    let age = today.getUTCFullYear() - dob.getUTCFullYear();
    if (
      today.getUTCMonth() < dob.getUTCMonth() ||
      (today.getUTCMonth() === dob.getUTCMonth() && today.getUTCDate() < dob.getUTCDate())
    ) {
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
    birthYear: birthDate.getUTCFullYear(),
    age: calculateAge(birthDate)
  };
}

// Helper function to get all individuals
const getAllIndividuals = async () => {
  try {
    const individuals = await Individual.find();
    return individuals;
  } catch (error) {
    throw new Error('Error occurred while retrieving all individuals');
  }
};

// Helper function to get individual by last name
const getIndividualByLastName = async (lastName) => {
  try {
    const individuals = await Individual.find({ lastName });
    return individuals;
  } catch (error) {
    throw new Error('Error occurred while retrieving individuals by last name');
  }
};

module.exports = {
  formatAnniversary,
  formatFullName,
  formatNews,
  handleServerError,
  findIndividualsByIds,
  calculateAge,
  formatBirthdayIndividual,
  getAllIndividuals,
  getIndividualByLastName
};

