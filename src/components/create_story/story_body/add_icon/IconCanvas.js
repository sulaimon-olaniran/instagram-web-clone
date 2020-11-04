import React, { useEffect, useRef, useState } from 'react'




const IconCanvas = ({ canvasRef, imageUrl }) =>{
    const [currentX, setCurrentX] = useState(window.innerWidth/2)
    const [currentY, setCurrentY] = useState(window.innerHeight/2)

    const [startX, setStartX] = useState()
    const [startY, setStartY] = useState()
    
    const [isDraggable, setIsDraggable] = useState(false)

    //const canvasRef = useRef(null)
    const contextRef = useRef(null)

    const imageRef = useRef(null)
    const imageWidth = useRef(null)
    const imageHeight = useRef(null)

    

    useEffect(() =>{
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        contextRef.current = context
        const canvasImage = new Image()
        
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        // canvas.style.width = `${window.innerWidth}px`
        // canvas.style.height = `${window.innerHeight}px`

        imageRef.current = canvasImage
        

        canvasImage.onload = () => {
            imageWidth.current = canvasImage.width/4
            imageHeight.current = canvasImage.width/4
            drawImageOnCanvas()
        }

        canvasImage.src = imageUrl

    }, [ imageUrl ])


    const CheckIfMouseInShape = (mx, my, x, y, width, height) => {
        if(imageRef.current){

            if( mx >= (x - width/2) && mx <= (x + width/2) 
            && my >= (y - height/2) && y <= (y + height/2)
            ){
                //console.log('please return true')
                return(true)
            }
            
       }
        return (false)
    }

    const handleMouseDown = (e) =>{
        e.preventDefault()
        e.stopPropagation()

        const offset = canvasRef.current.getBoundingClientRect()

        const offsetX = offset.left
        const offsetY = offset.top
       
        const mouseX = parseInt(e.pageX - offsetX)
        const mouseY = parseInt(e.pageY - offsetY)

        console.log(mouseX)
        console.log(mouseY)

        //const canvasImage = imageRef.current

        if(CheckIfMouseInShape(mouseX, mouseY, currentX, currentY, imageWidth.current, imageHeight.current )){
            setIsDraggable(true)
            
        }

        setStartX(mouseX)
        setStartY(mouseY)

    }


    const handleMouseUp = (e) =>{
        if(!isDraggable){ return}
        e.preventDefault()
        e.stopPropagation()
        setIsDraggable(false)
    } 

    const handleMouseOut = (e) =>{
        if(!isDraggable){ return}
        e.preventDefault()
        e.stopPropagation()
        setIsDraggable(false)
    }


    const handleMouseMove = (e) =>{
        if(!isDraggable){ return}
        e.preventDefault()
        e.stopPropagation()

        const offset = canvasRef.current.getBoundingClientRect()

        const offsetX = offset.left
        const offsetY = offset.top
       
        const mouseX = parseInt(e.pageX - offsetX)
        const mouseY = parseInt(e.pageY - offsetY)
        const dx = mouseX - startX
        const dy = mouseY - startY

        setCurrentX(mouseX)
        setCurrentY(mouseY)
        
        drawImageOnCanvas()

        setStartX(mouseX)
        setStartY(mouseY)
    }


    const drawImageOnCanvas = () =>{
        const canvas = canvasRef.current
        const context = contextRef.current
        const canvasImage = imageRef.current

        context.clearRect(0, 0, canvas.width, canvas.height)
        context.drawImage(canvasImage, currentX-(150/2), currentY-(60/2), imageWidth.current, imageHeight.current)
    }


    return(
        <canvas
           ref={canvasRef}
           onPointerDown={handleMouseDown}
           onPointerUp={handleMouseUp}
           onPointerOut={handleMouseOut}
           onPointerMove={handleMouseMove}
        />
    )
}



export default IconCanvas

