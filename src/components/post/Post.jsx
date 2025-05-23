

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';
import { request } from '../../util/request';
import {  AiOutlineEllipsis } from 'react-icons/ai';
import { FaComment } from "react-icons/fa6";
import { IoHeartDislikeOutline } from "react-icons/io5";
import Comment from '../comment/Comment';
import person from '../../assets/na.jpeg';
import { FcLike } from "react-icons/fc";
import { toast } from 'react-toastify';

const Post = ({ post, setUserPosts }) => {
  const { user, token } = useSelector((state) => state.auth);
  const [authorDetails, setAuthorDetails] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [isLiked, setIsLiked] = useState(post?.likes?.includes(user._id));
  const [showOptions, setShowOptions] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(post?.desc);
  const [likes, setLikes] = useState(post?.likes?.length);
  const [isExpanded, setIsExpanded] = useState(false);
  const MAX_LENGTH = 30;

  useEffect(() => {
    if (post.userId) {
      fetchDetails();
    }
  }, [post.userId]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await request(`/comment/${post._id}`, 'GET');
        setComments(data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
    fetchComments();
  }, [post._id]);

  const fetchDetails = async () => {
    try {
      const response = await fetch(`http://localhost:5001/user/find/${post.userId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setAuthorDetails(data);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const handleLike = async () => {
    const headers = { 'Authorization': `Bearer ${token}` };
    try {
      await request(`/post/likePost/${post._id}`, "PUT", headers);
      setIsLiked(prev => !prev);
      setLikes(prev => prev + 1);
    } catch (error) {
      console.error('Error liking the post:', error);
    }
  };

  const handleDislike = async () => {
    const headers = { 'Authorization': `Bearer ${token}` };
    try {
      await request(`/post/dislikePost/${post._id}`, "PUT", headers);
      setIsLiked(prev => !prev);
      setLikes(prev => prev - 1);
    } catch (error) {
      console.error('Error disliking the post:', error);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
    try {
      const data = await request('/comment', 'POST', headers, { text: commentText, postId: post._id });
      setComments(prev => [data, ...prev]);
      setCommentText("");

    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  const handleDeletePost = async () => {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
    try {
      const res = await request(`/post/deletePost/${post._id}`, 'DELETE', headers);
      if (res.message === "Post has been deleted") {
        window.location.reload();
       
      }
      if (setUserPosts) {
        setUserPosts(prevPosts => prevPosts.filter(p => p._id !== post._id));
        toast("post was deleted",)
      }
      
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleSaveEdit = async () => {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
    try {
      const res = await request(`/post/updatePost/${post._id}`, 'PUT', headers, { desc: editContent });
      if (res) {
        window.location.reload();
      }
      if (setUserPosts) {
        setUserPosts(prevPosts =>
          prevPosts.map(p => (p._id === post._id ? res : p))
        );
      }
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col border border-gray-300  overflow-hidden mt-8 relative bg-white shadow-lg">
      <div className="py-4 px-6 flex items-center justify-between  border-gray-300">
        <Link to={`/profile/${post.userId}`} className="flex items-center gap-2 text-inherit">
          <img
            src={authorDetails?.profilePic ? `http://localhost:5001/images/${authorDetails.profilePic}` : person}
            alt="Author"
            className="h-12 w-12 object-cover rounded-full border border-gray-300"
          />
          <div className="flex flex-col gap-1">
            <span className="font-bold text-black ">{authorDetails?.username}</span>
            <span className="text-sm text-gray-700"> .{format(post?.createdAt)}</span>
          </div>
        </Link>
        {user._id === post.userId && (
          <div className="relative">
            <AiOutlineEllipsis
              className="text-2xl text-gray-600 cursor-pointer"
              onClick={() => setShowOptions(!showOptions)}
            />
            {showOptions && (
              <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() => {
                    setIsEditing(true);
                    setShowOptions(false);
                  }}
                >
                  Edit
                </button>
                <button
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                  onClick={handleDeletePost}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      {isEditing ? (
        <div className="p-6">
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md resize-none"
            rows="4"
          />
          <div className="flex gap-2 mt-4">
            <button
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              onClick={handleSaveEdit}
            >
              change
            </button>
            <button
              className="bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-gray-500"
              onClick={() => setIsEditing(false)}
            >
              Back
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* <p className="p-4 text-gray-600 text-lg leading-relaxed">{post?.desc}</p> */}

           {/* /write content for..... read more */}
         
      <p className=" text-gray-600 text-lg leading-relaxed font-sans;">
      {isExpanded ? post?.desc : `${post?.desc?.slice(0, MAX_LENGTH)}`}
      {post?.desc?.length > MAX_LENGTH && (
    <button onClick={() => setIsExpanded(!isExpanded)} className=" text-gray-600 text-xs text-blue-800 " >
       {isExpanded ? '...Show less' : ' ...Read more'}
     </button> 
      )}
      </p>
      
  

          {post.mediaType === "image" && post.imageUrl && (
            <div className="w-full h-64 bg-gray-200">
              <img
                src={`http://localhost:5001/images/${post.imageUrl}`}
                alt="Post"
                className="w-full h-full object-cover"
              />
            </div>
          )}
          {post.mediaType === "video" && post.videoUrl && (
            <div className="w-full h-64 bg-gray-200">
              <video controls className="w-full h-full object-cover">
                <source src={`http://localhost:5001/videos/${post.videoUrl}`} type="video/mp4" />
              </video>
            </div>
          )}

          <div className="py-4 px-6 flex justify-between items-center border-t border-gray-300">
            
            <span
              className="flex items-center gap-2 text-gray-600 cursor-pointer"
              onClick={isLiked ? handleDislike : handleLike}
            >
              {isLiked ? (
                <>
                  <FcLike />  {likes}likes
                </>
              ) : (
                <>
              <IoHeartDislikeOutline />    {likes}likes 
                </>
              )}
            </span>
            {/* <span className="text-gray-600"> <FcLike />{likes}likes </span> */}

            
            <span
              className="flex items-center gap-2 text-gray-600 cursor-pointer"
              onClick={() => setShowComments(prev => !prev)}
            >
              Comment <FaComment />
            </span>
          </div>
          {showComments && (
            <div className="flex flex-col gap-6 py-4 px-6">
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <Comment comment={comment} key={comment._id} />
                ))
              ) : (
                <h3 className="py-5 text-gray-500">No comments yet.</h3>
              )}
              <form
                className="flex items-center gap-2 p-4 border-t border-gray-300"
                onSubmit={handleComment}
              >
                <textarea
                  value={commentText}
                  placeholder='Type your comment...'
                  onChange={(e) => setCommentText(e.target.value)}
                  className="flex-1 p-3 border border-gray-300 rounded-md resize-none"
                  rows="2"
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                >
                  Post
                </button>
              </form>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Post;