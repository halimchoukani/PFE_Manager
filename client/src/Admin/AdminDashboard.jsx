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
import Stages from "./Stages";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
const Socket = io.connect("http://localhost:3001");

export default function AdminDashboard() {
  const [stageVerified, setStageVerified] = useState(0);
  const [stageSubmitItByStudents, setStageSubmitItByStudents] = useState(0);
  async function getStageVerified() {
    await Socket.emit("getVerifiedNumber", (data) => {
      setStageVerified(parseFloat(data));
    });
  }
  function getStageSubmitItByStudents() {
    Socket.emit("getStageSubmitItByStudents", (data) => {
      setStageSubmitItByStudents(parseFloat(data));
    });
  }
  useEffect(() => {
    getStageVerified();
  }, [Socket, stageVerified]);
  useEffect(() => {
    getStageSubmitItByStudents();
  }, [Socket, stageSubmitItByStudents]);
  return (
    <div className="flex flex-col w-screen h-full gap-4 p-3 overflow-hidden">
      <div className="flex w-full h-full flex-row items-center justify-between gap-4 ">
        <MyCard
          title="Stage verifiées"
          progress={stageVerified + "%"}
          progressValue={stageVerified}
        />
        <MyCard
          title="Etudiant qui remplire sont stage"
          progress={stageSubmitItByStudents + "%"}
          progressValue={stageSubmitItByStudents}
        />
      </div>
      <div>
        <Stages />
      </div>
    </div>
  );
}
