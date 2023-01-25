import { useState, useEffect } from "react";

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
     //console.log(actionByKey('keyW'))
    useEffect(() => {
    const keyDownPressHandler = (e) => {
        let key = `"${e.code}"` == "KeyW"
        //console.log(`"${e.code}"`, "KeyW")
        console.log("foward down", `"${e.code}"`)
        if(actionByKey(e.code)) {
        setControls((state) => ({ ...state, [actionByKey(e.code)]: true }));
        console.log("foward down", actionByKey(key), actionByKey("KeyD"), `"${e.code}"`)
    }
    }
    const keyUpPressHandler = (e) => {
        if(actionByKey(e.code)) {
            setControls((controls) => ({ ...controls, [actionByKey(e.code)]: false }));
        }
        
    }
    
    window.addEventListener("keydown", keyDownPressHandler);
    window.addEventListener("keyup", keyUpPressHandler);
    return () => {
        window.removeEventListener("keydown", keyDownPressHandler);
        window.removeEventListener("keyup", keyUpPressHandler);
    }
    }, []);
    return controls
}

export default useKeyboardControls


  
    