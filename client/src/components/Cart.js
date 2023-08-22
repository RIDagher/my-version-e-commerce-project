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
          //console.log("cartData:", data.data);
        } else {
          console.error("Failed to fetch cart:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };
    fetchCart();


  }, []);


  const handleCart = async (element) => {
    // update cart with {}
    console.log("id:", element._id);



    console.log("stock:", element.numInStock);

    // decrement the stock (put it on hold)  
    // add to database
   
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
        } else {
          console.error("Failed to remove from cart:", response.statusText);
        }
      } catch (error) { 
        console.error("Error removing from cart:", error);
      }
 
      window.location.reload(false);

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
              <RemoveFromCart onClick={() => handleCart(element)}>Remove item</RemoveFromCart>     
            </Product>
          ))}
          <CheckoutWrapper onClick={() => navigate("/checkout")}>checkout now!</CheckoutWrapper>
        </>
      )}
    </Wrapper>
  );
  // return (
  //   <Wrapper>         
  //     <p>Cart Empty.</p>
  //     <p>Your Cart</p>   
  //     {cart.map((element) => {
  //       return (
  //         <Product key={element._id}>
  //         <Img src={element.imageSrc}/>   
  //         <RemoveFromCart onClick={ 
  //           () => handleCart(element) 
  //         }>Remove item</RemoveFromCart>     
  //         </Product>
  //       );
  //     })}
  //     <CheckoutWrapper onClick={() => navigate("/checkout")}>checkout now!</CheckoutWrapper>
  //   </Wrapper>
  // );

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
