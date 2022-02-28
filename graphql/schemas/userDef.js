const {gql} = require("apollo-server-express");
const userDef = gql`

    extend type Query{
        users:[User!]
    }

    type User{
        username:String!,
        firstname:String!,
        lastname:String!,
        password:String!
        email:String!
        type:String!
    }
    type Token{
        token:String!
    }

    input SignupInput{
        username:String!,
        firstname:String!,
        lastname:String!,
        password:String!
        email:String!
        type:String!
    }


    input SignInInput{
        email:String!
        password:String!
    }

    extend type Mutation{
        signup(input:SignupInput):User
        signin(input:SignInInput):Token

    }

`

module.exports = userDef;

