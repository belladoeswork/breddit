"use client";

import { fetchUser } from '@/lib/fetchUser';
import { useRouter } from "next/navigation.js";
import { useState, useEffect } from 'react'; 


// export default function JoinSub({ subredditId, onJoinSub }) {
//   const [user, setUser] = useState(null);
//   const [subscribersCount, setSubscribersCount] = useState(""); 

//   useEffect(() => {
//     const getUser = async () => {
//       const fetchedUser = await fetchUser(); 
//       setUser(fetchedUser); 
//     };

//     getUser();
//   }, []);

//   const subscribe = async () => {
//     if (!user) {
//       // Handle the case where there is no user
//       return;
//     }

//     const response = await fetch('/api/JoinSub', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ subredditId: subredditId, userId: user.id }),
//     });

//     if (response.ok) {
//       alert('Successfully joined subreddit!');

//       // const countResponse = await fetch(`/api/subreddits/${subredditId}/subscribersCount`);
//       // const { subscribersCount } = await countResponse.json();
//       // setSubscribersCount(subscribersCount);
//       onJoinSub(subredditId);
//     } else {
//       alert('Failed to join subreddit.');
//     }
//   };

//   return (
//     <button className="join-bttn" onClick={subscribe}>Join</button>
//   );
// }



export default function JoinSub({ subredditId }) {
  const [user, setUser] = useState(null);
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const userData = await fetchUser();
      setUser(userData);
      setJoined(userData?.subscriptions?.some(sub => sub.subredditId === subredditId));
    };

    getUser();
  }, []);

  const handleJoin = async () => {
    const response = await fetch(`/api/subreddits/${subredditId}/join`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user.id }),
    });

    const data = await response.json();

    if (data.success) {
      setJoined(true);
    } else {
      console.error(data.error);
    }
  };

  return (
    <button onClick={handleJoin} disabled={joined}>
      {joined ? 'Joined' : 'Join'}
    </button>
  );
}