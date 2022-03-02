import { useQuery, useMutation, gql } from "@apollo/client";
import { Button, Card } from "antd";
import React from "react";
import { useParams } from "react-router-dom";
// import { ADD_MATCH } from "../utils/mutations";
import { QUERY_USER } from "../utils/queries";

const ADD_MATCH = gql`
  mutation addMatch {
    addMatch {
      _id
    }
  }
`;

const CreateMatch = (props) => {
  const routeParams = useParams();
  const { loading, error, data } = useQuery(QUERY_USER, {
    variables: {
      username: 'BriKernighan'
    }
  });

  const [ addMatch ] = useMutation(ADD_MATCH);

  const getOpponents = () => {
    console.log(data)
    return data.user.friends.map((friend, index) => {
      return (
        <Card key={index}>
          <h3>{friend.username}</h3>
          <p>ID: {friend._id}</p>
          <Button onClick={() => startMatch(friend._id)}>Challenge</Button>
        </Card>
      );
    });
  };

  const startMatch = (opponentId) => {
    const matchOptions = {
      variables: { 
        game: "621d90a76742d2938ffd5a50",
        players: [
          data.user._id,
          opponentId
        ],
        activePlayer: data.user._id,
        gameBoard: '         ',
        score: '0-0',
        status: "ongoing"
      }
    };

    console.log(matchOptions);

    addMatch(matchOptions)
  }

  const getError = () => {
    console.log(error);
    return (
      <div>
        <p>Error:</p>
      </div>
    )
  }

  return (
    <>
      <Card>
        {loading && <p>Loading</p>}
        {error && (getError())}
        {!loading && !error && (
          <div>
            <h2>Create new {routeParams.game} match</h2>
            <p>Select an opponent</p>
            {getOpponents()}
          </div>
        )}
      </Card>
    </>
  );
};

export default CreateMatch;
