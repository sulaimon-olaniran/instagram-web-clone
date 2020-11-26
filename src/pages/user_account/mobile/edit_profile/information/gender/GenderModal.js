import React, { useState } from 'react'
import Modal from '@material-ui/core/Modal'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import Button from '@material-ui/core/Button'
import clsx from 'clsx'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'
import { makeStyles } from '@material-ui/core/styles'
import ConfirmDialog from './confrim_dialog/ConfirmDialog'


const useStyles = makeStyles({
    icon: {
      borderRadius: '50%',
      width: 16,
      height: 16,
      boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
      backgroundColor: '#f5f8fa',
      backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
      '$root.Mui-focusVisible &': {
        outline: '2px auto rgba(19,124,189,.6)',
        outlineOffset: 2,
      },
      'input:hover ~ &': {
        backgroundColor: '#ebf1f5',
      },
      'input:disabled ~ &': {
        boxShadow: 'none',
        background: 'rgba(206,217,224,.5)',
      },
    },

    checkedIcon: {
      backgroundColor: '#137cbd',
      backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
      '&:before': {
        display: 'block',
        width: 16,
        height: 16,
        backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
        content: '""',
      },
      'input:hover ~ &': {
        backgroundColor: '#106ba3',
      },
    },
});


const StyledRadio = props => {
    const classes = useStyles();

    return (
        <Radio
            //className={classes.root}
            //disableRipple
            color="default"
            checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
            icon={<span className={classes.icon} />}
            {...props}
        />
    );
}


const GenderModal = ({ openModal, handleCloseModal, defaultValue, toggleGenderValue }) =>{
    const [radioValue, setRadioValue] = useState(defaultValue)
    const [confirmaDialog, setConfrimDialog] = useState(false)

    const handleRadioValueChange = e =>{
        setRadioValue(e.target.value)
    }

    const handleCloseConfirmDialog = () =>{
        setConfrimDialog(false)
    }

    const handleGoBack = () =>{
        if(defaultValue !== radioValue){
            setConfrimDialog(true)
        }
        else{
            handleCloseModal()
        }

    }

    return(
        <React.Fragment>
            <ConfirmDialog 
                openDialog={confirmaDialog}
                handleCloseDialog={handleCloseConfirmDialog}
                handleCloseModal={handleCloseModal}
            />
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                //className={classes.modal}
                open={openModal}
                onClose={handleCloseModal}
                closeAfterTransition
            >
                <div className='profile-information-gender-modal'>
                    <div className='profile-information-gender-modal-nav'>
                        <ArrowBackIosIcon onClick={handleGoBack}/>
                        <p>Gender</p>
                        <Button
                            onClick={() => toggleGenderValue(radioValue)}
                        >
                            Done
                        </Button>
                    </div>

                    <RadioGroup defaultValue={defaultValue} aria-label="gender" name="customized-radios" onChange={handleRadioValueChange}>
                        <FormControlLabel value="Female" control={<StyledRadio />} label="Female" />
                        <FormControlLabel value="Male" control={<StyledRadio />} label="Male" />
                        <FormControlLabel value="Other" control={<StyledRadio />} label="Other" />
                        <FormControlLabel value="Prefer Not To Say" control={<StyledRadio />} label="Prefer Not to Say" />
                    </RadioGroup>
                </div>

            </Modal>
        </React.Fragment>
    )
}




export default GenderModal