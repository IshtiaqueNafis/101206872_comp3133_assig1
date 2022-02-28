const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const {ApolloServer, gql} = require('apollo-server-express');
const typeDefs = require('./graphql/schemas/rootDef');
const resolvers = require('./graphql/resolvers/rootResolvers');

const connectDB = require('./config/db');


dotenv.config({path: './config/config.env'});

const app = express();
app.use(express.json());
async function startServer() {

    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers

    })

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










