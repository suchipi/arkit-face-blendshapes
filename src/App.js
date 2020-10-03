import React from "react";
import ReactMarkdown from "react-markdown";
import { OBJModel, DirectionLight } from "react-3d-viewer";
import * as THREE from "three";
import names from "./names";

const preamble = `# ARKit Face Blendshapes

This website shows an example of each blendshape that ARKit uses to describe faces. This information can be useful when creating a 3d model you'd like to animate using ARKit; for instance, a model to be used with the "Perfect Sync" feature of [VMagicMirror](https://malaybaku.github.io/VMagicMirror/en/tips/perfect_sync) or [vear](https://apps.apple.com/jp/app/id1490697369).

## Useful links

- [ARFaceAnchor.BlendShapeLocation](https://developer.apple.com/documentation/arkit/arfaceanchor/blendshapelocation) documentation
  - This is where I got the images from.
- [iPhone トラッキング向け BlendShape リスト](https://hinzka.hatenablog.com/entry/2020/06/15/072929)
- [VMagicMirror Perfect Sync Tips](https://malaybaku.github.io/VMagicMirror/en/tips/perfect_sync)
- [iPhoneMoCapiOS](https://github.com/johnjcsmith/iPhoneMoCapiOS)
- [How to create Apple’s Animoji using ARKit?](https://medium.com/@ashutoshdingankar/how-to-create-apples-animoji-using-arkit-4691e04bfc42)
- [iPhone X Facial Capture - Apple blendshapes](http://blog.kiteandlightning.la/iphone-x-facial-capture-apple-blendshapes/)
  - This is where I got the 3d models from. I don't know where they originally got them.

## Notes

\`tongueOut\` is currently missing because I couldn't find an image or model for it.
`;

export default function App() {
  const modelViewerSize = 500;

  return (
    <div style={{ maxWidth: 1967, margin: "0 auto" }}>
      <div style={{ maxWidth: 800 }}>
        <ReactMarkdown source={preamble} />
      </div>
      <table>
        <tr>
          <th>Name</th>
          <th>Picture</th>
          <th>3D Model (Click and drag)</th>
        </tr>
        {names.map((name) => (
          <tr>
            <td>{name}</td>
            <td>
              <img
                style={{ minWidth: "300px", maxWidth: "50vw" }}
                src={require("./images/" + name + ".png")}
                alt={name}
              />
            </td>
            <td>
              <OBJModel
                width={modelViewerSize}
                height={modelViewerSize}
                src={require("./models/" + name + ".obj")}
              >
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
    </div>
  );
}
