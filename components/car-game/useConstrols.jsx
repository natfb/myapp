import { useEffect, useState } from "react";

const useControls = (vehicleApi, chassisApi) => {
    let [controls, setControls] = useState({ });
    let [controlsOff, setControlsOff] = useState({ });
  
    useEffect(() => {
      const keyDownPressHandler = (e) => {
        setControls((controls) => ({ ...controls, [e.key.toLowerCase()]: true }));
      }
  
      const keyUpPressHandler = (e) => {
        setControls((controls) => ({ ...controls, [e.key.toLowerCase()]: false }));
      }
    
      window.addEventListener("keydown", keyDownPressHandler);
      window.addEventListener("keyup", keyUpPressHandler);
      return () => {
        window.removeEventListener("keydown", keyDownPressHandler);
        window.removeEventListener("keyup", keyUpPressHandler);
      }
    }, []);
  
    
    useEffect(() => {
      if(!vehicleApi || !chassisApi) return;
 
      if (controls.w) {
        vehicleApi.applyEngineForce(30, 2);
        vehicleApi.applyEngineForce(30, 3);
      } else if (controls.s) {
        vehicleApi.applyEngineForce(-30, 2);
        vehicleApi.applyEngineForce(-30, 3);
      } else {
        vehicleApi.applyEngineForce(0, 2);
        vehicleApi.applyEngineForce(0, 3);
      }
  
      if (controls.a) {
        vehicleApi.setSteeringValue(0.35, 2);
        vehicleApi.setSteeringValue(0.35, 3);
        vehicleApi.setSteeringValue(-0.19, 0);
        vehicleApi.setSteeringValue(-0.19, 1);
      } else if (controls.d) {
        vehicleApi.setSteeringValue(-0.35, 2);
        vehicleApi.setSteeringValue(-0.35, 3);
        vehicleApi.setSteeringValue(0.19, 0);
        vehicleApi.setSteeringValue(0.19, 1);
      } else {
        for(let i = 0; i < 4; i++) {
          vehicleApi.setSteeringValue(0, i);
        }
      }
      
      if( controls.b ) {
        vehicleApi.setBrake(1, 2);
        vehicleApi.setBrake(1, 3);
      } else {
        vehicleApi.setBrake(0, 2);
        vehicleApi.setBrake(0, 3);
      }

      if( controls.t ) {
        chassisApi.rotation.set(0, 0, 0);
      } 

      /*if (controls.w)  chassisApi.applyLocalImpulse([0, 0,  -150], [0, 0, -150, ]);
      if (controls.a)    chassisApi.applyLocalImpulse([0, -5, 0], [0, 0, -1]);
      if (controls.s)  chassisApi.applyLocalImpulse([0, -5, 0], [-0.5, 0, 0]);
      if (controls.d) chassisApi.applyLocalImpulse([0, - 5, 0], [+0.5, 0, 0]);*/

      if (controls.arrowdown)  chassisApi.applyLocalImpulse([0, -5, 0], [0, 0, +1]);
      if (controls.arrowup)    chassisApi.applyLocalImpulse([0, -5, 0], [0, 0, -1]);
      if (controls.arrowleft)  chassisApi.applyLocalImpulse([0, -5, 0], [-0.5, 0, 0]);
      if (controls.arrowright) chassisApi.applyLocalImpulse([0, -5, 0], [+0.5, 0, 0]);
 
      if (controls.r) {
        chassisApi.position.set(-1.5, 0.5, 3);
        chassisApi.velocity.set(0, 0, 0);
        chassisApi.angularVelocity.set(0, 0, 0);
        chassisApi.rotation.set(0, 0, 0);
      }
    }, [controls, chassisApi, chassisApi]);
  
    return controls;
}

export default useControls;