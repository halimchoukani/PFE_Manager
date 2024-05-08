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
import { io } from "socket.io-client";
const Socket = io.connect("http://localhost:3001");

const TableauFichePfe = () => {
  const [data, setData] = useState(null);
  const teacherId = "12345678";
  function getStage() {
    Socket.emit("getTeachersStage", teacherId, (data) => {
      setData(data);
    });
  }
  useEffect(() => {
    getStage();
  }, [Socket, data]);
  const dataArray = [
    { id: 1, name: "John Doe", age: 25 },
    { id: 2, name: "Jane Smith", age: 30 },
    { id: 3, name: "Bob Johnson", age: 35 },
  ];
  return (
    <Card>
      <CardHeader>
        <Typography color="gray">Tableau Fiche PFE</Typography>
      </CardHeader>
      <CardBody>
        {data && data.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Etudiant</th>
                <th>Binome</th>
                <th>nom_entreprise </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item._id}>
                  <td>{item.etudiant}</td>
                  <td>{item.Binome}</td>
                  <td>{item.nom_entreprise}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <Typography color="gray">No data available</Typography>
        )}
      </CardBody>
      <CardFooter>
        <Link to="/some-link">Go to Some Link</Link>
      </CardFooter>
    </Card>
  );
};

export default TableauFichePfe;
