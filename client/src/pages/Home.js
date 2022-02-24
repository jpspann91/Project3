// import { Link } from 'react-router-dom';
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import Friends from "../components/friends-tab";
import Settings from "../components/settings-tab";

// import { useEffect, useState } from 'react';

const Home = () => {
  // const { loading, data } = useQuery(QUERY_ME, {
  //   fetchPolicy: "no-cache"
  // });
  // const [matchups ,setMathupsData]= useState([])
  // const matchupList = data?.matchups || [];

  // useEffect(()=>{
  //   if(!loading){
  //     setMathupsData(data)
  //   }
  // }, [loading])

  let profileData =  {
    id: 'EG76J42',
    icon: 'JD',
    fullName: 'John Doe',
    userName: 'JonnyManiac',
    online: false,
}

  return (
    <div className="h-full w-full">
      {/* <h1>THIS IS OUR HOMEPAGE</h1> */}

      <Friends />
      {/* <Settings data={profileData} /> */}
    </div>
  );
};

export default Home;
