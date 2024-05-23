import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, Typography } from "@material-tailwind/react";
import { io } from "socket.io-client";

const Socket = io.connect("http://localhost:3001");

const TableauFichePfe = () => {
  const [data, setData] = useState(null);
  const teacherId = "12345678";

  async function getPDF(name, cin) {
    try {
      const response = await fetch(`http://localhost:3001/etudiant/getfile/${cin}`);
      if (!response.ok) {
        throw new Error("Failed to fetch PDF");
      }
      const blob = await response.blob();
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
    const arrayBuffer = pdf.etudiantFichier;
    const blob = new Blob([arrayBuffer], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = name;
    downloadLink.textContent = "Download File";
    downloadLink.click();
    URL.revokeObjectURL(url);
  }

  function handleDelete(id) {
    // Logic to delete an item
    // This function should include API calls to delete the item from the database and update the state
    console.log("Delete item with ID:", id);
  }

  function handleModify(id) {
    
    console.log("Modify item with ID:", id);
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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item._id}>
                  <td>{item.etudiantNom + " " + item.etudiantPrenom}</td>
                  <td>{item.etudiantBinome}</td>
                  <td>{item.entreprise}</td>
                  <td>
                    <button onClick={() => getPDF(item.etudiantCin, item.etudiantCin)}>Télécharger le fichier</button>
                    <button onClick={() => handleDelete(item._id)}>Supprimer</button>
                    <button onClick={() => handleModify(item._id)}>Modifier</button>
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
