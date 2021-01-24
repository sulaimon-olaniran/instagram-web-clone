import React from 'react'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import Button from '@material-ui/core/Button'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'


import Suggestion from './suggestion/Suggestion'


const Suggestions = ({ as, auth, users, profile, history }) => {

    const filterOutUserWithStories = (data) =>{
        return(
           profile && !profile.following.includes(data.userId) && profile.userId !== data.userId
        )
    }

    const shuffleArray = (array) => {
        return array.sort(() => Math.random() - 0.5);
    }


    const suggestedUsers = users && users.filter(filterOutUserWithStories)

    const shuffledSuggestedUsers = suggestedUsers && shuffleArray(suggestedUsers)
    

    const styleName = as === 'component' ? 'component' : 'page'
    

    if (!auth.uid) return <Redirect to='/' />

    return (
        <div className={`suggestions-container ${styleName}`} >
            {as !== 'component' &&
                <div className='suggestions-nav-container'>
                    <ArrowBackIosIcon onClick={() => history.goBack()} />
                    <p>Discover People</p>
                </div>}

            <div className='suggestions-contents-container'>
                {as !== 'component' ?
                    <p>Suggested</p>
                    :
                    <p>Suggestions For You</p>
                }

                {as !== 'component' ? <div className='suggestions-list-container'>
                    {
                        shuffledSuggestedUsers.length > 0 && shuffledSuggestedUsers.map((user, i) => {
                            return (
                                <React.Fragment key={i}>
                                    <Suggestion user={user} profile={profile} />
                                </React.Fragment>
                            )
                        })

                    }
                </div>
                    :
                <div className='suggestions-list-container'>
                    {
                        shuffledSuggestedUsers.length > 0 && shuffledSuggestedUsers.slice(0, 10).map((user, i) => {
                            return (
                                <React.Fragment key={i}>
                                    <Suggestion user={user} profile={profile} />
                                </React.Fragment>
                            )
                        })

                    }
                </div>}

            </div>
            { as === 'component' &&
                <Link to='/explore/people/suggested'>
                    <Button>
                        See All Suggestions
                    </Button>
                </Link>
            }

        </div>
    )
}


const mapStateToProps = (state) => {
    //console.log(state)
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        users: state.firestore.ordered.users,
    }
}



export default compose(
    connect(mapStateToProps),
    firestoreConnect(() => ['users'])
)(Suggestions)

