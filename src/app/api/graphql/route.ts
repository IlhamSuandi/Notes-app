import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { NextRequest } from "next/server";
import { Context } from "@/prisma/context";
import prisma from "@/prisma/db";
import { typeDefs, resolvers } from "@/graphql/";

const apolloServer = new ApolloServer<Context>({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler<NextRequest, Context>(
  apolloServer,
  {
    context: async (req, res) => ({ req, res, prisma }),
  }
);

export { handler as GET, handler as POST };
