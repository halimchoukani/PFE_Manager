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

export default function Stages() {
  const [data, setData] = useState([]);
  function getStage() {
    Socket.emit("getStages", (data) => {
      setData(data);
    });
  }

  useEffect(() => {
    getStage();
  }, [Socket]);
  return (
    <Card className="w-auto overflow-scroll">
      <CardBody>
        <div className="w-full">
          <div className="mb-2 flex items-center justify-between gap-4">
            <Typography color="blue-gray" variant="h6">
              Table de Stages
            </Typography>
          </div>
        </div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          {data.length > 0 ? (
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  <th className="p-4 border-b border-blue-gray-50">ID</th>
                  <th className="p-4 border-b border-blue-gray-50">Stage</th>
                  <th className="p-4 border-b border-blue-gray-50">Etudiant</th>
                  <th className="p-4 border-b border-blue-gray-50">Classe</th>
                  <th className="p-4 border-b border-blue-gray-50">Binome</th>
                  <th className="p-4 border-b border-blue-gray-50">Classe</th>
                  <th className="p-4 border-b border-blue-gray-50">Status</th>
                  <th className="p-4 border-b border-blue-gray-50">
                    Encadrant
                  </th>
                  <th className="p-4 border-b border-blue-gray-50">Contact</th>
                  <th className="p-4 border-b border-blue-gray-50">Societe</th>
                  <th className="p-4 border-b border-blue-gray-50">
                    Encadrant Societe
                  </th>
                  <th className="p-4 border-b border-blue-gray-50">Date</th>
                  <th className="p-4 border-b border-blue-gray-50">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
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
                          {item.stage}
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
                          {item.etudiantNom + " " + item.etudiantPrenom}
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
                          {item.etudiantClasse}
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
                          {item.etudiantBinome}
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
                          {item.binomeClasse}
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
                            item.status === "Vérifée"
                              ? "green"
                              : item.status === "En cours"
                              ? "amber"
                              : "red"
                          }
                        />
                      </div>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <div className="flex items-center gap-3">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold"
                        >
                          {item.encadrant}
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
                          {item.contact}
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
                          {item.entreprise}
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
                          {item.encadrant_societe}
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
                          {item.date_creation}
                        </Typography>
                      </div>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 flex gap-2">
                      <Button color="blue" size="regular" ripple="light">
                        Modifier
                      </Button>
                      <Button color="red" size="regular" ripple="light">
                        Desactiver
                      </Button>
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
    </Card>
  );
}
