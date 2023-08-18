import { useEffect } from 'react';
import styled from "styled-components";

function HomePage() {

  useEffect(() => {
  }, []);

  return (
    <Wrapper>
        Hello from Homepage!
    </Wrapper>
  )

}

const Wrapper = styled.div` 
    display: flex;
`;


export default HomePage;