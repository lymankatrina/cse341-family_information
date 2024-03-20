const Individual = require('../models/individualModel.js');

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

module.exports = { formatAnniversary, formatIndividualName };
