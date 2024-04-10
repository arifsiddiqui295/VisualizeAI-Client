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
const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [cookies, setCookie, removeCookie] = useCookies([])
    const path = location.pathname.split('/');
    const [profileUser, setProfileUser] = useState();
    const { checkUser, setCheckuser } = useCheckUser();
    useEffect(() => {
        const verifyUser = async () => {
            try {
                // Check for presence of jwt cookie
                if (cookies.jwt) {
                    setProfileUser(true); // Assuming true indicates logged in
                    setCheckuser(true);
                } else {
                    // No cookie, proceed with verification request
                    const response = await axios.post('http://localhost:3000/checkuser', {}, { withCredentials: true });
                    // console.log("response from the navbar ", response.status)
                    if (!response.data.status) {
                        removeCookie('token');
                        setCheckuser(false);
                        navigate('/');
                    } else {
                        setProfileUser(response.data.user);
                    }
                }
            } catch (error) {
                // console.log('Error occurred while verifying user:', error);
            }
        };
        verifyUser();
    }, [cookies, removeCookie, setCheckuser,setProfileUser]);
    const [menuOpen, setMenuOpen] = useState(false);

    const handleMenuToggle = () => {
        setMenuOpen(!menuOpen);
    };
    const loginhandeler = () => {
        navigate('/login');
        setMenuOpen(!menuOpen);
    }
    const signUphandeler = () => {
        navigate('/signup');
        setMenuOpen(!menuOpen);
    }
    const posthandeler = () => {
        navigate('/post');
        setMenuOpen(!menuOpen);
    }
    const logouthandeler = () => {
        setMenuOpen(!menuOpen);
        // console.log('logouthandeler')
        removeCookie('jwt');
        setCheckuser(false);
        setProfileUser(false)
        // console.log('check user = ',checkUser)
        // console.log(checkUser)
    }
    const profileHandler = () => {
        setMenuOpen(!menuOpen);
        navigate('/profile')
    }
    return (
        <Container>
            <p onClick={() => { navigate('/') }} className="cursor-pointer text-4xl"
                style={{
                    fontWeight: '500'
                }}
            >Visualize<span className='text-blue-400'>AI</span></p>
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
