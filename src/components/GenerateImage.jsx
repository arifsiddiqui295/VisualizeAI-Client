import React, { useState, useEffect } from 'react';
import { CreateRounded, AutoAwesome } from '@mui/icons-material';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
const GenerateImage = () => {
    const navigate = useNavigate()
    const [cookies, setCookie, removeCookie] = useCookies([])
    const [src, setSrc] = useState(null);
    const [loading, setLoading] = useState(false);
    const [author, setAuthor] = useState('');
    const [prompt, setPrompt] = useState('');
    const [user, setUser] = useState();
    const generateImage = async (e) => {
        e.preventDefault();
        // console.log("prompt", prompt);

        try {
            setLoading(true);
            const response = await axios.post("https://visualizeai-server-production.up.railway.app/api/v1/dalle", { author, prompt, src });
            setSrc(response.data.photo.data[0].url);
        } catch (error) {
            console.error("Error generating image:", error);
        } finally {
            setLoading(false);
        }
    }
    const postImage = async (e) => {
        e.preventDefault();
        // console.log(cookies.jwt);
        try {

            const response = await axios.post('https://visualizeai-server-production.up.railway.app/imagePost', { user, prompt, src });
            // console.log("response: ", response);
        } catch (error) {
            // console.error("Error fetching user:", error);
            // Handle the error gracefully (e.g., display an error message to the user)
        }
        navigate('/profile', { state: user });
    };
    useEffect(() => {
        const getUsers = async () => {
            const token = localStorage.getItem('jwt');
            // console.log('token from checkuser home =', token)
            const response = await axios.post('https://visualizeai-server-production.up.railway.app/checkuser', {}, {
                withCredentials: true,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log("userResponse: ", response);
            setUser(userResponse.data.user);
            // console.log("user:", user);
        }
        getUsers();
    }, [user])
    return (
        <div className='flex flex-col sm:flex-row gap-4 sm:gap-44'>
            <div className='flex flex-col w-full sm:w-full'>
                <div className='flex text-center justify-center flex-col mb-10'>
                    <h1 className='text-4xl mb-3 '>Generate Image using Prompt</h1>
                    {/* <p className='text-gray-300'>Write Your Prompt According to The Image You want to Generate</p> */}
                </div>
                <form className="max-w-md mx-auto">
                    <div className="mb-6">
                        <label htmlFor="prompt" className="block text-gray-400 font-bold mb-2">Prompt</label>
                        <textarea
                            id="prompt"
                            style={{ background: "#15171e", outline: "none", border: "1px solid #606265", color: "#919296" }}
                            placeholder='Enter the prompt to generate the Image....'
                            name="prompt"
                            value={prompt}
                            onChange={(e) => { setPrompt(e.target.value); }}
                            className="rounded py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-52 w-full sm:w-96 md:w-96 resize-none"
                        />
                    </div>

                    <div className='flex flex-col sm:flex-row gap-6'>
                        <button
                            type="submit"
                            className="flex gap-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded focus:outline-none focus:shadow-outline"
                            onClick={generateImage}
                        >
                            <AutoAwesome />
                            Generate Image
                        </button>
                        <button
                            type="submit"
                            className="flex gap-2 bg-purple-500 text-white font-bold py-2 px-5 rounded focus:outline-none focus:shadow-outline hover:bg-purple-700 brightness-100"
                            onClick={postImage}
                        >
                            <CreateRounded />
                            Post Image
                        </button>
                    </div>
                </form>
            </div>
            <div className='w-full sm:w-full'>
                <div style={{ width: "100%", height: "500px" }} className="md:ml-5  border-dotted flex items-center justify-center rounded-lg border-2 mt-6 border-yellow-500">
                    {loading && (
                        <div className='flex flex-col items-center justify-center gap-4 text-gray-300'>
                            <CircularProgress
                                style={{ color: "inherit", width: "44px", height: "44px" }}
                            />
                            <h1>Generating Your Image . . . . .</h1>
                        </div>
                    )}
                    {src && !loading && <img className='object-cover bg-center w-full h-full' src={src} alt="Generated Image" />}
                    {!src && !loading && <div>Write a Prompt to Generate Image</div>}
                </div>
            </div>
        </div>
    );
}

export default GenerateImage;
