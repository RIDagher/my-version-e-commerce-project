import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header";
import HomePage from "./HomePage";
import styled from "styled-components";

function App() {

  useEffect(() => {
  }, []);

  return (

    <BrowserRouter>

      <Header />
      <Wrapper>
        <Routes>
            <Route path="/" element={<HomePage />} />          
        </Routes>   
      </Wrapper>
    </BrowserRouter>
  )

}

const Wrapper = styled.div` 
  display: flex;
`;


export default App;
