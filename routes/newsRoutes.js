const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');
const { newsValidator } = require('../middleware/newsValidator');

// get news
router.get('/getall', newsController.getAllNews)

// Get all news
router.get('/getformatted', newsController.getFormattedNews);

// Get single news story
router.get('/:id', newsController.getNewsById);

// Get news by author
router.get('/author/:postedBy', newsController.getNewsByAuthor);

// Get news by status
router.get('/status/:status', newsController.getNewsByStatus);

// Create a news story
router.post('/createnews', newsValidator, newsController.createNewsStory);

// Update a news story
router.put('/updatenews/:id', newsValidator, newsController.updateNewsById);

// Delete news story
router.delete('/deletenews/:id', newsController.deleteNewsById);

module.exports = router;
