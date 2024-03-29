// /__tests__/getAllNews.test.js
const { getAllNews } = require('../../controllers/newsController');
const { formatNews, handleServerError } = require('../../helpers/helpers');
const { News } = require('../../models/newsModel');

jest.mock('../../models/newsModel', () => ({
  News: {
    find: jest.fn().mockReturnThis(),
    populate: jest.fn(),
  },
}));

jest.mock('../../helpers/helpers');

describe('get All News', () => {
  let req, res;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should return a list of all news items in the database formatted', async () => {
    const news = [
      { 
        _id: "65f35c28b182f34a3d33374c",
        newsTitle: "My First News Update",
        newsBody: "This is a practice news post for testing the collection endpoint settings and routes. I am trying to make it long so that I can see if the validation rules work, and so that I can see if the response shortens the news body the way I hope it will. This is just for practice and it should work. This is a practice news post for testing the collection endpoint settings and routes. I am trying to make it long so that I can see if the validation rules work, and so that I can see if the response shortens the news body the way I hope it will. This is just for practice and it should work.",
        status: "public",
        postedBy: "65f34f8191f613164d933bb1",
        dateCreated: "2024-03-14T00:00:00.000Z",
        picture: "https://fakeimg.pl/600x400?text=test+image"
      },
      {
        _id: "65f368ef9d5d7518becdb4f0",
        newsTitle: "The Porcupine and the Calf",
        newsBody: "One morning the whole family woke up to the sound of a bellowing calf. My mom was getting ready to go milk the cows so she was about to go check on the calf to see why it was making so much noise. I was pretty curious, so I hurriedly got dressed and followed my mom out the door. We walked along the path that led from the house to the corral where the calves were kept. The little calf was miserable, kicking around, bawling and snorting. We discovered that at some point in the early hours a porcupine must have found its way inside of the corral and the curious calf got his nose a little too close. There were porcupine quills all over the poor calf's nose. My two older brothers held the calf as still as they could while my mom used a pair of pliers to pull the quills out. I held a little paper cup and my mom placed all of the quills in the cup. After breakfast, I took some of the porcupine quills to school with me to show to the little kids in my class because encountering a porcupine is quite rare. Everyone thought they were cool, including my teacher who passed them around the room for the students to get a closer look.",
        status: "private",
        postedBy: "65f34f8191f613164d933bb1",
        dateCreated: "2024-03-14T00:00:00.000Z",
        picture: "https://fakeimg.pl/600x400?text=porcupine+picture"
      }
    ];
    const formattedNews = [
      {
        newsId: "65f35c28b182f34a3d33374c",
        postedBy: "Katrina Lyman",
        dateCreated: "2024-03-14",
        newsTitle: "My First News Update",
        newsBody: "This is a practice news post for testing the collection endpoint settings and routes. I am trying to...",
        status: "public",
        picture: "https://fakeimg.pl/600x400?text=test+image"
      },
      {
        newsId: "65f368ef9d5d7518becdb4f0",
        postedBy: "Katrina Lyman",
        dateCreated: "2024-03-14",
        newsTitle: "The Porcupine and the Calf",
        newsBody: "One morning the whole family woke up to the sound of a bellowing calf. My mom was getting ready to g...",
        status: "private",
        picture: "https://fakeimg.pl/600x400?text=porcupine+picture"
      },
    ]

    News.find.mockResolvedValueOnce(news);

    News.find().populate.mockResolvedValueOnce(news);

    formatNews.mockImplementationOnce(news => ({
      newsId: news._id,
      postedBy: news.postedBy,
      dateCreated: news.dateCreated,
      newsTitle: news.newsTitle,
      newsBody: news.newsBody,
      status: news.status,
      picture: news.picture
    }));
    
    await getAllNews(req, res);

    expect(News.find).toHaveBeenCalledTimes(1);
    expect(News.find().populate).toHaveBeenCalledTimes(1);
    expect(formatNews).toHaveBeenCalledTimes(2);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(formattedNews);
  });

  test('should handle server error', async () => {
    const errorMessage = 'Internal server error';

    News.find.mockRejectedValue(new Error(errorMessage));
    
    await getAllNews(req, { ...res, handleServerError });

    expect(res.status).toHaveBeenCalledWith(500);
    expect(handleServerError).toHaveBeenCalledWith(res, new Error(errorMessage));
  });
});
