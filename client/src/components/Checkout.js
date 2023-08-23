import { useEffect, useState } from "react";
import styled from "styled-components";
import Form from "./Form";
import Confirmation from "./Confirmation";

const Checkout = () => {
  const [formData, setFormData] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleFormSubmit = (data) => {
    setFormData(data);
    setSubmitted(true);
  };

  useEffect(() => {}, []);

  return (
    <Wrapper>
      {!submitted ? (
        <Form onSubmit={handleFormSubmit} />
      ) : (
        <Confirmation formData={formData} />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  align-items: center;
`;

export default Checkout;
