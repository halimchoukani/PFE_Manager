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
export default function EtudiantLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState("");
  async function login(ev) {
    ev.preventDefault();
    const responce = await fetch("http://localhost:3001/etudiant/login", {
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
  if (redirect) {
    return <Navigate to="/" />;
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
            S'Authentifier
            <small className="text-sm">Etudiant </small>
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Input
            type="email"
            label="Adresse Mail"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            autoComplete="email"
            required
            size="lg"
          />
          <Input
            type="password"
            label="Mot de passe"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            autoComplete="password"
            required
            size="lg"
          />
          <div className="-ml-2.5">
            <Checkbox label="Remember Me" />
          </div>
        </CardBody>
        <CardFooter className="pt-0">
          <Button variant="gradient" fullWidth>
            Login
          </Button>
          <Typography variant="small" className="mt-6 flex justify-center">
            n&apos;a pas de compte ?
            <Link to="/etudiant/register" className="ml-1 font-bold">
              Enregistrer
            </Link>
          </Typography>
          <HomeLink />
        </CardFooter>
      </Card>
    </div>
  );
}
