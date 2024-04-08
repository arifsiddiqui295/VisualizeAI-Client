import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { Navigate, useNavigate } from 'react-router-dom'
const Signup = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const generateError = (error) => {
        toast.error(error);
    }
    const registerHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://visualizeai-server-production.up.railway.app/register', { username, email, password }, { withCredentials: true });
            // console.log("response: ", response);
            if (response.data.errors) {
                const { username, password } = response.data.errors;
                if (!username) {
                    generateError("Check Username or Password ");
                } 
                else{
                    generateError(username)
                }
            } else {
                navigate('/profile');
            }
        } catch (error) {
            console.error('Error occurred:', error);
        }
    }
    
    return (
        <div>
            <ToastContainer />
            <>
                <section className="min-h-screen flex items-stretch text-white ">
                    <div
                        className="lg:flex w-1/2 hidden bg-no-repeat bg-cover relative items-center"
                        style={{
                            backgroundImage:
                                "url(https://images.unsplash.com/photo-1577495508048-b635879837f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80)"
                        }}
                    >
                        <div className="absolute bg-black opacity-60 inset-0 z-0" />
                        <div className="w-full px-24 z-10">
                            <h1 className="text-5xl font-bold text-left tracking-wide">
                                Keep it special
                            </h1>
                            <p className="text-3xl mb-40 my-4">
                                Capture your personal memory in unique way, anywhere.
                            </p>
                        </div>
                    </div>
                    <div
                        className="lg:w-1/2 w-full flex items-start mt-6 justify-center text-center md:px-16 px-0 z-0"
                    >
                        <div className="w-full py-6 z-20">
                            <h1 className='text-6xl mb-6'>GenAI</h1>
                            {/* <div className="py-6 space-x-2">
                                <span className="w-10 h-10 items-center justify-center inline-flex rounded-full font-bold text-lg border-2 border-white">
                                    f
                                </span>
                                <span className="w-10 h-10 items-center justify-center inline-flex rounded-full font-bold text-lg border-2 border-white">
                                    G+
                                </span>
                                <span className="w-10 h-10 items-center justify-center inline-flex rounded-full font-bold text-lg border-2 border-white">
                                    in
                                </span>
                            </div> */}
                            <p
                             onClick={()=>{navigate('/login')}}
                            className="text-gray-100 mt-10 mb-10 text-xl">Already a customer? Click for  <span className='text-[#007aff] cursor-pointer underline'>Login</span></p>
                            <form action="" className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto">
                                <div className="pb-2 pt-4">
                                    <input
                                        type="text"
                                        id="email"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder="Username"
                                        className="block w-full p-4 text-lg rounded-xl bg-black"
                                    />
                                </div>
                                <div className="pb-2 pt-4">
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="email"
                                        className="block w-full p-4 text-lg rounded-xl bg-black"
                                    />
                                </div>
                                <div className="pb-2 pt-4">
                                    <input
                                        className="block w-full p-4 text-lg rounded-xl bg-black"
                                        type="password"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Password"
                                    />
                                </div>
                                <div className="px-4 pb-2 pt-4">
                                    <button
                                        onClick={registerHandler}
                                        className="uppercase block w-full p-4 text-lg rounded-xl bg-indigo-500 hover:bg-indigo-600 focus:outline-none">
                                        sign up
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </>

        </div>
    )
}

export default Signup