const { getAllIndividuals } = require('../../helpers/helpers');
const Individual = require('../../models/individualModel');

jest.mock('../../models/individualModel');

describe('getAllIndividuals', () => {
  it('should return all individuals', async () => {
    const mockIndividuals = [{ name: 'John' }, { name: 'Jane' }];
    Individual.find.mockResolvedValue(mockIndividuals);

    const individuals = await getAllIndividuals();

    expect(individuals).toEqual(mockIndividuals);
    expect(Individual.find).toHaveBeenCalledTimes(1);
  });

  it('should handle errors', async () => {
    const mockError = new Error('Database error');
    Individual.find.mockRejectedValue(mockError);

    await expect(getAllIndividuals()).rejects.toThrow('Error occurred while retrieving all individuals');
  });
});

