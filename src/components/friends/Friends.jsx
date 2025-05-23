

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { request } from '../../util/request';
import person from '../../assets/na.jpeg'; 
// Default profile picture
const Friends = () => {
  const [friends, setFriends] = useState([]);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchFriends = async (userId) => {
      try {
        const data = await request(`/user/find/userfriends/${userId}`, 'GET', {
          'Content-Type': 'application/json',
        });

        console.log('Fetched friends:', data);
        return data;
      } catch (error) {
        console.error('Error fetching friends:', error);
      }
    };

    if (user) {
      fetchFriends(user._id).then(data => {
        if (data) {
          setFriends(data);
        }
      });
    }
  }, [user]);


  // const profileOnclick=()=> {
  //   console.log("Profile Clicked");
  // }

  return (
    <div className="p-5 min-h-screen bg-pink-100 flex justify-center">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Contacts</h3>
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="bg-gray-100 rounded-full pl-4 pr-10 py-2 text-gray-600"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 absolute right-3 top-2 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m2.1-5.85A7.5 7.5 0 1110.35 2.65a7.5 7.5 0 017.5 7.5z"
              />
            </svg>
          </div>
        </div>
        {friends.length > 0 ? (
          friends.map((friend) => (
            <div
              key={friend._id}
              className="flex items-center p-3 bg-gray-50 rounded-lg mb-2 shadow-sm hover:bg-gray-100"
            >
              <img
                src={friend?.profilePic ? `http://localhost:5001/images/${friend.profilePic}` : person}
                className="w-10 h-10 rounded-full object-cover mr-3"
                alt={`${friend.username}'s profile`}
              />
              <div className="flex-1">
                <span className="block text-sm font-semibold text-gray-800">
                  {friend.username}
                </span>
                <span className="block text-xs text-gray-600">
                  {friend.status || 'No status available'}
                </span>
              </div>
              <span className={`w-3 h-3 rounded-full ${friend.isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></span>
            </div>
          ))
        ) : (
          <h3 className="text-center text-lg text-gray-600">No friends</h3>
        )}
        <div className="flex justify-end mt-4">
          <button className="bg-gray-200 p-2 rounded-full shadow hover:bg-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 text-gray-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Friends;
