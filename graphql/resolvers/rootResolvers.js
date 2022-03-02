const userResolvers = require('./userResolvers')
const {GraphQLDate} = require('graphql-iso-date')



const customDateScalarResolver = {
    Date:GraphQLDate
}

const resolvers = [
    userResolvers,
    customDateScalarResolver
];
module.exports = resolvers;