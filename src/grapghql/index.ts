import { ApolloServer } from "@apollo/server";
import { prismaClient } from "../lib/db";
import { User } from "./user";

async function createApolloserver() {
  // create graphql server
  const gqlServer = new ApolloServer({
    typeDefs: `
    type Query {
        hello:String
     
    }
    type Mutation {
        ${User.mutations}
    }
    `, // Schema
    resolvers: {
      Query: {
        // hello: () => `Hey there!!`,
        // say: (_, { name }: { name: string }) => `hey ${name}, What's up?`,
        ...User.resolvers.queries,
      },
      Mutation: {
        ...User.resolvers.mutations,
        // createUser: async (
        //   _,
        //   {
        //     firstName,
        //     lastName,
        //     email,
        //     password,
        //   }: {
        //     firstName: string;
        //     lastName: string;
        //     email: string;
        //     password: string;
        //   }
        // ) => {
        //   await prismaClient.user.create({
        //     data: {
        //       firstName,
        //       email,
        //       lastName,
        //       password,
        //       salt: "random_salt",
        //     },
        //   });
        //   return true;
        // },
      },
    }, //
  });

  // start the gql server
  await gqlServer.start();
  return gqlServer;
}
export default createApolloserver;
