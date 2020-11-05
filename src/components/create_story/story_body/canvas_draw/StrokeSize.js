import React from 'react'
import Slider from '@material-ui/core/Slider'



const StrokeSize = ({ strokeSize, setStrokeSize }) => {
    const handleChange = (event, newValue) =>{
       setStrokeSize(newValue)
    }

    return (
        <div className="stroke-size-container">
            <Slider 
              orientation="vertical"
              value={strokeSize}
              onChange={handleChange}
            />
        </div>
    )
}


export default StrokeSize