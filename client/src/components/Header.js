import { useEffect } from 'react';
import styled from "styled-components";
// import { useNavigate } from "react-router-dom";


function Header() {

  // const navigate = useNavigate();
  const categories = ["Fitness", "Lifestyle", "Entertainment", "Medical", 
  "Industrial" ]

  const bodyLocations = ["Wrist", "Arms", "Head", "Chest", "Hands", "Neck", "Waist", "Torso" ]


  useEffect(() => {
     

  }, []);

  return (
    <Wrapper>
      <CompanyName>
        Our Name
      </CompanyName>
      <SortWrapper>
        <CategoryWrapper>
          {categories.map((element) => {
                // return (
                // <Category key={element} onClick={navigate(`/categories/${element.toLowerCase()}`)} >
                //     {element}
                //   </Category>              
                //);
                // for this, need endpoint /categories/:category
                // where :category is "fitness", "lifestyle", "entertainment", "medical" or "industrial"
              return (<Category key={element}>{element}</Category>);
        
          })}
        </CategoryWrapper>
        <BodyWrapper>
        {bodyLocations.map((element) => {
                // return (
                // <Category key={element} onClick={navigate(`/bodylocations/${element.toLowerCase()}`)} >
                //     {element}
                //   </Category>              
                //);
                // for this, need endpoint /bodylocations/:bodylocation
                // where :bodylocation is "Wrist", "Arms", "Head", "Chest", "Hands", "Neck", "Waist", "Torso""
              return (<BodyType key={element}>{element}</BodyType>);
        
          })}
        </BodyWrapper>
      </SortWrapper>
      <CartWrapper>
        CART
      </CartWrapper>
    </Wrapper>
  )

}

const CartWrapper = styled.button`
  margin: 10px;
`

const SortWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const CategoryWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
`

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
`

const Category = styled.button`
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
`

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
`

const Wrapper = styled.div` 
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: lightblue;
    align-items: center;
`;

const CompanyName = styled.div`
  font-size: 40px;
  padding: 10px;

`

export default Header;