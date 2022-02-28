const {gql} = require("apollo-server-express");
const userDef = require("./userDef");
const typeDefs = gql`
    scalar Date
    
type Query {
    _:String
}

type Mutation{
    _:String
}

`

module.exports =[typeDefs,userDef]