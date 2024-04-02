const { formatFullName } = require('../../helpers/helpers');

describe('Format Full Name', () => {
  test('It should format full name correctly', () => {
    const individual = { firstName: 'John', lastName: 'Doe' };
    const expectedFullName = 'John Doe';
    expect(formatFullName(individual)).toEqual(expectedFullName);
  });
});
