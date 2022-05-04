import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3030/api/Client")
      .then((res) => res.json())
      .then((data) => {
        setClients(data);
      });
  }, []);

  return (
    <Container>
      <Wrapper>
        <Title>Enter</Title>
        <Form>
          <Input placeholder="username" />
          <Input placeholder="password" type="password" />
          <Link to="/serviceOrders" className="btn btn-primary">
            Login
          </Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

// <Link to="/insert/your/path/here" className="btn btn-primary">hello</Link>

export default Login;
