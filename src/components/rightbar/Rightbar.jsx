
// import sttamnets
import React from 'react';
import { Link } from'react-router-dom';
import devloper from '../../assets/developer.jpeg'; 
import axios from 'axios'; 
import { useState,useEffect } from 'react';
var img2= devloper
const RightBar = () => {
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [showAll, setShowAll] = useState(false);
  useEffect(() => {    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5001/user/findAll');
        setSuggestedUsers(response.data); 
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers(); 
  }, []);
  const displayedUsers = showAll ? suggestedUsers.slice(0, 8) : suggestedUsers.slice(0, 3);

  const recentChats = [
    { name: 'Julia Clarke', location: 'New York, USA', avatar: img2 },
    { name: 'Sara Cliene', location: 'Sydney, Australia', avatar: img2 },
    { name: 'Amy Ruth', location: 'Dubai, UAE', avatar: img2 },
    { name: 'Mark Stefine', location: 'Chicago, USA', avatar: img2 },
    { name: 'Trinity Sipson', location: 'New York, USA', avatar: img2 },
    { name: 'Albini Vipsa', location: 'Tokyo, Japan', avatar: img2 },
  ];

  const upcomingEvents = [
    {
      title: 'Design Talks',
      date: '12 Oct, 13:00 IST',
      description: 'A General talk about design with Sr Designer of Logitech Michael Spunify.',
      attendees: 112,
    },
    {
      title: 'Design Talks',
      date: '12 Oct, 15:00 IST',
      description: 'A General talk about design with Sr Designer of Logitech Michael Spunify.',
      attendees: 112,
    },
  ];

  const suggestedGroups = [
    { name: 'Designers UI UX', members: 159000, image: '/path/to/group-image.jpg' },
  ];
  return (
    <div className="w-80 h-screen p-4 bg-gradient-to-r from-[#000428] to-[#004e92] text-white ">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">suggested Users</h3>
          {/* <Link to="/#" className="text-blue-500 text-sm">See all</Link> */}

          <button
            onClick={() => setShowAll(!showAll)}
            className="text-blue-500 text-sm"
          >
            {showAll ? 'Show less' : 'See all'}
          </button>
        </div>
        <div className="flex space-x-2 overflow-x-auto">
              {displayedUsers.map((user, index) => (
            <div key={index} className="flex flex-col items-center">
              <img 
                src={user.profilePic ? `http://localhost:5001/images/${user.profilePic}` : '/default-profile.png'}
                alt={user.username} 
                className="w-16 h-16 rounded-full mb-1" 
              />
              <span className="text-xs">{user.username}</span>
              {user.mutuals && <span className="text-xs text-gray-500">{user.mutuals} Mutuals</span>}
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-4  ">
          <h3 className="text-lg font-semibold">Upcoming Events</h3>
          <Link to="/#" className="text-blue-500 text-sm">See all</Link>
        </div>
        {upcomingEvents.map((event, index) => (
          <div key={index} className="bg-gray-100 p-3 rounded-lg mb-2 bg-gradient-to-r from-[#c33764] to-[#1d2671] text-white"> 
            <h4 className="font-semibold">{event.title}</h4>
            <p className="text-sm text-gray-600">{event.date}</p>
            <p className="text-sm">{event.description}</p>
            <p className="text-sm text-gray-600">{event.attendees} Joined</p>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Recent Chats</h3>
        </div>
        {recentChats.map((chat, index) => (
          <div key={index} className="flex items-center mb-2">
            <img src={chat.avatar} alt={chat.name} className="w-10 h-10 rounded-full mr-3" />
            <div>
              <p className="font-semibold">{chat.name}</p>
              <p className="text-xs text-gray-500">{chat.location}</p>
            </div>
          </div>
        ))}
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Suggested Groups</h3>
          <Link to="/#" className="text-blue-500 text-sm">See all</Link>
        </div>
        {suggestedGroups.map((group, index) => (
          <div key={index} className="flex items-center">
            <img src="data:image/jpeg;base64,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" alt={group.name} className="w-16 h-16 rounded-lg mr-3" />
            <div>
              <p className="font-semibold">{group.name}</p>
              <p className="text-sm text-gray-500">{group.members.toLocaleString()} Members</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RightBar;