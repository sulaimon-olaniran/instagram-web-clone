import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'


import MobileUserAccount from './mobile/MobileUserAccount'


const UserAccount = ({ auth }) =>{

    if(!auth.uid) return <Redirect to='/' />
    return(
        <React.Fragment>
            <div className='mobile-user-account'>
                <MobileUserAccount />
            </div>

            <div className='pc-user-account'>

            </div>

        </React.Fragment>
    )
}


const mapStateToProps = (state) =>{
    return{
        auth : state.firebase.auth
    }
}


export default connect(mapStateToProps)(UserAccount)