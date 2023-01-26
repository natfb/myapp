import { Canvas } from "@react-three/fiber";
import { useState, useEffect } from "react";
import {useSwipeable} from 'react-swipeable'
function actionByKey(key) {
    const keys = {
        KeyW: "moveForward",
        KeyS: "moveBackward",
        KeyA: "moveLeft",
        KeyD: "moveRight",
        Space: "jump",
        ArrowUp: "impulseUp",
        ArrowDown: "impulseDown"
    }

    return ( keys[key] )
}

const useKeyboardControls = () => {
    let [controls, setControls] = useState({
        moveForward: false,
        moveBackward: false,
        moveLeft: false,
        moveRight: false,
        jump: false,
        impulseUp: false,
        impulseDown: false
     });
     
       
    
      ;
        
     //console.log(actionByKey('keyW'))
    useEffect(() => {
    const keyDownPressHandler = (e) => {
        let key = `"${e.code}"` == "KeyW"
        console.log(`"${e.code}"`, "KeyW")
        //console.log("foward down", `"${e.code}"`)
        if(actionByKey(e.code)) {
        setControls((state) => ({ ...state, [actionByKey(e.code)]: true }));
        //console.log("foward down", actionByKey(key), actionByKey("KeyD"), `"${e.code}"`)
    }
    }
    const keyUpPressHandler = (e) => {
        if(actionByKey(e.code)) {
            setControls((controls) => ({ ...controls, [actionByKey(e.code)]: false }));
        }
        
    }
    
    window.addEventListener("keydown", keyDownPressHandler);
    window.addEventListener("keyup", keyUpPressHandler);
    //window.addEventListener("touchstart", Swipe);
    
    var touchY = "";
    var touchX = "";
    var touchTreshold = 30;
       
    window.addEventListener("touchstart", (e) => {
        touchY = e.changedTouches[0].pageY
        touchX = e.changedTouches[0].pageX
        
    });
    window.addEventListener("touchmove", (e) => {
        const swipeDistanceY = e.changedTouches[0].pageY - touchY
        const swipeDistanceX = e.changedTouches[0].pageX - touchX
        
        if(swipeDistanceY < -touchTreshold)  {
            setControls((controls) => ({ ...controls, [actionByKey('KeyW')]: true }));
            setControls((controls) => ({ ...controls, [actionByKey('ArrowUp')]: true }));
        }
        if(swipeDistanceY > touchTreshold)  {
            setControls((controls) => ({ ...controls, [actionByKey('KeyS')]: true }));
            setControls((controls) => ({ ...controls, [actionByKey('ArrowDown')]: true }));
        }  
        if(swipeDistanceY < -touchTreshold)  {
            setControls((controls) => ({ ...controls, [actionByKey('KeyW')]: true }));
            setControls((controls) => ({ ...controls, [actionByKey('ArrowUp')]: true }));
        }
        if(swipeDistanceY > touchTreshold)  {
            setControls((controls) => ({ ...controls, [actionByKey('KeyS')]: true }));
            setControls((controls) => ({ ...controls, [actionByKey('ArrowDown')]: true }));
        } 
        if(swipeDistanceX < -touchTreshold)  {
            setControls((controls) => ({ ...controls, [actionByKey('KeyA')]: true }));
        }
        if(swipeDistanceX > touchTreshold)  {
            setControls((controls) => ({ ...controls, [actionByKey('KeyD')]: true }));

        }   
    });
    window.addEventListener("touchend", (e) => {
        setControls((controls) => ({ ...controls, [actionByKey('KeyW')]: false }));
        setControls((controls) => ({ ...controls, [actionByKey('ArrowUp')]: false }));        
        setControls((controls) => ({ ...controls, [actionByKey('KeyS')]: false }));
        setControls((controls) => ({ ...controls, [actionByKey('ArrowDown')]: false }));
        setControls((controls) => ({ ...controls, [actionByKey('KeyA')]: false }));
        setControls((controls) => ({ ...controls, [actionByKey('keyD')]: false }));
    });
    
    return () => {
        window.removeEventListener("keydown", keyDownPressHandler);
        window.removeEventListener("keyup", keyUpPressHandler);
        
    }
    }, []);
    return controls
}

export default useKeyboardControls


  
    