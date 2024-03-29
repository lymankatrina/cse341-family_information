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
            type: IndividualType,
            args: {
                firstName: { type: GraphQLString }
            },
            resolve(parent, args) {
                return Individual.findById(args.firstName);
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
                return Individual.findByIdAndUpdate(
                    args.id,
                    { $set: args },
                    { new: true }
                );
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
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
