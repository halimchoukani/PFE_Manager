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
const Socket = io.connect("http://localhost:3001");

export default function Etudiants() {
  const [students, setStudents] = useState([]);
  const [sloading, setSloading] = useState(true);
  function getUSERS() {
    Socket.emit("getStudents", (data) => {
      setStudents(data);
      setSloading(false);
    });
  }

  useEffect(() => {
    getUSERS();
  }, [Socket]);
  return (
    <CardBody className="grow">
      <div className="w-auto">
        <div className="w-full  mb-2 flex items-center justify-between gap-4">
          <Typography color="blue-gray" variant="h6">
            Etudiant
          </Typography>
          <Button> + Ajouter un etudiant</Button>
        </div>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        {students.length > 0 ? (
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                <th className="p-4 border-b border-blue-gray-50">_Id</th>
                <th className="p-4 border-b border-blue-gray-50">CIN</th>
                <th className="p-4 border-b border-blue-gray-50">Nom</th>
                <th className="p-4 border-b border-blue-gray-50">Prenom</th>
                <th className="p-4 border-b border-blue-gray-50">Email</th>
                <th className="p-4 border-b border-blue-gray-50">Status</th>
              </tr>
            </thead>
            <tbody>
              {students.map((item) => (
                <tr key={item._id}>
                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="flex items-center gap-3">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold"
                      >
                        {item._id}
                      </Typography>
                    </div>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="flex items-center gap-3">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold"
                      >
                        {item.cin}
                      </Typography>
                    </div>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="flex items-center gap-3">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold"
                      >
                        {item.nom}
                      </Typography>
                    </div>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="flex items-center gap-3">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold"
                      >
                        {item.prenom}
                      </Typography>
                    </div>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="flex items-center gap-3">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold"
                      >
                        {item.email}
                      </Typography>
                    </div>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="w-max">
                      <Chip
                        size="sm"
                        variant="ghost"
                        value={item.status}
                        color={
                          item.status === "Activé"
                            ? "green"
                            : item.status === "Disactivé"
                            ? "amber"
                            : "red"
                        }
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <Typography className="m-4 text-center">Loading ....</Typography>
        )}
      </div>
    </CardBody>
  );
}
