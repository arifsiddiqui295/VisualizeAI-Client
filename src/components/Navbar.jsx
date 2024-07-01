import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from './Button';
import { useCookies } from 'react-cookie';
import { AddRounded, ExploreRounded } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCheckUser } from '../contexts/CheckUserContext';
import MenuIcon from '@mui/icons-material/Menu';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import '../CSS/Navbar.css'
import AddIcon from '@mui/icons-material/Add';
import Loader from './Loader';
const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [cookies, setCookie, removeCookie] = useCookies([])
    const path = location.pathname.split('/');
    const [profileUser, setProfileUser] = useState();
    const [menuOpen, setMenuOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { checkUser, setCheckuser } = useCheckUser();


    useEffect(() => {
        const verifyUser = async () => {
            try {
                const token = localStorage.getItem('jwt');
                // console.log('token from checkuser home =', token)
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
                    console.log('profile user1 =', response.data.user)
                }
            } catch (error) {
                console.error('Error occurred while verifying user:', error);
            }
        };
        verifyUser();
    }, [cookies, removeCookie, setCheckuser, setProfileUser]);

    const handleMenuToggle = () => {
        setMenuOpen(!menuOpen);
    };
    const homeHandler=()=>{
        setLoading(true);
        setTimeout(() => {
            navigate('/');
            setMenuOpen(!menuOpen);
            setLoading(false);
        }, 0);
    }
    const loginhandeler = () => {
        setLoading(true);
        setTimeout(() => {
            navigate('/login');
            setMenuOpen(!menuOpen);
            setLoading(false);
        }, 0);
    }
    const signUphandeler = () => {
        setLoading(true);
        setTimeout(() => {
            navigate('/signup');
            setMenuOpen(!menuOpen);
            setLoading(false);
        }, 0);
    }
    const posthandeler = () => {
        setLoading(true);
        setTimeout(() => {
            navigate('/post');
            setMenuOpen(!menuOpen);
            setLoading(false);
        }, 0);
    }
    const logouthandeler = () => {
        // Update frontend state
        setLoading(true);
        setTimeout(() => {
            setMenuOpen(!menuOpen);
            setCheckuser(false);
            setProfileUser(false);

            // Clear token from localStorage
            localStorage.removeItem('jwt');

            // Clear token from cookies if applicable
            removeCookie('jwt'); // Use the appropriate function to remove the cookie

            // Optional: Redirect the user to the login page or another page
            navigate('/login');
            setLoading(false);
        }, 0);
        // If you're using React Router, navigate to the login page
    }
    const profileHandler = () => {
        setLoading(true);
        setTimeout(() => {
            setMenuOpen(!menuOpen);
            navigate('/profile')
            setLoading(false);
        }, 0);

    }
    return (
        <Container>
            <p onClick={homeHandler} className="cursor-pointer text-4xl"
                style={{
                    fontWeight: '500'
                }}
            >Visualize<span className='text-blue-400'>AI</span></p>
             {loading && (
                <Loader />
            )}
            {checkUser || profileUser ? (
                <div>
                    <div className='nav gap-7'>
                        <div className='gap-2 m-0 flex items-center justify-center'>
                            <AccountCircleIcon style={{ fontSize: 40 }} />
                            <button onClick={profileHandler}>Profile</button>
                        </div>
                        <button onClick={logouthandeler}>Logout</button>
                        {
                            path[1] === "post" ? (
                                <Button
                                    onClick={() => { navigate('/') }}
                                    text="Explore Post"
                                    leftIcon={<ExploreRounded style={{
                                        fontSize: "18px",
                                        color: "white"
                                    }} />
                                    }
                                    type="secondary"
                                />
                            ) : (<Button
                                onClick={posthandeler}
                                text="Create new Post"
                                leftIcon={<AddRounded style={{
                                    fontSize: "18px",
                                    color: "white"
                                }} />
                                }
                            />)
                        }
                    </div>
                    {/* {console.log(menuOpen)} */}
                    <div onClick={handleMenuToggle} className='menuIcon block md:hidden'>
                        {menuOpen ? <CloseIcon size={20} /> : <MenuIcon size={20} />}
                    </div>

                    {/* Mobile Navigation Menu */}
                    <ul
                        style={{
                            top: "3.7rem"
                        }}
                        className={
                            menuOpen
                                ? 'fixed md:hidden left-0 p-5 z-20 top-14 mt-0 w-[80%] h-full border-r border-r-gray-900 bg-[#12141f] ease-in-out duration-500'
                                : 'ease-in-out w-[80%] z-20 duration-500 fixed top-14 mt-0 bottom-0 left-[-100%]'
                        }
                    >
                        {/* Mobile Logo */}
                        {/* <p onClick={() => { navigate('/') }} className=" cursor-pointer text-4xl"
                            style={{
                                fontWeight: '500'
                            }}
                        >Visualize<span className='text-blue-400'>AI</span></p> */}

                        {/* Mobile Navigation Items */}
                        <div className=' p-2 mt-10 font-normal flex flex-col gap-4 text-2xl'>
                            <li className="" onClick={profileHandler}>Profile</li>
                            <li className="" onClick={logouthandeler}>Logout</li>
                            {
                                path[1] === "post" ? (
                                    <Button
                                        onClick={() => { navigate('/') }}
                                        text="Explore Post"
                                        leftIcon={<ExploreRounded style={{
                                            fontSize: "18px",
                                            color: "white"
                                        }} />
                                        }
                                        type="secondary"
                                    />
                                ) : (<Button
                                    onClick={posthandeler}
                                    text="Create new Post"
                                    leftIcon={<AddRounded style={{
                                        fontSize: "18px",
                                        color: "white"
                                    }} />
                                    }
                                />)
                            }
                        </div>
                    </ul>

                </div>
            ) :
                (
                    <div>
                        <div className='nav gap-7'>
                            <button className='font-normal text-xl' onClick={loginhandeler}>Login</button>
                            <button className='font-normal text-xl' onClick={signUphandeler}>Sign up</button>
                            {
                                path[1] === "post" ? (
                                    <Button
                                        onClick={() => { navigate('/') }}
                                        text="Explore Post"
                                        leftIcon={<ExploreRounded style={{
                                            fontSize: "18px",
                                            color: "white"
                                        }} />
                                        }
                                        type="secondary"
                                    />
                                ) : (<Button
                                    onClick={posthandeler}
                                    text="Create new Post"
                                    leftIcon={<AddRounded style={{
                                        fontSize: "18px",
                                        color: "white"
                                    }} />
                                    }
                                />)
                            }
                        </div>
                        {/* {console.log(menuOpen)} */}
                        <div onClick={handleMenuToggle} className='menuIcon block md:hidden'>
                            {menuOpen ? <CloseIcon size={20} /> : <MenuIcon size={20} />}
                        </div>

                        {/* Mobile Navigation Menu */}
                        <ul
                            style={{
                                top: "3.7rem"
                            }}
                            className={
                                menuOpen
                                    ? 'fixed md:hidden left-0 p-5 z-20 w-[80%] h-full border-r border-r-gray-900 bg-[#12141f] ease-in-out duration-500'
                                    : 'ease-in-out w-[80%] z-20 duration-500 fixed   bottom-0 left-[-100%]'
                            }
                        >
                            {/* Mobile Logo */}
                            {/* <p onClick={() => { navigate('/') }} className=" cursor-pointer text-4xl"
                                style={{
                                    fontWeight: '500'
                                }}
                            >Visualize<span className='text-blue-400'>AI</span></p> */}

                            {/* Mobile Navigation Items */}
                            <div className=' p-2 mt-10 font-normal flex flex-col gap-4 text-3xl'>
                                <li className="" onClick={loginhandeler}>Login</li>
                                <li className="" onClick={signUphandeler}>Sign Up</li>
                                <li className="post bg-[#007aff] p-4 rounded-lg gap-1 text-left m-0 flex items-center" onClick={posthandeler}> <AddIcon /> Create Post</li>
                            </div>
                        </ul>

                    </div>
                )
            }
        </Container>
    );
};

const Container = styled.div`
    background-color: #222;
    color: ${({ theme }) => theme.text_primary};
    font-weight: bold;
    padding: 14px; 
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    z-index: 1000;
    @media only screen and (max-width: 600px) {
        padding: 10px 12px;
    }
`;


export default Navbar;
