import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import { Button } from '@material-ui/core'






const UnsendReportDialog = ({ openDialog, handleCloseDialog, message, profile, handleDeleteMessage }) =>{
    return(
        <Dialog
            aria-labelledby='simple-dialog-title'
            open={openDialog}
            onClose={handleCloseDialog}
        >
            <div className='unsend-report-dialog-container'>
                {profile && message.sender === profile.userId ?
                <div className='unsend-report-dialog-button-container'>
                    <Button
                        onClick={() => handleDeleteMessage(message)}
                    >
                        Unsend
                    </Button>
                </div>

                :

                <div className='unsend-report-dialog-button-container'>
                    <Button>
                        Report
                    </Button>
                </div>
                }


                <div className='unsend-report-dialog-button-container'>
                    <Button 
                        onClick={handleCloseDialog}
                    >
                        Cancel
                    </Button>
                </div>


            </div>
        </Dialog>

    )
}



export default UnsendReportDialog