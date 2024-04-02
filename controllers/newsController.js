const { News } = require('../models/newsModel');
const Individual = require('../models/individualModel');
const { formatNews, handleServerError } = require('../helpers/helpers');

exports.getAllNews = async (req, res) => {
  // #swagger.tags = ['News']
  // #swagger.summary = 'Get all News Stories'
  // #swagger.description = 'This will return all the news stories in the database unformatted'
  try {
    const result = await News.find();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getFormattedNews = async (req, res) => {
  // #swagger.tags = ['News']
  // #swagger.summary = 'Get all News Stories formatted with author names'
  // #swagger.description = 'This will return all the news stories in the database'
  try {
    const news = await News.find().populate('postedBy');
    const result = await Promise.all(news.map(formatNews));
    res.status(200).json(result);
  } catch (error) {
    handleServerError(res, error);
  }
};

exports.getNewsById = async (req, res) => {
  // #swagger.tags = ['News']
  // #swagger.summary = 'Get Single News Story by newsId'
  // #swagger.description = 'This will return a single news story by news Id'
  const newsId = req.params.id;
  try {
    const news = await News.findById(newsId);
    if (!news) {
      return res.status(404).json({ error: 'No news story found by that News Id' });
    }
    const result = await formatNews(news);
    res.status(200).json(result);
  } catch (error) {
    handleServerError(res, error);
  }
};

exports.getNewsByAuthor = async (req, res) => {
  // #swagger.tags = ['News']
  // #swagger.summary = 'Get News by Author'
  // #swagger.description = 'This will return all news stories with postedBy matching the provided individualId'
  const postedBy = req.params.postedBy;
  try {
    const news = await News.find({ postedBy: postedBy });
    if (!news || news.length === 0) {
      return res.status(404).json({ error: 'No news stories found by that author Id' });
    }
    const result = await Promise.all(
      news.map(async (newsItem) => {
        const formattedNews = await formatNews(newsItem);
        return formattedNews;
      })
    );
    res.status(200).json(result);
  } catch (error) {
    handleServerError(res, error);
  }
};

exports.getNewsByStatus = async (req, res) => {
  // #swagger.tags = ['News']
  // #swagger.summary = 'Get News by Status'
  // #swagger.description = 'This will return all news stories with status matching the requested status of 'public' or 'private''
  const status = req.params.status;
  try {
    const news = await News.find({ status: status });
    if (!news || news.length === 0) {
      return res.status(404).json({
        error: `No news stories found by that status. Status must be 'public' or 'private'.`
      });
    }
    const result = await Promise.all(news.map(formatNews));
    res.status(200).json(result);
  } catch (error) {
    handleServerError(res, error);
  }
};

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
  const dateCreated = new Date(req.body.dateCreated);
  const existingIndividual = await Individual.findById(req.body.postedBy);
  if (!existingIndividual) {
    return res.status(404).json({ error: 'Individual not found' });
  }
  const newsStory = new News({
    newsTitle: req.body.newsTitle,
    newsBody: req.body.newsBody,
    status: req.body.status,
    postedBy: req.body.postedBy,
    dateCreated: dateCreated,
    picture: req.body.picture
  });
  try {
    const savedNews = await newsStory.save();
    res.status(201).json(savedNews);
  } catch (error) {
    handleServerError(res, error);
  }
};

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
  const dateCreated = new Date(req.body.dateCreated);
  const newsId = req.params.id;
  const newsStory = {
    newsTitle: req.body.newsTitle,
    newsBody: req.body.newsBody,
    status: req.body.status,
    postedBy: req.body.postedBy,
    dateCreated: dateCreated,
    picture: req.body.picture
  };
  try {
    const updatedNews = await News.findByIdAndUpdate(newsId, newsStory, { new: true });
    res.status(200).json(updatedNews);
  } catch (error) {
    handleServerError(res, error);
  }
};

exports.deleteNewsById = async (req, res) => {
  // #swagger.tags = ['News']
  // #swagger.summary = 'Delete a News Story by Id'
  // #swagger.description = 'This will delete a single news story from the database by Id. This action is permanent.'
  const newsId = req.params.id;
  try {
    await News.findByIdAndDelete(newsId);
    res.status(200).send();
  } catch (error) {
    handleServerError(res, error);
  }
};
