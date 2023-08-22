import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Category = () => {
  const [currentCategory, setCurrentCategory] = useState([]);
  const category = useParams();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        console.log(category.category);

        const response = await fetch(`/categories/${category.category}`);
        console.log("hello from category", response);
        if (response.ok) {
          const data = await response.json();
          setCurrentCategory(data.data);
          console.log(data.data);
        } else {
          console.error("Failed to fetch categories:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategory();
  }, [category.category]);

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
      {currentCategory.map((element) => {
        return (
          <Product key={element._id}>
            <Img src={element.imageSrc} />
            <p>{element.name}</p>
            <Price>{element.price}</Price>
            <Stock>{element.numInStock} left in stock!</Stock>
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
};

const AddToCart = styled.button`
  background-color: blue;
  color: white;
  &:hover {
    background-color: lightgoldenrodyellow;
  }
  cursor: pointer;
`;

const Stock = styled.p`
  font-size: 12px;
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
  /* width: 200px; */
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

export default Category;
