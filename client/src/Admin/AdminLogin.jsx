import React, { useState } from "react";
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
import { Link, Navigate } from "react-router-dom";
import { HomeLink } from "../HomeLink";
export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState("");
  async function login(ev) {
    ev.preventDefault();
    const responce = await fetch("http://localhost:3001/admin/login", {
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
    return <Navigate to="/admin" />;
  }

  return (
    <>
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
              <small className="text-sm">Admin </small>
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
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              variant="gradient"
              className="my-3"
              fullWidth
              onClick={login}
            >
              Login
            </Button>
            <HomeLink />
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
