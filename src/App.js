// import logo from './logo.svg';
// import './App.css';
// import './index.css';

// function App() {
//   return (
//     <div className="App">
//       <h1 className='bg-red-400'>Hello</h1>
//     </div>
//   );
// }

// export default App;

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./pages/home/Home";
import Auth from "./pages/auth/Auth";
import ProfileDetails from "./pages/profileDetails/ProfileDetails";
import UpdateProfile from "./pages/updateProfile/UpdateProfile";
import UserList from "./components/userList/UserList";
import LiveVideo from "./components/liveVideo/LiveVideo";
import Search from "./components/search/Search"; // Import Search component
import Friends from "./components/friends/Friends"; // Import Friends component
import "./App.css";
import "./index.css"; // Adjust the path as needed
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VideoPosts from './components/videopost/videos';
function App() {
  const { user } = useSelector((state) => state.auth);



  
  return (
    <div>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/auth" />} />
        <Route
          path="/profile/:id"
          element={user ? <ProfileDetails /> : <Navigate to="/auth" />}
        />
        <Route
          path="/updateprofile/:id"
          element={user ? <UpdateProfile /> : <Navigate to="/auth" />}
        />
        <Route path="/auth" element={!user ? <Auth /> : <Navigate to="/" />} />
        <Route
          path="/allusers"
          element={user ? <UserList /> : <Navigate to="/auth" />}
        />
        <Route
          path="/search"
          element={user ? <Search /> : <Navigate to="/auth" />}
        />
        <Route
          path="/friends"
          element={user ? <Friends /> : <Navigate to="/auth" />}
        />{" "}
     
        <Route path="/live-video" element={<LiveVideo />} />
        <Route path="/videos"  element={<VideoPosts />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
