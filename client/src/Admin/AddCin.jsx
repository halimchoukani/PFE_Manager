import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Checkbox,
    Button,
  } from "@material-tailwind/react";
  import React, { useState } from "react";
  import { Link, Navigate } from "react-router-dom";
  import { HomeLink } from "../HomeLink";
import { io } from "socket.io-client";
const Socket = io.connect("http://localhost:3001");

export function AddCin() {
    const [cin, setCin] = useState("");
    const [cinerror, setCinError] = useState(false);
    const [error, setError] = useState("");
    function addCin() {
        Socket.emit("addCin", (cin) => {
            setCin(cin);
        });
    }    
  return (
    <div className="w-full h-screen flex justify-center items-center flex-col">
      <Card className="w-96">
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography
            variant="h3"
            color="white"
            className="flex flex-col justify-center items-center"
          >
            Ajouter CIN
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Input
            type="text"
            label="Donner cin"
            id="cin"
            value={cin}
              onChange={(e) => {
                if (e.target.value.length <= 8) {
                  setCinError(false);
                  setCin(e.target.value);
                }
                if (isNaN(e.target.value)) {
                  setCinError(true);
                  setCin(e.target.value.slice(0, -1));
                }
              }}
              error={cinerror}
            name="cin"
            autoComplete="cin"
            required
            size="lg"
          />

        </CardBody>
        <CardFooter className="pt-0">
          <Button variant="gradient" fullWidth onClick={addCin}>
            Ajouter
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}