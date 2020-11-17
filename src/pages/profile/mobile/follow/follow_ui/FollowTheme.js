import React, { useState, useEffect, useCallback} from 'react'
import Modal from '@material-ui/core/Modal'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import { makeStyles } from '@material-ui/core/styles'


import { db } from '../../../../../firebase/Firebase'
import LogoLoader from '../../../../../components/loaders/LogoLoader'



const useStyles = makeStyles((theme) => ({
    modal: {
        overflowY: 'scroll',
    },
}));



const FollowTheme = ({ openModal, handleCloseModal, header, data }) => {
    const [fetchingData, setFetchingData] = useState(true)
    const [followUsersData, setFollowUsersDAta] = useState([])
    const classes = useStyles()
    //console.log(data)

    const handleCloseClearModal = () =>{
        handleCloseModal()
        setFollowUsersDAta([])
    }

    //get each follower/following user data using their id
    const getAllFollowData = useCallback( () => {
        data && data.length > 0 && data.forEach(data =>{
            db.collection('users').doc(data)
            .onSnapshot(snapshot =>{
                if(followUsersData > 0){
                    if(followUsersData.includes(snapshot.data())){
                        return null
                    }
                    else{
                        setFollowUsersDAta(prev => prev.concat(snapshot.data()))
                        console.log('i added more data even though you asked me not to')
                    }
                }
                else{
                    setFollowUsersDAta(prev => prev.concat(snapshot.data()))
                }
                setFetchingData(false)
                
            })
        })
    }, [ data, followUsersData ])
   
    useEffect(() =>{
        getAllFollowData()

    }, [getAllFollowData])

    //console.log(followUsersData)

    if(fetchingData) return <LogoLoader />
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={openModal}
            onClose={handleCloseModal}
            closeAfterTransition
        >

                <div className='follow-container'>
                    <div className='follow-nav-container'>
                        <ArrowBackIosIcon onClick={handleCloseClearModal} />
                        <p>{header}</p>
                    </div>

                    <div className='follow-contents-container'>
                        {
                            followUsersData && followUsersData.map((user, i) => {
                                return (
                                    <div key={user.userId} className='each-follow-container'>
                                        <div className='follow-profile-container'>
                                            <Avatar 
                                                src={user.profilePhoto} 
                                                alt={user.userName} 
                                            />

                                            <div className='follow-personal-details'>
                                            <Link 
                                                onClick={handleCloseClearModal}
                                                to={`/${user.userName}/${user.userId}`}
                                            >
                                                <h5>{user.fullName}</h5>
                                            </Link>
                                                <p>{user.userName}</p>
                                            </div>
                                        </div>


                                        <Button
                                            color='primary'
                                            variant='contained'
                                        >
                                            Follow
                                    </Button>
                                    </div>
                                )
                            })
                        }
                    </div>

                </div>

        </Modal>
    )
}


export default FollowTheme