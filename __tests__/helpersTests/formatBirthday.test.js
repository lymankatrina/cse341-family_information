const { formatBirthdayIndividual } = require('../../helpers/helpers');

describe('Format Birthday Individual', () => {
  test('It should format the birthday and calculate the age correctly', () => {
    const individualJohn = {
      firstName: 'John',
      middleName: 'Doe',
      lastName: 'Smith',
      birthDate: new Date('1990-01-01')
    };

    const formattedIndividualJohn = formatBirthdayIndividual(individualJohn);

    expect(formattedIndividualJohn.fullName).toBe('John Doe Smith');
    expect(formattedIndividualJohn.birthMonth).toBe(1);
    expect(formattedIndividualJohn.birthDay).toBe(1);
    expect(formattedIndividualJohn.birthYear).toBe(1990);
    expect(formattedIndividualJohn.age).toBe(34); 

    const individualJane = {
      firstName: 'Jane',
      middleName: '',
      lastName: 'Doe',
      birthDate: new Date('1995-06-15')
    };

    const formattedIndividualJane = formatBirthdayIndividual(individualJane);

    expect(formattedIndividualJane.fullName).toBe('Jane Doe');
    expect(formattedIndividualJane.birthMonth).toBe(6);
    expect(formattedIndividualJane.birthDay).toBe(15);
    expect(formattedIndividualJane.birthYear).toBe(1995);
    expect(formattedIndividualJane.age).toBe(28);
  });
});