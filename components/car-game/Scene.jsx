import {
    Environment,
    OrbitControls,
    PerspectiveCamera,
    useTexture
  } from "@react-three/drei";
import { Suspense, useEffect, useState, forwardRef, useRef } from "react";
//import { Car } from "./Car";
//import { Ground } from "./Ground";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Group } from "three";
import React from "react";
import { Physics, usePlane, useCompoundBody, useSphere } from '@react-three/cannon';
import { EffectComposer, SSAO } from '@react-three/postprocessing';
import { extend } from '@react-three/fiber'
import Track from "./Track";
import Ground from "./Ground";
import Car from './Car'

function Box(){
  const colorMap = useTexture('/texture/js.png')
  const ref = useRef()
  const {nodes, materials} = useGLTF('/models/astronaut.glb')
  return (
<mesh ref={ref}>
      {/* Width and height segments for displacementMap */}
      <boxGeometry args={[1, 1, 0.1]}/>
      <meshStandardMaterial
        displacementScale={0.2}
        map={colorMap}
        
      />
    </mesh>
  )
}

export default function Scene() {
    
    const [thirdPerson, setThirdPerson] = useState(false);
    const [cameraPosition, setCameraPosition ] = useState([-2.64, -0.71, 0.03])
//console.log(thirdPerson)
    useEffect(() => {
      function keydownHandler(e) {
        if (e.key.toLowerCase() == "k") {
          // random is necessary to trigger a state change
          if(thirdPerson) setCameraPosition([-6, 3.9, 6.21 + Math.random() * 0.01]);
          setThirdPerson(!thirdPerson); 
        }
    }

    window.addEventListener("keydown", keydownHandler);
    return () => window.removeEventListener("keydown", keydownHandler);
    }, [thirdPerson]);    
  
  return ( 

        <Canvas shadows={true}
        className="absolute top-0 left-0">
        <color attach="background" args={['#1f1fbf']} />
        
        <Suspense fallback={null}>
        <Environment
            preset="night"
        />
        <PerspectiveCamera makeDefault position={cameraPosition} fov={40} />
        <ambientLight intensity={0.5} />    
        {/*<spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />      
        <pointLight position={[-10, -10, -10]} /> */}   
        
        <OrbitControls target={[-2.64, -0.71, 0.03]} />
        <Physics gravity={[0, -2.6, 0]} broadphase="SAP" allowSleep = "true">
            < Track position={[0, 1, 1.2]}/>
            < Ground position={[0, 1, 1.2]}/>
            < Car thirdPerson={thirdPerson}/>
        </Physics>
        
        </Suspense>
       {/*} <Box position={[-10.2, 30, 30]}/>*/}
        </Canvas> 
    
    )  
}
{/*
import React from "react";
import { forwardRef, useRef, useState, useEffect} from "react";
import { Canvas, useFrame } from '@react-three/fiber'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { Physics, usePlane, useCompoundBody, useSphere } from '@react-three/cannon';
import { EffectComposer, SSAO } from '@react-three/postprocessing';
import { useLoader } from "@react-three/fiber";

export function Trackk() {
    const result = useLoader(
      GLTFLoader,
      "/models/track.glb"
    );
  
    const colorMap = useLoader(
      TextureLoader,
      "/texture/track.png"
    );
  
    useEffect(() => {
      colorMap.anisotropy = 16;
    }, [colorMap]);
  
    let geometry = result.scene.children[0].geometry;

    return (
        <mesh geometry={geometry}>
        <primitive object={geometry} attach={'geometry'}/>
          
            <meshBasicMaterial
              toneMapped={false}
              map={colorMap}
            />
          </mesh>
        
    )
}
export default function Three (){
    return(
    <Canvas shadows={true}
    camera={{
      position: [-10, 7, 7],
    }} className="absolute top-0 left-0">
      <color attach="background" args={['#1f1fbf']} />
      <Environment
          preset="night"
    />
      {/*<ambientLight intensity={0.5} />      
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />      
<pointLight position={[-10, -10, -10]} />  
      <OrbitControls target={[-2.64, -0.71, 0.03]} />    
      <Physics gravity={[0, -2.6, 0]} broadphase="SAP">
        < Trackk position={[0, 1, 1.2]}/>
      </Physics>
      
    </Canvas>
    )
  }*/}