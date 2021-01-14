import React, { useState, useEffect, useCallback } from 'react'
import { connect } from 'react-redux'



import MobileMessenger from './mobile/MobileMessenger'
import { db } from '../firebase/Firebase'
import LogoLoader from '../components/loaders/LogoLoader'
import PcMessenger from './pc/PcMessenger'




const Messenger = ({ auth, profile }) => {
    const [userChats, setUserChats] = useState([])
    const [fetching, setFetching] = useState(true)


    const handleFetchAllUserChats = useCallback(() => {

        auth && db.collection('users').doc(auth.uid).collection('chats')
            .onSnapshot(snapShots => {
                const chats = []
                snapShots.forEach(snapshot => {
                    chats.push(snapshot.data())
                })

                setUserChats(chats)
                setFetching(false)
            })

    }, [auth])


    const handleSetChatsToSeen = useCallback(() => {
        auth.isLoaded && !auth.isEmpty &&
            db.collection('users').doc(auth.uid).collection('chats')
                .onSnapshot(snapshot => {
                   
                    snapshot.forEach(doc => {
                        if(doc.data().unRead === true){
                            doc.ref.update({
                                unRead : false
                            })
                        }
                    })


                })

    }, [auth])



    useEffect(() => {
        handleFetchAllUserChats()
        handleSetChatsToSeen()

    }, [handleFetchAllUserChats, handleSetChatsToSeen])


    if (fetching) return <LogoLoader />

    return (
        <div className='messenger-container'>
            <div className='mobile-messenger'>
                <MobileMessenger userChats={userChats} fetching={fetching} />
            </div>

            <div className='pc-messenger'>
                <PcMessenger
                    userChats={userChats}
                    profile={profile}
                />
            </div>

            {/* <MobileChatBoardModal /> */}

        </div>
    )
}


const mapStateToProps = state => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile,
    }
}


export default connect(mapStateToProps)(Messenger)