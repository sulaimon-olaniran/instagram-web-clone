import React, { useEffect, useState } from 'react'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import Button from '@material-ui/core/Button'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'


//import { suggestions } from './Fakedat'
import Suggestion from './suggestion/Suggestion'


const Suggestions = ({ as, auth, users, profile, history }) => {
    const [suggestedUsers, setSuggestedUsers] = useState([])

    useEffect(() => {
        const suggested = []
        //console.log(users)
        //console.log(profile)
        users && users.forEach(user => {
            profile && !profile.following.includes(user.userId) &&
                profile.userId !== user.userId && suggested.push(user)
        })

        setSuggestedUsers(suggested)
    }, [profile, users])

    //console.log(suggestedUsers)

    if (!auth.uid) return <Redirect to='/' />

    return (
        <div className='suggestions-container'>
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

                <div className='suggestions-list-container'>
                    {
                        suggestedUsers.length > 0 && suggestedUsers.map((user, i) => {
                            return (
                                <React.Fragment key={i}>
                                    <Suggestion user={user} profile={profile} />
                                </React.Fragment>
                            )
                        })

                    }
                </div>

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

