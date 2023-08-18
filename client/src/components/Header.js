import { useEffect } from 'react';
import styled from "styled-components";

function Header() {

  useEffect(() => {
  }, []);

  return (
    <Wrapper>
        Hello from header!   
    </Wrapper>
  )

}

const Wrapper = styled.div` 
    display: flex;
`;


export default Header;