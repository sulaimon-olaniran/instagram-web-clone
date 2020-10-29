import React, { useState } from 'react'
import IconButton from '@material-ui/core/IconButton'
//import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormControl from '@material-ui/core/FormControl'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import FormHelperText from '@material-ui/core/FormHelperText'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'



const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    margin: {
      margin: theme.spacing(1),
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    textField: {
      width: '25ch',
    },
  }));


const MyPasswordField = ({ setFieldValue, handleBlur, error, errorMessage }) => {
    const classes = useStyles();

    const [showPassword, setShowPassWord] = useState(false)

    const handleShowPassword = () => {
        setShowPassWord(prev => !prev)
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    }

    const handleChange = (e) => {
        setFieldValue("password", e.target.value, true)
    }

    return (
        <FormControl error={error} variant='outlined' className={clsx(classes.textField)} >
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
                id="password"
                type={showPassword ? 'text' : 'password'}
                onChange={handleChange}
                name="password"
                onBlur={handleBlur}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleShowPassword}
                            onMouseDown={handleMouseDownPassword}
                        >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                }
                labelWidth={70}
            />
            { error && <FormHelperText id="component-error-text">{errorMessage}</FormHelperText>}
        </FormControl>
    )

}

export default MyPasswordField