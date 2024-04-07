const mongoose = require('mongoose');
const { ObjectId } = require('mongoose').Types;
const Individual = require('../models/individualModel');
const { handleServerError } = require('../helpers/helpers');

/* GET REQUESTS */
// Get a list of all Individuals
exports.getAllIndividuals = async (req, res) => {
  // #swagger.tags = ['Individuals']
  // #swagger.summary = 'Get all individuals'
  // #swagger.description = 'This will return all the individuals in the database'
  try {
    const result = await Individual.find();
    res.status(200).json(result);
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message || 'Some error occurred while retrieving all individuals.' });
  }
};

// Get a single Individual by Id
exports.getIndividualById = async (req, res) => {
  // #swagger.tags = ['Individuals']
  // #swagger.summary = 'Get an individual by Id'
  // #swagger.description = 'This will return an individual by Id'
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid individual id to find an individual.');
  }
  try {
    const result = await Individual.findById(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      error: error.message || 'Some error occurred while retrieving a single individual.'
    });
  }
};

exports.getAllEmails = async (req, res) => {
  // #swagger.ignore = true
  try {
    const result = await Individual.find({}).select('email');
    return result;
  } catch (error) {
    return error.message;
  }
};

exports.getUserByEmail = async (userEmail) => {
  // #swagger.ignore = true
  try {
    const result = await Individual.findOne({ email: userEmail });
    return result;
  } catch (error) {
    console.log('something went wrong');
  }
};

/* POST REQUESTS */
// Create an Individual
exports.createIndividual = async (req, res) => {
  // #swagger.tags = ['Individuals']
  // #swagger.summary = 'Create a new Individual to the collection'
  // #swagger.description = 'Create an Individual by providing all required information.'
  try {
    const individual = new Individual({
      firstName: req.body.firstName,
      middleName: req.body.middleName,
      lastName: req.body.lastName,
      birthDate: req.body.birthDate,
      parents: req.body.parents,
      phone: req.body.phone,
      email: req.body.email,
      household: req.body.household,
      headOfHousehold: req.body.headOfHousehold,
      picture: req.body.picture
    });
    const response = await individual.save();
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* PUT REQUESTS */
// Update a single individual by id
exports.updateIndividual = async (req, res) => {
  // #swagger.tags = ['Individuals']
  // #swagger.summary = 'Update an existing Individual by Id'
  // #swagger.description = 'Update an existing individual by providing all required information.'
  const id = req.params.id;
  try {
    const result = await Individual.findByIdAndUpdate(id, req.body, { new: true });
    if (!result) {
      res.status(404).json({ error: 'Individual not found' });
    } else {
      const updatedIndividual = result.toObject(); // Renamed variable to avoid declaration again.
      res.status(200).json(updatedIndividual);
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};



/* DELETE REQUESTS */
// Delete an individual by id
exports.deleteIndividual = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Individual.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ error: 'Individual not found' });
    }
    res.status(200).json(result);
  } catch (error) {
    handleServerError(res, error);
  }
};
