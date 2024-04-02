const { calculateAge } = require('../../helpers/helpers');

describe('Calculate Age', () => {
  const testCases = [

    { birthDate: new Date('2020-12-20'), expectedAge: 3 },
    { birthDate: new Date('2020-03-29'), expectedAge: 4 },
    { birthDate: new Date(), expectedAge: 0 }
  ];
  testCases.forEach(({ birthDate, expectedAge }) => {
    test('It should calculate age correctly for the given birthdate', () => {
      expect(calculateAge(birthDate)).toEqual(expectedAge);
    });
  });
});