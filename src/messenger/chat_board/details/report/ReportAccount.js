import React, { useState } from 'react'
import Modal from '@material-ui/core/Modal'
import Dialog from '@material-ui/core/Dialog'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import CloseIcon from '@material-ui/icons/Close'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'





import ReportChatFeedBack from './feedback/ReportChatFeedBack'


const reportTypes =[
    [
        {
            text : "I just don't like it",
            type : "unlike"
        },
        {
            text : "it's spam",
            type : "spam"
        },
        {
            text : "Nudity or pornography",
            type : "porn",
            header : "Report as nudity or pornography?",
            information : [
                'Photos or videos of sexual intercourse',
                'Posts showing sexual intercourse, genitals or close-ups of fully-nude buttocks',
                'Posts of nude or partially nude children'
            ]
        },
        {
            text : "Hate speech or symbols",
            type : "hate",
            header : "Report as hate speech or symbols?",
            information : [
                'Photos of hate speech or symbols, like swastikas or white power hand signs',
                "Posts with captions that encourage violence or attack anyone based on who they are",
                "Specific threats of physical harm, theft or vandalism"
            ]
        },
    ],

    [
        {
            text : "Violence or threat of violence",
            type : "violence",
            header : "Report as violence or threat of violence?",
            information : [
                "Photos or videos of extreme graphic violence",
                "Posts that encourage violence or attacks anyone base on their religious, ethnic or sexual background",
                "Specific threats of physical harm, theft, vandalism or financial harm"
            ]
        },
        {
            text : "Sale or promotion of drugs",
            type : "drugs",
            header : "Report as sale or promotion of drugs?",
            information : [
                "Posts promoting the use of hard drugs",
                "Posts intended to sell or distribute drugs"
            ]
        },
        {
            text : "Harassment or bullying",
            type : "harrassment",
            header : "Report as harassment or bullying?",
            information : [
                "Posts that contain credible threats",
                "Content that targets people to degrade or shame them",
                "Personal information shared to blackmail or harass"
            ]
        },
        {
            text : "Impersonation",
            type : "impersonation"
        }
    ],
    [
        {
            text : "Intellectual property violation",
            type : "property",
            header : "Report as intellectual property violation?",
            explanation : "We remove posts that include copyright or trademark infringement. If someone is using your photos without your permission or impersonation you, we may also remove the content and disable the account. To learn more about reporting an intellectual property violation, visit our help Center."
        },
        {
            text : "Self injury",
            type : "injury",
            header : "Report as self injury?",
            explanation : "We remove posts encourage or promoting self injury, which includes suicide, cutting and eating disorders.We may also remove posts identifying victims of self injury if the post attacks or makes fun of them."
        },

        {
            text : "Underage child",
            type : "underage",
            header : "Report a child under the age of 13 on Instagram?",
            explanation : "Instagram's Terms of Service prohibit children under 13 from using the app. We investigate each report. Providing false info may lead to your account being suspended"
           
        }
    ],
]




const ReportChatAccount = ({ close, user }) =>{
    const [count, setCount] = useState(0)
    const [feedBack, setFeedBack] = useState(false)
    const [reportType, setReportType] = useState(null)

    const handleCountIncrement = () =>{
        setCount(prev => prev + 1)
    }

    const handleCountDecrement = () =>{
        setCount(prev => prev - 1)
    }


    const handleOpenReportAccountFeedback = (report) =>{
        setFeedBack(true)
        setReportType(report)
    }


    const handleCloseReportAccountFeedback = () =>{
        setFeedBack(false)
        setReportType(null)
    }


    
    const topNavClassName = count > 0 ? 'more' : 'less'

    if(feedBack) return (
        <ReportChatFeedBack 
            user={user}
            closeReport={close}
            closeFeedback ={handleCloseReportAccountFeedback}
            report={reportType} 
        />
    )

    return(
        <div className='report-chat-account-container'>
            <div 
                className={`report-chat-top-nav-container ${topNavClassName}`}
            >
                { count > 0 && <ArrowBackIosIcon onClick={handleCountDecrement} />}
                <p>Report</p>
                <CloseIcon onClick={close} />
            </div>

            <div className='report-account-body-content-container'>
                { count === 0 &&
                <div className='report-account-content-header'>
                    <p>Choose a reason for reporting this account. We wont tell <span>{user.userName}</span> who reported them.</p>
                </div>}
                {
                    reportTypes[count].map(report =>{
                        return(
                            <div
                                className='each-report-account-container'
                                key={report.type}
                                onClick={() => handleOpenReportAccountFeedback(report)}
                            >
                                <p>{report.text}</p>
                                <ArrowForwardIosIcon />
                            </div>
                        )
                    })
                }

                {count < 2 &&
                <div 
                    className='each-report-account-container'
                    onClick={handleCountIncrement} 
                >
                    <p>Other</p>
                    <ArrowForwardIosIcon />
                </div>}
            </div>
            
        </div>
    )
}




export const ReportChatAccountModal = ({ openModal, handleCloseModal, user }) =>{
    return(
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            //className={classes.modal}
            open={openModal}
            onClose={handleCloseModal}
            closeAfterTransition
        >
            <div className='report-chat-account-modal-container'>
                <ReportChatAccount close={handleCloseModal} user={user} />
            </div>

        </Modal>
    )
}




export const ReportChatAccoutDialog = ({ openDialog, handleCloseDialog, user }) =>{
    return(
        <Dialog
            aria-labelledby='simple-dialog-title'
            open={openDialog}
            onClose={handleCloseDialog}
        >
            <div className='report-chat-account-dialog-container'>
                <ReportChatAccount close={handleCloseDialog} user={user} />
            </div>

        </Dialog>
    )
}


