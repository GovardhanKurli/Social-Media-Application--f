
import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { IoImageSharp } from "react-icons/io5";
import { useSelector } from 'react-redux';
import person from '../../assets/na.jpeg';
import LiveVideo from '../liveVideo/LiveVideo'; 
import { request } from '../../util/request';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Share = ({ setPosts }) => {
  const [desc, setDesc] = useState("");
  const [media, setMedia] = useState(null);
  const [mediaType, setMediaType] = useState("");
  const [isLiveVideo, setIsLiveVideo] = useState(false);
  const { token, user } = useSelector((state) => state.auth);

  const handleCreatePost = async () => {
    try {
      let filename = null;

      if (media) {
        const formData = new FormData();
        filename = crypto.randomUUID() + media.name;
        formData.append("mediaUrl", filename);
        formData.append("media", media);

        await request('/upload', 'POST', {}, formData, true);
      }

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      };

      const body = {
        mediaUrl: filename,
        mediaType,
        desc,
      };

      await request('/post', 'POST', headers, body);
      const updatedPosts = await request(`/post/timelinePosts`, 'GET', { 'Authorization': `Bearer ${token}` });
      setPosts(updatedPosts);
      setDesc("");
      setMedia(null);
      setMediaType("");
      setIsLiveVideo(false);
    } catch (error) {
      console.error(error);
      toast(` Sorry ${user.username} ! Please Select Img !`);
    }
  };

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const type = file.type.split('/')[0];
      if (type === 'image' || 'video') {
        setMedia(file);
        setMediaType(type);
        setIsLiveVideo(false);
      } else {
        // alert("!");

        toast(` Sorry ${user.username} ! Only images and videos are allowed !`);

      }
    }
  };

  const handleLiveVideoStop = (videoBlob) => {
    setMedia(videoBlob);
    setMediaType('video');
    setIsLiveVideo(true);
  };

  return (
    <div className="w-full flex flex-col items-center shadow-md p-3 bg-gradient-to-r from-[#cc2b5e] to-[#753a88] text-white rounded-xl">

      
      {/* Profile Picture and Username */}
      <div className="w-full flex flex-col items-center">
        <img
          src={user.profilePic ? `http://localhost:5001/images/${user.profilePic}` : person}
          alt="Profile"
          className="w-16 h-16 object-cover rounded-full mb-2"
        />
        <h4 className="text-lg font-semibold mb-2">{user.username}</h4>
        <p className="text-sm mb-4">Hello {user.username}, want to post? Click "Select Post"</p>
      </div>

      {/* Select Image and Post Option */}
      <div className="w-full flex justify-center items-center mb-4">
        <label htmlFor="media" className="flex items-center gap-2 text-white cursor-pointer">
          <IoImageSharp className="text-2xl" />
          Select Post
        </label>
      </div>

      {/* Media and Description Input */}
      {media && (
        <div className="relative w-full h-80 mt-4">
          <AiOutlineClose
            className="absolute top-2 right-2 h-4 w-4 rounded-full bg-white z-10 cursor-pointer"
            onClick={() => {
              setMedia(null);
              setMediaType("");
              setIsLiveVideo(false);
            }}
          />
          {mediaType === "image" ? (
            <img
              src={URL.createObjectURL(media)}
              className="w-full h-full object-cover"
              alt="Preview"
            />
          ) : (
            <video controls className="w-full h-full object-cover">
              <source src={URL.createObjectURL(media)} type={media.type} />
            </video>
          )}
        </div>
      )}

      <input
        type="file"
        id="media"
        className="hidden"
        onChange={handleMediaChange}
      />

      {/* Post Button */}
      {media && (
        <div className="w-full flex flex-col items-center mt-4">
          <input
            type="text"
            placeholder="Write Title"
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
            className="w-full border border-gray-400 rounded-lg p-2 outline-none text-black mb-4"
          />
          <button
            onClick={handleCreatePost}
            className="px-5 py-2 bg-gradient-to-r from-[#eecda3] to-[#ef629f] text-white rounded-lg"
          >
            Upload
          </button>
        </div>
      )}

      {/* Live Video Option */}



      
      {isLiveVideo && !media && (
        <LiveVideo onStop={handleLiveVideoStop} />


        
      )}
    </div>
  );
};

export default Share;



