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

    if (window.innerWidth < 600) {
        console.log("hv")
        setControls((controls) => ({ ...controls, [actionByKey('KeyW')]: true }));
    }

    function detectDoubleTapClosure() {
        let lastTap = 0;
        let timeout;
        return function detectDoubleTap(event) {
          const curTime = new Date().getTime();
          const tapLen = curTime - lastTap;
          if (tapLen < 500 && tapLen > 0  ) {
            console.log('Double tapped!');
            event.preventDefault();
            console.log(controls.moveForward)
            
            
            
        } else {
            timeout = setTimeout(() => {
              clearTimeout(timeout);
            }, 500);
          }
        /*if(tapLen < 500 && tapLen > 0 && controls.moveForward == false ) {
            
            event.preventDefault();
            console.log("aqui")
            setControls((controls) => ({ ...controls, moveForward: true }));
            console.log("scn doblue tap", controls.moveForward)
        }*/
          lastTap = curTime;
         // console.log(tapLen < 500 && tapLen > 0 && controls.moveForward == false)
        };
     }  
      
     //console.log(controls.moveForward == false)
      /* Regex test to determine if user is on mobile */
   /*if (window.innerWidth < 600) {
    console.log("mbngndsçx")
        document.body.addEventListener('touchend', detectDoubleTapClosure());
    }*/

    var touchY = "0";
    var touchX = "0";
    var touchTreshold = 40;

    const swipeStartHandler = (e) => {
        touchY = e.changedTouches[0].pageY
        touchX = e.changedTouches[0].pageX
        
    }
    const swipeMoveHandler = (e) => {
        const swipeDistanceY = e.changedTouches[0].pageY - touchY;
        var swipeDistanceX = e.changedTouches[0].pageX - touchX
        //console.log(swipeDistanceY, swipeDistanceX)
        if(swipeDistanceY < -touchTreshold)  {
            setControls((controls) => ({ ...controls, [actionByKey('ArrowUp')]: true }));
        }
        if(swipeDistanceY > touchTreshold)  {
            setControls((controls) => ({ ...controls, [actionByKey('KeyS')]: true }));
    
            //console.log(swipeDistanceX , touchTreshold, "dentro do touchmove S", controls)
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
        console.log(window.innerWidth > 600)
        if(window.innerWidth > 600) {
            setControls((controls) => ({ ...controls, [actionByKey('KeyW')]: false }));
        } else {
            console.log(controls.moveForward)
console.log("salj")
            if (controls.moveForward) {
                setControls((controls) => ({ ...controls, [actionByKey('KeyW')]: false  }));
                console.log(!controls.moveForward)
            } else if (!controls.moveForward) {
                console.log("salj 3")
                setControls((controls) => ({ ...controls, [actionByKey('KeyW')]: true   }));
            }
        }
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


  
    