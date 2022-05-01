import { React, useState, useEffect } from "react";
// import ServiceOrders from "./ServiceOrder";
import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
    rgba(255, 255, 255, 0.5),
    rgba(255, 255, 255, 0.5)
  )
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: darkgray;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

const Login = () => {
  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input placeholder="username" />
          <Input placeholder="password" />
          <Button>LOGIN</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;

/*
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

function Login() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3030/api/Client")
      .then((res) => res.json())
      .then((data) => {
        setClients(data);
        console.log(data);
      });
  }, []);

  return (
    <div>
      <FormGroup>
        <Label>E-mail:</Label>
        <Input />
      </FormGroup>
      <FormGroup>
        <Label>Password:</Label>
        <Input type="password" />
      </FormGroup>

      <ServiceOrders />
    </div>
  );
}

export default Login;
*/
