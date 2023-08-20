import { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function Cart() {

  const navigate = useNavigate();

  useEffect(() => {

  }, []);

  return (
    <Wrapper>
         <p>Your Cart</p>
         <p>.. summary of items in cart ..</p>
         <p>.. need 'remove from cart' button ..</p>
         <CheckoutWrapper onClick={() => navigate("/checkout")}>checkout now!</CheckoutWrapper>
    </Wrapper>
  );
}

const CheckoutWrapper = styled.button`
  margin: 10px;
  cursor: pointer;
`

const Wrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
`;

export default Cart;
