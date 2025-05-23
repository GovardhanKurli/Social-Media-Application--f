// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { FcLike } from "react-icons/fc";


// //backend usl
// const BACKEND_URL = `http://localhost:5001/videos/`;

// const VideoPosts = () => {
//     const [videos, setVideos] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchPosts = async () => {
//             try {
//                 const response = await axios.get('http://localhost:5001/post/all');
//                 // Filter the posts to only include those with videos
//                 const videoPosts = response.data.filter(post => post.videoUrl);
//                 setVideos(videoPosts);
//                 console.log(videoPosts)
//             } catch (error) {
//                 setError('Error fetching video posts');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchPosts();
//     }, []);

//     if (loading) return <p className="text-center text-gray-500">Loading...</p>;
//     if (error) return <p className="text-center text-red-500">{error}</p>;

//     return (
//         <div className="p-6 max-w-3xl mx-auto">
//             <h1 className="text-3xl mb-6 text-center text-gray-800">Video Posts {videos.length} </h1>
//             <ul className="list-none p-0">
//                 {videos.map(video => (
//                     <li key={video._id} className="border border-gray-300 rounded-lg p-4 mb-4 bg-gray-50 hover:bg-gray-100 transition-colors">
//                         <p className="text-base text-gray-700 mb-4">{video.updatedAt                        }</p>
//                          <video
//                             controls
//                             src={`${BACKEND_URL}${video.videoUrl}`} // Ensure URL is correct
//                             className="w-full h-auto rounded-lg shadow-lg"
//                             type="video/mp4" // Specify the correct MIME type
//                         >

//                             Your browser does not support the video tag.
//                         </video>
//                         <h3>{video.likes.length} <FcLike /></h3>
//                         {/* Add more video details here if needed */}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default VideoPosts;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FcLike } from "react-icons/fc";

// Backend URL
const BACKEND_URL = `http://localhost:5001/videos/`;

const VideoPosts = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [fullscreenVideo, setFullscreenVideo] = useState(null); // State for full-screen video

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:5001/post/all');
                // Filter the posts to only include those with videos
                const videoPosts = response.data.filter(post => post.videoUrl);
                setVideos(videoPosts);
                console.log(videoPosts);
            } catch (error) {
                setError('Error fetching video posts');
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) return <p className="text-center text-gray-500">Loading...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    const handleVideoClick = (videoUrl) => {
        setFullscreenVideo(videoUrl);
    };

    const handleExitFullscreen = () => {
        setFullscreenVideo(null);
    };

    return (
        <div className="p-6 max-w-6xl mx-auto h-screen bg-red-400">
            <h1 className="text-3xl mb-6 text-center text-gray-800">Videos</h1>

            {fullscreenVideo ? (
                <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
                    <video
                        controls
                        src={`${BACKEND_URL}${fullscreenVideo}`}
                        className="w-full h-full max-h-screen max-w-screen rounded-lg shadow-lg"
                        type="video/mp4"
                        autoPlay
                    >
                        Your browser does not support the video tag.
                    </video>
                    <button onClick={handleExitFullscreen} className="absolute top-4 right-4 text-white text-xl">
                        Exit Fullscreen
                    </button>
                </div>
            ) : (
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {videos.map(video => (
                        <li
                            key={video._id}
                            className="border border-gray-300 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                            onClick={() => handleVideoClick(video.videoUrl)}
                        >
                            <p className="text-sm text-gray-700 mb-2">{new Date(video.updatedAt).toLocaleDateString()}</p>
                            <video
                                src={`${BACKEND_URL}${video.videoUrl}`}
                                className="w-full h-40 object-cover rounded-lg shadow-lg"
                                type="video/mp4"
                                controls
                            >
                                Your browser does not support the video tag.
                            </video>
                            <h3 className="mt-2 text-gray-800 text-lg flex items-center">
                                {video.likes.length} <FcLike className="ml-1" />
                            </h3>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default VideoPosts;
