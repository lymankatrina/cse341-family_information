const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');
const {
  validUserEmail,
  validHeadOfHousehold,
  newsAccessMiddleware
} = require('../middleware/permissionMiddleware');
const { newsValidator } = require('../middleware/newsValidator');

// get all news
router.get('/getall', newsController.getAllNews);

// Get formatted news
router.get('/getformatted', validUserEmail, newsAccessMiddleware, newsController.getFormattedNews);

// Get single news story
router.get('/:id', validUserEmail, newsAccessMiddleware, newsController.getNewsById);

// Get news by author
router.get('/author/:postedBy', validUserEmail, newsAccessMiddleware, newsController.getNewsByAuthor);

// Get news by status
router.get('/status/:status', validUserEmail, newsAccessMiddleware, newsController.getNewsByStatus);

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
  newsAccessMiddleware,
  newsController.updateNewsById
);

// Delete news story
router.delete(
  '/deletenews/:id',
  validUserEmail,
  validHeadOfHousehold,
  newsAccessMiddleware,
  newsController.deleteNewsById
);

module.exports = router;
