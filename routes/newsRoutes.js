const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');
const { newsValidator } = require('../middleware/newsValidator');
const {
  validUserEmail,
  validHeadOfHousehold,
  newsAccessMiddleware
} = require('../middleware/permissionMiddleware');

// get news
router.get('/getall', newsController.getAllNews);

// Get all news
router.get('/getformatted', newsAccessMiddleware, newsController.getFormattedNews);

// Get single news story
router.get('/:id', newsAccessMiddleware, newsController.getNewsById);

// Get news by author
router.get('/author/:postedBy', newsAccessMiddleware, newsController.getNewsByAuthor);

// Get news by status
router.get('/status/:status', newsAccessMiddleware, newsController.getNewsByStatus);

// Create a news story
router.post(
  '/createnews',
  validUserEmail,
  validHeadOfHousehold,
  newsValidator,
  newsController.createNewsStory
);

// Update a news story
router.put(
  '/updatenews/:id',
  validUserEmail,
  validHeadOfHousehold,
  newsValidator,
  newsController.updateNewsById
);

// Delete news story
router.delete(
  '/deletenews/:id',
  validUserEmail,
  validHeadOfHousehold,
  newsController.deleteNewsById
);

module.exports = router;
