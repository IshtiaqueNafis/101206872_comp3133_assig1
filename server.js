const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const {ApolloServer, gql} = require('apollo-server-express');
const typeDefs = require('./graphql/schemas/rootDef');
const resolvers = require('./graphql/resolvers/rootResolvers');

const connectDB = require('./config/db');
const {verify} = require("jsonwebtoken");
const {verifyUser} = require("./helper/header");


dotenv.config({path: './config/config.env'});


async function startServer() {

    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
        context:({req})=>{
            verifyUser(req)
    }

    })
    const app = express();
    app.use(express.json());
    app.use(cors());
    await apolloServer.start();
    apolloServer.applyMiddleware({app})

    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    }
    app.use((req, res) => {
        res.send('hello from express Appolo Server')
    })
    await connectDB()
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
}

//endregion

startServer()










