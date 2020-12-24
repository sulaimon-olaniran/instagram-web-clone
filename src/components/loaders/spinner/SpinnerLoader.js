import React from 'react'
import ClipLoader from "react-spinners/ClipLoader"



const SpinnerLoader = ({ height }) =>{
    return(
        <div style={{
            width : '100%',
            minHeight : height,
            display : 'flex',
            alignItems : 'center',
            justifyContent : 'center'
        }}>
            <ClipLoader />

        </div>
    )
}



export default SpinnerLoader