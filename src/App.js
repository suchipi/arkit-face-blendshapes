import React from "react";
import names from "./names";
import Preamble from "./Preamble";
import ModelViewer from "./ModelViewer";

export default function App() {
  return (
    <div style={{ maxWidth: 1967, margin: "0 auto" }}>
      <Preamble />
      <table>
        <tr>
          <th>Name</th>
          <th>Picture</th>
          <th>3D Model (Click and drag)</th>
        </tr>
        {names.map((name) => (
          <tr key={name}>
            <td>{name}</td>
            <td>
              <img
                style={{ minWidth: "300px", maxWidth: "50vw" }}
                src={require("./images/" + name + ".png")}
                alt={name}
              />
            </td>
            <td>
              <ModelViewer
                width={500}
                height={500}
                src={require("./models/" + name + ".obj")}
              />
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}
