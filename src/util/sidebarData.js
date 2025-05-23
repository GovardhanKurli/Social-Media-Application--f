

import { FaHome, FaUserFriends, FaStore, FaUsers, FaTv, FaCalendarAlt, FaSearch } from 'react-icons/fa';
import { MdSlowMotionVideo } from "react-icons/md";
import { BiVideo } from 'react-icons/bi';
import { GoHomeFill } from "react-icons/go";
import { FaFacebookMessenger } from "react-icons/fa6";
import { CiSaveDown2 } from "react-icons/ci";
export const sidebarData = [
    { text: 'Home', route: '/', icon:<GoHomeFill /> },
    { text: 'Contacts', route: '/friends', icon: <FaUserFriends /> },
    { text: 'videos', route: '/videos', icon: <MdSlowMotionVideo /> }, // YouTube
    { text: 'My Favorites', route: '/', icon:<CiSaveDown2 /> },
    { text: 'Search', route: '/search', icon: <FaSearch /> },
    // { text: 'Live Video', icon: <BiVideo />, route: '/live-video' },
    // { text: 'Marketplace', route: 'https://www.flipkart.com', icon: <FaStore /> }, // Flipkart
    // { text: 'All Users', icon: <FaUserFriends />, route: '/allusers' },
    { text: 'Mesaage', icon: <FaFacebookMessenger />, route:`#` },
];
