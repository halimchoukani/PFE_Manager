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
import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";

export default function EtudiantRegister() {
  const [email, setEmail] = useState("");
  const [annee, setAnnee] = useState(
    new Date().getFullYear() + 1 + " / " + new Date().getFullYear()
  );
  const [cpassword, setCpassword] = useState("");
  const [cin, setCin] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [cinerror, setCinError] = useState(false);
  const [error, setError] = useState(false);
  async function Register(ev) {
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
    return <Navigate to="/" />;
  }

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <form>
        <Card className="w-100">
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
              S'Inscrire
              <small className="text-sm">PFE {annee} </small>
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input
              type="text"
              label="CIN"
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
            <div className="w-full gap-3  flex flex-row justify-center items-center">
              <Input
                type="text"
                label="Nom"
                id="nom"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                name="nom"
                autoComplete="nom"
                required
                size="lg"
                className="w-full"
              />
              <Input
                type="text"
                label="Prenom"
                id="prenom"
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
                name="prenom"
                autoComplete="prenom"
                required
                size="lg"
              />
            </div>
            <div className="w-full">
              <Select
                label="Choisir votre classe"
                animate={{
                  mount: { y: 0 },
                  unmount: { y: 25 },
                }}
                required
              >
                <Option value="L3-DSI 1">L3-DSI 1</Option>
                <Option value="L3-DSI 2">L3-DSI 2</Option>
                <Option value="L3-DSI 3">L3-DSI 3</Option>
              </Select>
            </div>
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
            <Input
              type="password"
              label="Confirmer le mot de passe"
              id="cpassword"
              value={cpassword}
              onChange={(e) => setCpassword(e.target.value)}
              name="cpassword"
              autoComplete="cpassword"
              required
              error={cpassword !== password}
              success={cpassword === password && cpassword !== ""}
              size="lg"
            />
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" fullWidth type="submit">
              Enregistrer
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Vous avez deja un compte ?
              <Link to="/etudiant/login" className="ml-1 font-bold">
                Authentifier
              </Link>
            </Typography>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
