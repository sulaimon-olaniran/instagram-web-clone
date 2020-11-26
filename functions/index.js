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


exports.followUserNotification = functions.https.onCall((data, context) =>{
    const { userId, accountId, time, notification } = data
    const docId = userId.concat(accountId)

    return admin.firestore().collection('users').doc(accountId)
    .collection('notifications').doc(docId).set({
        time : time,
        userId : userId,
        notification : notification,
        seen : false,
        type : 'followed'
    })
    .then(() =>{
        return 'Notification sent successfully'
    })
    .catch(error =>{
        return error
    })
})


exports.likedPostNotification = functions.https.onCall((data, context) =>{
    const { userId, accountId, time, postId, notification } = data
    const docId = userId.concat(postId)

    return admin.firestore().collection('users').doc(accountId)
    .collection('notifications').doc(docId).set({
        time : time,
        userId : userId,
        postId : postId,
        notification : notification,
        seen : false,
        type : 'liked_post'
    })
    .then(() =>{
        return 'Notification sent successfully'
    })
    .catch(error =>{
        return error
    })
})


exports.commentOnPostNotification = functions.https.onCall((data, context) =>{
    const { userId, accountId, time, postId, notification, commentId} = data

    const docId = userId.concat(commentId)

    return admin.firestore().collection('users').doc(accountId)
    .collection('notifications').doc(docId).set({
        time : time,
        userId : userId,
        postId : postId,
        notification : notification,
        seen : false,
        type : 'post_comment'
    })
    .then(() =>{
        return 'Notification sent successfully'
    })
    .catch(error =>{
        return error
    })
})

exports.likedPostCommentNotification = functions.https.onCall((data, context) =>{
    const { userId, accountId, time, postId, notification, commentId} = data

    const docId = commentId.concat(userId)

    return admin.firestore().collection('users').doc(accountId)
    .collection('notifications').doc(docId).set({
        time : time,
        userId : userId,
        postId : postId,
        notification : notification,
        seen : false,
        type : 'liked_comment'
    })
    .then(() =>{
        return 'Notification sent successfully'
    })
    .catch(error =>{
        return error
    })
})


