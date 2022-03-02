const User = require('../../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {combineResolvers} = require('graphql-resolvers');
const {isAuthenticated} = require("../../middleware/middleware");
const ListingModelAirbnbAdmin = require('../../models/ListingModelAdmin');
const UserBookingList = require('../../models/ListingModelUser');

const userResolvers = {
    //region ***Query***
    Query: {
        user: async () => {
            await User.find()[0];
        },
        getLoggedIn: combineResolvers(isAuthenticated,async (_,__,{id})=>{
            const result = await User.findById(id);
            if(result.type ==='Admin'){
           return  ListingModelAirbnbAdmin.find({user: id})
            }else {
                return  UserBookingList.find({user: id});

            }

        }),
        ListingAdmin: async () => {
            const users = await User.find({type: 'Admin'})
            let result = await ListingModelAirbnbAdmin.find()
            for (const user of users) {
                result.filter(r => r.user === user._id);
            }
            return result;
        },
        cityPostalCode: async (_, {city, postalCode}) => {
            if (postalCode) {
                return ListingModelAirbnbAdmin.find({postal_code: postalCode});
            } else if(city) {
                const result = await ListingModelAirbnbAdmin.find();
                return result.filter(r => r.city === city);

            }else {
                return new Error(' you cant have both chiices')
            }


        },
        ListingUser: async () => {
            const users = await User.find({type: 'User'})
            let result = await UserBookingList.find()
            for (const user of users) {
                result.filter(r => r.user === user._id);
            }
            return result;
        },

    },

    //createdListing
    Airbnb: {
        username: combineResolvers(isAuthenticated, async (_, __, {id}) => {
            return User.findById(id);

        }),




    },
    AirbnbUser:{
        username: combineResolvers(isAuthenticated, async (_, __, {id}) => {
            return User.findById(id);

        }),
    },



    Mutation: {
        //region ***Signs UP user ***
        signup: async (_, {input}) => {

            try {
                let user = await User.findOne({email: input.email})

                if (user) {
                    throw new Error('email already taken')
                }
                const hashedPasword = await bcrypt.hash(input.password, 12);
                const newUser = new User({...input, password: hashedPasword});
                await newUser.save();
                return newUser;

            } catch (e) {
                throw e;
            }

        },
        //endregion

        signin: async (_, {input},{id}) => {


            try {
                const user = await User.findOne({email: input.email}).select("+password");
                if (!user) throw new Error('User not found')
                const isPasswordValid = await bcrypt.compare(input.password, user.password)
                if (!isPasswordValid) throw new Error('password is incorrect');
                const secret = 'fjafjkafjpiqwwqor-]i12kj2j';
                const token = await jwt.sign({email: user.email,id:user.id,username:user.username}, secret, {expiresIn: '2d'});
                return {token};

            } catch (e) {

                console.log(e.message)
                throw e;
            }
        },
        createAirbnbAdmin:combineResolvers( isAuthenticated,  async (_, {input}, {id}) => {
            try {


                const user = await User.findById(id);


                if(user.type ==="Admin"){
                    return await ListingModelAirbnbAdmin.create({...input, user: user.id});
                }
                throw new Error("you are not authorized");


            } catch (e) {
                throw e;
            }
        }),


        bookAirBnbUser:combineResolvers( isAuthenticated,  async (_, {input}, {id})=>{
            try {
                const {listing_id,booking_id} = await input
                const listingInfo =  ListingModelAirbnbAdmin.find({
                    listing_id
                })
                if(!listingInfo ) {
                    return new Error(" no such id exists");
                }
               
                const user = await User.findById(id);
                if(user.type ==="User"){
                    return await UserBookingList.create({...input, user: user.id});
                }
                throw new Error("you are not authorized");
            }catch (e) {

            }
        })


},







}

module.exports = userResolvers;

