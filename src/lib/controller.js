export const signUpWithEmailAndPassword = (email, password) =>    
  firebase.auth().createUserWithEmailAndPassword(email, password);

export const signInWithPassword = (email, password) =>
  firebase.auth().signInWithEmailAndPassword(email, password);


export const loginWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  // firebase.auth().languageCode = 'es';
  // provider.setCustomParameters({
  //   'login_hint': 'user@example.com'
  // });
  return firebase.auth().signInWithPopup(provider).then(function(result) {
    // let token = result.credential.accessToken;
    // let user = result.user;
    result;
  });
};


export const loginWithFacebook = () => {
  let provider = new firebase.auth.FacebookAuthProvider();
  return firebase.auth().signInWithPopup(provider).then(function(result) {
    result;
  });
};

export const addPost = (textNewPost, userId, userName, privacyUser) =>
  firebase.firestore().collection('posts').add({
    content: textNewPost,
    UID: userId,
    name: userName,
    reaction: 0,
    reactionsad: 0,
    reactionlike: 0,
    reactionlove: 0,
    privacity: privacyUser
  });


export const getPost = (callback) => {
  const user = firebase.auth().currentUser;

  if (user !== null) {
    firebase.firestore().collection('posts') 
      .onSnapshot((querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });
        callback(data);
      });
  } else {
    firebase.firestore().collection('posts')
      .where('privacity', '==', 'publico')
      .onSnapshot((querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });
        callback(data);
      });
  }
}; 

export const deletePost = (idPost) =>
  firebase.firestore().collection('posts').doc(idPost).delete();

// Editar publicación
export const editPost = (idPost, textNewUpdate) => {
  let editContent = firebase.firestore().collection('posts').doc(idPost);

  return editContent.update({
    content: textNewUpdate,
  });
};

// Traer  las reacciones y conteo
export const seeReaction = (idPost) => {
  return firebase.firestore().collection('posts').doc(idPost).get()
    .then((result) => {
      const seeCount = result.data().reaction;
      const seeCountSad = result.data().reactionsad;
      const seeCountLike = result.data().reactionlike;
      const seeCountLove = result.data().reactionlove;
      return seeCount, seeCountSad, seeCountLike, seeCountLove;
    }).catch(() => {});
};

export const reactionCount = (idPost, reactionPost) => {  
  let reactionClick = firebase.firestore().collection('posts').doc(idPost);
  return reactionClick.update({
    reaction: reactionPost += 1
  });
};

export const reactionCountSad = (idPost, reactionPostSad) => {  
  let reactionClick = firebase.firestore().collection('posts').doc(idPost);
  return reactionClick.update({
    reactionsad: reactionPostSad += 1
  });
};
export const reactionCountLike = (idPost, reactionPostLike) => {  
  let reactionClick = firebase.firestore().collection('posts').doc(idPost);
  return reactionClick.update({
    reactionlike: reactionPostLike += 1
  });
};
export const reactionCountLove = (idPost, reactionPostLove) => {  
  let reactionClick = firebase.firestore().collection('posts').doc(idPost);
  return reactionClick.update({
    reactionlove: reactionPostLove += 1
  });
};

