import React, { useRef, useState, useCallback } from "react";
import Rocket from "./Rocket";
import { useQuery, gql } from "@apollo/client";
const GET_ROCKET_QUERY = gql`
  query GetRocket($offset: Int, $limit: Int) {
    rockets(offset: $offset, limit: $limit) {
      name
      id
    }
  }
`;

const RocketList = () => {
  const [hasMore, setHasMore] = useState(false);
  const { loading, error, data, fetchMore } = useQuery(GET_ROCKET_QUERY, {
    variables: {
      offset: 0,
      limit: 2,
    },
  });
  const observer = useRef();
  const lastElement = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          fetchMore({
            variables: { offset: data.rockets.length },
          });
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading]
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  console.log(data);
  return (
    <>
      {data.rockets.map((el, index) => {
        if (data.rockets.length === index + 1) {
          return (
            <Rocket ref={lastElement} key={el.id} name={el.name} id={el.id} />
          );
        } else {
          return <Rocket key={el.id} name={el.name} id={el.id} />;
        }
      })}
      <button
        onClick={() => {
          fetchMore({
            variables: { offset: data.rockets.length },
          });
        }}
      >
        Load More
      </button>
    </>
  );
};

export default RocketList;
