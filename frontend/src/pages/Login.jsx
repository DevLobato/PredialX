import React from "react";
import ServiceOrders from "./ServiceOrder";
import styled from "styled-components";

const FormGroup = styled.div`
  display: block;
  width: 300px;
  margin: 40px auto;
`;

const Label = styled.label`
  margin-bottom: 0.5em;
  display: block;
`;

const Input = styled.input`
  padding: 0.5em;
  background: lightgrey;
  border: none;
  border-radius: 3px;
  width: 100%;
  margin-bottom: 0.5em;
`;

const Message = styled.label`
  margin-bottom: 0.5em;
  display: block;
`;

function Login() {
  return (
    <div>
      <FormGroup>
        <Label htmlFor="label">E-mail:</Label>
        <Input id="label" />
      </FormGroup>
      <FormGroup>
        <Label>Password:</Label>
        <Input />
      </FormGroup>

      <ServiceOrders />
    </div>
  );
}

export default Login;
