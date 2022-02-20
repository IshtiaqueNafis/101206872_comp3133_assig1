const graphql = require('graphql');
const {GraphQLObjectType, GraphQLString} = require("graphql");

const UserType = new GraphQLObjectType({
    name: 'Users',
    fields: () => ({
        username: {type: GraphQLString},
        firstname: {type: GraphQLString},
        lastname: {type: GraphQLString},
        password: {type: GraphQLString},
        email: {type: GraphQLString},
        type: {type: GraphQLString}

    })
})

const RootQuery = new GraphQLObjectType({
    name:'RootQuery',
    fields:()=>({
        user:{
            type:UserType,

        }
    })
})