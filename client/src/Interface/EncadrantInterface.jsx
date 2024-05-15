import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import Encadrant from '../../../Server/models/encadrant';

const EncadrantInterface = () => {
    const [encadrantStageInfo, setEncadrantStageInfo] = useState({});
    useEffect(() => {
        const fetchEncadrantStageInfo = async () => {
            const response = await Encadrant.find({ nom: 'John', prenom: 'Doe' }); // Replace 'John' and 'Doe' with the actual encadrant's name
            setEncadrantStageInfo(response);
        };
        fetchEncadrantStageInfo();
    }, []);

    return (
        <div>
            <h1>Encadrant Stage Information</h1>
            <p>Name: {encadrantStageInfo.nom}</p>
            <p>Stage Company: {encadrantStageInfo.nom_entreprise}</p>
            <p>Stage Duration: {encadrantStageInfo.stageDuration}</p>
            <p>Stage Location: {encadrantStageInfo.stageLocation}</p>
        </div>
    );
};

const EncadrantInterfaceRoute = () => (
    <Route path="/encadrant/info" component={EncadrantInterface} />
);

export default EncadrantInterfaceRoute;