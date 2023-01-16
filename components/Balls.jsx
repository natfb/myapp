import * as THREE from "three"
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber"
import { Physics, useSphere } from "@react-three/cannon"
import { Sky, Environment, Effects as EffectComposer, useTexture, Shadow, meshBounds } from "@react-three/drei"
import { SSAOPass } from "three-stdlib"
import React, { useState, useEffect, useCallback, Suspense } from "react"
import { a } from "@react-spring/three"

extend({ SSAOPass })

const rfs = THREE.MathUtils.randFloatSpread
const sphereGeometry = new THREE.SphereGeometry(0.2, 10)
const baubleMaterial = new THREE.MeshStandardMaterial({ color: "red", roughness: 0, envMapIntensity: 0.2, emissive: "#370037" })

export const App = () => (
  <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 20], fov: 35, near: 1, far: 40 }}>
    <ambientLight intensity={0.25} />
    <spotLight intensity={1} angle={0.2} penumbra={1} position={[30, 30, 30]} castShadow shadow-mapSize={[512, 512]} />
    <directionalLight intensity={5} position={[-10, -10, -10]} color="purple" />
    <Physics gravity={[0, 0, 0]} iterations={10}>
      <Pointer />
      <Clump />
    </Physics>
    <Environment preset="night" />
    {/*<Effects />*/}
    {/*<Sky />*/}
  </Canvas>
)
export default App

function Clump({ mat = new THREE.Matrix4(), vec = new THREE.Vector3(), ...props }) {
  //const texture = useTexture("/cross.jpg")
  const [ref, api] = useSphere(() => ({ args: [0.2], mass: 1, angularDamping: 0.05, linearDamping: 0.1, position: [rfs(20), rfs(20), rfs(20)] }))
  useFrame((state) => {
    for (let i = 0; i < 20; i++) {
      // Get current whereabouts of the instanced sphere
      ref.current.getMatrixAt(i, mat)
      // Normalize the position and multiply by a negative force.
      // This is enough to drive it towards the center-point.
      api.at(i).applyForce(vec.setFromMatrixPosition(mat).normalize().multiplyScalar(-20).toArray(), [0, 0, 0])
    }
  })
  return <instancedMesh ref={ref} castShadow receiveShadow args={[null, null, 20]} geometry={sphereGeometry} material={baubleMaterial}  />
}

function Pointer() {
  const viewport = useThree((state) => state.viewport)
  const [, api] = useSphere(() => ({ type: "Kinematic", args: [2], position: [0, 0, 0] }))
  return useFrame((state) => api.position.set((state.mouse.x * viewport.width /  9), (state.mouse.y * viewport.height / 9 ), 0))
}

function Effects(props) {
  const { scene, camera } = useThree()
  return (
    <EffectComposer {...props}>
      <sSAOPass args={[scene, camera, 10, 10]} kernelRadius={1.2} kernelSize={0} />
    </EffectComposer>
  )
}


/*
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
import { Physics, usePlane, useCompoundBody, useSphere } from '@react-three/cannon';
import { EffectComposer, SSAO } from '@react-three/postprocessing';

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
      <icosahedronGeometry args={[15, 0]} />      
      <meshStandardMaterial color={hovered ? 'purple' : 'orange' } />
      <icosahedronGeometry position={hovered ? [-30.2, 0, -2] : [-1.2, 0, -2] } />        
    
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
    <Physics gravity={[0, -2.6, 0]} broadphase="SAP">
      <Box position={[-15.2, 0, -2]} />     
      <Box position={[15.2, 0, -2]} />
      <Box position={[0, 15.2, -2]} />
      <Box position={[0, 0, 50.2]} />
      <Box position={[0, 10, 15.2]} />
    </Physics>
    
  </Canvas>
  )
}*/
