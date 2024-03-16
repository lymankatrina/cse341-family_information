const db = require('../db/connect');

exports.getHouseholds = async (req, res) => {
    // #swagger.tags = ['Households']
    // #swagger.summary = 'Get all Households'
    // #swagger.description = 'This will list all households in the database'
    const results = await db.getDb().db().collection('households').find();
    results.toArray().then((result) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result)
    })
}

exports.getHouseholdById = async (req, res) => {
    // #swagger.tags = ['Households']
    // #swagger.summary = 'Get a single household by its ID'
    // #swagger.description = 'Returns a single household by its id'
    const id = req.params.id;
    const results = await db.getDb().db().collection('households').find({ _id: id });
    results.toArray().then((result) => {
        if (result.length > 0) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(result[0])
        } else {
            res.status(404).json({ error: 'Household could not be found' })
        }
    })
}

exports.getHouseholdsByHoh = async (req, res) => {
    // #swagger.tags = ['Households']
    // #swagger.summary = 'Get a single household by its head of household'
    // #swagger.description = 'Returns a single household by the head of the household'
    const hoh = req.params.hoh;
    const results = await db.getDb().db().collection('households').find({ headofHousehold: { $in: [hoh] } });
    results.toArray().then((result) => {
        if (result.length > 0) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(result[0])
        } else {
            res.status(404).json({ error: 'Household could not be found' })
        }
    })
}

exports.getHouseholdsByAddress = async (req, res) => {
    // #swagger.tags = ['Households']
    // #swagger.summary = 'Get a single household by its address'
    // #swagger.description = 'Returns a single household by its address'
    const hoh = req.params.address;
    const results = await db.getDb().db().collection('households').find({ streetAddress: address });
    results.toArray().then((result) => {
        if (result.length > 0) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(result[0])
        } else {
            res.status(404).json({ error: 'Household could not be found' })
        }
    })
}

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
    const response = await db.getDb.db().collection('households').insertOne(household);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(404).json({ error: 'Household was not created.' })
    }
}

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

    const response = await db.getDb().db().collection('households').replaceOne(
        { _id: id, household });
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else if (response.modifiedCount <= 0) {
        res.status(404).json({ error: 'Household was not found' });
    } else {
        res.status(500).json({ error: 'Household was not able to be updated' })
    }
}

exports.deleteHousehold = async (req, res) => {
    // #swagger.tags = ['Households']
    // #swagger.summary = 'Delete a household by its ID'
    // #swagger.description = 'Permanently delete a household by its ID'
    const id = req.params.id;
    const response = await MongoDBCollectionNamespace.getDb().db().collection('households').deleteOne({ _id: id });
    if (response.deletedCount > 0) {
        res.status(200).send()
    } else if (response.deletedCount <= 0) {
        res.status(404).json({ error: 'Household was not found' })
    } else[
        res.status(500).json({ error: 'The Household could not be deleted' })
    ]
}