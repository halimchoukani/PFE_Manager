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
import { Link, Navigate } from "react-router-dom";
import { io } from "socket.io-client";
const socket = io.connect("http://localhost:3001");

function BinomeSelect({ students, setBinome }) {
  return (
    <Select
      label="Sélectionnez votre binôme"
      animate={{
        mount: { y: 0 },
        unmount: { y: 25 },
      }}
      onChange={(value) => setBinome(value)}
    >
      {students.map((student) => (
        <Option key={student._id} value={student.cin}>
          {`${student.cin} ${student.nom} ${student.prenom}`}
        </Option>
      ))}
    </Select>
  );
}

function EnseignantSelect({ teachers, setEncadrantIset }) {
  return (
    <Select
      label="Sélectionnez votre encadrant (ISET)"
      animate={{
        mount: { y: 0 },
        unmount: { y: 25 },
      }}
      onChange={(value) => setEncadrantIset(value)}
    >
      {teachers.map((teacher) => (
        <Option key={teacher._id} value={teacher.cin}>
          {`${teacher.cin} ${teacher.nom} ${teacher.prenom}`}
        </Option>
      ))}
    </Select>
  );
}

function FileUpload({ setFichierStage }) {
  return (
    <div className="col-span-full">
      <label
        htmlFor="file-upload"
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
                onChange={(e) => setFichierStage(e.target.files[0])}
              />
            </label>
          </div>
          <p className="text-xs leading-5 text-gray-600">PDF</p>
        </div>
      </div>
    </div>
  );
}

export function FormulaireStage() {
  if (!localStorage.getItem("user")) return <Navigate to="/" />;
  if (
    JSON.parse(localStorage.getItem("user")).role !== "etudiant" &&
    JSON.parse(localStorage.getItem("user")).role !== "admin"
  )
    return <Navigate to="/" />;

  const [CIN, setCIN] = useState(
    JSON.parse(localStorage.getItem("user")).data.cin
  );
  const [Nom, setNom] = useState(
    JSON.parse(localStorage.getItem("user")).data.nom
  );
  const [Prenom, setPrenom] = useState(
    JSON.parse(localStorage.getItem("user")).data.prenom
  );
  const [Email, setEmail] = useState("");
  const [Binome, setBinome] = useState("");
  const [EmailBinome, setEmailBinome] = useState("");
  const [Sujet, setSujet] = useState("");
  const [NomSociete, setNomSociete] = useState("");
  const [EncadrantSociete, setEncadrantSociete] = useState("");
  const [EmailSociete, setEmailSociete] = useState("");
  const [FichierStage, setFichierStage] = useState(null);
  const [check, setCheck] = useState(true);
  const [error, setError] = useState(false);
  const [cinError, setCinError] = useState(false);
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [EncadrantIset, setEncadrantIset] = useState("");
  const [fileName, setFileName] = useState("");
  useEffect(() => {
    socket.emit("getStudents", (students) => {
      setStudents(students);
    });
  }, []);

  useEffect(() => {
    socket.emit("getTeachers", (teachers) => {
      setTeachers(teachers);
    });
  }, []);
  useEffect(() => {
    socket.emit("getStageByCIN", CIN, (stage) => {
      if (stage != "Aucun stage trouvé pour cet étudiant") {
        setCIN(stage.etudiant);
        setEmail(stage.email);
        setBinome(stage.Binome);
        setEmailBinome(stage.email_binome);
        setSujet(stage.sujet_stage);
        setNomSociete(stage.nom_entreprise);
        setEncadrantSociete(stage.encadrant_entreprise);
        setEmailSociete(stage.contact_enreprise);
        setEncadrantIset(stage.encadrant);
        setFileName(stage.fichier);
      }
    });
  }, []);
  async function AjouterStage(ev) {
    ev.preventDefault();
    if (!check) {
      setError(true);
      return;
    }
    setError(false);

    const formData = new FormData();
    formData.append("etudiant", CIN);
    formData.append("nom", Nom);
    formData.append("prenom", Prenom);
    formData.append("email", Email);
    formData.append("Binome", Binome);
    formData.append("email_binome", EmailBinome);
    formData.append("sujet_stage", Sujet);
    formData.append("nom_entreprise", NomSociete);
    formData.append("encadrant_entreprise", EncadrantSociete);
    formData.append("contact_enreprise", EmailSociete);
    formData.append("fichier", FichierStage);
    formData.append("encadrant", EncadrantIset);
    console.log(formData.get("fichier"));
    try {
      const response = await fetch(
        "http://localhost:3001/etudiant/ajouterstage",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        alert("Stage submitted successfully!");
      } else {
        alert("Failed to submit stage. Please try again.");
      }
    } catch (error) {
      // Handle network errors
      console.error("Error submitting stage:", error);
      alert("An error occurred. Please try again.");
    }
  }

  return (
    <div className="absolute w-screen h-screen">
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
                value={"Votre CIN : " + CIN}
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
                error={cinError}
                name="cin"
                autoComplete="cin"
                required
                size="lg"
                disabled
              />
              <Input
                type="text"
                size="lg"
                label="Votre Nom"
                value={Nom}
                onChange={(e) => setNom(e.target.value)}
              />
              <Input
                type="text"
                size="lg"
                label="Votre Prénom"
                value={Prenom}
                onChange={(e) => setPrenom(e.target.value)}
              />
              <Input
                type="email"
                size="lg"
                label="Votre Adresse Mail"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <BinomeSelect students={students} setBinome={setBinome} />
              <Input
                type="email"
                size="lg"
                label="Email de votre binome"
                value={EmailBinome}
                onChange={(e) => setEmailBinome(e.target.value)}
              />
              <Textarea
                name="sujet"
                id="sujet"
                rows={4}
                label="Sujet de votre stage"
                value={Sujet}
                onChange={(e) => setSujet(e.target.value)}
              />
            </div>
            <div className="w-full flex flex-col gap-4">
              <EnseignantSelect
                teachers={teachers}
                setEncadrantIset={setEncadrantIset}
              />
              <Input
                type="text"
                size="lg"
                label="Nom de votre société"
                value={NomSociete}
                onChange={(e) => setNomSociete(e.target.value)}
              />
              <Input
                type="text"
                size="lg"
                label="Encadrant de votre société"
                value={EncadrantSociete}
                onChange={(e) => setEncadrantSociete(e.target.value)}
              />
              <Input
                type="email"
                size="lg"
                label="Email de votre société"
                value={EmailSociete}
                onChange={(e) => setEmailSociete(e.target.value)}
              />
              <FileUpload setFichierStage={setFichierStage} />
              {fileName && (
                <Typography color="gray" className="font-normal">
                  <Link to={"/filepreview/" + CIN}>
                    See Your File : {fileName}
                  </Link>{" "}
                </Typography>
              )}
            </div>
          </div>
          <Checkbox
            checked={check}
            onClick={(e) => {
              !check ? setError(false) : setError(true);
              setCheck(e.target.checked);
            }}
            label={
              <Typography
                variant="small"
                color={!error ? "gray" : "red"}
                className="flex items-center font-normal"
              >
                J'ai soumis mes informations correctement
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
          <Button type="submit" className="mt-6" fullWidth>
            Soumettre
          </Button>
        </form>
      </Card>
    </div>
  );
}
