import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom'; // Import the Route component from React Router
import Stage from '../../../Server/models/stage'; // Replace with the actual path to your stage model file

const EtudiantInterface = () => {
    const [studentStageInfo, setStudentStageInfo] = useState({});
    useEffect(() => {
        const fetchStudentStageInfo = async () => {
            const response = await Stage.find({ etudiant: 'John Doe' }); // Replace 'John Doe' with the actual student name
            setStudentStageInfo(response);
        };
        fetchStudentStageInfo();
    }, []);

    return (
        <div>
            <h1>Student Stage Information</h1>
            <p>Name: {studentStageInfo.etudiant}</p>
            <p>Stage Company: {studentStageInfo.nom_entreprise}</p>
            <p>Stage Duration: {studentStageInfo.stageDuration}</p>
            <p>Stage Location: {studentStageInfo.stageLocation}</p>
        </div>
    );
};

const EtudiantInterfaceRoute = () => (
    <Route path="/etudiant/info" component={EtudiantInterface} />
);

export default EtudiantInterfaceRoute;