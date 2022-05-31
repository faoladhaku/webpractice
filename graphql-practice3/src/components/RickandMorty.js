import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./RickandMorty.css";
import ListNames from "./ListNames";
import PersonContent from "./PersonContent";
import {
  ApolloClient,
  InMemoryCache,
  gql,
  useQuery,
  ApolloProvider,
  empty,
} from "@apollo/client";
import { Route } from "react-router";

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
                console.log(incoming.results);
                if (existing.length === 0) {
                  console.log("ENTRE");
                  return incoming;
                }
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
  const [data, setData] = useState(null);

  return (
    <ApolloProvider client={client}>
      <section className="container-grid-areas">
      <Router>
        
          <div className="left-sidebar">
            <ListNames setData={setData} />
          </div>
        <Switch>
          <Route path="/content" component={}/>
        </Switch>
        
          <div className="right-content">
            <PersonContent gender={data.gender} species={data.species} />

          </div>
        
      </Router>
      </section>
    </ApolloProvider>
  );
};

export default RickandMorty;
