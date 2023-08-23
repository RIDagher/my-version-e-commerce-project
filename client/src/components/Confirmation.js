import { useEffect } from "react";
import styled from "styled-components";

const Confirmation = ({formData}) => {
  useEffect(() => {

    // need to clear the cart
    const emptyCart = async () => {
      try {
        const response = await fetch("/get-cart");
        if (response.ok) {
          const data = await response.json();          
          const currentCart = data.data;
          // then loop through and removeFromCart
          currentCart.forEach((element) => {
            deleteElement(element);
          })
        } else {
          console.error("Failed to fetch cart:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    emptyCart();
    
    const deleteElement = async (element) => {
      console.log("attempting to delete", element);
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
    }
 
  }, []);

  return (
    <Wrapper>
        {formData.name &&
        <>
        <ItemName>Your order is confirmed!</ItemName>
        <ItemName>It will be shipped to:</ItemName>
        <ItemName>{formData.name}</ItemName>
        <ItemName>{formData.address}</ItemName>
        <ItemName>{formData.email}</ItemName>
        </>
        }
        
    </Wrapper>
  );
}

const ItemName = styled.div`
  font-family: 'Righteous', cursive;
  font-size: 14px;
  padding-top: 10px;
`

const Wrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
`;

export default Confirmation;
