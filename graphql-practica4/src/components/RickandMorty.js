import {
  ApolloProvider,
  gql,
  ApolloClient,
  useQuery,
  InMemoryCache,
} from "@apollo/client";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LeftSideList from "./pages/LeftSideList";
import RightSideContent from "./pages/RightSideContent";
import "./RickandMorty.css";
const RickandMorty = () => {
  const client = new ApolloClient({
    uri: "https://rickandmortyapi.com/graphql",
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            characters: {
              keyArgs: false,
              merge(existing = [], incoming) {
                if (existing.length === 0) return incoming;
                return {
                  __typename: "Characters",
                  results: [...existing.results, ...incoming.results],
                  info: {
                    next: incoming.info.next,
                  },
                };
              },
            },
          },
        },
      },
    }),
  });
  return (
    <div className="Container">
      <ApolloProvider client={client}>
        <Router>
          <LeftSideList className="Left" />
          <Routes>
            <Route path="/characters/:ids" element={<RightSideContent />} />
          </Routes>
        </Router>
      </ApolloProvider>
    </div>
  );
};

export default RickandMorty;
