import React, { useState } from 'react';
import { FaInstagram, FaCog } from 'react-icons/fa'; // Added FaCog for the settings icon
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import person from '../../assets/na.jpeg';
import Search from '../search/Search';
import { logout } from '../../redux/authSlice';
import { CiSearch } from 'react-icons/ci';
import { toast } from 'react-toastify';


const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear();
    navigate('/auth');
  toast("Sign out  successfully")  
  };


  

  const toggleSettingsModal = () => setShowModal((prev) => !prev);

  return (
    <div className="h-16 w-full bg-[#1e293b] shadow-md">
      <div className="h-full w-full px-6 flex justify-between items-center">
        <div className="flex items-center">
          <img
            src="https://thumbs.dreamstime.com/b/graphic-alphabet-letters-letter-g-peacock-style-zodiac-sign-letter-g-peacock-style-zodiac-sign-318669012.jpg"
            alt="logo"
            className="h-10 w-10 mr-3"
          />
          <Link to="/">
            <h3 className="text-white text-2xl font-semibold tracking-wide">Social Media</h3>
          </Link>
        </div>


      
      <div className="relative w-1/3 flex items-center">
       <input
         type="text"
         placeholder="Search..."
         className="w-full py-2 pl-10 pr-3 rounded-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
         onFocus={() => setShowSearch(true)}
         onBlur={() => setShowSearch(false)}
       />
       <CiSearch className="absolute left-3 text-white text-2xl" />
       {showSearch && (
         <div className="absolute top-full mt-2 left-0 w-full bg-white border border-gray-300 shadow-lg rounded-lg z-10">
           {/* Render the search results dropdown */}
           {/* <Search /> */}
         </div>
       )}
     </div>

      

        <div className="relative  flex items-center">
       

          {/* Profile Image */}
          {/* <Link to={`/profile/${user?.userId}`} className="flex items-center gap-2 text-inherit"> */}
            <img
              src={user?.profilePic ? `http://localhost:5001/images/${user.profilePic}` : person}
              className="h-12 w-12 rounded-full object-cover cursor-pointer border-2 border-white shadow-md"
              alt="Profile"
            />
          {/* </Link> */}

          {/* Settings Icon */}
          <button
            onClick={toggleSettingsModal}
            className="p-2 text-white hover:text-gray-400 transition duration-300"
          >
            <FaCog className="text-2xl" />
          </button>

          {/* Settings Dropdown */}
          {showModal && (
            <div className="absolute right-0 top-16 bg-white p-4 w-56 flex flex-col gap-3 text-base shadow-xl rounded-lg z-10 transition-transform duration-300 ease-in-out transform origin-top-right scale-100">
              <Link
                to={`/updateProfile/${user._id}`}
                className="text-blue-700 hover:text-blue-900 transition-colors duration-200 font-semibold flex items-center gap-2"
              >
                 <span className="material-icons">  Edit Profile</span>
                
              
              </Link>
             
              <button
                onClick={handleLogout}
                className="text-blue-700 hover:text-blue-900 transition-colors duration-200 font-semibold flex items-center gap-2"
              >
                <span className="material-icons">Sign out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

