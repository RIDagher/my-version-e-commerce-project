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
          <>
            <p key={element._id}>{element.name}</p>
            <img src={element.imageSrc} />
          </>
        );
      })}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default HomePage;
