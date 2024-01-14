import React,{useContext,useEffect, useState} from "react"; 
import axios from 'axios'

const AppContext = React.createContext()


const allMealUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s='
const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php'

const getFavouriteFromLocalStorage = () =>{
    let favorites = localStorage.getItem('favorites');
if(favorites){
 favorites = JSON.parse(localStorage.getItem('favorites'))
}
else{
    favorites = []
}
return favorites
}


const AppProvider = ({children}) => {
    const[meals, setMeals] = useState([])
    const [loading, setLoading] = useState(false)
    const[searchTerm, setSearchTerm] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [selectedMeal,setSelectedMeal] = useState(null) 
    const [favorites, setFavorites] = useState(getFavouriteFromLocalStorage());

    
    const fetchMeals = async (url) => {
        setLoading(true)
        try {
            const {data} = await axios (url)

            if (data.meals){
            setMeals(data.meals)

        } 
        else{
            setMeals([])
        }
     }
      catch(error){
            console.log(error.response)
              }
              setLoading(false)
              
    } 


    const fetchRandomMeal =() => {
        fetchMeals(randomMealUrl)
    }

const selectMeal = (idMeal, favoriteMeal ) => {
    let meal;
 if(favoriteMeal){
    meal = favorites.find((meal) => meal.idMeal === idMeal);

}
else{
    meal =meals.find((meal) => meal.idMeal === idMeal);

}
    
    setSelectedMeal(meal);
    setShowModal(true)
}
const closeModal =() => {
    setShowModal(false)
}
// Favorite//
const addToFavorites = (idMeal) => {

    const alreadyFavorite = favorites.find ((meal) => meal.idMeal === idMeal);
    if (alreadyFavorite) return 
    const updatedFavorites =[...favorites,meals]
    setFavorites(updatedFavorites)
}
const removeFromFavorites =(idMeal) => {
    const updatedFavorites = favorites.filter((meal) => meal.idMeal   !== idMeal );
    setFavorites(updatedFavorites)
}


    useEffect(()=>{
       
        fetchMeals(allMealUrl)
    },[])


    useEffect(()=>{
       if(!searchTerm) return
        fetchMeals(`${allMealUrl}${searchTerm}`)
    },[searchTerm])




return <AppContext.Provider value={{ loading , meals, setSearchTerm,fetchRandomMeal,showModal,selectedMeal,selectMeal,closeModal,addToFavorites,removeFromFavorites,favorites}}>
{children}
</AppContext.Provider>
}
export const useGlobalContext = ()=>{
    return useContext(AppContext)
}

export {AppContext,AppProvider}