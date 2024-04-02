const { formatNews } = require('../../helpers/helpers');
const Individual = require('../../models/individualModel');

jest.mock('../../models/individualModel', () => ({
  findById: jest.fn()
}));

describe('Format News', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('It should format news correctly', async () => {
    const news = {
      _id: '1',
      postedBy: '2',
      dateCreated: new Date('2024-03-26T00:00:00.000Z'),
      newsTitle: 'Test News',
      newsBody:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.',
      status: 'public',
      picture: 'test.jpg'
    };

    const author = { firstName: 'John', lastName: 'Doe' };
    Individual.findById.mockResolvedValue(author);

    const formattedNews = await formatNews(news);

    expect(Individual.findById).toHaveBeenCalledWith(news.postedBy);
    expect(formattedNews.newsId).toBe(news._id);
    expect(formattedNews.postedBy).toBe(`${author.firstName} ${author.lastName}`);
    expect(formattedNews.dateCreated).toBe('2024-03-26'); // Check date formatting
    expect(formattedNews.newsTitle).toBe(news.newsTitle);
    expect(formattedNews.newsBody).toBe(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed curs...'
    ); // Check for shortened body
    expect(formattedNews.status).toBe(news.status);
    expect(formattedNews.picture).toBe(news.picture);
  });

  test('It should format dateCreated correctly when dateCreated is provided', async () => {
    const news = {
      dateCreated: new Date('2024-03-26T00:00:00.000Z'),
      newsBody: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    };

    const formattedNews = await formatNews(news);
    expect(formattedNews.dateCreated).toBe('2024-03-26');
  });

  test('It should format dateCreated correctly when dateCreated is not provided', async () => {
    const news = {
      newsBody: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    };

    const formattedNews = await formatNews(news);
    expect(formattedNews.dateCreated).toBeNull();
  });

  test('It should format shortNewsBody correctly when newsBody length is greater than 100', async () => {
    const longNewsBody =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.';

    const news = {
      newsBody: longNewsBody
    };

    const formattedNews = await formatNews(news);

    expect(formattedNews.newsBody).toBe(longNewsBody.substring(0, 100) + '...');
  });

  test('It should format shortNewsBody correctly when newsBody length is less than or equal to 100', async () => {
    const shortNewsBody = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

    const news = {
      newsBody: shortNewsBody
    };

    const formattedNews = await formatNews(news);

    expect(formattedNews.newsBody).toBe(shortNewsBody);
  });
});
