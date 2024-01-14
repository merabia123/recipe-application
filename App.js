import React from "react";
import { useGlobalContext } from "./Context"
import './App.css'

import Search from './Component/Search'
import Meals from './Component/Meals'
import Modal from './Component/Modal'
import Favorite from './Component/Favorite'

function App() {
   const {showModal,favorites} = useGlobalContext()
   return(
    <main>
     {favorites.lenght>0 &&<Favorite/>}
         <Search/>
      { showModal && <Modal/>}
      <Meals/>
      {/* { showModal && <Modal/>} */}
    </main>
   )
   
};

export default App;
