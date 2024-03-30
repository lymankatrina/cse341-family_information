const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');
const { newsValidator } = require('../middleware/newsValidator');
const { validUserEmail, validHeadOfHousehold } = require('../middleware/permissionMiddleware')


// Get all news
router.get('/getall', newsController.getAllNews);

// Get single news story
router.get('/:id', newsController.getNewsById);

// Get news by author
router.get('/author/:postedBy', newsController.getNewsByAuthor);

// Get news by status
router.get('/status/:status', newsController.getNewsByStatus);

// Create a news story
router.post('/createnews', validUserEmail, validHeadOfHousehold, newsValidator, newsController.createNewsStory);

// Update a news story
router.put('/updatenews/:id', validUserEmail, validHeadOfHousehold, newsValidator, newsController.updateNewsById);

// Delete news story
router.delete('/deletenews/:id', validUserEmail, validHeadOfHousehold, newsController.deleteNewsById);

module.exports = router;
