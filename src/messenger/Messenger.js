import React from 'react'
import MobileMessenger from './mobile/MobileMessenger'
import MobileChatBoardModal from './mobile/mobile_chatboard/MobileChatBoardModal'




const Messenger = () =>{
    return(
        <div className='messenger-container'>
            <div className='mobile'>
                <MobileMessenger />
            </div>

            <div className='pc'>

            </div>

            <MobileChatBoardModal />

        </div>
    )
}


export default Messenger