import styled from "styled-components";
import { useState } from "react";

const Form = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [creditCard, setCreditCard] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name,
      address,
      email,
      creditCard,
    };
    onSubmit(formData);
  };

  return (
    <FormWrapper>
      <FormContainer onSubmit={handleSubmit}>
        <h2>Please enter your information</h2>
        <FormInput
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <FormInput
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <FormInput
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormInput
          type="text"
          placeholder="Credit Card #"
          value={creditCard}
          onChange={(e) => setCreditCard(e.target.value)}
        />
        <SubmitButton type="submit">Pay Now</SubmitButton>
      </FormContainer>
    </FormWrapper>
  );
};

const FormWrapper = styled.div`
  margin-top: 50px;
`;

const FormContainer = styled.form`
  width: 300px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
`;

const FormInput = styled.input`
  width: 90%;
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
