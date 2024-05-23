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

  async function handleDelete(id) {
    try {
      const response = await fetch(`http://localhost:3001/etudiant/delete/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete item");
      }
      // Remove the deleted item from the state
      setData(data.filter(item => item._id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  }

  async function handleModify(id) {
    const newName = prompt("Enter the new name for the student:");
    if (!newName) {
      return; // Exit if no new name is provided
    }

    try {
      const response = await fetch(`http://localhost:3001/etudiant/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ etudiantNom: newName }),
      });

      if (!response.ok) {
        throw new Error("Failed to update item");
      }

      const updatedItem = await response.json();
      // Update the item in the state
      setData(data.map(item => (item._id === id ? updatedItem : item)));
    } catch (error) {
      console.error("Error updating item:", error);
    }
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
