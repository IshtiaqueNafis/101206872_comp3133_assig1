const User = require('../../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userResolvers = {
    //region ***Query***
    Query: {
        users: User.find() // returns all users.

    },
    //endregion


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

        signin: async (_, {input}) => {

            try {
                const user = await User.findOne({email: input.email}).select("+password");
                if(!user) throw new Error('User not found')
                const isPasswordValid = await bcrypt.compare(input.password,user.password)
                if(!isPasswordValid) throw new Error('password is incorrect');
                const secret = 'fjafjkafjpiqwwqor-]i12kj2j';
                const token = jwt.sign({email: user.email}, secret, {expiresIn: '2d'});
                return {token};

            } catch (e) {

                console.log(e.message)
                throw e;
            }
        }

    },
}

module.exports = userResolvers;