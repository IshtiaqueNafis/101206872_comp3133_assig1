const {gql} = require("apollo-server-express");

const userDef = gql`
 
    extend type Query{
        
        user:User
        ListingAdmin:[Airbnb!]
        cityPostalCode(city:String, postalCode:String):[Airbnb!]
        getLoggedIn: [Listing!]
        ListingUser:[AirbnbUser!]
        
        
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
    },
    type Airbnb{
        listing_id:String!,
        listing_title:String!,
        description:String!,
        street:String!
        city:String!
        postal_code:String!,
        price:Int!
        username:User! 
        
    },
    type Listing{
        listing_id:String
        listing_title:String
        description:String
        street:String
        city:String
        price:Int,
        postal_code:String
        booking_id:String
        booking_date:String
        booking_start:String
        booking_end: String
        
    }
    

    input AirbnbInputAdmin{
        listing_id:String!,
        listing_title:String!,
        description:String!,
        street:String!
        city:String!
        postal_code:String!,
        price:Int!
        
        
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
    input bookingInput{
        listing_id:String!
        booking_id:String!,
        booking_date:String!
        booking_start:String!
        booking_end: String!
        
    },
    type AirbnbUser{
        listing_id:String!
        booking_id:String!,
        booking_date:String!
        booking_start:String!
        booking_end: String!
        username:User!
    }

    extend type Mutation{
        signup(input:SignupInput):User
        signin(input:SignInInput):Token
        createAirbnbAdmin(input:AirbnbInputAdmin): Airbnb
        bookAirBnbUser(input:bookingInput):AirbnbUser 
        
    },
    

`

module.exports = userDef;

