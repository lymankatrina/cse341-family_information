const { calculateAge } = require('../../helpers/helpers');

describe('Calculate Age', () => {
  const testCases = [
    { birthDate: new Date('2020-03-28'), expectedAge: 3 }, // Test tomorrow's Date
    { birthDate: new Date('2020-03-26'), expectedAge: 4 },
    { birthDate: new Date(), expectedAge: 0 }
  ];
  testCases.forEach(({ birthDate, expectedAge }) => {
    test('It should calculate age correctly for the given birthdate', () => {
      console.log('Birth Date:', birthDate);
      expect(calculateAge(birthDate)).toEqual(expectedAge);
    });
  });
});
