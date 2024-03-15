const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');
const { validationResult } = require('express-validator');

/* GET REQUESTS */
// Get all News Stories
exports.getAllNews = async (req, res) => {
  // #swagger.tags = ['News']
  // #swagger.summary = 'Get all News Stories'
  // #swagger.description = 'This will return all the news stories in the database'
  const news = await mongodb.getDb().db().collection('news').find().toArray();
  const result = await Promise.all(
    news.map(async (newsItem) => {
      const authorId = newsItem.postedBy;
      const individual = await mongodb
        .getDb()
        .db()
        .collection('individuals')
        .findOne({ _id: new ObjectId(authorId) });
      const dateCreated = newsItem.dateCreated.toISOString().split('T')[0];
      const shortNewsBody =
        newsItem.newsBody.length > 100
          ? newsItem.newsBody.substring(0, 100) + '...'
          : newsItem.newsBody;
      return {
        newsId: newsItem._id,
        postedBy: `${individual.firstName} ${individual.lastName}`,
        dateCreated: dateCreated,
        newsTitle: newsItem.newsTitle,
        newsBody: shortNewsBody,
        status: newsItem.status,
        picture: newsItem.picture
      };
    })
  );
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(result);
};

// Get single news story
exports.getNewsById = async (req, res) => {
  // #swagger.tags = ['News']
  // #swagger.summary = 'Get Single News Story by newsId'
  // #swagger.description = 'This will return a single news story by news Id'
  const newsId = new ObjectId(req.params.id);
  try {
    const news = await mongodb.getDb().db().collection('news').findOne({ _id: newsId });
    if (!news) {
      return res.status(404).json({ error: 'No news story found by that News Id' });
    }
    const author = await mongodb
      .getDb()
      .db()
      .collection('individuals')
      .findOne({ _id: new ObjectId(news.postedBy) });
    const dateCreated = news.dateCreated.toISOString().split('T')[0];
    const shortNewsBody =
      news.newsBody.length > 100 ? news.newsBody.substring(0, 100) + '...' : news.newsBody;
    const result = {
      newsId: news._id,
      postedBy: `${author.firstName} ${author.lastName}`,
      dateCreated: dateCreated,
      newsTitle: news.newsTitle,
      newsBody: shortNewsBody,
      status: news.status,
      picture: news.picture
    };
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching news story:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get news stories by author
exports.getNewsByAuthor = async (req, res) => {
  // #swagger.tags = ['News']
  // #swagger.summary = 'Get News by Author'
  // #swagger.description = 'This will return all news stories with postedBy matching the provided individualId'
  const postedBy = req.params.postedBy;
  try {
    const news = await mongodb
      .getDb()
      .db()
      .collection('news')
      .find({ postedBy: postedBy })
      .toArray();
    if (!news || news.length === 0) {
      return res.status(404).json({ error: 'No news stories found by that author Id' });
    }
    const result = await Promise.all(
      news.map(async (news) => {
        const author = await mongodb
          .getDb()
          .db()
          .collection('individuals')
          .findOne({ _id: new ObjectId(news.postedBy) });
        const dateCreated = news.dateCreated.toISOString().split('T')[0];
        const shortNewsBody =
          news.newsBody.length > 100 ? news.newsBody.substring(0, 100) + '...' : news.newsBody;
        return {
          newsId: news._id,
          postedBy: `${author.firstName} ${author.lastName}`,
          dateCreated: dateCreated,
          newsTitle: news.newsTitle,
          newsBody: shortNewsBody,
          status: news.status,
          picture: news.picture
        };
      })
    );
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching news stories:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get news stories by status
exports.getNewsByStatus = async (req, res) => {
  // #swagger.tags = ['News']
  // #swagger.summary = 'Get News by Status'
  // #swagger.description = 'This will return all news stories with status matching the requested status'
  const status = req.params.status;
  try {
    const news = await mongodb.getDb().db().collection('news').find({ status: status }).toArray();
    if (!news || news.length === 0) {
      return res.status(404).json({
        error: `No news stories found by that status. Status must be 'public' or 'private'.`
      });
    }
    const result = await Promise.all(
      news.map(async (news) => {
        const author = await mongodb
          .getDb()
          .db()
          .collection('individuals')
          .findOne({ _id: new ObjectId(news.postedBy) });
        const dateCreated = news.dateCreated.toISOString().split('T')[0];
        const shortNewsBody =
          news.newsBody.length > 100 ? news.newsBody.substring(0, 100) + '...' : news.newsBody;
        return {
          newsId: news._id,
          postedBy: `${author.firstName} ${author.lastName}`,
          dateCreated: dateCreated,
          newsTitle: news.newsTitle,
          newsBody: shortNewsBody,
          status: news.status,
          picture: news.picture
        };
      })
    );
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching news stories:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a News Story
exports.createNewsStory = async (req, res) => {
  // #swagger.tags = ['News']
  // #swagger.summary = 'Create a News Story'
  // #swagger.description = 'Create a news story by providing all required information.'
  /*
  #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        example: {
          newsTitle: 'News Title',
          newsBody: 'News paragraphs',
          status: 'public',
          postedBy: 'IndividualId',
          dateCreated: 'YYYY-MM-DD',
          picture: 'URL of picture'
        }
      }
    }
  }
  */
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const dateCreated = new Date(req.body.dateCreated);
  const newsStory = {
    newsTitle: req.body.newsTitle,
    newsBody: req.body.newsBody,
    status: req.body.status,
    postedBy: req.body.postedBy,
    dateCreated: dateCreated,
    picture: req.body.picture
  };
  const response = await mongodb.getDb().db().collection('news').insertOne(newsStory);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(404).json({ error: 'News Story could not be created' });
  }
};

// Update a news story by Id
exports.updateNewsById = async (req, res) => {
  // #swagger.tags = ['News']
  // #swagger.summary = 'Update a News Story by Id'
  // #swagger.description = 'Update an existing news story by providing all required information.'
  /*
  #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        example: {
          newsTitle: 'News Title',
          newsBody: 'News paragraphs',
          status: 'public',
          postedBy: 'IndividualId',
          dateCreated: 'YYYY-MM-DD',
          picture: 'URL of picture'
        }
      }
    }
  }
  */
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const dateCreated = new Date(req.body.dateCreated);
  const newsId = new ObjectId(req.params.id);
  const newsStory = {
    newsTitle: req.body.newsTitle,
    newsBody: req.body.newsBody,
    status: req.body.status,
    postedBy: req.body.postedBy,
    dateCreated: dateCreated,
    picture: req.body.picture
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('news')
    .replaceOne({ _id: newsId }, newsStory);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else if (response.modifiedCount <= 0) {
    res.status(404).json({ error: 'News Story not found' });
  } else {
    res.status(500).json({ error: 'An error occurred during the update news story request.' });
  }
};

exports.deleteNewsById = async (req, res) => {
  // #swagger.tags = ['News']
  // #swagger.summary = 'Delete a News Story by Id'
  // #swagger.description = 'This will delete a single news story from the database by Id. This action is permanent.'
  const newsId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('news').deleteOne({ _id: newsId });
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(200).send();
  } else if (response.deletedCount <= 0) {
    res.status(404).json({ error: 'News Story not found' });
  } else {
    res
      .status(500)
      .json(response.error || 'An error occured while attempting to delete the news story.');
  }
};
