import { useEffect } from "react";
import styled from "styled-components";

function Cart() {

  useEffect(() => {

  }, []);

  return (
    <Wrapper>
         Hello from Cart!
    </Wrapper>
  );
}

// const Price = styled.p`
//   font-size: 20px;
//   font-weight: bold;
// `;

// const Product = styled.div`
//   border: solid 2px;
//   display: flex;
//   margin: 10px;
//   max-width: 400px;
//   flex-direction: column;
//   justify-content: center;
//   text-align: center;
// `;

// const Img = styled.img`
//   width: 200px;
//   height: 200px;
//   padding-left: 100px;
// `;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
`;

export default Cart;
