// __tests__/helpersTests/individualController.test.js
const { getIndividualByLastName } = require('../../helpers/helpers');
const Individual = require('../../models/individualModel');

jest.mock('../../models/individualModel');

describe('getIndividualByLastName', () => {
  it('should return individuals with the specified last name', async () => {
    const lastName = 'Doe';
    const mockIndividuals = [
      { firstName: 'John', lastName: 'Doe' },
      { firstName: 'Jane', lastName: 'Doe' }
    ];
    Individual.find.mockResolvedValue(mockIndividuals);

    const individuals = await getIndividualByLastName(lastName);

    expect(individuals).toEqual(mockIndividuals);
    expect(Individual.find).toHaveBeenCalledWith({ lastName });
  });

  it('should handle errors', async () => {
    const mockError = new Error('Database error');
    Individual.find.mockRejectedValue(mockError);

    await expect(getIndividualByLastName('Doe')).rejects.toThrow(
      'Error occurred while retrieving individuals by last name'
    );
  });
});
