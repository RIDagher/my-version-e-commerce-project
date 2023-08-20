import styled from "styled-components";

const Form = () => {


    return (
      <FormWrapper>
        <FormContainer>
          <h2>Please enter your information</h2>
          <FormInput type="text" required placeholder="Name" />
          <FormInput type="text" required placeholder="Address" />
          <FormInput type="email" required placeholder="Email" />
          <SubmitButton type="submit">Pay Now</SubmitButton>
        </FormContainer>
      </FormWrapper>
    );
  };
  
const FormWrapper = styled.div`

`;

const FormContainer = styled.form`
  width: 300px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  transition: all ease 400ms;
  cursor: pointer;
  &:hover {
      background-color: lightblue;
    }
`;

export default Form;