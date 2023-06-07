import React, { useRef, useEffect, useState } from "react";
//import "./styles/globals.css"
//import './pages/_app.jsx' 

export function Art() {
    let x = useRef(0)
    let y = useRef(0)
    
     
    useEffect(() => {
        
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
            //setControls((controls) => ({ ...controls, [actionByKey('ArrowUp')]: true }));
            x += 10
        }
        if(swipeDistanceY > touchTreshold)  {
            //setControls((controls) => ({ ...controls, [actionByKey('KeyS')]: true }));
    
            //console.log(swipeDistanceX , touchTreshold, "dentro do touchmove S", controls)
        } 
        //console.log(controls) 
        if(swipeDistanceX < -touchTreshold)  {
            //console.log(swipeDistanceX < -touchTreshold, swipeDistanceX, -touchTreshold, controls)
            //setControls((controls) => ({ ...controls, [actionByKey('KeyA')]: true }));
            //console.log(swipeDistanceX , touchTreshold, "dentro do touchmove A", controls)
        }
        
        if(swipeDistanceX > touchTreshold)  {
            
            //setControls((controls) => ({ ...controls, [actionByKey('KeyD')]: true }));
           // console.log(swipeDistanceX > touchTreshold, swipeDistanceX , touchTreshold, "dentro do touchmove D", controls)
            
        } 
    }
    const swipeEndHandler = (e) => {
        
        setControls((controls) => ({ ...controls, [actionByKey('KeyS')]: false }));
        setControls((controls) => ({ ...controls, [actionByKey('ArrowUp')]: false }));
        setControls((controls) => ({ ...controls, [actionByKey('ArrowDown')]: false }));
        setControls((controls) => ({ ...controls, [actionByKey('KeyA')]: false }));
        setControls((controls) => ({ ...controls, [actionByKey('KeyD')]: false }));  
    }


        window.addEventListener("touchstart", swipeStartHandler);
        window.addEventListener("touchmove", swipeMoveHandler );
        window.addEventListener("touchend", swipeEndHandler);
    
        return () => {
           // window.removeEventListener("keydown", keyDownPressHandler);
           // window.removeEventListener("keyup", keyUpPressHandler);
            window.removeEventListener("touchstart",swipeStartHandler)
            window.removeEventListener("touchmove", swipeMoveHandler)
            window.removeEventListener("touchend",  swipeEndHandler)
        }
    }, [])
  
    return ( 
        <>
    {/**/} 
    <div className=" ">
    <img className={`scale-[0.4] absolute `} style={{ translate: x.current }} src="texture/ceu.png"/>
     </div>  
    <div className=" absolute">  
    <img className='scale-[0.4]' src="texture/menino.png"/>
    </div> 
    <div className=" absolute"> 
    <img className='scale-[0.4]' src="texture/grama.png"/>
    </div > 
    <div className=" absolute">
    <img className='scale-[0.4]' src="texture/nuvem.png"/>
    </div>
    <div className=" absolute">
    <img className="scale-[0.4]" src="texture/moca.png"/> 
    </div>
    
      </>  
    
    )
    
}

function Canvas () {
    
    return  (
        <>
    <div className='w-full h-screen mt-[-500px] p-0'>
    {/*<Art  />*/}
    
    </div>
    <div className="background-image-1 h-16 relative" ></div>
    </>
)
}
//bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white to-sky-300 
//bg-gradient-to-t from-orange-400 to-sky-400
export default Canvas