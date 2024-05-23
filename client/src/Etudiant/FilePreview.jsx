import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function FilePreview() {
  const { id } = useParams();
  const [fileData, setFileData] = useState(null);
  const [fileType, setFileType] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/${id}.pdf`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) {
          const err = await response.json();
          throw new Error(err.message);
        }

        const blob = await response.blob();
        setFileData(URL.createObjectURL(blob));
        setFileType(blob.type);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!fileData) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      {fileType === "application/pdf" ? (
        <embed
          src={fileData}
          type="application/pdf"
          width="100%"
          height="100%"
        />
      ) : (
        <div>Unsupported file type: {fileType}</div>
      )}
    </div>
  );
}

export default FilePreview;
