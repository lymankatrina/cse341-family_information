const Individual = require('../models/individualModel');
const Household = require('../models/householdModel');
const {
  formatBirthdayIndividual,
  handleServerError,
  formatFullName
} = require('../helpers/helpers');

exports.getParents = async (req, res) => {
  // #swagger.tags = ['Relationships']
  // #swagger.summary = 'Get parents'
  // #swagger.description = 'This will return a list of parents for the individual id provided.'
  const individualId = req.params.id;
  try {
    const individual = await Individual.findById(individualId);
    if (!individual) {
      return res.status(404).json({ error: 'Individual not found' });
    }
    const parents = await Individual.find({ _id: { $in: individual.parents } });
    if (parents.length > 0) {
      const result = parents.map(
        (parent) => `ParentId: ${parent._id}, Name: ${formatFullName(parent)}`
      );
      res.status(200).json(result);
    } else {
      res.status(404).json({ error: 'No parents found for that individual Id' });
    }
  } catch (error) {
    handleServerError(res, error);
  }
};

exports.getChildren = async (req, res) => {
  // #swagger.tags = ['Relationships']
  // #swagger.summary = 'Get children'
  // #swagger.description = 'This will return a list of individuals with the provided parentId listed in the parents array.'
  const parentId = req.params.parentId;
  try {
    const children = await Individual.find({ parents: { $in: [parentId] } }).select(
      '_id firstName middleName lastName birthDate'
    );
    if (children.length > 0) {
      const formattedChildren = children.map((child) => ({
        individualId: child._id,
        fullName: formatFullName(child),
        birthDate: child.birthDate.toISOString().split('T')[0]
      }));
      res.status(200).json(formattedChildren);
    } else {
      res.status(404).json({ error: 'No children found for that parent Id' });
    }
  } catch (error) {
    console.error(error);
    handleServerError(res, error, {});
  }
};

exports.getGrandchildren = async (req, res) => {
  // #swagger.tags = ['Relationships']
  // #swagger.summary = 'Get grandchildren'
  // #swagger.description = 'This will return a list of individuals who are grandchildren of the provided grandparentId.'
  const grandparentId = req.params.grandparentId;
  try {
    // Find the children of the grandparent
    const children = await Individual.find({ parents: { $in: [grandparentId] } });

    // Array to store grandchildren
    let grandchildren = [];

    // For each child, find their children (grandchildren)
    for (let child of children) {
      const childId = child._id;
      const childGrandchildren = await Individual.find({ parents: { $in: [childId] } });
      grandchildren = grandchildren.concat(childGrandchildren);
    }

    if (grandchildren.length > 0) {
      const formattedGrandchildren = grandchildren.map((grandchild) => ({
        individualId: grandchild._id,
        fullName: formatFullName(grandchild),
        birthDate: grandchild.birthDate.toISOString().split('T')[0]
      }));
      res.status(200).json(formattedGrandchildren);
    } else {
      res.status(404).json({ error: 'No grandchildren found for that grandparent Id' });
    }
  } catch (error) {
    console.error(error);
    handleServerError(res, error, {});
  }
};

exports.getBirthdays = async (req, res) => {
  // #swagger.tags = ['Birthdays']
  // #swagger.summary = 'Get all birthdays'
  // #swagger.description = 'This will return the names of all individuals in the database with their birth date'
  try {
    const birthdays = await Individual.find({}).select('_id firstName lastName birthDate');
    res.status(200).json(birthdays);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getBirthdayFormatted = async (req, res) => {
  // #swagger.tags = ['Birthdays']
  // #swagger.summary = 'Get all birthdays'
  // #swagger.description = 'This will return the full names of all individuals in the database sorted by birth month and date along with their date of birth and the age of the individual as of today's date.'
  try {
    const individuals = await Individual.find({}, 'firstName middleName lastName birthDate');
    const formattedBirthdays = individuals
      .map(formatBirthdayIndividual)
      .sort((a, b) => a.birthMonth - b.birthMonth || a.birthDay - b.birthDay);
    res.json(formattedBirthdays);
  } catch (error) {
    handleServerError(res, error);
  }
};

exports.getBirthdaysByMonth = async (req, res) => {
  // #swagger.tags = ['Birthdays']
  // #swagger.summary = 'Get birthdays by month'
  // #swagger.description = 'This will return the full names of all individuals in the database born in the specified month along with their date of birth and the age of the individual as of today's date. This data is sorted by month and date of birth.'
  try {
    const month = parseInt(req.params.month);
    const individuals = await Individual.find({
      $expr: { $eq: [{ $month: { $toDate: '$birthDate' } }, month] }
    });
    if (individuals.length === 0) {
      return res.status(400).json({ message: 'No birthdays found for this month' });
    }
    const formattedBirthdays = individuals
      .map(formatBirthdayIndividual)
      .sort((a, b) => a.birthMonth - b.birthMonth || a.birthDay - b.birthDay);
    res.json(formattedBirthdays);
  } catch (error) {
    handleServerError(res, error);
  }
};

exports.getMailingLabels = async (req, res) => {
  // #swagger.tags = ['Mailing Labels']
  // #swagger.summary = 'Get Mailing Labels'
  // #swagger.description = 'This will return the full names of all individuals in the database with their mailing address.'
  try {
    const individuals = await Individual.find({}, 'firstName lastName household');
    const mailingLabels = [];
    for (const individual of individuals) {
      const household = await Household.findOne({ residents: individual._id });
      if (household) {
        let careOf = null;
        const isHOH = household.headOfHousehold.some((id) => id.equals(individual._id));
        if (!isHOH) {
          const hoh = await Individual.findById(household.headOfHousehold[0]);
          if (hoh) {
            careOf = `c/o ${hoh.firstName} ${hoh.lastName}`;
          }
        }
        mailingLabels.push({
          labelName: `${individual.firstName} ${individual.lastName}`,
          ...(careOf && { careOf }),
          addressLine1: `${household.streetAddress}`,
          addressLine2: `${household.city}, ${household.state} ${household.zip}`,
          addressLine3: `${household.country}`
        });
      }
    }
    res.json(mailingLabels);
  } catch (error) {
    handleServerError(res, error);
  }
};
