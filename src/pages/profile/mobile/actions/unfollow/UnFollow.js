import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'



const useStyles = makeStyles((theme) => ({
    large: {
        width: theme.spacing(10),
        height: theme.spacing(10),
    },
}));

const UnFollowDialog = ({ handleCloseDialog, openDialog }) => {
    const classes = useStyles()
    return (
        <Dialog onClose={handleCloseDialog} aria-labelledby="simple-dialog-title" open={openDialog}>
            <div className='unfollow-dialog-container'>
                <Avatar
                    className={classes.large}
                    src='https://source.unsplash.com/random/600x600/?woman'
                />

                <p>Unfollow Olami_dipup0</p>

                <div className='unfollow-buttons-container'>
                    <div className='unfollow-dialog-button-container'>
                        <Button color='secondary' size='large'>Unfollow</Button>
                    </div>

                    <div className='unfollow-dialog-button-container'>
                        <Button onClick={handleCloseDialog}>Cancel</Button>
                    </div>
                </div>
            </div>
        </Dialog>
    )
}


export default UnFollowDialog