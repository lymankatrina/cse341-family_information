const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

/* GET REQUESTS */
// Get a list of all Individuals
const getAllIndividuals = async (req, res) => {
  // #swagger.tags = ['Individuals']
  // #swagger.summary = 'Get all individuals'
  // #swagger.description = 'This will return all the individuals in the database'
  try {
    const result = await mongodb.getDb().db().collection('individuals').find().toArray();
    res.status(200).json(result);
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message || 'Some error occurred while retrieving all individuals.' });
  }
};
// Get a single Individual by Id
const getSingleIndividual = async (req, res) => {
  // #swagger.tags = ['Individuals']
  // #swagger.summary = 'Get an individual by Id'
  // #swagger.description = 'This will return an individual by Id'
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid individual id to find an individual.');
  }
  try {
    const db = mongodb.getDb(); // Get the database object once
    const userId = new ObjectId(req.params.id);
    const result = await db.db().collection('individuals').findOne({ _id: userId });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      error: error.message || 'Some error occurred while retrieving a single individual.'
    });
  }
};

/* POST REQUESTS */
// Create an Individual
const createIndividual = async (req, res) => {
  // #swagger.tags = ['Individuals']
  // #swagger.summary = 'Create a new Individual to the collection'
  // #swagger.description = 'Create an Individual by providing all required information.'
  try {
    const db = mongodb.getDb(); // Get the database object once
    const individual = {
      firstName: req.body.firstName,
      middleName: req.body.middleName,
      lastName: req.body.lastName,
      birthDate: req.body.birthDate,
      parents: [req.body.parents],
      phone: req.body.phone,
      email: req.body.email,
      household: req.body.household,
      headOfHousehold: req.body.headOfHousehold,
      picture: req.body.picture
    };
    const response = await db.db().collection('individuals').insertOne(individual, { wtimeout: 60000 }); // 30 seconds timeout
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the individual.');
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* PUT REQUESTS */
// Update a single individual by id
const updateIndividual = async (req, res) => {
  // #swagger.tags = ['Individuals']
  // #swagger.summary = 'Update an existing Individual by Id'
  // #swagger.description = 'Update an existing individual by providing all required information.'
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid individual id to update an individual.');
  }
  try {
    const db = mongodb.getDb(); // Get the database object once
    const userId = new ObjectId(req.params.id);
    const individual = {
      firstName: req.body.firstName,
      middleName: req.body.middleName,
      lastName: req.body.lastName,
      birthDate: req.body.birthDate,
      parents: [req.body.parents],
      phone: req.body.phone,
      email: req.body.email,
      household: req.body.household,
      headOfHousehold: req.body.headOfHousehold,
      picture: req.body.picture
    };
    const response = await db
      .db()
      .collection('individuals')
      .replaceOne({ _id: userId }, individual);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      throw new Error('Some error occurred while updating the individual.');
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message || 'Some error occurred while updating the individual.' });
  }
};

/* DELETE REQUESTS */
// Delete an individual by id
const deleteIndividual = async (req, res) => {
  // #swagger.tags = ['Individuals']
  // #swagger.summary = 'Delete an Individual by Id'
  // #swagger.description = 'This will delete a single individual from the database by Id. This action is permanent.'
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid individual id to delete an individual.');
  }
  try {
    const db = mongodb.getDb(); // Get the database object once
    const userId = new ObjectId(req.params.id);
    const response = await db.db().collection('individuals').deleteOne({ _id: userId });
    if (response.deletedCount > 0) {
      res.status(200).send();
    } else {
      throw new Error('Some error occurred while deleting the individual.');
    }
  } catch (error) {
    res.status(500).json(error.message || 'Some error occurred while deleting the individual.');
  }
};

module.exports = {
  getAllIndividuals,
  getSingleIndividual,
  createIndividual,
  updateIndividual,
  deleteIndividual
};


