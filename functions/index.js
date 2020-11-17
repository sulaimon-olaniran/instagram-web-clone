const functions = require('firebase-functions')
const admin = require('firebase-admin')


admin.initializeApp(functions.config().firebase)


exports.checkIfEmailExists = functions.https.onCall((data, context) => {
    const email = data.email
    return admin.auth().getUserByEmail(email)
    .then(userRecord =>{
        if(userRecord){
            return true
        }
    })
    .catch( error =>{
        if(error){
            return false
        }
    })
})


exports.handleFollowUser = functions.https.onCall((data, context) =>{
    const userId = data.userId
    const accountId = data.accountId
    const time = data.timeStamp
    const notification = data.notification
    const profilePicture = data.userPicture
    const userName = data.userName

    return admin.firestore().collection('users').doc(accountId)
    .collection('notifications').add({
        time : time,
        userId : userId,
        notification : notification,
        profilePicture : profilePicture,
        userName : userName
    })
    .then(() =>{
        return 'Notification sent successfully'
    })
    .catch(error =>{
        return error
    })
})