import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { io } from "socket.io-client";

const Socket = io.connect("http://localhost:3001");

const TableauFichePfe = () => {
  const [data, setData] = useState(null);
  const teacherId = "12345678";
  async function getPDF(name, cin) {
    try {
      const response = await fetch(
        `http://localhost:3001/etudiant/getfile/${cin}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch PDF");
      }

      const blob = await response.blob();
      console.log(blob);
      const url = await window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = name + ".pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  }
  function getStage() {
    Socket.emit("getTeachersStage", teacherId, (data) => {
      setData(data);
    });
  }

  function downloadFile(pdf, name) {
    // Assuming pdf.etudiantFichier is the ArrayBuffer
    const arrayBuffer = pdf.etudiantFichier;

    // Create a Blob from the ArrayBuffer
    const blob = new Blob([arrayBuffer], { type: "application/pdf" });

    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create a link element
    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = name; // Specify the desired filename
    downloadLink.textContent = "Download File";

    // Trigger the download
    downloadLink.click();
    URL.revokeObjectURL(url);
  }

  useEffect(() => {
    getStage();
  }, []); // Run once on component mount

  return (
    <Card>
      <CardHeader>
        <Typography color="gray">Tableau Fiche PFE</Typography>
      </CardHeader>
      <CardBody>
        {data && data.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Etudiant</th>
                <th>Binome</th>
                <th>nom_entreprise</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item._id}>
                  <td>{item.etudiantNom + " " + item.etudiantPrenom} </td>
                  <td>{item.etudiantBinome}</td>
                  <td>{item.entreprise}</td>
                  <td>
                    <button
                      onClick={() => getPDF(item.etudiantCin, item.etudiantCin)}
                    >
                      Télécharger le fichier
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <Typography color="gray">Aucune donnée disponible</Typography>
        )}
      </CardBody>
    </Card>
  );
};

export default TableauFichePfe;
