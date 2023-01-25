import * as THREE from "three"
import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useGLTF, ContactShadows, Sparkles, Environment, OrbitControls, useAnimations, Points, PointMaterial, useTexture} from "@react-three/drei"
import { Physics, useBox, useSphere } from "@react-three/cannon";
import { HexColorPicker } from "react-colorful"
import { proxy, useSnapshot } from "valtio"
import Astronaut from "./Scene.jsx"
import useKeyboardControls from "./controls"
import { Vector3, Quaternion } from "three";
import {random }from 'maath'
//keyboard controls stuff
function Shoe(props) {
    const ref = useRef()
    const { moveForward, moveBackward, moveLeft, moveRight, jump, impulseUp, impulseDown } = useKeyboardControls()  
    const { camera } = useThree()

    const chassisBodyArgs = [0.7, 1.1, 0.7];
    const position = [0, 0.0, 0];
    
    const [chassisBody, chassisApi] = useBox(
        () => ({
            type: 'Dynamic',
            args: chassisBodyArgs,
            mass: 15,
            //position,
            ...props,
        }),
        
    );

    const velocity = useRef([0, 0, 0])
    const Speed = 4 

    useEffect(() => {
      chassisApi.velocity.subscribe((v) => velocity.current = v)
    }, [chassisApi.velocity])
    
    useFrame((state) => {
     
      const direction = new Vector3()
      
      /*if (impulseUp) chassisApi.applyLocalImpulse([0, -0.01, 0], [0, 0, +1]);
      if (impulseDown) chassisApi.applyLocalImpulse([0, -0.01, 0], [0, 0, -1]);
      */

      const frontVector = new Vector3(0, 0,
        (- (moveForward ? 1 : 0) + (moveBackward ? 1 : 0)))
      
      const sideVector = new Vector3( + (moveLeft ? 1 : 0) - (moveRight ? 1 : 0), 0, 0)
      direction
        .subVectors(frontVector, sideVector)
        .normalize()
        .multiplyScalar(0.5)
        //.applyEuler(camera.rotation)
      
      const upVector = new Vector3(0,
        ( (impulseUp ? 1 : 0) - (impulseDown ? 1 : 0)), 0)
      chassisApi.velocity.set(direction.x, upVector.y, direction.z)
        //camera.position.set(direction.x, velocity.current[1], direction.z)
      //console.log(chassisBody.current.position)
      
    
      let position = new Vector3(0, 0, 0);
      position.setFromMatrixPosition(chassisBody.current.matrixWorld);
  
      let quaternion = new Quaternion(0, 0, 0, 0);
      quaternion.setFromRotationMatrix(chassisBody.current.matrixWorld);
  
      let wDir = new Vector3(0,0,1);
      wDir.applyQuaternion(quaternion);
      wDir.normalize();
  
      let cameraPosition = position.clone().add(wDir.clone().multiplyScalar(1).add(new Vector3(0, 0.3, 0)));
      
     wDir.add(new Vector3(0, 0.0, 0));
     state.camera.position.copy(cameraPosition);
     state.camera.lookAt(position );
     //console.log(position )
    });
  
    return (
        <>
        <group ref={chassisBody} name='chassisBody' color={"#ff0000"}>   
            <Astronaut rotation-y={Math.PI} position={[0, -1, -2]}/>
        {/*<mesh>
         <meshBasicMaterial transparent={true} color={'#FF00FF'} opacity={0.3}/>
          <boxGeometry args={chassisBodyArgs}/>
    </mesh>*/}
        </group>
    </>
    )
}

export default function App() {
  
  return (
      <>
        
        <Canvas className="mt-[-100px] bg-gray-900" shadows fov={5} >
        <fog attach="fog" args={['#FFFFF', 10, 25]} />
          <ambientLight intensity={0.7} />
          <spotLight intensity={0.5} angle={0.1} penumbra={1} position={[10, 15, 10]} castShadow />
          
          <Physics gravity={[0, 0, 0]} broadphase="SAP">
          <Shoe position={[0, 0, 0]}/>
          <Stars />
          <Sparkles scale={[300, 300, 300]} color={'#FFF'}/>
          </Physics>
          <Environment preset="city" />
          <Box />
          <ContactShadows position={[0, -0.8, 0]} opacity={0.25} scale={10} blur={1.5} far={0.8} />
          <OrbitControls />
        </Canvas>
       
      </>
    )
}

export function Stars(props) {
  //const ref = useRef()
  //const [sphere] = useState(() => Math.random() * 30)
  const rfs = THREE.MathUtils.randFloatSpread
  const sphereGeometry = new THREE.SphereGeometry(0.1, 20)
  const baubleMaterial = new THREE.MeshStandardMaterial({ color: "#FFFF00", roughness: 0, envMapIntensity: 3 })
  const [ref, api] = useSphere(() => ({ args: [0.5], mass: 1, angularDamping: 0.05, linearDamping: 0.1, position: [rfs(20), rfs(20), rfs(20)] }))
  return (
  <instancedMesh ref={ref} castShadow receiveShadow args={[null, null, 100]} geometry={sphereGeometry} material={baubleMaterial}   />
  )
}

function Box(){
  const colorMap = useTexture('/texture/js.png')
  const ref = useRef()
  
  return (
  <mesh ref={ref} position={[1, 0, -5]}>
      {/* Width and height segments for displacementMap */}
      <boxGeometry args={[0.7, 0.7, 0.1]} />
      <meshStandardMaterial
        displacementScale={0.2}
        map={colorMap} 
      />
    </mesh>
  )
}