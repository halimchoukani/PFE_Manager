import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Chip,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Etudiants from "../Etudiant/Etudiants";
import Encadrants from "../Enseignant/Encadrants";
const Socket = io.connect("http://localhost:3001");

export default function Comptes() {
  var [users, setData] = useState({ students: [], teachers: [] });
  const [teachers, setTeachers] = useState([]);
  const [tloading, setTloading] = useState(true);
  const [students, setStudents] = useState([]);
  const [sloading, setSloading] = useState(true);
  function getUSERS() {
    Socket.emit("getStudents", (data) => {
      setStudents(data);
      setSloading(false);
    });
    Socket.emit("getTeachers", (data) => {
      setTeachers(data);
      setTloading(false);
    });
  }

  useEffect(() => {
    getUSERS();
  }, [Socket]);
  return (
    <Card className="overflow-scroll flex flex-col justify-start grow">
      <Encadrants />
      <Etudiants />
    </Card>
  );
}
