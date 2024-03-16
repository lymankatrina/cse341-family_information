const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const { validationResult } = require('express-validator');

/* GET REQUESTS */
// Get a list of all Individuals
exports.getAllIndividuals = async (req, res) => {
  // #swagger.tags = ['Individuals']
  // #swagger.summary = 'Get all Individuals'
  // #swagger.description = 'This will list all individuals in the database'
  const result = await mongodb.getDb().db().collection('individuals').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

// Get a single individual by id
exports.getSingleIndividual = async (req, res) => {
  // #swagger.tags = ['Individuals']
  // #swagger.summary = 'Get a single individual by ID'
  // #swagger.description = 'This will return a single individual in the database by individual Id'
  const individualId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('individuals').find({ _id: individualId });
  result.toArray().then((lists) => {
    if (lists.length > 0) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    } else {
      res.status(404).json({ error: 'Individual not found' });
    }
  });
};

// Get individuals by parent id
exports.getIndividualsByParent = async (req, res) => {
  // #swagger.tags = ['Individuals']
  // #swagger.summary = 'Get individuals by parent Id'
  // #swagger.description = 'This will return a list of individuals associated with a provided parent Id'
  const parentId = req.params.parentId;
  try {
    const individuals = await mongodb
      .getDb()
      .db()
      .collection('individuals')
      .find({ parents: { $in: [parentId] } })
      .toArray();
    if (individuals.length > 0) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(individuals);
    } else {
      res.status(404).json({ error: 'No individuals found by that parent Id' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get individuals by household id
exports.getIndividualsByHousehold = async (req, res) => {
  // #swagger.tags = ['Individuals']
  // #swagger.summary = 'Get individuals by parent Id'
  // #swagger.description = 'This will return a list of individuals associated with a provided parent Id'
  const householdId = req.params.householdId;
  try {
    const individuals = await mongodb
      .getDb()
      .db()
      .collection('individuals')
      .find({ household: { $in: [householdId] } })
      .toArray();
    if (individuals.length > 0) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(individuals);
    } else {
      res.status(404).json({ error: 'No individuals found by that household Id' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get birthday list
exports.getBirthdays = async () => {};

// Get birthdays by month
exports.getBirthdaysByMonth = async () => {};

// Get birthdays by parent id
exports.getBirthdaysByParents = async () => {};

/* POST REQUESTS */
// Create an Individual
exports.createIndividual = async (req, res) => {
  // #swagger.tags = ['Individuals']
  // #swagger.summary = 'Create an Individual'
  // #swagger.description = 'Create an Individual by providing all required information.'
  /*
  #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        example: {
          firstName: "John",
          middleName: "Jacob",
          lastName: "Jingleheimer",
          birthdate: "YYYY-MM-DD",
          parents: [ "65c6f726d51fdd04775b0a54", "65c6f726d51fdd04775b0a55" ],
          phone: "123-456-7890",
          email: "jjjingle@gmail.com",
          household: "65c6f726d51fdd04775b0a57",
          headOfHousehold: true,
          picture: "https://avatars.dicebear.com/api/male/john.svg"
        }
      }
    }
  }
  */
  const individual = {
    firstName: req.body.firstName,
    middleName: req.body.middleName,
    lastName: req.body.lastName,
    birthdate: req.body.birthdate,
    parents: [req.body.parents],
    phone: req.body.phone,
    email: req.body.email,
    household: req.body.household,
    headOfHousehold: req.body.headOfHousehold,
    picture: req.body.picture
  };
  const response = await mongodb.getDb().db().collection('individuals').insertOne(individual);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(404).json({ error: 'Individual could not be created' });
  }
};

/* PUT REQUESTS */
// Update a single individual by id
exports.updateIndividual = async (req, res) => {
  // #swagger.tags = ['Individuals']
  // #swagger.summary = 'Update an Individual by Id'
  // #swagger.description = 'Update an existing individual by providing all required information.'
  /*
  #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        example: {
          firstName: "John",
          middleName: "Jacob",
          lastName: "Jingleheimer",
          birthdate: "YYYY-MM-DD",
          parents: [ "65c6f726d51fdd04775b0a54", "65c6f726d51fdd04775b0a55" ],
          phone: "123-456-7890",
          email: "jjjingle@gmail.com",
          household: "65c6f726d51fdd04775b0a57",
          headOfHousehold: true,
          picture: "https://avatars.dicebear.com/api/male/john.svg"
        }
      }
    }
  }
  */
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const individualId = new ObjectId(req.params.id);
  const individual = {
    firstName: req.body.firstName,
    middleName: req.body.middleName,
    lastName: req.body.lastName,
    birthdate: req.body.birthdate,
    parents: [req.body.parents],
    phone: req.body.phone,
    email: req.body.email,
    household: req.body.household,
    headOfHousehold: req.body.headOfHousehold,
    picture: req.body.picture
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('individuals')
    .replaceOne({ _id: individualId }, individual);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else if (response.modifiedCount <= 0) {
    res.status(404).json({ error: 'Individual not found' });
  } else {
    res.status(500).json({ error: 'An error occurred during the update owner request.' });
  }
};

/* DELETE REQUESTS */
// Delete an individual by id
exports.deleteIndividual = async (req, res) => {
  // #swagger.tags = ['Individuals']
  // #swagger.summary = 'Delete an Individual by Id'
  // #swagger.description = 'This will delete a single individual from the database by Id. This action is permanent.'
  const individualId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db()
    .collection('individuals')
    .deleteOne({ _id: individualId });
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(200).send();
  } else if (response.deletedCount <= 0) {
    res.status(404).json({ error: 'Individual not found' });
  } else {
    res
      .status(500)
      .json(response.error || 'An error occured while attempting to delete the individual.');
  }
};