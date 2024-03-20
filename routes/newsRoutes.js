const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');
const { newsRules } = require('../middleware/newsValidator.js');
const { validate } = require('../helpers/helperValidator.js');

// Create a news story
router.post('/createnews', newsRules(), validate, newsController.createNewsStory);

// Get all news
router.get('/getall', newsController.getAllNews);

// Get single news story
router.get('/:id', newsController.getNewsById);

// Get news by author
router.get('/author/:postedBy', newsController.getNewsByAuthor);

// Get news by status
router.get('/status/:status', newsController.getNewsByStatus);

// Update a news story
router.put('/updatenews/:id', newsRules(), validate, newsController.updateNewsById);

// Delete news story
router.delete('/deletenews/:id', newsController.deleteNewsById);

module.exports = router;
