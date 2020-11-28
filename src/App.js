import React, { useState } from 'react'
import './styles/Styles.scss'
import FormikSignIn from './pages/signin/SignIn'
import ResetPassword from './pages/rest_password/_ResetPassword'
//import Loader from './components/Loader'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import { connect } from 'react-redux'



import FormikSignUp from './pages/signup/SignUp'
import Home from './pages/home/Home'
import MobileComments from './pages/comments/mobile/MobileComments'
import BottomNav from './components/navbar/BottomNav'
import Explore from './pages/expolore/Explore'
import Suggestions from './pages/suggestions/Suggestions'
import ViewStory from './pages/story/ViewStory'
//import MobileProfile from './pages/profile/mobile/MobileProfile'
import MobilePost from './pages/post/mobile/MobilePost'
//import MobileUserAccount from './pages/user_account/mobile/MobileUserAccount'
import FormikChangePassword from './pages/change_password/ChangePassoword'
//import MobileWelcome from './pages/welcome/mobile/MobileWelcome'
//import GradientLoader from './components/loaders/gradient/GradientLoader'

import Profile from './pages/profile/Profile'
import UserAccount from './pages/user_account/UserAccount'
import MobileAccountActivity from './pages/mobile_activity/AccountActivity'



function App({ auth }) {
  const [currentPage, setCurrentPage] = useState('')
  //const signedIn = false
  const homeComponent = auth.uid ? <Home setCurrentPage={setCurrentPage}/> : <FormikSignIn />


  //VIEW STORY AND COMMENTS NOT NEEDED AS LINKS ANYMORE

  return (
    <Router>
      <div className="App">

        <Switch>
          <Route path='/signup' exact component={FormikSignUp} />
          <Route path='/accounts/password/reset' exact component={ResetPassword} />
          <Route path='/stories/:name/:id' exact component={ViewStory} />

          <React.Fragment>
            <Route path='/' exact component={() => homeComponent} />
            <Route path='/explore' exact component={() => <Explore setCurrentPage={setCurrentPage}/>} />
            <Route path='/comments' exact component={MobileComments} />
            <Route path='/explore/people/suggested' exact component={Suggestions} />
            <Route path='/profile/:username/:id' exact component={Profile} />
            <Route path='/p/:postId/' exact component={MobilePost} />
            <Route exact path='/account/:username/:userId'  component={ () => <UserAccount setCurrentPage={setCurrentPage}/>} />
            <Route path='/accounts/password/change' exact component={FormikChangePassword} />
            <Route path='/account/activity' exact component={() => <MobileAccountActivity setCurrentPage={setCurrentPage}/>} />
            <BottomNav currentPage={currentPage} />
          </React.Fragment>
        </Switch>
      </div>
    </Router>
  );
}

const mapStateToProps = (state) =>{
  //console.log(state)
  return{
    auth : state.firebase.auth
  }
}

export default connect(mapStateToProps)(App);



