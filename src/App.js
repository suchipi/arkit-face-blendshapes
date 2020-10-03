import React from "react";
import { OBJModel, DirectionLight } from "react-3d-viewer";
import * as THREE from "three";
import names from "./names";

export default function App() {
  return (
    <table>
      <tr>
        <th>Name</th>
        <th>Picture</th>
        <th>Model</th>
      </tr>
      {names.map((name) => (
        <tr>
          <td>{name}</td>
          <td>
            <img src={require("./images/" + name + ".png")} />
          </td>
          <td>
            <OBJModel src={require("./models/" + name + ".obj")}>
              <DirectionLight
                color={0xbbbbbb}
                position={new THREE.Vector3(-30, 30, 30)}
              />
              <DirectionLight
                color={0x666666}
                position={new THREE.Vector3(30, 30, 30)}
              />
            </OBJModel>
          </td>
        </tr>
      ))}
    </table>
  );
}
