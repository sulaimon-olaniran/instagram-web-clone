import React, { useState, useEffect, useCallback } from 'react'
import './styles/Styles.scss'
import FormikSignIn from './pages/signin/SignIn'
import ResetPassword from './pages/rest_password/_ResetPassword'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import { connect } from 'react-redux'
import Snackbar from '@material-ui/core/Snackbar'



import { db } from './firebase/Firebase'
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
import { closeSharedPostSnackbar, closeCreatePostModal } from './store/actions/PostsAction'
import Profile from './pages/profile/Profile'
import UserAccount from './pages/user_account/UserAccount'
import MobileAccountActivity from './pages/mobile_activity/AccountActivity'
import ProfileCard from './components/profile_card/ProfileCard'
import Post from './pages/post/Post'
import TopPcNav from './components/navbar/top_nav/TopPcNav'
import PcEditProfile from './pages/user_account/pc/edit_profile/PcEditProfile'
import MobileSearch from './pages/mobile_search/MobileSearch'
import Messenger from './messenger/Messenger'
//import ChatBoard from './messenger/chat_board/ChatBoard'
import MobileChatBoardModal from './messenger/mobile/mobile_chatboard/MobileChatBoardModal'
import UploadModal from './components/upload/modal/UploadModal'
import ScamWarningsDialog from './components/warnings/scam_warning/ScamWarningsDialog'



function App({ auth, storyAdded, closeStorySnackBar, sharedPost, closeSharePostSnackbar, 
  createPostModal, fileUrl, filePreviewUrl, closeCreatePostModal, snackBarText }) {

  const [unReadMessages, setUnreadMessages] = useState([])
  const [currentPage, setCurrentPage] = useState('')


  const grabAllUserUnreadMessages = useCallback(() => {
    auth.isLoaded && !auth.isEmpty &&
      db.collection('users').doc(auth.uid).collection('chats')
        .onSnapshot(snapshot => {
          const unRead = []
          snapshot.forEach(doc => {
            const data = doc.data()
            if (data.unRead === true) {
              unRead.push(data)
            }
          })

          setUnreadMessages(unRead)

        })

  }, [auth])


  useEffect(() => {
    grabAllUserUnreadMessages()

  }, [grabAllUserUnreadMessages])

  const homeComponent = auth.uid ? <Home setCurrentPage={setCurrentPage} unReadMessages={unReadMessages} /> : <FormikSignIn />


  //VIEW STORY AND COMMENTS NOT NEEDED AS LINKS ANYMORE

  return (
    <Router>
      <div className="App">

        <ViewStory />
        <UploadModal
            openModal={createPostModal}
            handleCloseModal={closeCreatePostModal}
            filePreviewUrl={filePreviewUrl}
            fileUrl={fileUrl}
            type='feed-post'
        />


        <Switch>
          <Route path='/signup' exact component={FormikSignUp} />
          <Route path='/accounts/password/reset' exact component={ResetPassword} />
          {/* <Route path='/stories/:name/:id' exact component={ViewStory} /> */}

          <React.Fragment>
            <TopPcNav unReadMessages={unReadMessages} />
            <Route path='/' exact component={() => homeComponent} />
            <Route path='/explore' exact component={() => <Explore setCurrentPage={setCurrentPage} />} />
            <Route path='/explore/search' exact component={() => <MobileSearch setCurrentPage={setCurrentPage} />} />
            {/* <Route path='/comments' exact component={MobileComments} /> */}
            <Route path='/explore/people/suggested' exact component={Suggestions} />
            <Route path='/profile/:username/:id' exact component={Profile} />
            <Route path='/p/:postId/' exact component={Post} />
            <Route path='/accounts/edit' exact component={PcEditProfile} />
            <Route path='/direct/inbox' exact component={Messenger} />
            <Route exact path='/account/:username/:userId' component={() => <UserAccount setCurrentPage={setCurrentPage} />} />
            <Route path='/accounts/password/change' exact component={FormikChangePassword} />
            {/* <Route path='/direct/t/chat' exact component={ChatBoard} /> */}
            <Route path='/account/activity' exact component={() => <MobileAccountActivity setCurrentPage={setCurrentPage} />} />
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

        <Snackbar
          open={sharedPost}
          message={snackBarText}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          onClose={closeSharePostSnackbar}
          autoHideDuration={3000}
        />
        
        <ProfileCard />

        <MobileChatBoardModal />

        <ScamWarningsDialog />

      </div>
    </Router>
  );
}

const mapStateToProps = (state) => {
  //console.log(state)
  return {
    auth: state.firebase.auth,
    storyAdded: state.story.storyAdded,
    sharedPost : state.posts.sharedPostSnackBar,
    fileUrl : state.posts.fileUrl,
    filePreviewUrl : state.posts.filePreviewUrl,
    createPostModal : state.posts.createPostModal,
    snackBarText : state.posts.snackBarText

  }
}


const mapDispatchToProps = dispatch => {
  return {
    closeStorySnackBar: () => dispatch(closeStorySnackBar()),
    closeSharePostSnackbar: () => dispatch(closeSharedPostSnackbar()),
    closeCreatePostModal : () => dispatch(closeCreatePostModal())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);



