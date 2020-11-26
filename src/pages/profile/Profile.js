import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'


import MobileProfile from './mobile/MobileProfile'


const Profile = ({ auth, posts }) =>{
    if(!auth.uid) return <Redirect to='/' />
    return(
        <React.Fragment>
            <div className='mobile-profile'>
                <MobileProfile 
                    posts={posts}
                />
            </div>

            <div className='pc-profile'>

            </div>

        </React.Fragment>
    )
}

const mapStateToProps = (state) =>{
    return{
        auth : state.firebase.auth,
        posts: state.firestore.ordered.posts,
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect(() => ['posts'])
)(Profile)

//export default connect(mapStateToProps)(Profile)