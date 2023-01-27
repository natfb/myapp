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

    var touchY = "0";
    var touchX = "0";
    var touchTreshold = 30;

    const swipeStartHandler = (e) => {
        touchY = e.changedTouches[0].pageY
        touchX = e.changedTouches[0].pageX
        
    }
    const swipeMoveHandler = (e) => {
        const swipeDistanceY = e.changedTouches[0].pageY - touchY
        var swipeDistanceX = e.changedTouches[0].pageX - touchX
        //console.log(swipeDistanceY, swipeDistanceX)
        if(swipeDistanceY < -touchTreshold)  {
            setControls((controls) => ({ ...controls, [actionByKey('KeyW')]: true }));
            
            //console.log(swipeDistanceX , touchTreshold, "dentro do touchmove W", controls)
        }else if(swipeDistanceY < -touchTreshold && e.touches.length > 1) {
            setControls((controls) => ({ ...controls, [actionByKey('KeyW')]: true }));
            setControls((controls) => ({ ...controls, [actionByKey('ArrowUp')]: true }));
        }
        if(swipeDistanceY > touchTreshold)  {
            setControls((controls) => ({ ...controls, [actionByKey('KeyS')]: true }));
    
            //console.log(swipeDistanceX , touchTreshold, "dentro do touchmove S", controls)
        }else if(swipeDistanceY > touchTreshold && e.touches.length > 1) {
            setControls((controls) => ({ ...controls, [actionByKey('KeyS')]: true }));
            setControls((controls) => ({ ...controls, [actionByKey('ArrowDown')]: true }));
        }  
        //console.log(controls) 
        if(swipeDistanceX < -touchTreshold)  {
            //console.log(swipeDistanceX < -touchTreshold, swipeDistanceX, -touchTreshold, controls)
            setControls((controls) => ({ ...controls, [actionByKey('KeyA')]: true }));
            console.log(swipeDistanceX , touchTreshold, "dentro do touchmove A", controls)
        }
        
        if(swipeDistanceX > touchTreshold)  {
            
            setControls((controls) => ({ ...controls, [actionByKey('KeyD')]: true }));
           
            console.log(swipeDistanceX > touchTreshold, swipeDistanceX , touchTreshold, "dentro do touchmove D", controls)
            
        } 
    }
    const swipeEndHandler = (e) => {
        setControls((controls) => ({ ...controls, [actionByKey('KeyW')]: false }));
        setControls((controls) => ({ ...controls, [actionByKey('KeyS')]: false }));
        setControls((controls) => ({ ...controls, [actionByKey('ArrowUp')]: false }));
        setControls((controls) => ({ ...controls, [actionByKey('ArrowDown')]: false }));
        setControls((controls) => ({ ...controls, [actionByKey('KeyA')]: false }));
        setControls((controls) => ({ ...controls, [actionByKey('KeyD')]: false }));  
    }

    window.addEventListener("keydown", keyDownPressHandler);
    window.addEventListener("keyup", keyUpPressHandler);
    //window.addEventListener("touchstart", Swipe);
    
    
       
    window.addEventListener("touchstart", swipeStartHandler);
    window.addEventListener("touchmove", swipeMoveHandler );
    window.addEventListener("touchend", swipeEndHandler); 
    //console.log("fora dos events list", controls)
    return () => {
        window.removeEventListener("keydown", keyDownPressHandler);
        window.removeEventListener("keyup", keyUpPressHandler);
        window.removeEventListener("touchstart",swipeStartHandler)
        window.removeEventListener("touchmove", swipeMoveHandler)
        window.removeEventListener("touchend",  swipeEndHandler)
    }
    }, []);
    return controls
}

export default useKeyboardControls


  
    