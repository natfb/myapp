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
     const handlersBox = useSwipeable({
        onSwiped: ({ dir, event }) => {
          // NOTE: this stops the propagation of the event
          // from reaching the document swipe listeners
          event.stopPropagation();
            console.log("sal")
          setBoxSwipes((s) => [
            ...s,
            { dir, timeStamp: Math.floor(event.timeStamp) }
          ]);
        },
        // NOTE: another approach via onSwiping
        // onSwiping: ({ event }) => event.stopPropagation(),
        preventDefaultTouchmoveEvent: true
      });
    
      const { ref: documentRef } = useSwipeable({
        onSwiped: ({ dir, event }) => {
          setDocSwipes((s) => [
            ...s,
            { dir, timeStamp: Math.floor(event.timeStamp) }
          ]);
        },
        preventDefaultTouchmoveEvent: true
      });
     //console.log(actionByKey('keyW'))
    useEffect(() => {
    const keyDownPressHandler = (e) => {
        let key = `"${e.code}"` == "KeyW"
        //console.log(`"${e.code}"`, "KeyW")
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

    const swipeUpHandler = (e) => {
        setControls((state) => ({ ...state, [actionByKey("KeyUp")]: true, [actionByKey("KeyW")]: true}));
        console.log("yeah")
    }
    const swipeDownHandler = (e) => {
        setControls((state) => ({ ...state, [actionByKey("KeyDown")]: true }));
        console.log("yeah")
    }
    const swipeRightHandler = (e) => {
        setControls((state) => ({ ...state, [actionByKey("KeyUp")]: true }));
    }
    const swipeLeftHandler = (e) => {
        setControls((state) => ({ ...state, [actionByKey("KeyUp")]: true }));
    }
    
    window.addEventListener("keydown", keyDownPressHandler);
    window.addEventListener("keyup", keyUpPressHandler);
    
    window.addEventListener("onSwipedUp", swipeUpHandler);
    window.addEventListener("onSwipedDown", swipeDownHandler);
    window.addEventListener("onSwipedRight", swipeRightHandler);
    window.addEventListener("onSwipedLeft", swipeLeftHandler);
    return () => {
        window.removeEventListener("keydown", keyDownPressHandler);
        window.removeEventListener("keyup", keyUpPressHandler);
        window.addEventListener("onSwipedUp", swipeUpHandler);
    window.addEventListener("onSwipedDown", swipeDownHandler);
    window.addEventListener("onSwipedRight", swipeRightHandler);
    window.addEventListener("onSwipedLeft", swipeLeftHandler);
    }
    }, []);
    return controls
}

export default useKeyboardControls


  
    