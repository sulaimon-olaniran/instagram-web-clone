import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'


import MobileUserAccount from './mobile/MobileUserAccount'


const UserAccount = ({ auth, posts }) =>{
    //console.log(posts)

    if(!auth.uid) return <Redirect to='/' />
    return(
        <React.Fragment>
            <div className='mobile-user-account'>
                <MobileUserAccount 
                    posts={posts}
                />
            </div>

            <div className='pc-user-account'>

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
)(UserAccount)

//export default connect(mapStateToProps)(UserAccount)