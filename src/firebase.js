import {initializeApp} from 'firebase/app';
import {getAuth,onAuthStateChanged} from 'firebase/auth';
import {getFirestore} from "firebase/firestore"


const firebaseApp = initializeApp({
    apiKey: "AIzaSyCOGfXJc0srcQalvSBYYwg5moWoytUs09M",
    authDomain: "netflix-94a58.firebaseapp.com",
    projectId: "netflix-94a58",
    storageBucket: "netflix-94a58.appspot.com",
    messagingSenderId: "453760812185",
    appId: "1:453760812185:web:7ec07bde0d5ecc18ed2408"
});

// const firebaseApp=firebase.initilizeApp(firebaseConfig);
const db=getFirestore(firebaseApp);
const auth=getAuth(firebaseApp);

onAuthStateChanged(auth,user=>{
    if(user!=null){
        console.log("logged in")
    }
    else{
        console.log("logged out")
    }
})

export {auth};
export default db;