import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { request } from '../../util/request';
import { updateUserProfile } from '../../redux/authSlice';
import coverPicture from '../../assets/na.jpeg';
import profilePicture from '../../assets/na.jpeg';
import Share from '../share/Share';
import Post from '../post/Post';

const Profile = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { user, token } = useSelector((state) => state.auth);
    const [userPosts, setUserPosts] = useState([]);
    const [isFollowed, setIsFollowed] = useState(false);
    const [profileDetails, setProfileDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const BACKEND_URL = `http://localhost:5001/images/`;

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                // Fetch user posts
                const response = await request(`/post/find/userposts/${id}`, 'GET');
                setUserPosts(response);
            } catch (error) {
                // Handle error
                setError('Error fetching posts');
                console.error('Error fetching posts:', error);
            }
        };

        const fetchUserData = async () => {
            try {
                // Fetch user data
                const response = await request(`/user/find/${id}`, 'GET', {
                    'Authorization': `Bearer ${token}`
                });

        
                setProfileDetails(response);

                
                setIsFollowed(response.followers.includes(user._id));
                if (id === user._id) {
                    dispatch(updateUserProfile(response));
                }
            } catch (error) {
                // Handle error
                setError('Error fetching user data');
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
        fetchUserData();
    }, [id, user._id, token, dispatch]);

    const handleFollow = async () => {
        try {
            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            };

            // Toggle follow/unfollow based on current state
            if (isFollowed) {
                await request(`/user/unfollow/${id}`, 'PUT', headers, { userId: user._id });
            } else {
                await request(`/user/follow/${id}`, 'PUT', headers, { userId: user._id });
            }

            // Toggle follow state
            setIsFollowed(prev => !prev);
        } catch (error) {
            // Handle error
            setError('Error handling follow/unfollow');
            console.error('Error handling follow/unfollow:', error);
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="w-full max-w-5xl mx-auto py-6 px-4">
    {error && <p className="text-red-500">{error}</p>}
    <div className="relative">
        {/* Display cover picture */}
        <img
            src={profileDetails.coverPic ? `${BACKEND_URL}${profileDetails.coverPic}` : coverPicture}
            className="w-full h-72 object-cover"
            alt="Cover"
        />


        
        {/* Display profile picture */}
        <div className="absolute top-44 left-8 md:left-12 lg:left-16">
            <img
                src={profileDetails.profilePic ? `${BACKEND_URL}${profileDetails.profilePic}` : profilePicture}
                className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full object-cover border-4 border-white"
                alt="Profile"
            />
        </div>
    </div>

    <div className="flex flex-col md:flex-row justify-between items-center mt-20 px-4 md:px-8">
        <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold">{profileDetails.username}</h2>
            <div className="flex justify-center md:justify-start space-x-4 mt-4">
                <div className="text-center">
                    <span className="font-semibold">{userPosts.length}</span> <span className="text-gray-600">posts</span>
                </div>
                <div className="text-center">
                    <span className="font-semibold">{profileDetails.followers.length}</span> <span className="text-gray-600">followers</span>
                </div>
                <div className="text-center">
                    <span className="font-semibold">{profileDetails.followings.length}</span> <span className="text-gray-600">following</span>
                </div>
            </div>
        </div>
        {/* Follow/Unfollow button */}
        {id !== user._id && (
            <div className="flex-1 text-center md:text-right mt-4 md:mt-0">
                <button
                    className={`px-6 py-2 rounded-full text-white ${isFollowed ? 'bg-blue-500' : 'bg-blue-500'} hover:bg-opacity-80`}
                    onClick={handleFollow}
                >
                    {isFollowed ? 'Unfollow' : 'Follow'}
                </button>
            </div>
        )}
    </div>

    {/* Conditionally render the Share component for the logged-in user's profile */}
    {id === user._id && (
        <div className="mt-8">
            <Share setPosts={setUserPosts} />
        </div>
    )}

    <div className="mt-8">
        {/* Render user posts or show a message if there are none */}
        {userPosts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {userPosts.map(post => (
                    <Post key={post._id} post={post} />
                ))}
            </div>
        ) : (
            <p className="text-center text-gray-500">No posts available</p>
        )}
    </div>
</div>
    
    );
};

export default Profile;
