// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { login, register } from '../../redux/authSlice';
// import { request } from '../../util/request';
// import { Facebook, Twitter } from 'lucide-react';
// const Auth = () => {
//     const [isRegister, setIsRegister] = useState(false);
//     const [username, setUsername] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [error, setError] = useState(null);
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             if (isRegister) {
//                 if (username === '' || email === '' || password === '') {
//                     setError("Fill all fields!");
//                     setTimeout(() => {
//                         setError(null);
//                     }, 2500);
//                     return;
//                 }

//                 const headers = { 'Content-Type': 'application/json' };
//                 const body = { username, email, password };
//                 const data = await request('/auth/register', 'POST', headers, body);

//                 console.log(data);
//                 dispatch(register(data));

//                 navigate('/');
//             } else {
//                 if (email === '' || password === '') {
//                     setError("Fill all fields!");
//                     setTimeout(() => {
//                         setError(null);
//                     }, 2500);
//                     return;
//                 }

//                 const headers = { 'Content-Type': 'application/json' };
//                 const body = { email, password };
//                 const data = await request('/auth/login', 'POST', headers, body);
//                 dispatch(login(data));
//                 navigate('/');
//             }
//         } catch (error) {
//             console.error('Authentication error:', error);
//             setError("An error occurred. Please try again.");
//             setTimeout(() => {
//                 setError(null);
//             }, 2500);
//         }
//     };

//     return (
//         <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
//             <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-md flex flex-col md:flex-row">
//                 {/* Left Side - Brand Content */}
//                 <div className="flex-1 flex flex-col justify-center items-center md:items-start text-center md:text-left p-6 bg-blue-50 rounded-lg">
//                     <h1 className="text-5xl font-bold text-blue-600">Social Media</h1>

//                     <div className="space-y-2">
//                         <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center">
//                             <Facebook className="w-5 h-5 mr-2" />
//                             Sign in with Facebook
//                         </button>
//                         <button className="w-full bg-blue-400 text-white py-2 rounded-md hover:bg-blue-500 transition-colors flex items-center justify-center">
//                             <Twitter className="w-5 h-5 mr-2" />
//                             Sign in with Twitter
//                         </button>
//                         <button className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-colors flex items-center justify-center">
//                             <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                                 <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm6.884 16.884l-2.768-1.602a4.965 4.965 0 0 1-2.116 2.116l1.602 2.768a9.017 9.017 0 0 1-5.602 0l1.602-2.768a4.965 4.965 0 0 1-2.116-2.116L6.72 16.884a9.017 9.017 0 0 1 0-5.602l2.768 1.602a4.965 4.965 0 0 1 2.116-2.116L10.002 7.1a9.017 9.017 0 0 1 5.602 0l-1.602 2.768a4.965 4.965 0 0 1 2.116 2.116l2.768-1.602a9.017 9.017 0 0 1 0 5.602z" fill="currentColor"/>
//                             </svg>
//                             Sign in with Google+
//                         </button>
//                     </div>

//                 </div>
//                 {/* Right Side - Auth Form */}
//                 <div className="flex-1 flex justify-center items-center p-6">
//                     <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col gap-6">
//                         {isRegister && (
//                             <input
//                                 type="text"
//                                 placeholder='Username'
//                                 className="border-b border-gray-300 py-2 outline-none focus:border-blue-500"
//                                 onChange={(e) => setUsername(e.target.value)}
//                             />
//                         )}
//                         <input
//                             type="email"
//                             placeholder='Email address'
//                             className="border-b border-gray-300 py-2 outline-none focus:border-blue-500"
//                             onChange={(e) => setEmail(e.target.value)}
//                         />
//                         <input
//                             type="password"
//                             placeholder='Password'
//                             className="border-b border-gray-300 py-2 outline-none focus:border-blue-500"
//                             onChange={(e) => setPassword(e.target.value)}
//                         />
//                         <button
//                             className="bg-blue-600 text-white text-xl py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors"
//                             type="submit"
//                         >
//                             {isRegister ? 'Sign Up' : 'Log In'}
//                         </button>
//                         <p
//                             className="text-center cursor-pointer text-blue-600 underline"
//                             onClick={() => setIsRegister(!isRegister)}
//                         >
//                             {isRegister ? 'you  have an account? Log in' : 'Don\'t have an account? Sign up'}
//                         </p>
//                         {error && <p className="text-red-500 text-center">{error}</p>}
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Auth;

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, register } from "../../redux/authSlice";
import { request } from "../../util/request";
import { Facebook, Twitter } from "lucide-react";
import { SlSocialInstagram } from "react-icons/sl";
import { toast } from "react-toastify";

const Auth = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isRegister) {
        if (username === "" || email === "" || password === "") {
          setError("Fill all fields!");
          setTimeout(() => {
            setError(null);
          }, 2500);
          return;
        }

        const headers = { "Content-Type": "application/json" };
        const body = { username, email, password };
        const data = await request("/auth/register", "POST", headers, body);
        console.log(data);
        dispatch(register(data));
        navigate("/");
        toast("Registered successfully")
      } else {
        if (email === "" || password === "") {
          setError("Fill all fields!");
          setTimeout(() => {
            setError(null);
          }, 2500);
          return;
        }
        const headers = { "Content-Type": "application/json" };
        const body = { email, password };
        const data = await request("/auth/login", "POST", headers, body);
        dispatch(login(data));
        navigate("/");
      }
    } catch (error) {
      console.error("Authentication error:", error);
      setError("An error occurred. Please try again.");
      setTimeout(() => {
        setError(null);
      }, 2500);
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-r from-gray-700 via-gray-900 to-black">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full">
        {" "}
        <h2 className=" text-2xl font-semibold text-gray text-red-500 mb-5">
          {" "}
          <img
            src="https://thumbs.dreamstime.com/b/graphic-alphabet-letters-letter-g-peacock-style-zodiac-sign-letter-g-peacock-style-zodiac-sign-318669012.jpg"
            alt="logo"
            className="h-10 w-10 mr-3"
          />
          Social MediaApp
        </h2>
        <h2 className="text-center text-2xl font-semibold text-gray-700 mb-6">
          {isRegister ? "Create Your Account" : "Login Into Your Account"}
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <input
              type="text"
              placeholder="Username"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setUsername(e.target.value)}
            />
          )}
          <input
            type="email"
            placeholder="Email address"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            {isRegister ? "Sign Up" : " Sign In"}
          </button>
        </form>
      
        <p className="text-center mt-6 text-gray-600">
          {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
          <span
            onClick={() => setIsRegister(!isRegister)}
            className="text-blue-600 cursor-pointer"
          >
            {isRegister ? "Sign In" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Auth;
