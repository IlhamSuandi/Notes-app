"use client";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";

export function Providers({ children }: { children: React.ReactNode }) {
  const client = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_APP_API_ENDPOINT}/graphql`,
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <ChakraProvider>{children}</ChakraProvider>;
    </ApolloProvider>
  );
}
