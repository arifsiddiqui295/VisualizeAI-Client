import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import SearchBar from '../components/SearchBar'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from 'react-router-dom'
import { useCheckUser } from '../contexts/CheckUserContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { useCookies } from 'react-cookie'
const Home = () => {
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const navigate = useNavigate();
  const [profileUser, setProfileUser] = useState();
  const [item, setItem] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const token = localStorage.getItem('jwt');
        // console.log('token from checkuser nav =', token)
        const response = await axios.post('https://visualizeai-server-production.up.railway.app/checkuser', {}, {
          withCredentials: true,
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        // console.log("response  =", response);
        if (!response.data.status) {
          removeCookie('token');
          navigate('/');
        } else {
          setProfileUser(response.data.user);
          // console.log('profile user1 =', response.data.user)
        }
      } catch (error) {
        console.error('Error occurred while verifying user:', error);
      }
    };
    verifyUser();
  }, [profileUser, removeCookie]);

  useEffect(() => {
    const getFeedPost = async () => {
      try {
        const response = await axios.post('https://visualizeai-server-production.up.railway.app/getFeedPost');
        // console.log("response from home posts = ", response.data.data);
        const arr = response.data.data;
        arr.reverse()
        // console.log('reverse array = ', arr);
        setItem(arr);
      } catch (error) {
        console.error('Error occurred while fetching feed posts:', error);
      }
    };
    getFeedPost();
  }, [likedPosts, profileUser]);

  const toggleLiked = async (postId) => {
    try {
      const token = localStorage.getItem('jwt');
      const response = await axios.post('https://visualizeai-server-production.up.railway.app/toggleLiked', { postId, profileUser }, {
        withCredentials: true,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log("response from toggle liked: ", response);
      if (response.data.message === 'Unauthorized') {
        toast("You are not Logged In!");
      }
      setLikedPosts(response.data.like)
      // console.log(likedPosts)
    } catch (error) {
      console.error('Error occurred while toggling like:', error);
    }
  };

  return (
    <Container>
      <ToastContainer
        className="sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 fixed top-10 right-10 p-2"
      // Additional props as needed
      />
      {/* // console.log('toastbox',toastBox) */}
      <HeadLine>
        Explore popular posts in the Community
        <Span>
          ⦿ Genereted With AI ⦿
        </Span>
      </HeadLine>
      {/* <SearchBar /> */}
      <div className='grid justify-center items-center gap-8 xl:grid-cols-3 sm:grid-cols-2'>
        {item && item.map((element, index) => {
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
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40" />

              {/* Prompt */}
              <h3 className="p-2 z-10 mt-3 text-xl text-white">{element.prompt}</h3>

              {/* Name */}
              <div className="p-2 z-10 gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                {element.name}
              </div>
            </article>
          );
        })}
      </div>

    </Container>
  )
}
const HeadLine = styled.div`
  font-size:34px;
  font-weight:600;
  color: ${({ theme }) => theme.text_primary};
  display:flex;
  align-items:center;
  flex-direction:column;
  @median(max-width:600px){
    font-size:22px;
  }
`
const Span = styled.div`
font-size:30px;
font-weight:800;
color: ${({ theme }) => theme.secondary};
`
const Container = styled.div`
  height:100%;
  overflow-y:scroll;
  padding: 30px 30px;
  background: ${({ theme }) => theme.bg}; 
  padding-bottom:50px;
  display:flex;
  flex-direction:column;
  align-items:center;
  gap:20px;
  @media (max-width: 600px) {
    padding: 6px 10px;
  }
`
export default Home