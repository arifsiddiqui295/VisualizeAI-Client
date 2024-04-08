import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import CreatePost from './pages/CreatePost';
import Home from './pages/Home';
import { darkTheme } from './utils/Themes';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { CheckUserProvider } from './contexts/CheckUserContext';
import Profile from './pages/Profile';
const App = () => {
  return (
    <CheckUserProvider>
      <ThemeProvider theme={darkTheme}>
        <Container>
          <Wrapper>
            <BrowserRouter>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/post" element={<CreatePost />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </BrowserRouter>
          </Wrapper>
        </Container>
      </ThemeProvider>
    </CheckUserProvider>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  background-color: ${({ theme }) => theme.bg}; 
  color: ${({ theme }) => theme.text_primary};
  overflow-x: hidden; 
  overflow-y: hidden; 
  transition: all 0.5s ease-in-out;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 3;
`;

export default App;
