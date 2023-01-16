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
import { extend } from '@react-three/fiber'
import ColliderBox from './ColiderBox'
import Ramp from './ramp';

export function Track() {
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
      <>
      <mesh geometry={geometry}>
        {/*<primitive object={geometry} attach={'geometry'}/>*/}
          
        <meshBasicMaterial
          toneMapped={false}
          map={colorMap}
        />
      </mesh>

      <ColliderBox position={[1.75, 0, 0.5]} scale={[0.3, 1, 0.3]}/>
      <ColliderBox position={[2.5, 0, -1.4]} scale={[0.3, 1, 0.3]}/>
      <ColliderBox position={[0.6, 0, -3.8]} scale={[0.3, 1, 0.3]}/>
      <ColliderBox position={[-1.95, 0, -5.18]} scale={[0.3, 1, 0.3]}/>
      <ColliderBox position={[-5.55, 0, -3.05]} scale={[0.3, 1, 0.3]}/>
      <ColliderBox position={[-4.4, 0, -1.77]} scale={[0.3, 1, 0.3]}/>
      <ColliderBox position={[-7.03, 0, -0.76]} scale={[0.3, 1, 0.3]}/>
      <ColliderBox position={[-4.75, 0, 2.73]} scale={[0.3, 1, 0.3]}/>
      <ColliderBox position={[-3.05, 0, 3.4]} scale={[0.3, 1, 0.3]}/>
      <ColliderBox position={[-0.83, 0, 3.2]} scale={[0.3, 1, 0.3]}/>
      
      <ColliderBox position={[-1.85,0,0.385]} scale={[0.05, 1, 0.13]}/>
      <ColliderBox position={[-1.85,0,-0.385]} scale={[0.05, 1, 0.13]}/>
      <ColliderBox position={[-2.28,0,0.385]} scale={[0.05, 1, 0.13]}/>
      <ColliderBox position={[-2.28,0,-0.385]} scale={[0.05, 1, 0.13]}/>
      <ColliderBox position={[-4.39,0,1.125]} scale={[0.13, 1, 0.13]}/>
      <ColliderBox position={[-4.39,0,1.9]} scale={[0.13, 1, 0.13]}/>
      
      <ColliderBox position={[-2.86,0,-0.9]} scale={[0.35, 1, 0.35]}/>
      <ColliderBox position={[-3.33,0,-0.9]} scale={[0.35, 1, 0.35]}/>
      <ColliderBox position={[0.41,0,2]} scale={[0.35, 1, 0.35]}/>
      
      <ColliderBox position={[-2.3,0,-2.76]} scale={[1.37, 1, 1.09]}/>
      
      <ColliderBox position={[-3.08,0,0.89]} scale={[0.36, 1, 0.03]}/>
      <ColliderBox position={[-2.53,0,0.89]} scale={[0.36, 1, 0.03]}/>
      
      <ColliderBox position={[-4.53,0,-0.65]} scale={[0.1, 0.5, 0.1]}/>
      <ColliderBox position={[-4.15,0,-0.67]} scale={[0.1, 0.5, 0.1]}/>
      <ColliderBox position={[-4.9,0,-0.58]} scale={[0.1, 0.5, 0.1]}/>
      <ColliderBox position={[-0.3,0,1]} scale={[0.1, 0.5, 0.1]}/>
      <Ramp />
      </>   
    )
}
export default function Three (){
    return(
        < Track position={[0, 1, 1.2]}/>
    )
  }