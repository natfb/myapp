import React, { useRef, useEffect, useState } from "react";

const Canvas = (props) => {
    const canvasRef = useRef(null)
    const [width, setCanvasWidth] = useState(0);
    const [height, setCanvasHeight] = useState(0);
    const [reload, setReload] = useState(false);
    // load image
    //const gImage = require("../public/map.png")
    //const image = Image(gImage.default)
    let [randomColor, setRandomColor] = useState(0)
    let [randomColor_2, setRandomColor_2] = useState(0)
    let [randomColor_3, setRandomColor_3] = useState(0)
    useEffect(() => {
            setReload(true);
    }, [])

    useEffect(() => {
        
        //resizing
        let resized = false;
        
        if(!resized) {
            setCanvasWidth(window.innerWidth);
            setCanvasHeight(window.innerHeight)
        }
       
        window.addEventListener('resize', () => {
            setCanvasWidth(window.innerWidth);
            setCanvasHeight(window.innerHeight)
            resized = true;
            
            init()
        })
        ///////////////////////////

        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        // our first draw
        
        let particlesArray;

        let mouse = {
            x: null,
            y: null,
            radius: (canvas.height/80) * (canvas.width/80)
        }

        window.addEventListener('mousemove', (event) => {
            mouse.x = event.x;
            mouse.y = event.y;
        }) 
        //let randomColor = parseInt(Math.random() * 256) + 70
        //console.log("color", randomColor)
        //create particle
        class Particle {
            constructor(x, y, directionY, directionX, size, color) {
                this.x = x;
                this.y = y;
                this.directionX = directionX;
                this.directionY = directionY;
                this.size = size;
                this.color = color;
                this.vector = {
                    x: Math.cos(this.directionX),
                    y: Math.sin(this.directionY)
                }
            }
            draw() {
                 
                ctx.beginPath()
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false)
                ctx.fillStyle = this.color
                ctx.fill()    
            }
            
            // check positions
            update() {
                if(this.x > canvas.width || this.x < 0) {
                    //this.directionX = -this.directionX
                    this.vector.x  = -this.vector.x
                    //this.y = 
                }
                if(this.y > canvas.height || this.y < 0) {
                    //this.directionY = -this.directionY
                    this.vector.y  = -this.vector.y
                } 
                

                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                if(distance < mouse.radius + this.size) {
                    
                    
                    if(mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                        if (this.vector.x > 2.5) {   
                                this.vector.x -= 3.5    
                        } else if (this.vector.x < -2.5) {
                                this.vector.x += 3.5
                        } else {
                            this.vector.x += 3.5
                        }
                       // this.vector.x = -this.vector.x
                        //this.vector.x += 0.1
                        //.log(this.vector.x)

                    }
                    if(mouse.x > this.x && this.x > this.size * 10) {
                        if (this.vector.x > 2.5) {   
                            this.vector.x -= 3.5    
                    } else if (this.vector.x < -2.5) {
                            this.vector.x += 3.5
                    } else {
                        this.vector.x -= 3.5
                    }
                    
                    }
                    if(mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                       
                        if (this.vector.y > 2.5) {   
                            this.vector.y -= 3.5    
                    } else if (this.vector.y < -2.5) {
                            this.vector.y += 3.5
                    } else {
                        this.vector.y += 3.5
                    }
                    //this.vector.x = -this.vector.x
                    //this.vector.y = -this.vector.y
                    }
                    if(mouse.y > this.y && this.y > this.size * 10) {
                        //this.x += 4
                        //this.vector.y -= 0.1
                        //this.directionY -= 0.1
                        if (this.vector.y > 2.5) {   
                            this.vector.y -= 3.5    
                    } else if (this.vector.y < -2.5) {
                            this.vector.y += 3.5
                    } else {
                        this.vector.y -= 3.5
                    }
                    //this.vector.y = -this.vector.y
                       //this.directionY = -this.directionY
                    }
                    /*if (mouse.x == this.x) {
                        this.directionX = -this.directionX
                        this.y -= 3;
                    }*/
                } 
                
                this.x += this.vector.x;
                this.y += this.vector.y;
                
                this.draw()
            }
        }

        function init() {
            particlesArray = [];
            let numberOfParticles = (canvas.height * canvas.width) / 12000        
            
            //console.log(numberOfParticles)
            for (let i = 0; i < numberOfParticles; i++) {
                randomColor = Math.floor((Math.random() * (255 - 55) + 55)  )
                randomColor_2 = Math.floor((Math.random() * (200 - 50) + 50)  )//randomColor + 85
                randomColor_3 = Math.floor((Math.random() * (150 - 100) + 100)  )//randomColor_2 + 85
                //console.log(randomColor)
                let size = (Math.random() * 4) + 1
                let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2)
                let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2)
                let directionX = (Math.random() * 3.5) - 3.5;
                let directionY = (Math.random() * 3.5) - 3.5;
                //let color = `rgba(${randomColor }, ${randomColor_2 }, ${randomColor_3 }, 0.9)`
                let color = `rgba(255, 255, 255, 0.9)`

                particlesArray.push(new Particle(x, y, directionX, directionY, size, color))
                //console.log(particlesArray)
            }
        }
            function animate() {
                requestAnimationFrame(animate ) 
                ctx.clearRect(0, 0, innerWidth, innerHeight);
                
                for (let i = 0; i < particlesArray.length; i++) {
                    particlesArray[i].update()
                };
                //console.log(particlesArray[0])
                connect()
            }

            
        function connect() {
            
            
            for (let a = 0; a < particlesArray.length; a++) {
                for (let b = a; b < particlesArray.length; b++) {
                    let distance = ((particlesArray[a].x) - (particlesArray[b].x) )
                    * ((particlesArray[a].x) - (particlesArray[b].x))
                    +  ((particlesArray[a].y)- (particlesArray[b].y) )
                    * ((particlesArray[a].y) - (particlesArray[b].y))
                    
                    if (distance < (canvas.width/10) * (canvas.width / 10)) {
                        let opacity = 0.9 - (distance / 25000);
                        
                        //console.log(distance)
                        console.log("distance", distance / 55)
                        ctx.strokeStyle = `rgba(95, ${distance / 55}, 255, ${opacity})`
                        ctx.lineWidth = 1.5;
                        ctx.beginPath();
                        //ctx.setLineDash([3.5, 10]);
                        ctx.moveTo(particlesArray[a].x , particlesArray[a].y)
                        ctx.lineTo(particlesArray[b].x, particlesArray[b].y )
                        ctx.stroke()
                        
                        
                    }
                }
            }
        }

        window.addEventListener('mouseout', () => {
            mouse.x = undefined;
            mouse.y = undefined;

        })
        init();
        animate();         
    }, [reload])

    return (
    <>
    <canvas ref={canvasRef} className='w-full h-screen inset-0 bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-black to-sky-900 m-0 p-0' width={width} height={height} />
    
    </>
)
}
//bg-gradient-to-t from-orange-400 to-sky-400
export default Canvas