import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {db, auth, storage} from "./config/firebase" 
import Modal from "react-modal"
//import {auth} from "./components/auth"
import './App.css'
import { Auth } from './components/auth'
import { collection, 
  getDocs,addDoc, 
  deleteDoc,
  doc,
updateDoc } from 'firebase/firestore'
import { ref, uploadBytes } from 'firebase/storage'
 function App() {
  const [shownModal, setShownModal] = useState(false)
  const [movieList, setMovieList] = useState([])
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(true);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [fileUpload, setFileUpload] = useState(null)
  const getMovieList = async ()=>{
    try{
     const data = await getDocs(moviesCollectionRef)
     const filteredData = data.docs.map((doc)=>({
      ...doc.data(),
      id:doc.id,
     }))
     setMovieList(filteredData)
    }catch(error){
      console.error(error)
    }
  };
  const moviesCollectionRef = collection(db,"movies")
  const deleteMovie = async (id)=>{
     const movieDoc = doc(db, "movies",id )
     await deleteDoc(movieDoc);
  }

  const updateMovieTitle = async (id,)=>{
    const movieDoc = doc(db, "movies",id )
    await updateDoc(movieDoc,{title:updatedTitle});
 }


  useEffect(()=>{
    
    getMovieList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  console.log(movieList)
  },[])
  
  const onsubmitMovie = async ()=>{
    try{
    await addDoc(moviesCollectionRef,{
      title:newMovieTitle,
      releaseDate:newReleaseDate,
      receivedAnOscar:isNewMovieOscar,
      userId:auth?.currentUser?.uid
    })
    getMovieList()
  }catch(error){
    console.error(error)
  }
  }

 const uploadFile =async ()=>{
  if(!fileUpload) return;
  const filesFolderRef = ref(storage,`projectFiles/${fileUpload.name}`)
  try{
    await uploadBytes(filesFolderRef, fileUpload);
    
  }catch(err){
     console.error(err);
  }
 

 }

  return (
   <div className='flex flex-col'>
    <Auth />
    <div className='flex flex-col gap-2'>
       <input placeholder='title' className="border w-60 rounded-md " onChange={(e)=>setNewMovieTitle(e.target.value)}/>
       <input placeholder='releaseDate' className="border w-60 rounded-md "  type='number' onChange={(e)=>setNewReleaseDate(Number(e.target.value))}/>
       <div className='flex  gap-0.5'>
       <input type='checkbox' className="border w-60 rounded-md "  checked={isNewMovieOscar} onChangeCapture={(e)=>setIsNewMovieOscar(e.target.checked)}/>
       <label >received an oscar</label>
       </div>
       
       <button className="w-44 rounded-md border-2"  onClick={onsubmitMovie}>submit movie</button>


    </div>
    <div className='flex gap-2 border'>
      {
        movieList.map((movie)=>(
          <div key={movie.id}  >
                  <h1 style={{color:movie.receivedAnOscar?"green":"red"}}>{movie.title}</h1>
                  <p>Date:{movie.releaseDate}</p>
                  <button onClick={()=>{deleteMovie(movie.id);
                    getMovieList();
                  }} className='w-32 rounded-md border px-3'>delete Movie</button>
                <input  className=' rounded-md border-2' placeholder='updated title...' 
                onChange={(e)=>setUpdatedTitle(e.target.value)}/> 
                <button className='w-36 px-3 rounded border bg-black text-white' 
                onClick={()=>updateMovieTitle(movie.id)}>update movie</button>
            </div>
        ))
      }
     
    </div>
    <Modal isOpen={shownModal} 
    onRequestClose={()=>setShownModal(false)} 
    contentLabel='my log'>
         <button onClick={()=>setShownModal(false)}>close</button>
          <h3>this is modal</h3>
    </Modal>
    <button onClick={()=>setShownModal(true)}>open</button>
    <div>
      <input type="file" onChange={(e)=>setFileUpload(e.target.files[0])} />
      <button onClick={uploadFile}>Upload File</button>
    </div>
   </div>
  
  )
}


export default App
