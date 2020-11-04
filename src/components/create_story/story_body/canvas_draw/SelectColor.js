import React from 'react'




const SelectColor = ({ handleStrokeStyle }) =>{
    const colors = ['#fd8d32', '#fdcb5c', '#d10869', '#a307ba', '#0095f6', '#58c322', '#000000', '#ffffff']
    return(
        <div className='select-color-container'>
            {
                colors.map((color, i) =>{
                    return(
                        <button 
                            key={i} 
                            style={{backgroundColor : color}}
                            onClick={() => handleStrokeStyle(color)}
                        >
                        </button>
                    )
                })
            }

        </div>
    )
}



export default SelectColor