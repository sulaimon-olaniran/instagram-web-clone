import React from 'react'
import Modal from '@material-ui/core/Modal'
import ChatBoard from '../../chat_board/ChatBoard'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'




import { closeChatBoard } from '../../../store/actions/MessengerAction'



const useStyles = makeStyles((theme) => ({
    modal: {
        position : 'absolute !important',
    },
}))



const MobileChatBoardModal = ({  closeChatBoard, openChatBoard }) =>{
    const classes = useStyles()
    return(

        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={openChatBoard}
            onClose={closeChatBoard}
            closeAfterTransition
        >
            <div className='mobile-chat-board-modal-container'>
                <ChatBoard 
                    closeChatBoard={closeChatBoard}
                />
            </div>

        </Modal>
    )
}


const mapStateToProps = state =>{
    return{
        openChatBoard : state.messenger.openChatBoard
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        closeChatBoard : () => dispatch(closeChatBoard())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(MobileChatBoardModal)