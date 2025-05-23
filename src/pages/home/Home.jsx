
import React, { useState, useEffect } from 'react';
import { request } from '../../util/request'; 
import Post from '../../components/post/Post'; // Ensure this path is correct
import Sidebar from '../../components/sidebar/Sidebar'; // Import Sidebar
import Navbar from '../../components/navbar/Navbar'; // Import Navbar
import Posts from '../../components/posts/Posts'; // Import Posts
import RightBar from '../../components/rightbar/Rightbar'; 

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Make a GET request to the API endpoint '/post/all' to fetch all posts.
        const data = await request('/post/all', 'GET'); // Ensure endpoint is correct
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-r from-[#c33764] to-[#1d2671] text-white ">
      <Navbar /> 
      <main className="flex flex-1 mt-3">
        <Sidebar /> 
        <div className="flex-1 mx-4">
          <Posts /> 
          <div className="mt-1">
            {posts.length > 0 ? (
              posts.map((post) => (
                <Post key={post._id} post={post} setUserPosts={setPosts} />
              ))
            ) : (
              <p className="text-center text-gray-500">No posts available</p>
            )}
          </div>
        </div>
        <RightBar />
      </main>
    </div>
  );
};

export default Home;

