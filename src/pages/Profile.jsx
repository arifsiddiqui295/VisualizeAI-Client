import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
const Profile = () => {
    const navigate = useNavigate()
    const [cookies, setCookie, removeCookie] = useCookies([])
    const [profileUser, setProfileUser] = useState()
    const [mapPost, setMapPost] = useState('')
    const [likedPosts, setLikedPosts] = useState([]);
    useEffect(() => {
        const verifyUser = async () => {
            if (!cookies.jwt) {
                navigate('/login');
            } else {
                try {
                    const response = await axios.post('https://visualizeai-server-production.up.railway.app/checkuser', {}, { withCredentials: true });
                    // console.log("response: ", response);
                    getPost();
                    if (!response.data.status) {
                        removeCookie('token');
                        navigate('/login');
                    } else {
                        setProfileUser(response.data.user); // Set profileUser state after successful authentication
                        toast(`hi ${response.data.user}`, { theme: 'dark' });
                    }
                } catch (error) {
                    console.error('Error occurred:', error);
                    removeCookie('token');
                    navigate('/login');
                }
            }
        };
        const getPost = async () => {
            try {
                const response = await axios.post('https://visualizeai-server-production.up.railway.app/getPost', { profileUser });
                // console.log("response for profile = ", response.data.data);
                const arr=response.data.data;
                // console.log('arr = ',arr)
                arr.reverse()
                // console.log('arr = ',arr)
                setMapPost(arr); // Set mapUser state with the fetched posts
                // console.log("mapPost: ", mapPost[0].photo);
            } catch (error) {
                // console.error('Error occurred while fetching posts:', error);
                // Handle error appropriately, such as displaying a toast message or redirecting to an error page
            }
        };

        verifyUser();
    }, [cookies, navigate, likedPosts, profileUser]);

    const logout = () => {
        removeCookie("jwt");
        navigate('/login');
    }
    const toggleLiked = async (postId) => {
        try {
            // console.log("profile user = ", profileUser);
            const response = await axios.post('https://visualizeai-server-production.up.railway.app/toggleLiked', { postId, profileUser }, { withCredentials: true });
            // console.log("response from toggle liked: ", response.data.like);
            setLikedPosts(response.data.like)
            // console.log(likedPosts)
        } catch (error) {
            console.error('Error occurred while toggling like:', error);
        }
    };
    return (
        <div className='w-screen h-screen overflow-y-auto'>
            {/* <ToastContainer /> */}
            {/* <button className='bg-sky-400 p-2' onClick={logout}>Logout</button> */}
            {/* {console.log("map Post = ", mapPost)} */}
            <h1 className='text-center mt-10 text-5xl'>Your Uploads</h1>
            <div className='flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 w-full overflow-y-auto'>
                {mapPost && mapPost.map((element, index) => {
                    return (
                        <article
                            key={element._id}
                            className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl pb-8 pt-36 sm:pt-40 md:pt-44 lg:pt-48 xl:pt-52 w-80 sm:w-96 md:w-108 lg:w-120 xl:w-132 mx-auto mt-8 sm:mt-14 mb-8 sm:mb-10 transition duration-300 transform hover:scale-105"
                        >
                            {/* Like Button */}
                            <div className='flex flex-col items-center justify-center absolute top-0 right-0 z-10 m-4'>
                                {element.like.includes(profileUser) ? (
                                    <FavoriteIcon
                                        style={{ color: '#ff1075', fontSize: '40px' }}
                                        className=""
                                        onClick={() => toggleLiked(element._id)}
                                    />
                                ) : (
                                    <FavoriteBorderIcon
                                        style={{ color: 'white', fontSize: '40px' }}
                                        onClick={() => toggleLiked(element._id)}
                                    />
                                )}
                                <p className='z-20 text-white'>{element.like.length}</p>
                            </div>

                            {/* Image */}
                            <img
                                src={element.photo}
                                alt="University of Southern California"
                                className="absolute inset-0 h-full w-full object-cover"
                                style={{
                                    backgroundSize: 'cover',
                                }}
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40" />

                            {/* Prompt */}
                            <h3 className="z-10 p-2 mt-3 text-xl text-white">{element.prompt}</h3>

                            {/* Name */}
                            <div className="p-2 z-10 gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                                {element.name}
                            </div>
                        </article>
                    );
                })}
            </div>

        </div>

    )
}

export default Profile