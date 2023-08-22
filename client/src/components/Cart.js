import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import CartAdjuster from "./CartAdjuster";


  const Cart = () => {

  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const [refreshCart, setRefreshCart] = useState(true);


  useEffect(() => {

    const fetchCart = async () => {
      try {
        const response = await fetch("/get-cart");
        if (response.ok) {
          const data = await response.json();
          setCart(data.data);
          setRefreshCart(false);
        } else {
          console.error("Failed to fetch cart:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };
    if (refreshCart) {
      fetchCart();
    }

  }, [refreshCart]);


  const handleCart = async (element) => {
  
      const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({element})
      };
      try {
        const response = await fetch("/remove-from-cart", requestOptions);
        if (response.ok) {
          const data = await response.json();
          console.log("Product removed successfully:", data);
          setRefreshCart(true);
        } else {
          console.error("Failed to remove from cart:", response.statusText);
        }
      } catch (error) { 
        console.error("Error removing from cart:", error);
      }
 
      

  }
  return (
    <Wrapper>         
      {cart.length === 0 ? (
        <p>Cart Empty.</p>
      ) : (
        <>
          <p>Your Cart</p>   
          {cart.map((element) => (
            <Product key={element._id}>
              <Img src={element.imageSrc}/>   
              
              <CartAdjuster message={"Adjust Cart"} element={element}/>  
              <RemoveFromCart onClick={() => handleCart(element)}>Remove from Cart</RemoveFromCart>   
            </Product>
          ))}
          <CheckoutWrapper onClick={() => navigate("/checkout")}>checkout now!</CheckoutWrapper>
        </>
      )}
    </Wrapper>
  );

}

const RemoveFromCart = styled.button`
  background-color: blue;
  color: white;
  &:hover {
      background-color: lightgoldenrodyellow;
    }
    cursor: pointer;
`

const Img = styled.img`
  width: 200px;
  height: 200px;
  padding-left: 100px;
`;

const Product = styled.div`
  border: solid 2px;
  display: flex;
  margin: 10px;
  max-width: 400px;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

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
