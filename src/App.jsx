
import './index.css'

import Routing from '../Router'
import { useContext, useEffect } from 'react'
import { DataContext } from './Components/DataProvider/DataProvider'
import { Type } from './Utility/Action.type'
import { auth } from './Utility/FireBase'

function App() {
  const[{user},dispatch]=useContext(DataContext)
  useEffect(()=>{
auth.onAuthStateChanged((authUser)=>{
  if(authUser){
 dispatch({
   type: Type.SET_USER,
   user: authUser,
 });
  }else{
    dispatch({
      type: Type.SET_USER,
      user: null,
    });
  }
 
})

  },[])

  return (
    <>
    <Routing/>
    
    </>
  )
}

export default App
