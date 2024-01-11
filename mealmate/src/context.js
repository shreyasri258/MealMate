import React,{useContext,useEffect,useState} from "react";
import axios from "axios";
const AppContext = React.createContext()


const allMealsUrl ='https://www.themealdb.com/api/json/v1/1/search.php?s=a'

const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php'


const AppProvider = ({ children }) => {
    const [meals, setMeals] = useState([])
    const [loading ,setLoading] = useState(false)
    const [searchTerm,setSearchTerm]=useState('')
    
    const fetchMeals = async (url) => {
     setLoading(true)
      try {
        const { data } = await axios.get(url)
        if (data.meals) {
            setMeals(data.meals)
          }
          else {
            setMeals([])
          }
        }
      catch (e) {
        console.log(e.response)
      }
      setLoading(false)
      
    }

    useEffect(() => {
        fetchMeals(allMealsUrl)
      }, [])
      useEffect(() => {
        if (!searchTerm) return
        fetchMeals(`${allMealsUrl}${searchTerm}`)
      }, [searchTerm])
    
    const fetchRandomMeal = () => {
        fetchMeals(randomMealUrl)
      }
  
    return (
      <AppContext.Provider
        value={{ meals,loading,setSearchTerm,fetchRandomMeal }}
      >
        {children}
      </AppContext.Provider>
    )
  }

export const useGlobalContext = () =>{
    return useContext(AppContext);
}

export {AppContext,AppProvider}