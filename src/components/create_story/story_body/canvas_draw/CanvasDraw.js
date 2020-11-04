import React, { useRef, useEffect, useState } from 'react'
import BrushIcon from '@material-ui/icons/Brush'



import SelectColor from './SelectColor'






const CanvasDrawComponent = ({ canvasRef, imageRef }) => {
    const [strokeStyle, setStrokeStyle] = useState('white')
    const [drawOrErase, setDrawOrErase] = useState('draw')

    //const canvasRef = useRef(null)
    const contextRef = useRef(null)
    const [isDrawing, setIsDrawing] = useState(false)


    const handleStrokeStyle = (style) =>{
        setStrokeStyle(style)
    }

    useEffect(() => {
        const canvas = canvasRef.current;

        canvas.width = window.innerWidth * 2;
        canvas.height = window.innerHeight * 2;
        canvas.style.width = `${window.innerWidth}px`
        canvas.style.height = `${window.innerHeight}px`

        const context = canvas.getContext("2d")

        context.scale(2, 2)
        context.lineCap = "round"
        //context.strokeStyle = strokeStyle
        context.lineWidth = 5

        contextRef.current = context
    }, [])

    const startDrawing = ({ nativeEvent }) => {
        //const stroke = drawOrErase === 'draw' ? strokeStyle : '#00000000'
        contextRef.current.strokeStyle = strokeStyle
        const operation = drawOrErase === 'draw' ? 'source-over': 'destination-out'
        contextRef.current.globalCompositeOperation = operation
        const { offsetX, offsetY } = nativeEvent;
        contextRef.current.beginPath()
        contextRef.current.moveTo(offsetX, offsetY)
        setIsDrawing(true)
    }


    const finishDrawing = () => {
        contextRef.current.closePath()
        setIsDrawing(false)
    }



    const draw = ({ nativeEvent }) => {
        if (!isDrawing) {
            return
        }
        const { offsetX, offsetY } = nativeEvent;
        contextRef.current.lineTo(offsetX, offsetY)
        contextRef.current.stroke()
    }


    return (
        <React.Fragment>
            { !isDrawing &&
                                      
            <div className='canvas-draw-header-container'>
                <button>
                    Undo
                </button>

                <div className='canvas-draw-icon-container'>

                    <div 
                        onClick={ () => setDrawOrErase('draw')}
                        style={{ backgroundColor : drawOrErase === 'draw' ? 'lightgray' : 'transparent'}}
                    >
                        <BrushIcon />
                    </div>

                    <div 
                        onClick={ () => setDrawOrErase('erase')} 
                        style={{ backgroundColor : drawOrErase === 'erase' ? 'lightgray' : 'transparent'}}
                    >
                        <img src="https://img.icons8.com/material/24/ffffff/eraser--v1.png" />
                    </div>
                </div>

                <button>
                    Done
                </button>

            </div>}

           { !isDrawing && <SelectColor handleStrokeStyle={handleStrokeStyle} />}

            <canvas
                onMouseDown={startDrawing}
                onMouseUp={finishDrawing}
                onMouseMove={draw}

                onPointerMove={draw}
                onPointerUp={finishDrawing}
                onPointerDown={startDrawing}

                ref={canvasRef}
            />
        </React.Fragment>
    );
}




// const CanvasDrawComponent = () =>{
//     const [mode, setMode] = useState('draw')
//     const [penPosition, setPenPosition] = useState('up')
//     const [penCoordinates, setPenCoordinates] = useState([])
//     const [lineWidth, setLineWidth] = useState(10)
//     const [penColor, setPenColor] = useState('black')

//     const canvasRef = useRef(null)




//     useEffect(() =>{
//         let canvasContext = canvasRef.current.getContext('2d')
//         canvasContext.fillStyle="white"
//         //canvasContext.fillRect(0, 0, 800, 600)
//         canvasContext.lineWidth = 10
//     }, [])


//     const handleDrawing = (e) =>{
//         console.log('drawing function worked')
//         let canvasContext = canvasRef.current.getContext('2d')

//         if(penPosition === 'down'){
//             canvasContext.beginPath()
//             canvasContext.lineWidth = lineWidth
//             canvasContext.lineCap = 'round'

//             if( mode === 'draw') {
//                 canvasContext.strokeStyle = penColor
//             }

//             if( mode === 'erase') {
//                 canvasContext.strokeStyle = '#ffffff'
//             }

//             canvasContext.moveTo(penCoordinates[0], penCoordinates[1]) //move to old position
//             canvasContext.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY) //draw to new position
//             canvasContext.stroke()

//             const newCoordinates = [e.nativeEvent.offsetX, e.nativeEvent.offsetY]
//             setPenCoordinates(newCoordinates)
//         }
//     }

//     const handlePenDown = (e) =>{
//         console.log('down function worked')
//         setPenPosition('down')
//         const newCoordinates = [e.nativeEvent.offsetX, e.nativeEvent.offsetY]
//         setPenCoordinates(newCoordinates)
//     }

//     const handlePenUp = () =>{
//         console.log('up function worked')
//         setPenPosition('up')
//     }

//     return(
//         <canvas 
//             ref={canvasRef} 
//             onMouseMove={ handleDrawing}
//             onMouseDown={ handlePenDown}
//             onMouseUp={ handlePenUp}
//         />
//     )
// }



export default CanvasDrawComponent