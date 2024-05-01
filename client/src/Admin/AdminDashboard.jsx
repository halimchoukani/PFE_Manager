import MyCard from "./Card";
import { PencilIcon } from "@heroicons/react/24/solid";
import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Input,
} from "@material-tailwind/react";

const TABLE_HEAD = [
  "ID Stage",
  "Etudiant",
  "Classe",
  "Binome",
  "Classe Binome",
  "Status",
  "Contact Societe",
  "Encadrant",
  "Date",
  "Actions",
];

const TABLE_ROWS = [
  {
    id_stage: "28940274827892",
    etudiant: "Foulen ben Foulen",
    classe: "L3-DSI 2",
    binome: "Foulen ben foulen",
    classe_binome: "L3-DSI 3",
    Status: "Verifiée",
    Contact_Societe: "exemple@gmail.com",
    Encadrant: "John Doe",
    Date: "24/06/2026 - Wed 3:00pm",
  },
  {
    id_stage: "28940274827892",
    etudiant: "Foulen ben Foulen",
    classe: "L3-DSI 2",
    binome: "Foulen ben foulen",
    classe_binome: "L3-DSI 3",
    Status: "Verifiée",
    Contact_Societe: "exemple@gmail.com",
    Encadrant: "John Doe",
    Date: "24/06/2026 - Wed 3:00pm",
  },
  {
    id_stage: "28940274827892",
    etudiant: "Foulen ben Foulen",
    classe: "L3-DSI 2",
    binome: "Foulen ben foulen",
    classe_binome: "L3-DSI 3",
    Status: "Verifiée",
    Contact_Societe: "exemple@gmail.com",
    Encadrant: "John Doe",
    Date: "24/06/2026 - Wed 3:00pm",
  },
  {
    id_stage: "28940274827892",
    etudiant: "Foulen ben Foulen",
    classe: "L3-DSI 2",
    binome: "Foulen ben foulen",
    classe_binome: "L3-DSI 3",
    Status: "Verifiée",
    Contact_Societe: "exemple@gmail.com",
    Encadrant: "John Doe",
    Date: "24/06/2026 - Wed 3:00pm",
  },
  {
    id_stage: "28940274827892",
    etudiant: "Foulen ben Foulen",
    classe: "L3-DSI 2",
    binome: "Foulen ben foulen",
    classe_binome: "L3-DSI 3",
    Status: "En cours",
    Contact_Societe: "exemple@gmail.com",
    Encadrant: "John Doe",
    Date: "24/06/2026 - Wed 3:00pm",
  },
];
export default function AdminDashboard() {
  return (
    <div className="flex flex-col w-full h-full gap-4 p-3">
      <div className="flex w-full h-full flex-row items-center justify-between gap-4 ">
        <MyCard title="Stage verifiées" progress="50" progressValue={50} />
        <MyCard
          title="Etudiant qui remplire sont stage"
          progress="50%"
          progressValue={50}
        />
      </div>
      <div>
        <Card>
          <CardBody>
            <div className="w-full">
              <div className="mb-2 flex items-center justify-between gap-4">
                <Typography color="blue-gray" variant="h6">
                  Table de Stages
                </Typography>
              </div>
            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full min-w-max table-auto text-left">
                <thead>
                  <tr>
                    {TABLE_HEAD.map((head) => (
                      <th
                        key={head}
                        className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none opacity-70"
                        >
                          {head}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {TABLE_ROWS.map(
                    (
                      {
                        id_stage,
                        etudiant,
                        classe,
                        binome,
                        classe_binome,
                        Status,
                        Contact_Societe,
                        Encadrant,
                        Date,
                      },
                      index
                    ) => {
                      const isLast = index === TABLE_ROWS.length - 1;
                      const classes = isLast
                        ? "p-4"
                        : "p-4 border-b border-blue-gray-50";

                      return (
                        <tr key={id_stage}>
                          <td className={classes}>
                            <div className="flex items-center gap-3">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-bold"
                              >
                                {id_stage}
                              </Typography>
                            </div>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {etudiant}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {classe}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {binome}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {classe_binome}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <div className="w-max">
                              <Chip
                                size="sm"
                                variant="ghost"
                                value={Status}
                                color={
                                  Status === "Verifiée"
                                    ? "green"
                                    : Status === "En cours"
                                    ? "amber"
                                    : "red"
                                }
                              />
                            </div>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {Contact_Societe}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {Encadrant}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {Date}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Tooltip content="Edit User">
                              <IconButton variant="text">
                                <PencilIcon className="h-4 w-4" />
                              </IconButton>
                            </Tooltip>
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
