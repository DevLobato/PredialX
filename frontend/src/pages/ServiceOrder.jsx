import { useState, useEffect } from "react";

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
    <ul>
      {serviceOrders.map((orders) => {
        return (
          <li key={orders.id}>
            <strong>{orders.problemDescription}</strong>
            <p>{orders.clientId}</p>
          </li>
        );
      })}
    </ul>
  );
}

export default ServiceOrders;
