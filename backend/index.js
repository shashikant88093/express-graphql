import express from "express"
import { ApolloServer, gql } from 'apollo-server-express'
import pkg from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const URL = process.env.MANGODB_URL
console.log(URL, "URL")
const { connect } = pkg;
connect(URL, {
    useUnifieldTopology: true, useNewUrlPraser: true
}, () => console.log("DB CONNECTED"))
//Queries
const typeDefs = gql`
type Query{
    hello:String
}
`
//Resolver
const resolvers = {
    Query: {
        hello: () => {
            return "Hello World"
        }
    }

}
const startServer = async () => {
    const app = express()
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app: app })
    app.listen(4000, () => console.log("Server UP & Running *4000"))

}
startServer()