import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import MainScreen from './components/MainScreen';
import"./App.css"
import FrontPage from './components/FrontPage';
import SignUp from './components/SignUp';
import Register from './components/Register';
import Profile from './components/Profile';
import { onAuthStateChanged } from 'firebase/auth';
import {auth} from "./firebase"
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/counter/userSlice';

function App() {

  const dispatch= useDispatch();
  const user=useSelector(selectUser)

  useEffect(()=>{
    const unsub=onAuthStateChanged(auth,user=>{
      if(user){
        console.log("user is",user);
        dispatch(login({
          uid:user.uid,
          email:user.email
        }))
      }
      else{
        dispatch(logout);
        console.log("not logged in");
      }
    });
    return unsub;
  },[]);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<FrontPage/>}/>
          <Route path="/View" element={<MainScreen/>}/>
          <Route path="/SignIn" element={<SignUp/>}/>
          <Route path="/Register" element={<Register/>} text={"Register"}/>
          <Route path="/Profile" element={<Profile/>}/>
          <Route path="*" element={<>404 page not found</>}/>
        </Routes>
      </Router>
    </div>
  );
}



export default App;
