import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import "./RightSideContent.css";

const getEspecificDataQUERY = gql`
  query getEspecificData($ids: [ID!]!) {
    charactersByIds(ids: $ids) {
      name
      species
      status
      gender
    }
  }
`;

const RightSideContent = () => {
  let { ids } = useParams();
  const { loading, error, data } = useQuery(getEspecificDataQUERY, {
    variables: { ids },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR =(</p>;
  console.log(loading);
  return (
    <div className="imright">
      <ul>
        <li key={ids}>
          {data.charactersByIds[0].name} - {data.charactersByIds[0].species} -{" "}
          {data.charactersByIds[0].status} - {data.charactersByIds[0].gender}
        </li>
      </ul>
    </div>
  );
};

export default RightSideContent;
