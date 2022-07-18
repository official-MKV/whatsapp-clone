import firebase from 'firebase/app'
import 'firebase/firestore'
import "firebase/auth"



const firebaseConfig = {
    apiKey: "AIzaSyAyLghUTgBHgik1mJd5sg0IQJ8ik3d4UNA",
    authDomain: "whatsapp-clone-7bd68.firebaseapp.com",
    projectId: "whatsapp-clone-7bd68",
    storageBucket: "whatsapp-clone-7bd68.appspot.com",
    messagingSenderId: "428514983890",
    appId: "1:428514983890:web:95989109c626a69c4a920b"
  };



firebase.initializeApp(firebaseConfig)
 

const db = firebase.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()
 
export {auth, provider}
export default db; 