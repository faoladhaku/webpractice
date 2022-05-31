import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";
import RocketsContent from "./RocketContent";
import RocketList from "./RocketList";
const client = new ApolloClient({
  uri: "https://api.spacex.land/graphql/",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          rockets: {
            keyArgs: false,
            merge(existing, incoming) {
              console.log(existing, incoming);
              return [...existing, ...incoming];
            },
          },
        },
      },
    },
  }),
});

const spaceX = () => {
  return (
    <ApolloProvider client={client}>
      <RocketList />
      <RocketsContent />
    </ApolloProvider>
  );
};

export default spaceX;
