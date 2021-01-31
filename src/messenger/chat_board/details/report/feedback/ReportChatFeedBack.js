import React, { useState } from 'react'
import { Button } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'



const ReportConfirmation = ({ closeReport, user, report }) => {
    return (
        <div className='report-confirmation-container'>
            <div className='report-confirmation-nav-container'>
                <p>Report</p>
                <CloseIcon onClick={closeReport} />
            </div>

            <h6>Thanks for reporting this</h6>

            {report.type !== "spam" ?
                <React.Fragment>
                    <p>Your feedback is important in helping us keep the instagram community safe.</p>

                    <p>
                        Our team will review the account and if it violates our
                        <span className="link-span"> Community Guidelines</span>  or  <span className="link-span">Terms of Use</span>, we'll remove it
                    </p>
                </React.Fragment>

                :

                <React.Fragment>
                    <p>
                        We use spam reports as a signal to understand problems we're having with spam on Instagram.
                        If you think this account violates our <span className="link-span">Community Guidelines</span> or
                    <span className="link-span">Terms of Use</span> and should be removed, mark it as inappropriate.
                </p>

                    <p>Because you reported <span>{user.userName}</span>'s profile, we've also blocked the account.</p>
                </React.Fragment>}
        </div>
    )
}


const ReportChatFeedBack = ({ user, closeReport, closeFeedback, report }) => {
    const [confirmReport, setConfirmReport] = useState(false)
    const { type } = report

    const handleConfirmReport = () => {
        setConfirmReport(true)
    }

    if (confirmReport || type === "impersonation" || type === 'spam') return( 
        <ReportConfirmation closeReport={closeReport} user={user} report={report} />
    )
    return (
        <div className='report-chat-feedback-container'>
            <div className='report-chat-feedback-nav-container'>
                <ArrowBackIosIcon onClick={closeFeedback} />
                <p>Report</p>
                <CloseIcon onClick={closeReport} />
            </div>

            <div className='report-chat-feedback-contents-container'>
                {type === 'unlike' &&
                    <React.Fragment>
                        <p>Block {user.userName} if you don't want them to see your photos, videos or story or find you on Instagram</p>
                        <Button
                            variant='contained'
                        >
                            Block
                    </Button>
                    </React.Fragment>}


                {type === "porn" || type === "violence" || type === 'hate' || type === "drugs" || type === "harrassment" ?
                    <React.Fragment>
                        <h6>{report.header}</h6>
                        <p>We remove profiles with:</p>
                        <ul>
                            {
                                report.information.map((info, i) => {
                                    return (
                                        <li key={i}>{info}</li>
                                    )
                                })
                            }
                        </ul>
                        <p>Your report is anonymous, except if you're reporting an intellectual property infringement.</p>
                        <p>If someone is in immediate danger, call local emergency services. Don't wait.</p>
                        <Button
                            variant='contained'
                            onClick={handleConfirmReport}
                        >
                            Submit
                        </Button>
                    </React.Fragment>
                    : null
                }

                {
                    type === 'property' &&
                    <React.Fragment>
                        <h6>{report.header}</h6>
                        <p>
                            {report.explanation}
                        </p>
                        <Button
                            variant='contained'
                        >
                            Learn More
                        </Button>
                    </React.Fragment>
                }

                {
                    type === "underage" || report.type === "injury" ?
                        <React.Fragment>
                            <h6>{report.header}</h6>
                            <p>
                                {report.explanation}
                            </p>

                            <p>Your report is anonymous, except if you're reporting an intellectual property infringement.</p>
                            <p>If someone is in immediate danger, call local emergency services. Don't wait.</p>

                            <Button
                                variant='contained'
                                onClick={handleConfirmReport}
                            >
                                Submit
                            </Button>

                        </React.Fragment>
                        : null
                }

            </div>

        </div>
    )
}




export default ReportChatFeedBack