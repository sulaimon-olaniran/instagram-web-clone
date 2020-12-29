import React, { useState } from 'react'
import Dialog from '@material-ui/core/Dialog'
import Button from '@material-ui/core/Button'


import ReportModal, { ReportDialog } from './report/ReportModal'
import RestrictDrawer, { RestrictDialog } from './restrict/Restrict'
import BlockDialog from './block/Block'



const BlockReportRestrictDialog = ({ handleCloseDialog, openDialog, userProfile }) =>{
    const [openReportModal, setOpenReportModal] = useState(false)
    const [openRestrictDrawer, setOpenRestrictDrawer] = useState(false)
    const [openBlockDialog, setOpenBlockDialog] = useState(false)
    const [restrictDialog, setRestrictDialog] = useState(false)
    const [reportDialog, setReportDialog] = useState(false)

    const handleOpenReportMOdal = () =>{
        setOpenReportModal(true)
    }

    const handleOpenRestrictDrawer = () =>{
        setOpenRestrictDrawer(true)
    }

    const handleOpenBlockDialog = () =>{
        setOpenBlockDialog(true)
    }

    const handleOpenRestrictDialog = () => {
        setRestrictDialog(true)
    }

    const handleOpenReportDialog = () =>{
        setReportDialog(true)
    }

    const handleClose = () =>{
        setOpenReportModal(false)
        setOpenRestrictDrawer(false)
        setOpenBlockDialog(false)
        setRestrictDialog(false)
        setReportDialog(false)
    }



    return(
        <Dialog onClose={handleCloseDialog} aria-labelledby="simple-dialog-title" open={openDialog}>
            <div className='brr-dialog-container'>
                <BlockDialog 
                   openDialog={openBlockDialog}
                   handleCloseDialog={handleClose}
                   userProfile={userProfile}
                />

                <ReportModal 
                   openModal={openReportModal}
                   handleCloseModal={handleClose}
                   closeDialog={handleCloseDialog} //close innitial dialog 
                   text='account'
                />

                <RestrictDrawer 
                  openDrawer={openRestrictDrawer}
                  handleCloseDrawer={handleClose}
                />

                <RestrictDialog 
                    openDialog={restrictDialog}
                    handleCloseDialog={handleClose}
                />

                <ReportDialog
                    openDialog={reportDialog}
                    handleCloseDialog={handleClose}
                    text='account'
                />

                <div className="brr-button-container">
                    <Button size="large" color="secondary" onClick={handleOpenBlockDialog}>Block this user</Button>
                </div>

                <div className="brr-button-container pc">
                    <Button size="large" color="secondary" onClick={handleOpenRestrictDialog}>Restrict</Button>
                </div>

                <div className="brr-button-container mobile">
                    <Button size="large" color="secondary" onClick={handleOpenRestrictDrawer}>Restrict</Button>
                </div>

                <div className="brr-button-container pc">
                    <Button size="large" color="secondary" onClick={handleOpenReportDialog}>Report User</Button>
                </div>

                <div className="brr-button-container mobile">
                    <Button size="large" color="secondary" onClick={handleOpenReportMOdal}>Report User</Button>
                </div>

                <div className="brr-button-container">
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                </div>
            </div>
        </Dialog>
    )
}


export default BlockReportRestrictDialog