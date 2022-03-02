const {skip} = require("graphql-resolvers");

module.exports.isAuthenticated = (_,__,{id}) =>{
    if(!id){
        throw new Error('acess dened please log in');
    }
    return skip;

}