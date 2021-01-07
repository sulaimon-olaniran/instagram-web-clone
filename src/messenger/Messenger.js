import React, { useState, useEffect, useCallback } from 'react'
import { connect } from 'react-redux'



import MobileMessenger from './mobile/MobileMessenger'
import MobileChatBoardModal from './mobile/mobile_chatboard/MobileChatBoardModal'
import { db } from '../firebase/Firebase'
import LogoLoader from '../components/loaders/LogoLoader'




const Messenger = ({ auth }) =>{
    const [userChats, setUserChats] = useState([])
    const [fetching, setFetching] = useState(true)
    

    const handleFetchAllUserChats = useCallback(() =>{

        auth && db.collection('users').doc(auth.uid).collection('chats')
        .onSnapshot(snapShots =>{
            const chats = []
            snapShots.forEach(snapshot =>{
                chats.push(snapshot.data())
            })

            setUserChats(chats)
            setFetching(false)
        })
        
    }, [ auth ])


    useEffect(() =>{
        handleFetchAllUserChats()

    }, [handleFetchAllUserChats])


    //if(fetching) return <LogoLoader />

    return(
        <div className='messenger-container'>
            <div className='mobile'>
                <MobileMessenger userChats={userChats} fetching={fetching} />
            </div>

            <div className='pc'>

            </div>

            <MobileChatBoardModal />

        </div>
    )
}


const mapStateToProps = state =>{
    return{
        auth : state.firebase.auth,
    }
}


export default connect(mapStateToProps)(Messenger)