import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_MATCHUPS } from '../utils/queries';
import { useEffect, useState } from 'react';

const Home = () => {
  const { loading, data } = useQuery(QUERY_MATCHUPS, {
    fetchPolicy: "no-cache"
  });
  // const [matchups ,setMathupsData]= useState([])
  const matchupList = data?.matchups || [];

  // useEffect(()=>{ 
  //   if(!loading){
  //     setMathupsData(data)
  //   }
  // }, [loading])

  return (
    <div>
      <h1>THIS IS OUR HOMEPAGE</h1>
    </div>
  );
};

export default Home;
