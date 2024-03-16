const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllIndividuals = async (req, res) => {
  try {
    const db = mongodb.getDb(); // Get the database object once
    const result = await db.db().collection('individuals').find().toArray();
    res.status(200).json(result);
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message || 'Some error occurred while retrieving all individuals.' });
  }
};

const getSingleIndividual = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid individual id to find an individual.');
  }
  try {
    const db = mongodb.getDb(); // Get the database object once
    const userId = new ObjectId(req.params.id);
    const result = await db.collection('individuals').findOne({ _id: userId });
    res.status(200).json(result);
  } catch (error) {
    res
      .status(500)
      .json({
        error: error.message || 'Some error occurred while retrieving a single individual.'
      });
  }
};

const createIndividual = async (req, res) => {
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
    const response = await db.collection('individuals').insertOne(individual, { wtimeout: 60000 }); // 30 seconds timeout
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the individual.');
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateIndividual = async (req, res) => {
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
    const response = await db.collection('individuals').replaceOne({ _id: userId }, individual);
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

const deleteIndividual = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid individual id to delete an individual.');
  }
  try {
    const db = mongodb.getDb(); // Get the database object once
    const userId = new ObjectId(req.params.id);
    const response = await db.collection('individuals').deleteOne({ _id: userId });
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
