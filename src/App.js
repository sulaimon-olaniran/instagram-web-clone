import React, { useState } from 'react'
import './styles/Styles.scss'
import FormikSignIn from './pages/signin/SignIn'
import ResetPassword from './pages/rest_password/_ResetPassword'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import { connect } from 'react-redux'
import Snackbar from '@material-ui/core/Snackbar'



import FormikSignUp from './pages/signup/SignUp'
import Home from './pages/home/Home'
//import MobileComments from './pages/comments/mobile/MobileComments'
import BottomNav from './components/navbar/BottomNav'
import Explore from './pages/expolore/Explore'
import Suggestions from './pages/suggestions/Suggestions'
import ViewStory from './pages/story/ViewStory'
//import MobilePost from './pages/post/mobile/MobilePost'
import FormikChangePassword from './pages/change_password/ChangePassoword'
//import GradientLoader from './components/loaders/gradient/GradientLoader'
import { closeStorySnackBar } from './store/actions/StoryAction'
import Profile from './pages/profile/Profile'
import UserAccount from './pages/user_account/UserAccount'
import MobileAccountActivity from './pages/mobile_activity/AccountActivity'
import ProfileCard from './components/profile_card/ProfileCard'
import Post from './pages/post/Post'
import TopPcNav from './components/navbar/top_nav/TopPcNav'
import PcEditProfile from './pages/user_account/pc/edit_profile/PcEditProfile'
import MobileSearch from './pages/mobile_search/MobileSearch'
import Messenger from './messenger/Messenger'



function App({ auth, storyAdded, closeStorySnackBar }) {
  const [currentPage, setCurrentPage] = useState('')
  
  const homeComponent = auth.uid ? <Home setCurrentPage={setCurrentPage}/> : <FormikSignIn />


  //VIEW STORY AND COMMENTS NOT NEEDED AS LINKS ANYMORE

  return (
    <Router>
      <div className="App">
        <ViewStory />
        <Switch>
          <Route path='/signup' exact component={FormikSignUp} />
          <Route path='/accounts/password/reset' exact component={ResetPassword} />
          {/* <Route path='/stories/:name/:id' exact component={ViewStory} /> */}

          <React.Fragment>
            <TopPcNav />
            <Route path='/' exact component={() => homeComponent} />
            <Route path='/explore' exact component={() => <Explore setCurrentPage={setCurrentPage}/>} />
            <Route path='/explore/search' exact component={() => <MobileSearch setCurrentPage={setCurrentPage}/>} />
            {/* <Route path='/comments' exact component={MobileComments} /> */}
            <Route path='/explore/people/suggested' exact component={Suggestions} />
            <Route path='/profile/:username/:id' exact component={Profile} />
            <Route path='/p/:postId/' exact component={Post} />
            <Route path='/accounts/edit' exact component={PcEditProfile} />
            <Route path='/direct/inbox' exact component={Messenger} />
            <Route exact path='/account/:username/:userId'  component={ () => <UserAccount setCurrentPage={setCurrentPage}/>} />
            <Route path='/accounts/password/change' exact component={FormikChangePassword} />
            <Route path='/account/activity' exact component={() => <MobileAccountActivity setCurrentPage={setCurrentPage}/>} />
            <BottomNav currentPage={currentPage} />
          </React.Fragment>
        </Switch>

        <Snackbar
            open={storyAdded}
            message="Image Added to your stories"
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
            }}
            onClose={closeStorySnackBar}
            autoHideDuration={3000}
        />
        <ProfileCard />
      </div>
    </Router>
  );
}

const mapStateToProps = (state) =>{
  //console.log(state)
  return{
    auth : state.firebase.auth,
    storyAdded : state.story.storyAdded,
  }
}


const mapDispatchToProps = dispatch =>{
  return{
    closeStorySnackBar : () => dispatch(closeStorySnackBar())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);



