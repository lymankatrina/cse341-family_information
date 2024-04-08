const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLID
} = require('graphql');

const { ObjectId } = require('mongoose').Types;
const Individual = require('./models/individualModel'); // Import Individual model
const Household = require('./models/householdModel'); // Import Household model
const Anniversary = require('./models/anniversaryModel'); // Import Anniversary model
const News = require('./models/newsModel'); // Import News model

// Define Individual type
const IndividualType = new GraphQLObjectType({
  name: 'Individual',
  fields: () => ({
    _id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    middleName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    birthDate: { type: GraphQLString },
    parents: { type: new GraphQLList(GraphQLString) },
    phone: { type: GraphQLString },
    email: { type: GraphQLString },
    household: { type: GraphQLString },
    headOfHousehold: { type: GraphQLBoolean },
    picture: { type: GraphQLString }
  })
});

// Define Household type
const HouseholdType = new GraphQLObjectType({
  name: 'Household',
  fields: () => ({
    _id: { type: GraphQLID },
    streetAddress: { type: GraphQLString },
    city: { type: GraphQLString },
    state: { type: GraphQLString },
    zip: { type: GraphQLString },
    country: { type: GraphQLString },
    headOfHousehold: { type: new GraphQLList(GraphQLString) },
    residents: { type: new GraphQLList(GraphQLString) }
  })
});

// Define Anniversary type
const AnniversaryType = new GraphQLObjectType({
  name: 'Anniversary',
  fields: () => ({
    _id: { type: GraphQLID },
    couple: { type: new GraphQLList(GraphQLID) },
    anniversaryDate: { type: GraphQLString }
  })
});

// Define News type
const NewsType = new GraphQLObjectType({
  name: 'News',
  fields: () => ({
    _id: { type: GraphQLID },
    newsTitle: { type: GraphQLString },
    newsBody: { type: GraphQLString },
    status: { type: GraphQLString },
    postedBy: { type: GraphQLID },
    dateCreated: { type: GraphQLString },
    picture: { type: GraphQLString }
  })
});

// Define Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    // Query to get all Individuals
    individuals: {
      type: new GraphQLList(IndividualType),
      resolve(parent, args) {
        return Individual.find();
      }
    },
    // Query to get an Individual by Id
    individual: {
      type: IndividualType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return Individual.findById(args.id);
      }
    },
    // Query to get an Individual by Name
    individualByName: {
      type: new GraphQLList(IndividualType),
      args: {
        firstName: { type: GraphQLString }
      },
      resolve(parent, args) {
        return Individual.find({ firstName: args.firstName });
      }
    },

    // Query to get all Households
    households: {
      type: new GraphQLList(HouseholdType),
      resolve(parent, args) {
        return Household.find();
      }
    },

    // Query to get a Household by Id
    household: {
      type: HouseholdType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return Household.findById(args.id);
      }
    },

    // Query to get all Anniversaries
    anniversaries: {
      type: new GraphQLList(AnniversaryType),
      resolve(parent, args) {
        return Anniversary.find();
      }
    },


       // Query to get anniversary by Id
       anniversaryById: {
        type: AnniversaryType,
        args: {
          id: { type: GraphQLID }
        },
        resolve(parent, args) {
          return Anniversary.findById(args.id);
        }
      },

    // Query to get all News
    news: {
      type: new GraphQLList(NewsType),
      resolve(parent, args) {
        return News.find();
      }
    },

    // Query to get a News by Id
    newsById: {
      type: NewsType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return News.findById(args.id);
      }
    }
  }
});

