// import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
// import Navbar from '../../components/navbar/Navbar';
// import { AiOutlineFileImage } from 'react-icons/ai';
// import { request } from '../../util/request';
// import { useNavigate } from 'react-router-dom';

// const UpdateProfile = () => {
//     const { user, token } = useSelector((state) => state.auth);
//     const [username, setUsername] = useState(user.username);
//     const [email, setEmail] = useState(user.email);
//     const [profilePic, setProfilePic] = useState(null);
//     const [coverPic, setCoverPic] = useState(null);
//     const navigate = useNavigate();

//     const handleUpdate = async (e) => {
//         e.preventDefault();

//         const body = {
//             username,
//             email
//         };

//         try {
//             // Handling profile picture upload
//             if (profilePic) {
//                 const profilePicName = crypto.randomUUID() + profilePic.name;
//                 const formData = new FormData();
//                 formData.append("mediaUrl", profilePicName);
//                 formData.append("media", profilePic);
//                 await request(`/upload`, 'POST', {}, formData, true);
//                 body.profilePic = profilePicName;
//             }

//             // Handling cover picture upload
//             if (coverPic) {
//                 const coverPicName = crypto.randomUUID() + coverPic.name;
//                 const formData = new FormData();
//                 formData.append("mediaUrl", coverPicName);
//                 formData.append("media", coverPic);
//                 await request(`/upload`, 'POST', {}, formData, true);
//                 body.coverPic = coverPicName;
//             }

//             const headers = {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`
//             };

//             await request(`/user/update/${user._id}`, 'PUT', headers, body);

//             navigate(`/profile/${user._id}`);
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     return (
//         <>
//             <Navbar />
//             <div className="h-[calc(100vh-60px)] w-full flex items-center justify-center">
//                 <div className="w-full max-w-sm p-4 border border-gray-300 rounded-lg bg-white shadow-md">
//                     <form className="flex flex-col items-center gap-6" onSubmit={handleUpdate}>
//                         <h2 className="text-xl font-semibold">Update Profile</h2>
//                         <div className="w-full flex flex-col gap-2">
//                             <label htmlFor='username' className="flex items-center gap-2">Username</label>
//                             <input
//                                 type="text"
//                                 id='username'
//                                 value={username}
//                                 onChange={(e) => setUsername(e.target.value)}
//                                 className="w-full border border-gray-300 rounded-md p-2"
//                             />
//                         </div>
//                         <div className="w-full flex flex-col gap-2">
//                             <label htmlFor='email' className="flex items-center gap-2">Email</label>
//                             <input
//                                 type="email"
//                                 id='email'
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                                 className="w-full border border-gray-300 rounded-md p-2"
//                             />
//                         </div>
//                         <div className="w-full flex flex-col gap-2">
//                             <label htmlFor='profilePic' className="flex items-center gap-2 cursor-pointer">
//                                 Profile Picture <AiOutlineFileImage />
//                             </label>
//                             <input
//                                 type="file"
//                                 id='profilePic'
//                                 accept="image/*"
//                                 className="hidden"
//                                 onChange={(e) => setProfilePic(e.target.files[0])}
//                             />
//                         </div>
//                         <div className="w-full flex flex-col gap-2">
//                             <label htmlFor='coverPic' className="flex items-center gap-2 cursor-pointer">
//                                 Cover Picture <AiOutlineFileImage />
//                             </label>
//                             <input
//                                 type="file"
//                                 id='coverPic'
//                                 accept="image/*"
//                                 className="hidden"
//                                 onChange={(e) => setCoverPic(e.target.files[0])}
//                             />
//                         </div>
//                         <button
//                             type="submit"
//                             className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         >
//                             Submit
//                         </button>
//                     </form>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default UpdateProfile;


import person from '../../assets/na.jpeg';  // Import the default image
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../../components/navbar/Navbar';
import { AiOutlineFileImage } from 'react-icons/ai';
import { request } from '../../util/request';
import { useNavigate } from 'react-router-dom';
import { CiImageOn } from "react-icons/ci";

const UpdateProfile = () => {
    const { user, token } = useSelector((state) => state.auth);
    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [profilePic, setProfilePic] = useState(null);
    const [coverPic, setCoverPic] = useState(null);
    const navigate = useNavigate();

    const handleUpdate = async (e) => {
        e.preventDefault();

        const body = {
            username,
            email,
        };

        try {
            if (profilePic) {
                const profilePicName = crypto.randomUUID() + profilePic.name;
                const formData = new FormData();
                formData.append('mediaUrl', profilePicName);
                formData.append('media', profilePic);
                await request(`/upload`, 'POST', {}, formData, true);
                body.profilePic = profilePicName;
            }

            if (coverPic) {
                const coverPicName = crypto.randomUUID() + coverPic.name;
                const formData = new FormData();
                formData.append('mediaUrl', coverPicName);
                formData.append('media', coverPic);
                await request(`/upload`, 'POST', {}, formData, true);
                body.coverPic = coverPicName;
            }

            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            };

            await request(`/user/update/${user._id}`, 'PUT', headers, body);

            navigate(`/profile/${user._id}`);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="h-[calc(100vh-60px)] w-full flex items-center justify-center bg-gray-100">
                <div className="w-full max-w-2xl p-6 border border-gray-300 rounded-lg bg-white shadow-md">
                    <div className="relative">
                        {/* Cover Photo Section */}
                        <img
                            src={coverPic ? URL.createObjectURL(coverPic) : user.coverPic || person}
                            alt="Cover"
                            className="w-full h-48 object-cover rounded-lg"
                        />
                        change coverPic
                        
                        <label
                            htmlFor="coverPic"
                            className="absolute top-3 right-3 p-2 bg-gray-700 text-white rounded-full cursor-pointer"
                        >
                            <CiImageOn size={20} />   
                        </label>
                        
                        <input
                            type="file"
                            id="coverPic"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => setCoverPic(e.target.files[0])}
                        />
                    </div>

                    <div className="flex items-center mt-6">
                        {/* Profile Picture Section */}
                        <div className="relative">
                            <img
                                src={profilePic ? URL.createObjectURL(profilePic) : user.profilePic || person}
                                alt="Profile"
                                className="w-24 h-24 rounded-full border-4 border-white object-cover shadow-lg"
                            />
                             profilePic
                            <label
                                htmlFor="profilePic"
                                className="absolute bottom-0 right-0 p-1 bg-gray-700 text-white rounded-full cursor-pointer"
                            >
                                <CiImageOn size={20} />
                            </label>
                            <input
                                type="file"
                                id="profilePic"
                                accept="image/*"
                                className="hidden"
                                value={profilePic}
                                onChange={(e) => setProfilePic(e.target.files[0])}
                            />
                        </div>
                        <div className="ml-6">
                            {/* Username and Email */}
                            <form onSubmit={handleUpdate}>
                                <div>
                                    <label htmlFor="username" className="block text-gray-700 font-semibold">
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        id="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="mt-1 w-full border border-gray-300 rounded-md p-2"
                                    />
                                </div>
                                <div className="mt-4">
                                    <label htmlFor="email" className="block text-gray-700 font-semibold">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="mt-1 w-full border border-gray-300 rounded-md p-2"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                >
                                    Update Profile
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UpdateProfile;
