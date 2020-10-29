import React, { useState } from 'react'
import Dialog from '@material-ui/core/Dialog'
import Button from '@material-ui/core/Button'


import ReportModal from './report/ReportModal'
import RestrictDrawer from './restrict/Restrict'
import BlockDialog from './block/Block'



const BlockReportRestrictDialog = ({ handleCloseDialog, openDialog }) =>{
    const [openReportModal, setOpenReportModal] = useState(false)
    const [openRestrictDrawer, setOpenRestrictDrawer] = useState(false)
    const [openBlockDialog, setOpenBlockDialog] = useState(false)

    const handleOpenReportMOdal = () =>{
        setOpenReportModal(true)
    }

    const handleOpenRestrictDrawer = () =>{
        setOpenRestrictDrawer(true)
    }

    const handleOpenBlockDialog = () =>{
        setOpenBlockDialog(true)
    }

    const handleClose = () =>{
        setOpenReportModal(false)
        setOpenRestrictDrawer(false)
        setOpenBlockDialog(false)
    }



    return(
        <Dialog onClose={handleCloseDialog} aria-labelledby="simple-dialog-title" open={openDialog}>
            <div className='brr-dialog-container'>
                <BlockDialog 
                   openDialog={openBlockDialog}
                   handleCloseDialog={handleClose}
                />

                <ReportModal 
                   openModal={openReportModal}
                   handleCloseModal={handleClose}
                   closeDialog={handleCloseDialog} //close innitial dialog 
                />

                <RestrictDrawer 
                  openDrawer={openRestrictDrawer}
                  handleCloseDrawer={handleClose}
                />

                <div className="brr-button-container">
                    <Button size="large" color="secondary" onClick={handleOpenBlockDialog}>Block this user</Button>
                </div>

                <div className="brr-button-container">
                    <Button size="large" color="secondary" onClick={handleOpenRestrictDrawer}>Restrict</Button>
                </div>

                <div className="brr-button-container">
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