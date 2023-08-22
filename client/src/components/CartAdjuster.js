import { useEffect, useState } from "react";
import styled from "styled-components";

const CartAdjuster = (message) => {

  const [formData, setFormData] = useState({});
  const [submitted, setSubmitted] = useState(false);

console.log("message:", message);

  useEffect(() => {

  }, []);

  return (
    <>
        {/* this amount will be dynamic also */}
    <Message>Amount in Cart: 1</Message>   
    <Wrapper>              
        <Button>-</Button>        
        <Message>{message.message}</Message>
        <Button>+</Button>
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


// const ConfirmWrapper = styled.button`
//   margin: 10px;
//   cursor: pointer;
// `
// const FormWrapper = styled.div`
//   /* display: flex;
//   justify-content: center;
//   align-items: center; */
// `;

// const FormContainer = styled.form`
//   width: 300px;
//   padding: 20px;
//   border: 1px solid #ccc;
//   border-radius: 5px;
//   background-color: #f9f9f9;
// `;

// const FormInput = styled.input`
//   width: 100%;
//   padding: 10px;
//   margin-bottom: 10px;
//   border: 1px solid #ccc;
//   border-radius: 5px;
// `;

// const SubmitButton = styled.button`
//   width: 100%;
//   padding: 10px;
//   background-color: #007bff;
//   color: #fff;
//   border: none;
//   border-radius: 5px;
//   transition: all ease 400ms;
//   cursor: pointer;
//   &:hover {
//       background-color: lightblue;
//     }
// `;

export default CartAdjuster;