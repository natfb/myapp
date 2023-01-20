//import { primitives } from "@react-spring/web/dist/declarations/src/primitives";
import { useBox, useRaycastVehicle } from "@react-three/cannon";
import { useFrame, useLoader } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Quaternion, Vector3 } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import useWheels from "./useWheels";
import WheelsDebug from './WheelsDebug'
import  useControls  from "./useConstrols";

function Car(thirdPerson) {
    console.log(thirdPerson)
    let result = useLoader(
        GLTFLoader,
        'models/car.glb'
    ).scene;

    const position = [0, 0.5, 3];
    const width = 0.15;
    const height = 0.07;
    const front = 0.15;
    const wheelRadius = 0.05;

    const chassisBodyArgs = [width, height, front * 2];
    const [chassisBody, chassisApi] = useBox(
        () => ({
            
            args: chassisBodyArgs,
            mass: 150,
            position,
        }),
        useRef(null),
    );
    
    const [wheels, wheelInfos] = useWheels(width, height, front, wheelRadius);

    const [vehicle, vehicleApi] = useRaycastVehicle(
        () => ({
            chassisBody,
            wheelInfos,
            wheels
        }),
        useRef(null)
    )

    useControls(vehicleApi, chassisApi);

    useFrame((state) => {
        
        if(!thirdPerson) return;
    
        let position = new Vector3(0,0,0);
        position.setFromMatrixPosition(chassisBody.current.matrixWorld);
    
        let quaternion = new Quaternion(0, 0, 0, 0);
        quaternion.setFromRotationMatrix(chassisBody.current.matrixWorld);
    
        let wDir = new Vector3(0,0,1);
        wDir.applyQuaternion(quaternion);
        wDir.normalize();
    
        let cameraPosition = position.clone().add(wDir.clone().multiplyScalar(1).add(new Vector3(0, 0.3, 0)));
        
        wDir.add(new Vector3(0, 0.2, 0));
        state.camera.position.copy(cameraPosition);
        state.camera.lookAt(position);
      });

    useEffect(() => {
       
        result.scale.set(0.0007, 0.0007, 0.0007);

        result.children[0].position.set(-395, -50, -67)
    }, [result]);

    return (
        <group ref={vehicle} name="vehicle">
            <group ref={chassisBody} name='chassisBody'>
                {/*<meshBasicMaterial transparent={true} color={'#FF00FF'}opacity={0.3}/>
                <boxGeometry args={chassisBodyArgs}/>
    */}         <primitive object={result} rotation-y={Math.PI} position={[0, 0, 0]}/>
            </group>

            <WheelsDebug wheelRef={wheels[0]} radius={wheelRadius} />
            <WheelsDebug wheelRef={wheels[1]} radius={wheelRadius} />
            <WheelsDebug wheelRef={wheels[2]} radius={wheelRadius} />
            <WheelsDebug wheelRef={wheels[3]} radius={wheelRadius} />
        </group>
    );
  
}

export default function Carro() {
    return (  
        <Car />
    )
}