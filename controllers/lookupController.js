const mongodb = require('../db/connect');

/* GET REQUESTS */
// Get All Birthdays
exports.getBirthdays = async (req, res) => {
  // #swagger.tags = ['Birthdays']
  // #swagger.summary = 'Get all birthdays'
  // #swagger.description = 'This will return the full names of all individuals in the database sorted by birth month and date along with their date of birth and the age of the individual as of today's date.'
  try {
    const cursor = await mongodb
      .getDb()
      .db()
      .collection('individuals')
      .find({}, { projection: { firstName: 1, middleName: 1, lastName: 1, birthDate: 1 } });
    const formattedBirthdays = [];
    await cursor.forEach((individual) => {
      const birthDate = new Date(individual.birthDate);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getUTCFullYear();
      const month = today.getUTCMonth() - birthDate.getUTCMonth();
      if (month < 0 || (month === 0 && today.getUTCDate() < birthDate.getUTCDate())) {
        age--;
      }
      const fullName = `${individual.firstName} ${individual.middleName ? individual.middleName + ' ' : ''}${individual.lastName}`;
      const birthdayInfo = {
        fullName,
        birthMonth: birthDate.getUTCMonth() + 1,
        birthDay: birthDate.getUTCDate(),
        age
      };

      formattedBirthdays.push(birthdayInfo);
    });
    formattedBirthdays.sort((a, b) => {
      if (a.birthMonth !== b.birthMonth) {
        return a.birthMonth - b.birthMonth;
      }
      return a.birthDay - b.birthDay;
    });
    res.json(formattedBirthdays);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get Birthdays by Month
exports.getBirthdaysByMonth = async (req, res) => {
  // #swagger.tags = ['Birthdays']
  // #swagger.summary = 'Get birthdays by month'
  // #swagger.description = 'This will return the full names of all individuals in the database born in the specified month along with their date of birth and the age of the individual as of today's date. This data is sorted by month and date of birth.'
  try {
    const month = req.params.month;
    const regex = new RegExp(`^\\d{4}-${month.padStart(2, '0')}-\\d{2}$`);
    const cursor = await mongodb
      .getDb()
      .db()
      .collection('individuals')
      .find(
        { birthDate: { $regex: regex } },
        { projection: { firstName: 1, middleName: 1, lastName: 1, birthDate: 1 } }
      );
    const formattedBirthdays = [];
    await cursor.forEach((individual) => {
      const birthDate = new Date(individual.birthDate);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getUTCFullYear();
      const monthOfBirth = birthDate.getUTCMonth() + 1;
      if (monthOfBirth === parseInt(month)) {
        const fullName = `${individual.firstName} ${individual.middleName ? individual.middleName + ' ' : ''}${individual.lastName}`;
        const birthdayInfo = {
          fullName,
          birthMonth: birthDate.getUTCMonth() + 1,
          birthDay: birthDate.getUTCDate(),
          age
        };
        formattedBirthdays.push(birthdayInfo);
      }
    });
    formattedBirthdays.sort((a, b) => {
      if (a.birthMonth !== b.birthMonth) {
        return a.birthMonth - b.birthMonth;
      }
      return a.birthDay - b.birthDay;
    });
    if (formattedBirthdays.length === 0) {
      res.status(400).json({ message: 'No birthdays found for this month' });
    } else {
      res.json(formattedBirthdays);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get Address Mailing Label Information
exports.getMailingLabels = async (req, res) => {
  // #swagger.tags = ['Mailing Labels']
  // #swagger.summary = 'Get Mailing Labels'
  // #swagger.description = 'This will return the full names of all individuals in the database with their mailing address.'
  try {
    const individualsCollection = mongodb.getDb().db().collection('individuals');
    const householdsCollection = mongodb.getDb().db().collection('households');
    const individuals = await individualsCollection.find().toArray();
    const mailingLabels = [];
    for (const individual of individuals) {
      const household = await householdsCollection.findOne({
        residents: { $in: [individual._id.toString()] }
      });
      if (household) {
        const labelName = `${individual.firstName} ${individual.lastName}`;
        const addressLine1 = `${household.streetAddress}`;
        const addressLine2 = `${household.city}, ${household.state} ${household.zip}`;
        const addressLine3 = `${household.country}`;
        mailingLabels.push({ labelName, addressLine1, addressLine2, addressLine3 });
      }
    }
    res.json(mailingLabels);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
