import React, { useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import Name from "./Name";
import { Waypoint } from "react-waypoint";
import "./ListName.css";

const GET_NAMES_QUERY = gql`
  query GetNames($page: Int) {
    characters(page: $page) {
      results {
        id
        name
        gender
        species
      }
      info {
        next
      }
    }
  }
`;

const ListNames = ({ setData }) => {
  const { error, data, loading, fetchMore } = useQuery(GET_NAMES_QUERY, {
    variables: { page: 1 },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error =(</p>;
  return (
    <>
      <div className="container">
        {data.characters.results.map((el, index) => {
          return <Name setData={setData} el={el} key={el.id} name={el.name} />;
        })}
        <Waypoint
          onEnter={() => {
            if (data.characters.info.next) {
              fetchMore({
                variables: {
                  page: data.characters.info.next,
                },
              });
            }
          }}
        />
        <button
          onClick={() => {
            fetchMore({
              variables: {
                page: data.characters.info.next,
              },
              updateQuery: (prev, { fetchMoreResult }) => {
                console.log(prev.characters.results);
                if (!fetchMoreResult) return prev;
                return {
                  characters: {
                    __typename: "Characters",
                    results: [
                      ...prev.characters.results,
                      ...fetchMoreResult.characters.results,
                    ],
                    info: {
                      next: fetchMoreResult.characters.info.next,
                    },
                  },
                };
              },
            });
          }}
        >
          APRETAME
        </button>
      </div>
    </>
  );
};

export default ListNames;
