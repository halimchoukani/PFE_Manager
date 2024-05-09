import { PhotoIcon } from "@heroicons/react/24/solid";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Select,
  Option,
  Textarea,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
const Socket = io.connect("http://localhost:3001");

export function FormulaireStage() {
  const [CIN, setCIN] = useState("");
  const [Nom, setNom] = useState("");
  const [Prenom, setPrenom] = useState("");
  const [Email, setEmail] = useState("");
  const [Binome, setBinome] = useState("");
  const [EmailBinome, setEmailBinome] = useState("");
  const [Sujet, setSujet] = useState("");
  const [EncadrantIset, setEncadrantIset] = useState("");
  const [NomSociete, setNomSociete] = useState("");
  const [EncadrantSociete, setEncadrantSociete] = useState("");
  const [EmailSociete, setEmailSociete] = useState("");
  const [FichierStage, setFichierStage] = useState("");
  const [check, setCheck] = useState(true);
  const [error, setError] = useState(false);
  const [cinerror, setCinError] = useState(false);
  const [students, setStudents] = useState([]);
  function AjouterStage(ev) {
    ev.preventDefault();
    console.log(Binome);
    if (check) {
    } else {
      setError(true);
    }
  }

  function getStudents() {
    Socket.emit("getStudents", (students) => {
      setStudents(students);
    });
  }
  useEffect(() => {
    getStudents();
    console.log(students);
  }, [Socket, students]);
  return (
    <div className=" absolute w-screen h-screen">
      <Card className="w-full p-5 flex flex-col justify-center items-center">
        <Typography variant="h4" color="blue-gray">
          Stage PFE {new Date().getFullYear()} - {new Date().getFullYear() + 1}
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Remplissez les informations de votre stage correctement
        </Typography>
        <form
          className="mt-8 mb-2 w-10/12 flex flex-col justify-between items-center"
          onSubmit={AjouterStage}
        >
          <div className="mx-auto mb-1 flex flex-row justify-center items-center gap-6 w-full">
            <div className="w-full flex flex-col gap-4">
              <Input
                type="text"
                label="Votre CIN"
                id="cin"
                value={CIN}
                onChange={(e) => {
                  if (e.target.value.length <= 8) {
                    setCinError(false);
                    setCIN(e.target.value);
                  }
                  if (isNaN(e.target.value)) {
                    setCinError(true);
                    setCIN(e.target.value.slice(0, -1));
                  }
                }}
                error={cinerror}
                name="cin"
                autoComplete="cin"
                required
                size="lg"
              />
              <Input type="text" size="lg" label="Votre Nom" />
              <Input type="text" size="lg" label="Votre Prénom" />
              <Input type="email" size="lg" label="Votre Adresse Mail" />
              <div className="w-full">
                <Select
                  label="Selection Votre Binome"
                  animate={{
                    mount: { y: 0 },
                    unmount: { y: 25 },
                  }}
                >
                  {students.map((student) => (
                    <Option key={student._id}>
                      {student.cin + " " + student.nom + " " + student.prenom}
                    </Option>
                  ))}
                </Select>
              </div>
              <Input type="email" size="lg" label="Email de votre binome" />
              <Textarea
                type="textarea"
                name="sujet"
                id="sujet"
                rows={4}
                label="Sujet de votre stage"
                defaultValue={""}
              />
            </div>
            <div className="w-full flex flex-col gap-4">
              <div className="w-full">
                <Select
                  label="Select Votre Encadrant (ISET)"
                  animate={{
                    mount: { y: 0 },
                    unmount: { y: 25 },
                  }}
                >
                  <Option>Exemple</Option>
                </Select>
              </div>
              <Input type="text" size="lg" label="Nom de votre société" />
              <Input type="text" size="lg" label="Encadrant de votre société" />
              <Input type="text" size="lg" label="Email de votre société" />
              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Fichier de Stage (PDF)
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <PhotoIcon
                      className="mx-auto h-12 w-12 text-gray-300"
                      aria-hidden="true"
                    />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Ajouter un fichier</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          accept="application/pdf"
                        />
                      </label>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">PDF</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Checkbox
            checked={check}
            onClick={(e) => {
              !check ? setError(false) : setError(true);
              setCheck(e.target.checked);
              console.log(check);
            }}
            label={
              <Typography
                variant="small"
                color={!error ? "gray" : "red"}
                className="flex items-center font-normal"
              >
                J'ai submiter mon informati on correctement
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
          <Button type="submit" className="mt-6" fullWidth>
            Submit
          </Button>
        </form>
      </Card>
    </div>
  );
}
