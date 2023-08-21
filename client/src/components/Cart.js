import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function Cart() {

  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    const fetchCart = async () => {
      try {
        const response = await fetch("/get-cart");
        if (response.ok) {
          const data = await response.json();
          setCart(data.data);
          console.log("cartData:", data.data);
        } else {
          console.error("Failed to fetch cart:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };
    fetchCart();


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
