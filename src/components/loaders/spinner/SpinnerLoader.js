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
            {/* <ClipLoader /> */}
            <svg viewBox='0 0 100 100'>
                <rect fill="#fafafa" height='10' opacity='0' rx='5' ry='5'
                    transform='rotate(-90 50 50)' width='28' x='67' y='45'
                />
                
                <rect fill="#fafafa" height='10' opacity='0.125' rx='5' ry='5'
                    transform='rotate(-45 50 50)' width='28' x='67' y='45'
                />

                
                <rect fill="#fafafa" height='10' opacity='0.25' rx='5' ry='5'
                    transform='rotate(0 50 50)' width='28' x='67' y='45'
                />
                
                
                <rect fill="#fafafa" height='10' opacity='0.375' rx='5' ry='5'
                    transform='rotate(45 50 50)' width='28' x='67' y='45'
                />
                
                
                <rect fill="#fafafa" height='10' opacity='0.5' rx='5' ry='5'
                    transform='rotate(90 50 50)' width='28' x='67' y='45'
                />
                
                
                <rect fill="#fafafa" height='10' opacity='0.625' rx='5' ry='5'
                    transform='rotate(135 50 50)' width='28' x='67' y='45'
                />

                
                <rect fill="#fafafa" height='10' opacity='0.75' rx='5' ry='5'
                    transform='rotate(180 50 50)' width='28' x='67' y='45'
                />
                
                
                <rect fill="#fafafa" height='10' opacity='0.875' rx='5' ry='5'
                    transform='rotate(225 50 50)' width='28' x='67' y='45'
                />
            </svg>

        </div>
    )
}



export default SpinnerLoader