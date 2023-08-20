import { useEffect } from "react";
import styled from "styled-components";

function Confirmation() {

  useEffect(() => {

  }, []);

  return (
    <Wrapper>
        <p>.. all being well ..</p>
        <p><b>Order confirmed!</b></p>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
`;

export default Confirmation;
