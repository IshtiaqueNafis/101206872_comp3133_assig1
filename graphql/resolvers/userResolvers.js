const User = require('../../models/userModel');

const userResolvers = {
    //region ***Query***
    Query: {
        users: User.find() // returns all users.

    },
    //endregion


    Mutation: {
        signup: async (_, {input}) => {

            try {
                let user = await User.findOne({email: input.email})

                if (user) {
                    throw new Error('email already taken')
                }
                console.log({user})
              return  await User.create({...input});

            } catch (e) {
                throw e;
            }

        }

    },
}

module.exports = userResolvers;