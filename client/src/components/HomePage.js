import { useEffect, useState } from "react";
import styled from "styled-components";

function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // TODO: GET all flight numbers
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

  return (
    <Wrapper>
      {products.map((element) => {
        return (
          <Product>
            <Img src={element.imageSrc} />
            <p key={element._id}>{element.name}</p>
            <Price>{element.price}</Price>
          </Product>
        );
      })}
    </Wrapper>
  );
}

const Price = styled.p`
  font-size: 20px;
  font-weight: bold;
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

const Img = styled.img`
  width: 200px;
  height: 200px;
  padding-left: 100px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
`;

export default HomePage;
