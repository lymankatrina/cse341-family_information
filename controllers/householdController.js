const db = require('../db/connect');
const Household = require('../models/householdModel')
const { isValidObjectId, isValidAddress, isValidHousehold } = require('../middleware/householdValidator')

exports.getHouseholds = async (req, res) => {
  // #swagger.tags = ['Households']
  // #swagger.summary = 'Get all Households'
  // #swagger.description = 'This will list all households in the database'
  try {
    const result = await Household.find();
    res.setHeader('Content-Type', 'application/json');

    if (!result) {
      res.status(404).json({ error: "No households were found"})
    } else {
      const households = result.map((household)=> household.toObject())
      res.status(200).json(households)
    }
  } catch (e) {
    res.status(500).json({ error: "Server error" })
  }
};

exports.getHouseholdById = async (req, res) => {
  // #swagger.tags = ['Households']
  // #swagger.summary = 'Get a single household by its ID'
  // #swagger.description = 'Returns a single household by its id'
  const id = req.params.id;
  res.setHeader('Content-Type', 'application/json');

  if (!isValidObjectId(id)){
    res.status(422).json({ error: "Id is invalid"})
  } else {
    try {
      const result = await Household.findById({ _id: id });
      if (!result) {
        res.status(404).json({ error: "Household not found"})
      } else {
        const household = result.toObject()
        res.status(200).json(household)
      }
    } catch (e) {
      res.status(500).json({ error: "Server error" })
    }
  }
};

exports.getHouseholdsByHoh = async (req, res) => {
  // #swagger.tags = ['Households']
  // #swagger.summary = 'Get a single household by its head of household'
  // #swagger.description = 'Returns a single household by the head of the household'
  const hoh = req.params.hoh;
  res.setHeader('Content-Type', 'application/json');

  if (!isValidObjectId(hoh)){
    res.status(422).json({ error: "Head of household id is invalid"})
  } else {
    try {
      const result = await Household.findOne({ headOfHousehold: hoh });
      if (!result) {
        res.status(404).json({ error: "This individual is not the head of a household"})
      } else {
        const household = result.toObject()
        res.status(200).json(household)
      }
    } catch (e) {
      res.status(500).json({ error: "Server error" })
    }
  }
};

exports.getHouseholdsByAddress = async (req, res) => {
  // #swagger.tags = ['Households']
  // #swagger.summary = 'Get a single household by its address'
  // #swagger.description = 'Returns a single household by its address'
  /*
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          example: {
            streetAddress: "123 Applebottom Street",
            city: "Rexburg",
            state: "ID",
            zip: "83440",
          }
        }
      }
    }
    */
  const address = {
    street: req.params.street,
    city: req.params.city,
    state: req.params.state,
    zip: req.params.zip
  }
  
  res.setHeader('Content-Type', 'application/json');

  if (!isValidAddress(address)){
    res.status(422).json({ error: "Address is invalid, make sure to follow this format '/street/city/state/zip/'"})
  } else {
    try {
      const result = await Household.findOne({ streetAddress: address.street, city: address.city, state: address.state, zip: address.zip });
      if (!result) {
        res.status(404).json({ error: "A household with this address could not be found"})
      } else {
        const household = result.toObject()
        res.status(200).json(household)
      }
    } catch (e) {
      res.status(500).json({ error: "Server error" })
    }
  }
};

exports.createHousehold = async (req, res) => {
  // #swagger.tags = ['Households']
  // #swagger.summary = 'Create a Household'
  // #swagger.description = 'Create a Household by providing all required information.'
  /*
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          example: {
            streetAddress: "123 Applebottom Street",
            city: "Rexburg",
            state: "ID",
            zip: "83440",
            country: "United States",
            headOfHousehold: ["", ""],
            residents: ["", "", ""]
          }
        }
      }
    }
    */
  const household = {
    streetAddress: req.body.streetAddress,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    country: req.body.country,
    headOfHousehold: req.body.headOfHousehold,
    residents: req.body.residents
  };
  res.setHeader('Content-Type', 'application/json');

  if (!isValidHousehold(household)){
    res.status(422).json({ error: "Household's information is invalid"})
  } else {
    try {
      const newHousehold = new Household(household)
      const result = await household.save();
      if (!result) {
        res.status(404).json({ error: "Household could not be saved"})
      } else {
        const household = result.toObject()
        res.status(200).json(household)
      }
    } catch (e) {
      res.status(500).json({ error: "Server error" })
    }
  }
};

exports.updateHousehold = async (req, res) => {
  // #swagger.tags = ['Households']
  // #swagger.summary = 'Update a Household by its ID'
  // #swagger.description = 'Update an existing household by providing all required information.'
  /*
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          example: {
            streetAddress: "123 Applebottom Street",
            city: "Rexburg",
            state: "ID",
            zip: "83440",
            country: "United States",
            headOfHousehold: ["", ""],
            residents: ["", "", ""]
          }
        }
      }
    }
    */
  const id = req.params.id;
  const household = {
    streetAddress: req.body.streetAddress,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    country: req.body.country,
    headOfHousehold: req.body.headOfHousehold,
    residents: req.body.residents
  };

  const response = await db
    .getDb()
    .db()
    .collection('households')
    .replaceOne({ _id: id, household });
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else if (response.modifiedCount <= 0) {
    res.status(404).json({ error: 'Household was not found' });
  } else {
    res.status(500).json({ error: 'Household was not able to be updated' });
  }
};

exports.deleteHousehold = async (req, res) => {
  // #swagger.tags = ['Households']
  // #swagger.summary = 'Delete a household by its ID'
  // #swagger.description = 'Permanently delete a household by its ID'
  const id = req.params.id;
  const response = await await db.getDb().db().collection('households').deleteOne({ _id: id });
  if (response.deletedCount > 0) {
    res.status(200).send();
  } else if (response.deletedCount <= 0) {
    res.status(404).json({ error: 'Household was not found' });
  } else [res.status(500).json({ error: 'The Household could not be deleted' })];
};
