const mongoose = require('mongoose');
const { ObjectId } = require('mongoose').Types;
const Anniversary = require('../models/anniversaryModel.js');
const Individual = require('../models/individualModel.js');

/* GET REQUESTS */
// Get a list of all Anniversaries
exports.getAllAnniversaries = async (req, res) => {
  // #swagger.tags = ['Anniversaries']
  // #swagger.summary = 'Get all Anniversaries'
  // #swagger.description = 'This will list all anniversaries in the database'
  try {
    const anniversaries = await Anniversary.find();
    const result = await Promise.all(
      anniversaries.map(async (anniversary) => {
        const coupleNames = await Promise.all(
          anniversary.couple.map(async (individualId) => {
            const individual = await Individual.findById(individualId);
            if (!individual) {
              return null;
            }
            return `${individual.firstName} ${individual.lastName}`;
          })
        );
        const anniversaryDate = anniversary.anniversaryDate.toISOString().split('T')[0];
        return {
          anniversaryId: anniversary._id,
          couple: coupleNames,
          anniversaryDate: anniversaryDate
        };
      })
    );
    res.status(200).json(result);
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message || 'Some error occurred while retrieving all anniversaries.' });
  }
};

// Get a single anniversary by Individual Id
exports.getAnniversaryByIndividual = async (req, res) => {
  // #swagger.tags = ['Anniversaries']
  // #swagger.summary = 'Get a single anniversary by an Individual ID'
  // #swagger.description = 'This will return a single anniversary in the database by an individual's Id'
  // #swagger.requestBody = false
  const individualId = req.params.individualId;
  try {
    const anniversary = await Anniversary.findOne({
      couple: { $in: [new mongoose.Types.ObjectId(individualId)] }
    });
    if (!anniversary) {
      return res.status(404).json({ error: 'Anniversary for Individual not found' });
    }
    const individuals = await Individual.find({ _id: { $in: anniversary.couple } });
    const coupleNames = individuals.map((individual) => ({
      firstName: individual.firstName,
      lastName: individual.lastName
    }));
    res.status(200).json({
      anniversaryId: anniversary._id,
      couple: coupleNames,
      anniversaryDate: anniversary.anniversaryDate
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get Anniversaries by month
exports.getAnniversariesByMonth = async (req, res) => {
  // #swagger.tags = ['Anniversaries']
  // #swagger.summary = 'Get anniversaries by month'
  // #swagger.description = 'This will return a list of anniversaries that occur in the specified month'
  // #swagger.requestBody = false
  const month = parseInt(req.params.month);
  try {
    const anniversaries = await Anniversary.find({
      $expr: {
        $eq: [{ $month: '$anniversaryDate' }, month]
      }
    });
    const result = [];
    for (const anniversary of anniversaries) {
      const individuals = await Individual.find({ _id: { $in: anniversary.couple } });
      const coupleNames = individuals.map((individual) => ({
        firstName: individual.firstName,
        lastName: individual.lastName
      }));
      const formattedDate = anniversary.anniversaryDate.toISOString().split('T')[0];
      result.push({
        anniversaryId: anniversary._id,
        couple: coupleNames,
        anniversaryDate: formattedDate
      });
    }
    if (result.length > 0) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result);
    } else {
      res.status(404).json({ error: 'No anniversaries found by that month' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/* POST REQUESTS */
// Create an Anniversary
exports.createAnniversary = async (req, res) => {
  // #swagger.tags = ['Anniversaries']
  // #swagger.summary = 'Create an Anniversary'
  // #swagger.description = 'Create an Anniversary by providing all required information.'
  /*
  #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        example: {
          couple: [
            "individualId1",
            "individualId2"
          ],
          "anniversaryDate": "2020-06-30"
        }
      }
    }
  }
  */
  try {
    const anniversaryDate = new Date(req.body.anniversaryDate);
    const couple = req.body.couple;
    const newAnniversary = new Anniversary({ couple, anniversaryDate });
    await newAnniversary.save();
    res.status(201).json(newAnniversary);
  } catch (err) {
    console.error('Error creating anniversary:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

/* PUT REQUESTS */
// Update a single anniversary by id
exports.updateAnniversary = async (req, res) => {
  // #swagger.tags = ['Anniversaries']
  // #swagger.summary = 'Update an Anniversary by Id'
  // #swagger.description = 'Update an existing anniversary by providing the anniversaryId and the updated information.'
  /*
  #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        example: {
          couple: [
            "individualId1",
            "individualId2"
          ],
          anniversaryDate: "2020-06-30"
        }
      }
    }
  }
  */
  try {
    const anniversaryId = new ObjectId(req.params.id);
    const couple = req.body.couple;
    const anniversaryDate = new Date(req.body.anniversaryDate);
    const updatedAnniversary = await Anniversary.findOneAndUpdate(
      { _id: anniversaryId },
      { $set: { couple, anniversaryDate } },
      { returnDocument: 'after' }
    );
    if (updatedAnniversary) {
      res.status(200).json(updatedAnniversary);
    } else {
      res.status(404).json({ error: 'Anniversary not found' });
    }
  } catch (err) {
    console.error('Error updating anniversary:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

/* DELETE REQUESTS */
// Delete an anniversary by id
exports.deleteAnniversary = async (req, res) => {
  // #swagger.tags = ['Anniversaries']
  // #swagger.summary = 'Delete an Anniversary by Id'
  // #swagger.description = 'This will delete a single anniversary from the database by Id. This action is permanent.'
  const anniversaryId = new ObjectId(req.params.id);
  try {
    const response = await Anniversary.deleteOne({ _id: anniversaryId });
    if (response.deletedCount > 0) {
      res.status(200).send();
    } else {
      res.status(404).json({ error: 'Anniversary not found' });
    }
  } catch (err) {
    console.error('Error deleting anniversary:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
