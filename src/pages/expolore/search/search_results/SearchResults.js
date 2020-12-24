import React, { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar'
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import SpinnerLoader from '../../../../components/loaders/spinner/SpinnerLoader'


const useStyles = makeStyles((theme) => ({
    xLarge: {
        width: theme.spacing(18),
        height: theme.spacing(18),
    },

    button: {
        width: '100%',
    },
}));




const SearchResults = ({ inputValue, users }) =>{
    const [matchedSearch, setMatchedSearch] = useState([])
    const classes = useStyles()



    const handleSearchOutput = useCallback(() =>{
        const matchedUsers = []
        users && users.forEach(user =>{
            if(user.userName.toLowerCase().includes(inputValue.toLowerCase())){
                matchedUsers.push(user)
            }
        })

        setMatchedSearch(matchedUsers)
        
    }, [ users, inputValue])


    useEffect(() =>{
        handleSearchOutput()

    }, [handleSearchOutput])

    if(!users) return <SpinnerLoader height='100vh' />

    return(
        <div className='search-results-container'>
            {
                matchedSearch.length > 0 ? matchedSearch.map(user =>{
                    return(
                        <div className='each-search-result-container' key={user.userId}>
                            <Avatar src={user.profilePhoto} alt={user.userName} />

                            <div className='names-container'>
                                <p>{user.userName}</p>
                                <small>{user.fullName}</small>
                            </div>
                        </div>
                    )
                })

                :

                <p>No user matched your search</p>
            }


        </div>
    )
}


const mapStateToProps = (state) =>{
    return{
        auth : state.firebase.auth,
        profile: state.firebase.profile,
        users: state.firestore.ordered.users,
    }
}
export default compose(
    connect(mapStateToProps),
    firestoreConnect(() => ['users'])
)(SearchResults)



