import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import GenerateImage from '../components/GenerateImage';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Loader from '../components/Loader';

const CreatePost = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const [profileUser, setProfileUser] = useState();

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const token = localStorage.getItem('jwt');
        const response = await axios.post('https://visualizeai-server-production.up.railway.app/checkuser', {}, {
          withCredentials: true,
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.data.status) {
          removeCookie('token');
          navigate('/');
        } else {
          setProfileUser(response.data.user);
        }
      } catch (error) {
        console.error('Error occurred while verifying user:', error);
      }
    };

    verifyUser();
  }, [cookies, navigate, removeCookie]);

  if (!profileUser) {
    return null; // or you can return a loading spinner
  }

  return (
    <>
      {/* <Loader /> */}
      <Container>
        <Wrapper>
          <GenerateImage />
        </Wrapper>
      </Container>
    </>
  );
};

const Wrapper = styled.div`
  width: 100%;
  flex: 1;
  height: fit-content;
  gap: 8%;
  padding: 32px 0px;
  display: flex;
  justify-content: center;
  @media(max-width: 768px) {
    flex-direction: column;
  }
`;

const Container = styled.div`
  height: 100%;
  overflow-y: scroll;
  padding: 30px 30px;
  background: ${({ theme }) => theme.bg};
  padding-bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  @media (max-width: 600px) {
    padding: 6px 10px;
  }
`;

export default CreatePost;
