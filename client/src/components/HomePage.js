import { useEffect, useState } from "react";
import styled from "styled-components";

function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/getProducts");
        if (response.ok) {
          const data = await response.json();
          setProducts(data.data);
        } else {
          console.error("Failed to fetch products]:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleCart = async (element) => {
    // update cart with {}
    console.log("id:", element._id);
    console.log("stock:", element.numInStock);

    // decrement the stock (put it on hold)
    // add to database

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ element }),
    };
    try {
      const response = await fetch("/add-to-cart", requestOptions);
      if (response.ok) {
        const data = await response.json();
        //setProducts(data.data);
        console.log("Product added successfully:", data);
        // add .then etc.
      } else {
        console.error("Failed to add to cart:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <Wrapper>
      {products.map((element) => {
        return (
          <Product key={element._id}>
            <Img src={element.imageSrc} />
            <p>{element.name}</p>
            <Price>{element.price}</Price>

            {element.numInStock !== 0 ? (
              <AddToCart onClick={() => handleCart(element)}>
                Add to cart
              </AddToCart>
            ) : null}
          </Product>
        );
      })}
    </Wrapper>
  );
}

const AddToCart = styled.button`
  background-color: blue;
  color: white;
  &:hover {
    background-color: lightgoldenrodyellow;
  }
  cursor: pointer;
`;

const Price = styled.p`
  font-size: 20px;
  font-weight: bold;
`;

const Product = styled.div`
  border: solid 2px;
  display: flex;
  margin: 20px;
  width: 400px;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  padding: 20px;
`;

const Img = styled.img`
  width: 200px;
  height: 200px;
  display: block;
  margin-left: auto;
  margin-right: auto;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

export default HomePage;
