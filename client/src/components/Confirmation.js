import { useEffect } from "react";
import styled from "styled-components";

const Confirmation = ({formData}) => {
  useEffect(() => {
    // need to clear the cart
    // endpoint needed

  }, []);

  return (
    <Wrapper>
        {formData.name &&
        <>
        <p>Your order is confirmed!</p>
        <p>It will be shipped to:</p>
        <p>{formData.name}</p>
        <p>{formData.address}</p>
        <p>{formData.email}</p>
        </>
        }
        
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
`;

export default Confirmation;
