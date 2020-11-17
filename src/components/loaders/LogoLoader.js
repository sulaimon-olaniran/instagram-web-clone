import React from 'react'

import grey_logo from '../assets/grey_logo.png'

const LogoLoader = () => {
    return (
        <div
           style={{
               width : '100%',
               minHeight : '100vh',
               display: 'flex',
               justifyContent : 'center',
               alignItems : 'center'
           }}
        >
            <div
               style={{
                   width : '50px',
                   height : '50px'
               }}
            >
                <img 
                    src={grey_logo} 
                    alt='Loading' 
                    style={{
                        width : '100%',
                        height : '100%',
                        objectFit : 'contain'
                    }}
                />
            </div>
        </div>
    )
}

export default LogoLoader