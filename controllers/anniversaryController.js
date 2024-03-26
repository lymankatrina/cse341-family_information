const mongoose = require('mongoose');
const { Types } = require('mongoose');
// eslint-disable-next-line no-unused-vars
const { ObjectId } = Types;
const Anniversary = require('../models/anniversaryModel.js');
const {
  formatAnniversary,
  formatIndividualName,
  handleServerError,
  findIndividualsByIds
} = require('../helpers/helpers.js');

exports.getAllAnniversaries = async (req, res) => {
  // #swagger.tags = ['Anniversaries']
  // #swagger.summary = 'Get all Anniversaries'
  // #swagger.description = 'This will list all anniversaries in the database'
  try {
    const anniversaries = await Anniversary.find();
    const result = await Promise.all(anniversaries.map(formatAnniversary));
    res.status(200).json(result);
  } catch (error) {
    handleServerError(res, error);
  }
};

exports.getAnniversaryByIndividual = async (req, res) => {
  // #swagger.tags = ['Anniversaries']
  // #swagger.summary = 'Get a single anniversary by an Individual ID'
  // #swagger.description = 'This will return a single anniversary in the database by an individual's Id'
  // #swagger.requestBody = false
  const individualId = req.params.individualId;
  try {
    const anniversary = await Anniversary.findOne({
      couple: { $in: [mongoose.Types.ObjectId(individualId)] }
    });
    if (!anniversary) {
      return res.status(404).json({ error: 'Anniversary for Individual not found' });
    }
    const individuals = await findIndividualsByIds(anniversary.couple);
    const coupleNames = individuals.map(formatIndividualName);
    res.status(200).json({
      anniversaryId: anniversary._id,
      couple: coupleNames,
      anniversaryDate: anniversary.anniversaryDate
    });
  } catch (error) {
    handleServerError(res, error);
  }
};

exports.getAnniversariesByMonth = async (req, res) => {
  // #swagger.tags = ['Anniversaries']
  // #swagger.summary = 'Get anniversaries by month'
  // #swagger.description = 'This will return a list of anniversaries that occur in the specified month'
  // #swagger.requestBody = false
  const month = parseInt(req.params.month);
  try {
    const anniversaries = await Anniversary.aggregate([
      {
        $match: {
          $expr: {
            $eq: [{ $month: '$anniversaryDate' }, month]
          }
        }
      },
      {
        $lookup: {
          from: 'individuals',
          localField: 'couple',
          foreignField: '_id',
          as: 'coupleDetails'
        }
      },
      {
        $addFields: {
          couple: '$coupleDetails'
        }
      },
      {
        $project: {
          coupleDetails: 0
        }
      }
    ]);
    const formattedAnniversaries = await Promise.all(anniversaries.map(formatAnniversary));
    if (formattedAnniversaries.length > 0) {
      res.status(200).json(formattedAnniversaries);
    } else {
      res.status(404).json({ error: 'No anniversaries found by that month' });
    }
  } catch (error) {
    handleServerError(res, error);
  }
};

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
  const { couple, anniversaryDate } = req.body;
  const coupleIds = couple.map((id) => mongoose.Types.ObjectId(id));
  try {
    const individuals = await findIndividualsByIds(coupleIds);
    if (individuals.length !== 2) {
      return res.status(422).json({
        errors: {
          couple: ['Both individuals must exist in the individuals collection']
        }
      });
    }
    const newAnniversary = new Anniversary({ couple, anniversaryDate });
    await newAnniversary.save();
    res.status(201).json(newAnniversary);
  } catch (error) {
    handleServerError(res, error);
  }
};

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
    const anniversaryId = mongoose.Types.ObjectId(req.params.id);
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
  } catch (error) {
    handleServerError(res, error);
  }
};

exports.deleteAnniversary = async (req, res) => {
  // #swagger.tags = ['Anniversaries']
  // #swagger.summary = 'Delete an Anniversary by Id'
  // #swagger.description = 'This will delete a single anniversary from the database by Id. This action is permanent.'
  const anniversaryId = mongoose.Types.ObjectId(req.params.id);
  try {
    const response = await Anniversary.deleteOne({ _id: anniversaryId });
    if (response.deletedCount > 0) {
      res.status(200).send();
    } else {
      res.status(404).json({ error: 'Anniversary not found' });
    }
  } catch (error) {
    handleServerError(res, error);
  }
};
