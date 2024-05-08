import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Select,
  Option,
  Button,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { HomeLink } from "../HomeLink";

async function Tableau(ev) {
  ev.preventDefault();
  const responce = await fetch("http://localhost:3001/enseignant/tableau", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (responce.ok) {
    responce.json().then((data) => {
      setRedirect(true);
    });
  } else {
    console.log("Invalid email or password");
  }
}

const TableauFichePfe = () => {
  const [data, setData] = useState([]);

  const dataArray = [
    { id: 1, name: "John Doe", age: 25 },
    { id: 2, name: "Jane Smith", age: 30 },
    { id: 3, name: "Bob Johnson", age: 35 },
  ];

  useEffect(() => {
    setData(dataArray);
  }, []);

  return (
    <Card>
      <CardHeader>
        <Typography color="gray">Tableau Fiche PFE</Typography>
      </CardHeader>
      <CardBody>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
};

export default TableauFichePfe;
