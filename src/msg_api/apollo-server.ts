import { ApolloServer } from 'apollo-server-lambda';

import { resolvers } from '../fauna/resolvers';

import typeDefs from '../fauna/generated/fauna.schema.graphql'


const apolloServer = new ApolloServer({ resolvers, typeDefs });

export const graphqlHandler = apolloServer.createHandler();
