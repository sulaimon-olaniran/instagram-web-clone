import React, { useState, useCallback, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import FollowDialog from './follow_dialog/FollowDialog'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'



const FollowingsButton = ({ userProfile, users }) => {
    const [openDialog, setOpenDialog] = useState(false)
    const [following, setFollowing] = useState([])


    const getFollowersData = useCallback(() => {
        const data = []
        userProfile && userProfile.following.map(follow => {
            return users && users.forEach(user => {
                if (follow === user.userId) {
                    data.push(user)
                }
            })
        })

        setFollowing(data)
        //setLoading(false)
    }, [users, userProfile])

    useEffect(() => {
        getFollowersData()

    }, [getFollowersData])

    const handleOpenDialog = () =>{
        setOpenDialog(true)
    }

    const handleCloseDialog = () =>{
        setOpenDialog(false)
    }


    return (
        <React.Fragment>
            {openDialog && <FollowDialog
                openDialog={openDialog}
                handleCloseDialog={handleCloseDialog}
                header='Following'
                from='profile'
                followsData={following}
            />}
            <Button
                onClick={handleOpenDialog}
            >
                <div>
                    <p>{userProfile && userProfile.following.length}</p>
                    <small>following</small>
                </div>
            </Button>
        </React.Fragment>
    )
}




const mapStateToProps = (state) => {
    return {
        users: state.firestore.ordered.users,
    }
}


export default compose(
    connect(mapStateToProps),
    firestoreConnect(() => ['users'])
)(FollowingsButton)



//export default FollowingsButton