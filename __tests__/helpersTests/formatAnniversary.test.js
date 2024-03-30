const { formatAnniversary } = require('../../helpers/helpers');
const Individual = require('../../models/individualModel');

describe('formatAnniversary', () => {
  it('should format anniversary data correctly', async () => {
    const anniversary = {
      _id: 'someId',
      couple: ['individualId1', 'individualId2'],
      anniversaryDate: new Date('2022-03-25T00:00:00.000Z')
    };

    const individuals = [
      { _id: 'individualId1', firstName: 'John', lastName: 'Doe' },
      { _id: 'individualId2', firstName: 'Jane', lastName: 'Doe' }
    ];

    jest.spyOn(Individual, 'find').mockResolvedValueOnce(individuals);

    const result = await formatAnniversary(anniversary);

    expect(result).toEqual({
      anniversaryId: 'someId',
      couple: ['John Doe', 'Jane Doe'],
      formattedDate: '2022-03-25'
    });
  });
});
