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
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ element }),
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
  };
  return (
    <div>
      {cart.length === 0 ? (
        <p>Cart Empty.</p>
      ) : (
        <Wrapper>
          <YourCart>Your Cart</YourCart>
          {cart.map((element) => (
            <Product key={element._id}>
              <Img src={element.imageSrc} />
              <DivText>
                <Text>{element.name}</Text>
                <Text>{element.category}</Text>
                <Text>{element.body_location}</Text>
                <Text>{element.price}</Text>
              </DivText>
              <CartAdjuster message={"Adjust Cart"} element={element} />
              <RemoveFromCart onClick={() => handleCart(element)}>
                Remove from Cart
              </RemoveFromCart>
            </Product>
          ))}
        </Wrapper>
      )}
      <CheckoutWrapper onClick={() => navigate("/checkout")}>
        checkout now!
      </CheckoutWrapper>
    </div>
  );
};

const DivText = styled.div`
  display: flex;
  flex-direction: column;
`;

const Text = styled.p``;

const YourCart = styled.h1`
  left: 0;
  position: absolute;
`;

const RemoveFromCart = styled.button`
  background-color: blue;
  color: white;
  &:hover {
    background-color: lightgoldenrodyellow;
  }
  cursor: pointer;
`;

const Img = styled.img`
  height: 200px;

  display: block;
  margin-left: auto;
  margin-right: auto;
`;

const Product = styled.div`
  margin: 10px;
  border: solid 2px;
  display: flex;
  width: 800px;
  padding: 20px;
`;

const CheckoutWrapper = styled.button`
  margin: 10px;
  cursor: pointer;
`;

const Wrapper = styled.div`
  margin: 30px;
  display: flex;
  flex-wrap: wrap;
  text-align: center;
`;

export default Cart;
