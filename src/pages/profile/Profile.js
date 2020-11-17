import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'



import MobileProfile from './mobile/MobileProfile'


const Profile = ({ auth }) =>{
    if(!auth.uid) return <Redirect to='/' />
    return(
        <React.Fragment>
            <div className='mobile-profile'>
                <MobileProfile />
            </div>

            <div className='pc-profile'>

            </div>

        </React.Fragment>
    )
}

const mapStateToProps = (state) =>{
    return{
        auth : state.firebase.auth
    }
}

export default connect(mapStateToProps)(Profile)