import { useEffect, useState } from "react";
import styled from "styled-components";

const CartAdjuster = (message, element) => {

  const [currentItem, setCurrentItem] = useState([]);
  const [howManyInCart, setHowManyInCart] = useState("");
  //const currentItem = message.element;
  
  useEffect(() => {
    setCurrentItem(message.element);
    setHowManyInCart(message.element.howManyInCart);
  }, []);

  // handle plus and minus buttons
  const handleDecrement = (currentItem) => {
    // if the cart is at 1, do nothing
    // else handle Remove Item
    console.log("decreasing...")
    currentItem.numInCart !== 1 ? handleRemoveItem(currentItem) : cartMinimum();    
  }

  const handleIncrement = (currentItem) => {
    // if there's no stock, don't add.
    // else handle Add Item
    console.log("handleIncrement, currentItem:", currentItem);
    console.log("increasing...");
    currentItem.numInStock !== 0 ? handleAddItem(currentItem) : noStock();
  }

  // handle db updates
  const handleAddItem = async (currentItem) => {
    // add item to Cart
    // db: users collection: this item's numInCart +1
    // db: items collection: this item's numInStock -1   
    console.log("handleAddItem, element:", currentItem);

    const type = "increment";
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        currentItem,
        type: 'increment'
      }),      
    };
    try {
      const response = await fetch("/update-cart/increment", requestOptions);
      if (response.ok) {
        const data = await response.json();
        console.log("Cart incremented successfully:", data);
        // setRefreshCart(true);
      } else {
        console.error("Failed to increment cart", response.statusText);
      }
    } catch (error) { 
      console.error("Error inrementing cart:", error);
    }

      // might need to set this up like Cart to make it refresh
  }

  const handleRemoveItem = async (currentItem) => {

    console.log("currentItem:", currentItem);
    // remove item from Cart
    // db: users collection: this item's numInCart -1
    // db: items collection: this item's numInStock + 1   
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        currentItem,
        type: 'decrement'
      }),      
    };
    try {
      const response = await fetch("/update-cart/decrement", requestOptions);
      console.log("response:", response);
      if (response.ok) {
        const data = await response.json();
        console.log("Cart decremented successfully:", data);
        // setRefreshCart(true);
      } else {
        console.error("Failed to decrement cart", response.statusText);
      }
    } catch (error) { 
      console.error("Error decrementing cart:", error);
    }

      // might need to set this up like Cart to make it refresh
    
  }

  const noStock = () => {
    console.log("No more of this item in stock!");
  }

  const cartMinimum = () => {
  console.log("Use Remove from Cart if you wish to remove the item!");
    
}

  
  

 

  return (
    <>
    {/* this amount will be dynamic also */}
    {/* <Message>{currentItem.numInCart} in cart.</Message>    */}
    <Wrapper>              
        <Button onClick={() => handleDecrement(currentItem)}>-</Button>        
        <Message>{currentItem.numInCart} in cart.</Message>
        <Button onClick={() => handleIncrement(currentItem)}>+</Button>
    </Wrapper>
    </>
  );
}

const Button = styled.button`
    background-color: blue;
    color: white;
    padding: 10px;
    cursor: pointer;
    &:hover {
    background-color: lightblue;
    transition: all ease 400ms;
  }
`

const Message = styled.div`
    padding: 5px;
    background-color: lightblue;
`

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
`;


export default CartAdjuster;