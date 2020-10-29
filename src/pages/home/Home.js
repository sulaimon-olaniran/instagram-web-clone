import React from 'react'
//import { connect } from 'react-redux'


import MobileHome from './mobile/MobileHome'



const Home = (props) =>{
    //console.log(props)
    return(
        <div>
           <MobileHome />
        </div>
    )
}


// const mapStateToProps = (state) =>{
//     return{
//         posts : state.posts.feedPosts
//     }
// }


//export default connect(mapStateToProps)(Home)

export default Home