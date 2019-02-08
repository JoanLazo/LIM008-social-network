export const signUpWithEmailAndPassword = (email, password, cb) => {    
  firebase.auth().createUserWithEmailAndPassword(email, password)
    // .then(result => {
    //   const redir = {
    //     url: 'http://localhost:5000/'
    //   };
    //   result.user.sendEmailVerification(redir).catch(function(error) {
    //     alert(`No se pudo enviar email ${error}`);
    //   });
    //   firebase.auth().signOut();
    // })
    .catch(function(error) {
      let errorCode = error.code;
      let errorMessage = error.message;

      cb(errorCode + ' / ' + errorMessage);
    });
};

export const signInWithPassword = (email, password) =>
  firebase.auth().signInWithEmailAndPassword(email, password);


export const loginWithGoogle = () => {
  if (!firebase.auth().currentUser) {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().languageCode = 'es';

  provider.setCustomParameters({
    'login_hint': 'user@example.com'
  });
 return firebase.auth().signInWithPopup(provider).then(function(result) {
    let token = result.credential.accessToken;
    let user = result.user;
  });
  } else {
    firebase.auth().signOut();
  }
};


export const loginWithFacebook = () => {
  let provider = new firebase.auth.FacebookAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function(result) {
    result;
  }).then(() => {
    location.hash = '#/redsocial';
  }).catch(function(error) {
    error;
  });
};

export const addPost = (textNewPost) =>
  firebase.firestore().collection('posts').add({
    // displayName: displayName,
    title: textNewPost,
    // privacy: userPrivacy,
  });

export const getPost = (callback) =>
  firebase.firestore().collection('posts')
    .onSnapshot((querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      callback(data);
    }); 

export const deletePost = (idPost) =>
  firebase.firestore().collection('posts').doc(idPost).delete();


// Editar publicación


export const editPost = (idPost, textNewUpdate) => {
  let washingtonRef = firebase.firestore().collection('posts').doc(idPost);

  return washingtonRef.update({
    title: textNewUpdate,
  })
    .catch(function(error) {
      console.error('Error updating document: ', error);
    });
};

