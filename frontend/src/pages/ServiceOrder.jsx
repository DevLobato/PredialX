import { useState, useEffect } from "react";
import styled from "styled-components";

const List = styled.ul`
  display: block;
  width: 500px;
  margin: 20px auto;
  padding: 5px;
  border-radius: 3px;
`;

const Items = styled.div`
  background-color: #1e3f5a;
  text-align: center;
  padding: 10px 10px;
`;

const ProblemDescription = styled.strong`
  display: grid;
  grid-template-columns: auto auto auto auto;
  gap: 50px;
  background-color: lightgrey;
  padding: 5px;
`;

function ServiceOrders() {
  const [serviceOrders, setServiceOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3030/api/serviceOrder")
      .then((res) => res.json())
      .then((data) => {
        setServiceOrders(data);
      });
  }, []);

  return (
    <List>
      {serviceOrders.map((orders) => {
        return (
          <Items key={orders.id}>
            <ProblemDescription>{orders.problemDescription}</ProblemDescription>
            <ProblemDescription>{orders.clientId}</ProblemDescription>
          </Items>
        );
      })}
    </List>
  );
}

export default ServiceOrders;
