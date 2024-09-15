import { useState } from "react";
import {auth,googleProvider} from "../config/firebase";
import {createUserWithEmailAndPassword, signInWithPopup, signOut} from "firebase/auth"
export const Auth = ()=>{
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
   const signIn = async ()=>{
    await createUserWithEmailAndPassword(auth,email,password);

   }

   const signInWithGoogle = async ()=>{
    await signInWithPopup(auth,googleProvider);

   }
   //
   const logOut= async ()=>{
    await signOut(auth );

   }
  console.log(auth?.currentUser?.photoURL)
    return(
        <div className="flex flex-col gap-2">
            <input placeholder="Email..." 
            className="border w-60 rounded-md "
            onChange={(e)=>setEmail(e.target.value)}
            />
            <input placeholder="pass" 
             className="border w-60 rounded-md "
            onChange={(e)=>setPassword(e.target.value)}
            />
            <button onClick={signIn} className="border border-gray-500 rounded-md w-24 px-2 ">sign in</button>
            <button onClick={signInWithGoogle} className="border border-gray-500 rounded-md w-44 px-2 ">signin with google</button>
            <button onClick={logOut} className="border border-gray-500 rounded-md w-24 px-2 ">logout</button>
     </div>
    )
}