// Define Mutations
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    // Mutation to create an Individual
    createIndividual: {
      type: IndividualType,
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        middleName: { type: GraphQLString },
        lastName: { type: new GraphQLNonNull(GraphQLString) },
        birthDate: { type: new GraphQLNonNull(GraphQLString) },
        parents: { type: new GraphQLList(GraphQLString) },
        phone: { type: GraphQLString },
        email: { type: GraphQLString },
        household: { type: GraphQLString },
        headOfHousehold: { type: GraphQLBoolean },
        picture: { type: GraphQLString }
      },
      resolve(parent, args) {
        const individual = new Individual({
          firstName: args.firstName,
          middleName: args.middleName,
          lastName: args.lastName,
          birthDate: args.birthDate,
          parents: args.parents,
          phone: args.phone,
          email: args.email,
          household: args.household,
          headOfHousehold: args.headOfHousehold,
          picture: args.picture
        });
        return individual.save();
      }
    },
    // Mutation to update an Individual
    updateIndividual: {
      type: IndividualType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        firstName: { type: GraphQLString },
        middleName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        birthDate: { type: GraphQLString },
        parents: { type: new GraphQLList(GraphQLString) },
        phone: { type: GraphQLString },
        email: { type: GraphQLString },
        household: { type: GraphQLString },
        headOfHousehold: { type: GraphQLBoolean },
        picture: { type: GraphQLString }
      },
      resolve(parent, args) {
        return Individual.findByIdAndUpdate(args.id, { $set: args }, { new: true });
      }
    },
    // Mutation to delete an Individual
    deleteIndividual: {
      type: IndividualType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        return Individual.findByIdAndDelete(args.id);
      }
    },

    // Mutation to create a Household
    createHousehold: {
      type: HouseholdType,
      args: {
        streetAddress: { type: new GraphQLNonNull(GraphQLString) },
        city: { type: new GraphQLNonNull(GraphQLString) },
        state: { type: new GraphQLNonNull(GraphQLString) },
        zip: { type: new GraphQLNonNull(GraphQLString) },
        country: { type: new GraphQLNonNull(GraphQLString) },
        headOfHousehold: { type: new GraphQLList(GraphQLString) },
        residents: { type: new GraphQLList(GraphQLString) }
      },
      resolve(parent, args) {
        const household = new Household({
          streetAddress: args.streetAddress,
          city: args.city,
          state: args.state,
          zip: args.zip,
          country: args.country,
          headOfHousehold: args.headOfHousehold,
          residents: args.residents
        });
        return household.save();
      }
    },
    // Mutation to update a Household
    updateHousehold: {
      type: HouseholdType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        streetAddress: { type: GraphQLString },
        city: { type: GraphQLString },
        state: { type: GraphQLString },
        zip: { type: GraphQLString },
        country: { type: GraphQLString },
        headOfHousehold: { type: new GraphQLList(GraphQLString) },
        residents: { type: new GraphQLList(GraphQLString) }
      },
      resolve(parent, args) {
        // Implement logic to update the household
        return Household.findByIdAndUpdate(args.id, { $set: args }, { new: true });
      }
    },
    // Mutation to delete a Household
    deleteHousehold: {
      type: HouseholdType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        // Implement logic to delete the household
        return Household.findByIdAndDelete(args.id);
      }
    },

    // Mutation for Anniversaries
    createAnniversary: {
      type: AnniversaryType,
      args: {
        couple: { type: new GraphQLList(GraphQLID) },
        anniversaryDate: { type: GraphQLString }
      },
      resolve(parent, args) {
        const newAnniversary = new Anniversary({
          couple: args.couple,
          anniversaryDate: args.anniversaryDate
        });
        return newAnniversary.save();
      }
    },

    // Mutation to update an Anniversary
    updateAnniversary: {
      type: AnniversaryType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        couple: { type: new GraphQLList(GraphQLID) },
        anniversaryDate: { type: GraphQLString }
      },
      async resolve(parent, args) {
        try {
          // Find the anniversary by ID
          const anniversary = await Anniversary.findById(args.id);

          // Check if the anniversary exists
          if (!anniversary) {
            throw new Error('Anniversary not found');
          }

          // Update the anniversary fields with the provided arguments
          if (args.couple) {
            anniversary.couple = args.couple;
          }
          if (args.anniversaryDate) {
            anniversary.anniversaryDate = args.anniversaryDate;
          }

          // Save the updated anniversary to the database
          const updatedAnniversary = await anniversary.save();

          // Return the updated anniversary
          return updatedAnniversary;
        } catch (error) {
          throw new Error(error.message);
        }
      }
    },

    // Mutation to delete an Anniversary
    deleteAnniversary: {
      type: AnniversaryType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        // Logic to delete an Anniversary
        return Anniversary.findByIdAndDelete(args.id);
      }
    },

    // Mutation to create news
    createNews: {
      type: NewsType,
      args: {
        newsTitle: { type: new GraphQLNonNull(GraphQLString) },
        newsBody: { type: new GraphQLNonNull(GraphQLString) },
        status: { type: GraphQLString },
        postedBy: { type: new GraphQLNonNull(GraphQLID) },
        dateCreated: { type: GraphQLString },
        picture: { type: GraphQLString }
      },
      resolve(parent, args) {
        const { newsTitle, newsBody, status, postedBy, dateCreated, picture } = args;
        const news = new News({
          newsTitle,
          newsBody,
          status,
          postedBy,
          dateCreated,
          picture
        });
        return news.save();
      }
    },

    // Mutation to find all news
    findAllNews: {
      type: new GraphQLList(NewsType),
      resolve(parent, args) {
        return News.find();
      }
    },

    // Mutation to update news
    updateNews: {
      type: NewsType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        newsTitle: { type: GraphQLString },
        newsBody: { type: GraphQLString },
        status: { type: GraphQLString },
        postedBy: { type: GraphQLID },
        dateCreated: { type: GraphQLString },
        picture: { type: GraphQLString }
      },
      async resolve(parent, args) {
        try {
          // Find the news by ID
          const news = await News.findById(args.id);

          // Check if the news exists
          if (!news) {
            throw new Error('News not found');
          }

          // Update the news fields with the provided arguments
          if (args.newsTitle) {
            news.newsTitle = args.newsTitle;
          }
          if (args.newsBody) {
            news.newsBody = args.newsBody;
          }
          if (args.status) {
            news.status = args.status;
          }
          if (args.postedBy) {
            news.postedBy = args.postedBy;
          }
          if (args.dateCreated) {
            news.dateCreated = args.dateCreated;
          }
          if (args.picture) {
            news.picture = args.picture;
          }

          // Save the updated news to the database
          const updatedNews = await news.save();

          // Return the updated news
          return updatedNews;
        } catch (error) {
          throw new Error(error.message);
        }
      }
    },

    // Mutation to delete news
    deleteNews: {
      type: NewsType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        return News.findByIdAndDelete(args.id);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
