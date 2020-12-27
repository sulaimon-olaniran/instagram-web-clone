import React from 'react'
import Drawer from '@material-ui/core/Drawer'
import { FacebookShareButton, FacebookIcon } from 'react-share'
import { FacebookMessengerShareButton, FacebookMessengerIcon } from 'react-share'
import { WhatsappShareButton, WhatsappIcon } from 'react-share'
import { TwitterIcon, TwitterShareButton } from 'react-share'
import { EmailIcon, EmailShareButton } from 'react-share'
import Button from '@material-ui/core/Button'
import CancelIcon from '@material-ui/icons/Cancel'
import LinkIcon from '@material-ui/icons/Link'
import Dialog from '@material-ui/core/Dialog'
import CloseIcon from '@material-ui/icons/Close'



import { MyDirectIcon } from '../../../MyIcons'



const ShareContents = ({ link, handleCopyPostLink, close }) =>{
    return(
        <div className='contents-container'>
                    <div className='each-content'>
                        <MyDirectIcon height='24px' width='24px' /> <p>Share to Direct</p>
                    </div>

                    <div className='each-content' onClick={close}>
                        <FacebookShareButton url={link}>
                            <FacebookIcon size={28} round={true} />
                            <p>Share to Facebook</p>
                        </FacebookShareButton>
                    </div>

                    <div className='each-content' onClick={close}>
                        <FacebookMessengerShareButton url={link}>
                            <FacebookMessengerIcon size={28} round={true} />
                            <p>Share to Messenger</p>
                        </FacebookMessengerShareButton>
                    </div>

                    <div className='each-content' onClick={close}>
                        <WhatsappShareButton url={link}>
                            <WhatsappIcon size={28} round={true} />
                            <p>Share to WhatsApp</p>
                        </WhatsappShareButton>
                    </div>

                    <div className='each-content' onClick={close}>
                        <TwitterShareButton url={link} title='Check out this post on IG'>
                            <TwitterIcon size={28} round={true} />
                            <p>Share to Twitter</p>
                        </TwitterShareButton>
                    </div>

                    <div className='each-content' onClick={close}>
                        <EmailShareButton url={link}>
                            <EmailIcon size={28} round={true} />
                            <p>Share Via Email</p>
                        </EmailShareButton>
                    </div>

                    <div className='each-content'>
                        <LinkIcon />
                        <p>
                            <Button onClick={handleCopyPostLink}>
                                Copy Link
                            </Button>
                        </p>
                    </div>

                    <div className='each-content'>
                        <CancelIcon />
                        <p>
                            <Button onClick={close}>
                                Cancel
                            </Button>
                        </p>
                    </div>

                </div>
    )
}



const SharePost = ({ open, close, link, handleCopyPostLink }) => {
    //const [linkSnackBar, setLinkSnackBar] = useState(false)


    return (
        <Drawer
            anchor='bottom'
            open={open}
            onClose={close}
        >
            <div className='share-options-container'>
                <div className='title-container'>
                    <span></span>
                    <p>Share</p>
                </div>

                
                <ShareContents 
                    link={link}
                    handleCopyPostLink={handleCopyPostLink}
                    close={close}
                />

            </div>

        </Drawer>
    )
}


export default SharePost




export const SharePostDialog = ({ openDialog, handleCloseDialog, link, handleCopyPostLink }) =>{


    return(
        <Dialog
            aria-labelledby='simple-dialog-title'
            open={openDialog}
            onClose={handleCloseDialog}
        >
            <div className='share-post-dialog-container'>
                <div className='share-post-dialog-nav-container'>
                    <p>Share to...</p>
                    <CloseIcon onClick={handleCloseDialog}/>
                </div>

                <ShareContents
                    link={link}
                    handleCopyPostLink={handleCopyPostLink}
                    close={handleCloseDialog}
                />

            </div>

        </Dialog>

    )
}