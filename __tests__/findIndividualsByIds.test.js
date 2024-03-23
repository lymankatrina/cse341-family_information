const { findIndividualsByIds } = require('../helpers/helpers');
const Individual = require('../models/individualModel');

describe('findIndividualsByIds', () => {
  it('should return an array of individuals for the given ids', async () => {
    Individual.find = jest.fn().mockResolvedValue([
      { _id: '1', firstName: 'Isaac' },
      { _id: '4', firstName: 'Herbert' },
    ]);

    const individuals = await findIndividualsByIds(['1', '4']);

    expect(Individual.find).toHaveBeenCalledWith({ _id: { $in: ['1', '4'] } });

    expect(individuals).toEqual([
      { _id: '1', firstName: 'Isaac' },
      { _id: '4', firstName: 'Herbert' }
    ]);
  });
});