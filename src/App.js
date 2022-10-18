
import './App.css';
import {getAuth, GithubAuthProvider, GoogleAuthProvider,signInWithPopup, signOut} from 'firebase/auth'
import app from './firebase/Firebase.init';
import { useState } from 'react';

const auth=getAuth(app)

function App() {
  const [user,setUser]=useState({})
  const googleProvider= new GoogleAuthProvider();
  const githubProvider= new GithubAuthProvider();
  const handleGoogleSignIn=()=>{
    signInWithPopup(auth,googleProvider)
    .then(result=>{
      const user=result.user;
      setUser(user)
      console.log(user)
    })
    .catch(error=>{
      console.error('error:', error)} 
      )
  }
  const handleSignOut=()=>{
    signOut(auth)
    .then(()=>{
      setUser({})
    })
    .catch(()=>{
      setUser({})
    })
    
  }
  const handleGithubSignIn=()=>{
    signInWithPopup(auth, githubProvider)
    .then(result=>{
const user=result.user;
setUser(user);
console.log(user);
    })
    .catch(error=>{
      console.error('error:', error)
    })
  }
  return (
    <div className="App">
     { user.uid?
     <button onClick={handleSignOut}>Sign Out</button>
     :
     <div>
      <button onClick={handleGoogleSignIn}>Google</button>
      <button onClick={handleGithubSignIn}>Github</button>
     </div>
      }
      {user.uid && <div>
      <img src={user.photoURL} alt="" />
      Name: {user.displayName}
      <br />
      email: {user.email}
      </div>}
     
    </div>
  );
}

export default App;
