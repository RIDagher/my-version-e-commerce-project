import { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";


const Header = () => {  

  const navigate = useNavigate();
  const categories = [
    "Fitness",
    "Lifestyle",
    "Entertainment",
    "Medical",
    "Industrial",
  ];

  const bodyLocations = [
    "Wrist",
    "Arms",
    "Head",
    "Chest",
    "Hands",
    "Neck",
    "Waist",
    "Torso",
  ];

  useEffect(() => {}, []);

  return (
    <Wrapper>
      <CompanyName onClick={() => navigate("/")}>qoratech</CompanyName>
      <SortWrapper>
        <CategoryWrapper>
          {categories.map((element) => {
            return (
              <Category
                key={element}
                onClick={() => navigate(`/categories/${element.toLowerCase()}`)}
              >
                {element}
              </Category>
            );
          })}
        </CategoryWrapper>
        <BodyWrapper>
          {bodyLocations.map((element) => {
            return (
              <Category
                key={element}
                onClick={() =>
                  navigate(`/bodyLocation/${element.toLowerCase()}`)
                }
              >
                {element}
              </Category>
            );
          })}
        </BodyWrapper>
      </SortWrapper>

      <CartWrapper onClick={() => navigate("/cart")}>🛒</CartWrapper>
    </Wrapper>
  );
}

const CartWrapper = styled.button`
  margin: 10px;
  cursor: pointer;
  font-family: 'PT Serif', serif;
  width: 100px;
  height: 50px;
  font-size: 40px;
  border: none;
  background-color: lightblue;  
  color: darkblue;
  transition: all ease 400ms;
  &:hover {
    transform: scale(1.2);
  }
`;

const SortWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const CategoryWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
`;

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
`;

const Category = styled.button`
  font-family: 'PT Serif', serif;
  box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
  background-color: blue;
  color: white;
  padding: 5px;
  border: none;
  transition: all ease 400ms;
  cursor: pointer;
  margin: 5px;
  &:hover {
    background-color: lightblue;
  }
`;

const BodyType = styled.button`
  background-color: red;
  color: white;
  padding: 5px;
  border: none;
  transition: all ease 400ms;
  cursor: pointer;
  margin: 5px;
  &:hover {
    background-color: lightgoldenrodyellow;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: lightblue;
  align-items: center;
  flex-wrap: wrap;
`;

const CompanyName = styled.div`
  font-size: 50px;
  padding: 10px;
  cursor: pointer;
  font-family: 'Righteous', cursive;
  color: darkblue;
  transition: all ease 400ms;
  &:hover {
    transform: scale(1.05);
  }
`;

export default Header;
