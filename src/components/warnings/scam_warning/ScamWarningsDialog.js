import React from 'react'
import { connect } from 'react-redux'
import Dialog from '@material-ui/core/Dialog'
import Button from '@material-ui/core/Button'



import { handleCloseScamWarning } from '../../../store/actions/AppActions'


const ScamWarningDialog = ({ openDialog, closeDialog }) =>{

    return(
        <Dialog aria-labelledby="simple-dialog-title" open={openDialog}>
            <div className='scam-warning-dialog-container'>
                    <h2>This isn't the real Instagram</h2>
                    <p>Please, be aware of scammers</p>
                    <small>
                        This is just an instagram clone built as a project, please do not share 
                        any personal information with any account/profile you find here as they
                        will probably be fake or belongs to scammers.
                    </small>

                    <Button 
                        onClick={closeDialog}
                        color='secondary'
                    >
                        Continue
                    </Button>
            </div>
        </Dialog>
    )
}



const mapStateToProps = (state) =>{
    return{
        openDialog : state.application.scamWarning
    }
}


const mapDispatchToProps = dispatch =>{
    return{
        closeDialog : () => dispatch(handleCloseScamWarning())
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(ScamWarningDialog)