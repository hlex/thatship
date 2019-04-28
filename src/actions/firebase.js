import { firebase } from '../lib'

export const writeUserData = ({ userId, displayName, email, profileImage }) => {
  console.log('writeUserData', userId, displayName, email, profileImage)
  return async (dispatch) => {
    const snapshot = await firebase
      .database()
      .ref('/users/' + userId)
      .once('value')
    const isExistingUser = snapshot.val() && snapshot.val() !== null
    console.log('isExistingUser', isExistingUser)
    if (isExistingUser) {
      const favoritesSnapShot = await firebase.database().ref(`users/${userId}/favorites`).once('value')
      const dubsSnapShot = await firebase.database().ref(`users/${userId}/dubs`).once('value')
      firebase.database().ref(`users/${userId}`).update({
        displayName,
        email,
        profileImage,
        favorites: favoritesSnapShot.val() || {},
        dubs: dubsSnapShot.val() || {}
      })
    } else {
      firebase.database().ref(`users/${userId}`).set({
        displayName,
        email,
        profileImage,
        favorites: {}
      })
    }
  }
}

export const writeUserFavoriteMedia = ({ userId, mediaSlug }) => {
  console.log('writeUserFavoriteMedia', userId, mediaSlug)
  return (dispatch) => {
    firebase.database().ref(`users/${userId}/favorites/${mediaSlug}`).set(true)
  }
}

export const writeUserUnFavoriteMedia = ({ userId, mediaSlug }) => {
  console.log('writeUserUnFavoriteMedia', userId, mediaSlug)
  return (dispatch) => {
    firebase.database().ref(`users/${userId}/favorites/${mediaSlug}`).set(null)
  }
}

export const writeUserDubtitle = ({ userId, mediaSlug, recordedURL }) => {
  console.log('writeUserDubtitle', userId, mediaSlug, recordedURL)
  return (dispatch) => {
    firebase.database().ref(`users/${userId}/dubs/${mediaSlug}`).set(recordedURL)
  }
}

export const uploadBlob = (file, path) => {
  // Create a root reference
  const storageRef = firebase.storage().ref()
  const pathRef = storageRef.child(path)
  return pathRef.put(file)
}
