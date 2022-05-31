import { gql, useQuery } from "@apollo/client";
//import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import { Waypoint } from "react-waypoint";
import "./LeftSideList.css";

const GetDataQUERY = gql`
  query GetNames($page: Int) {
    characters(page: $page) {
      results {
        id
        name
      }
      info {
        next
      }
    }
  }
`;
const LeftSideList = () => {
  const { data, loading, error, fetchMore } = useQuery(GetDataQUERY);
  if (loading) return <p>...LOADING</p>;
  if (error) return <p>ERROR =(</p>;

  return (
    <div className="imleft" id="scrollableDiv">
      <h3>SOY LEFT</h3>
      {data.characters.results.map((el) => {
        return (
          <Link key={el.id} to={`/characters/${el.id}`}>
            {el.name}{" "}
          </Link>
        );
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
      ></Waypoint>
      {/* <InfiniteScroll
        dataLength={data.characters.results.length}
        className="List"
        hasMore={isNext}
        endMessage="HOLA LLEGE AL FINAL"
        scrollThreshold={0.1}
        next={getMore}
      >
        {data.characters.results.map((el) => {
          return (
            <Link key={el.id} to={`/characters/${el.id}`}>
              {el.name}
            </Link>
          );
        })}
      </InfiniteScroll> */}
    </div>
  );
};

export default LeftSideList;
