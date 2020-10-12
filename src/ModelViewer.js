import React, { useState } from "react";
import { OBJModel, DirectionLight } from "react-3d-viewer";
import * as THREE from "three";

export default function ModelViewer({ src, width, height }) {
  const [visible, setVisible] = useState(false);

  if (visible) {
    return (
      <OBJModel width={width} height={height} src={src}>
        <DirectionLight
          color={0xbbbbbb}
          position={new THREE.Vector3(-30, 30, 30)}
        />
        <DirectionLight
          color={0x666666}
          position={new THREE.Vector3(30, 30, 30)}
        />
      </OBJModel>
    );
  } else {
    return (
      <div
        className="model-viewer-placeholder"
        style={{
          width,
          height,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button
          onClick={() => {
            setVisible(true);
          }}
        >
          Show 3D Model
        </button>
      </div>
    );
  }
}
