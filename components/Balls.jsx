/*import * as THREE from 'three';
import { useEffect, useRef } from 'react';
import { useFrame, useThree, Canvas } from '@react-three/fiber';
import { Physics, usePlane, useCompoundBody, useSphere } from '@react-three/cannon';
import { EffectComposer, SSAO } from '@react-three/postprocessing';

const vec = new THREE.Vector3();

const baubleMaterial = new THREE.MeshLambertMaterial({
    color: '#040307',
    emissive: 'black'
});

const sphereGeometry = new THREE.Sphere(1, 8, 8);
const baubles = [...Array(50)].map((_, i) => {
    const args = [0.6, 0.6, 0.6, 0.8, 0.8, 1]
    [Math.floor(Math.ramdom() * 6)]
    return {
        args,
        mass: args,
        position: [2 - Math.ramdom() * 4, 2 - Math.ramdom() * 4, args === 1 ? -args : 0],
        angularDamping: 0.2,
        linearDamping: 0.95
    }
})

function Bauble(props) {
    return (
        <Canvas style={{
            position: 'absolute',
            top: -250,
            zIndex: 0,
            width: '100%',
            height: '70%'
        }}
        dpr={1.5}
        gl={{alpha: true, stencil: false, depth: false, antialias: true}}
        camera={{position: [0, 0, 20], fov: 35, near: 10, far: 40 }}
        onCreated={state => {
            state.gl.toneMappingExposure = 1.5;
          }}
        >

        </Canvas>
    )
}
*/

import React from "react";
import { forwardRef, useRef, useState } from "react";
import { Canvas, useFrame } from '@react-three/fiber'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";

function Box (props) {
  // This reference gives us direct access to the THREE.Mesh object.
  const ref = useRef()

  // Hold state for hovered and clicked events.
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)

  // Subscribe this component to the render-loop and rotate the mesh every frame.
  useFrame((state,delta) => (ref.current.rotation.x += delta))

  // Return the view.
  // These are regular three.js elements expressed in JSX.
  return (
    <mesh      
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
    > 
      <sphereGeometry args={[10, 70, 40]} />      
      <meshStandardMaterial color={hovered ? 'purple' : 'orange' } />
      <sphereGeometry position={hovered ? [-30.2, 0, -2] : [-1.2, 0, -2] } />        
    
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
        preset="forest"
  />
    <ambientLight intensity={0.5} />      
    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />      
    <pointLight position={[-10, -10, -10]} />  
    <OrbitControls target={[-2.64, -0.71, 0.03]} />    
    <Box position={[-3.2, 0, -2]} />     
    <Box position={[3.2, 0, -2]} />
    <Box position={[0, 3.2, -2]} />
    <Box position={[0, 0, 3.2]} />
    <Box position={[0, 3, 6.2]} />
    
  </Canvas>
  )
}
