const { ObjectId } = require('mongoose').Types;
const Individual = require('../models/individualModel');

const getAllIndividuals = async (req, res) => {
  try {
    const result = await Individual.find();
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
    const result = await Individual.findById(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      error: error.message || 'Some error occurred while retrieving a single individual.'
    });
  }
};

const createIndividual = async (req, res) => {
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
    res
      .status(500)
      .json({ error: error.message || 'Some error occurred while creating the individual.' });
  }
};

const updateIndividual = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid individual id to update an individual.');
  }
  try {
    const updatedIndividual = await Individual.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!updatedIndividual) {
      return res.status(404).json({ error: 'Individual not found' });
    }
    res.status(200).json(updatedIndividual);
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
    await Individual.findByIdAndDelete(req.params.id);
    res.status(200).send();
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
