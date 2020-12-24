import React, { useState, useCallback, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'


import FollowDialog from './follow_dialog/FollowDialog'



const FollowersButton = ({ userProfile, users }) => {
    const [openDialog, setOpenDialog] = useState(false)
    const [followers, setFollowers] = useState([])


    const getFollowersData = useCallback(() => {
        const data = []
        userProfile && userProfile.followers.map(follow => {
            return users && users.forEach(user => {
                if (follow === user.userId) {
                    data.push(user)
                }
            })
        })

        setFollowers(data)
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
                header='Followers'
                from='profile'
                followsData={followers}
            />}

            <Button
                onClick={handleOpenDialog}
            >
                <div>
                    <p>{userProfile && userProfile.followers.length}</p>
                    <small>followers</small>
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
)(FollowersButton)



//export default FollowersButton