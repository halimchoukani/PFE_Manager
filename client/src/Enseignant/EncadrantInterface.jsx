import React from "react";
import { Routes, Route } from "react-router-dom";
import Encadrants from "./Encadrants";
import Stages from "./Stages";
export default function EncadrantInterface() {
  return (
    <div className="w-screen flex flex-row gap-3">
      <Routes>
        <Route path="/encadrant/info/*" element={<Encadrants />}>
          <Route path="stages" element={<Stages />} />
        </Route>
      </Routes>
    </div>
  );
}
