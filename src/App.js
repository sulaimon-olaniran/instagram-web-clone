import React from 'react'
import './styles/Styles.scss'
import FormikSignIn from './pages/signin/SignIn'
import ResetPassword from './pages/rest_password/_ResetPassword'
//import Loader from './components/Loader'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'



import FormikSignUp from './pages/signup/SignUp'
import Home from './pages/home/Home'
import MobileComments from './pages/comments/mobile/MobileComments'
import BottomNav from './components/navbar/BottomNav'
import Explore from './pages/expolore/Explore'
import Suggestions from './pages/suggestions/Suggestions'
import ViewStory from './pages/story/ViewStory'
import MobileProfile from './pages/profile/mobile/MobileProfile'
import MobilePost from './pages/post/mobile/MobilePost'
import MobileUserAccount from './pages/user_account/mobile/MobileUserAccount'
import FormikChangePassword from './pages/change_password/ChangePassoword'
//import MobileWelcome from './pages/welcome/mobile/MobileWelcome'
//import GradientLoader from './components/loaders/gradient/GradientLoader'



function App() {
  const signedIn = true
  const homeComponent = signedIn ? Home : FormikSignIn

  return (
    <Router>
      <div className="App">

        <Switch>
          <Route path='/signup' exact component={FormikSignUp} />
          <Route path='/accounts/password/reset' exact component={ResetPassword} />
          <Route path='/stories/:name/:id' exact component={ViewStory} />

          <React.Fragment>
            <Route path='/' exact component={homeComponent} />
            <Route path='/explore' exact component={Explore} />
            <Route path='/comments' exact component={MobileComments} />
            <Route path='/explore/people/suggested/' exact component={Suggestions} />
            <Route path='/profile/:username/' exact component={MobileProfile} />
            <Route path='/post/:postId/' exact component={MobilePost} />
            <Route path='/sulai_m0n/' exact component={MobileUserAccount} />
            <Route path='/accounts/password/change' exact component={FormikChangePassword} />
            <BottomNav />
          </React.Fragment>
        </Switch>
      </div>
    </Router>
  );
}

export default App;



