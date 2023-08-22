import { useEffect, useState } from "react";
import styled from "styled-components";

const CartAdjuster = (message, element) => {

  const currentItem = message.element

  // handle plus and minus buttons
  const handleDecrement = () => {
    // if the cart is at 1, do nothing
    // else handle Remove Item
    console.log("decreasing...")
    currentItem.numInCart !== 1 ? handleRemoveItem() : cartMinimum();    
  }

  const handleIncrement = () => {
    // if there's no stock, don't add.
    // else handle Add Item
    console.log("increasing...");
    currentItem.numInStock !== 0 ? handleAddItem() : noStock();
  }

  // handle db updates
  const handleAddItem = async (element) => {
    // add item to Cart
    // db: users collection: this item's numInCart +1
    // db: items collection: this item's numInStock -1
    // 
    // new endpoint /update-cart/increment
    // will update both

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({element})
    };
    try {
      const response = await fetch("/update-cart/increment", requestOptions);
      if (response.ok) {
        const data = await response.json();
        console.log("Cart updated successfully:", data);
        // setRefreshCart(true);
      } else {
        console.error("Failed to update cart", response.statusText);
      }
    } catch (error) { 
      console.error("Error updating cart:", error);
    }

      // might need to set this up like Cart to make it refresh
  }

  const handleRemoveItem = () => {
    // remove item from Cart
    // db: users collection: this item's numInCart -1
    // db: items collection: this item's numInStock + 1
    //
    // new endpoint /update-cart/decrement
    // this will update both 
  }

  const noStock = () => {
    // display message "No more of this item in stock"
  }

  const cartMinimum = () => {
  // display message "Use Remove from Cart if you wish to remove the item".
  }

  // Q: how can I use the same new endpoint, /update-cart
  // to perform both +1 and -1 to cart?
  // what if it was /update-cart/:type
  // type = "increment" or "decrement"

  // to add
  // in index.js, new REST endpoint:
  // .post("/update-cart/:type", updateCart)
  // and
  // exports = .. updateUser

  // in handlers.js, new function:
  // const updateCart = async (req, res) => { 
  //  const type = useParams();
  //  const element = req.body;
  //   if (!element) {  
  //     return res.status(400).json({ status: 400, message: "Data not found" });
  //   }
  //   const client = new MongoClient(MONGO_URI, options);
  //   try {
  //     await client.connect();
  //     const dbName = "ecommerce";
  //     const db = client.db(dbName);
      
  //     switch(type) {
  //       case "increment":
  //         // code block
  //         await db
  //         .collection("users")
  //         .updateOne({ _id: element.element._id }, { $inc: { numInCart: +1 } });
          
  //         await db
  //         .collection("items")
  //         .updateOne({ _id: element.element._id }, { $inc: { numInStock: -1 } });
  //         break;
  //       case "decrement":
  //         // code block
  //         await db
  //         .collection("users")
  //         .updateOne({ _id: element.element._id }, { $inc: { numInCart: -1 } });
          
  //         await db
  //         .collection("items")
  //         .updateOne({ _id: element.element._id }, { $inc: { numInStock: +1 } });
  //         break;
  //       default:
  //         // code block
  //     }
           
      
  //     client.close();
  //     return res.status(201).json({ status: 201, message: "success", result });
  //   } catch (err) {
  //     res.status(500).json({ status: 500, message: err.message });
  //   }
  // };

  useEffect(() => {

  }, []);

  return (
    <>
    {/* this amount will be dynamic also */}
    <Message>Amount in Cart: 1</Message>   
    <Wrapper>              
        <Button onClick={handleDecrement}>-</Button>        
        <Message>{message.message}</Message>
        <Button onClick={handleIncrement}>+</Button>
    </Wrapper>
    </>
  );
}

const Button = styled.button`
    background-color: blue;
    color: white;
    padding: 10px;
    cursor: pointer;
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