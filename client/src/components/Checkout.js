import { useEffect, useState } from "react";
import styled from "styled-components";
import Form from "./Form";
import Confirmation from "./Confirmation";

const Checkout = () => {

  const [formData, setFormData] = useState({});
  const [submitted, setSubmitted] = useState(false);
    
  const handleFormSubmit = (data) => {
    setFormData(data);
    console.log("formData:", data);
    setSubmitted(true);
  };



  useEffect(() => {

  }, []);

  return (
    <Wrapper>         
         {!submitted ? (
        <Form onSubmit={handleFormSubmit} />
          ) : (
        <Confirmation formData={formData} />
          )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
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

export default Checkout;