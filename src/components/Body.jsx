import ResturantCard from "./ResturantCard"
import resList from "../utils/mockData"
import {useEffect, useState} from "react"

const Body = () => {
    const [listOfResturant, setListOfResturant] = useState(resList)
  
  useEffect(() => {

    const swiggyData = async () => {
      const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?offset=0&is-seo-homepage-enabled=true&lat=22.8034668&lng=86.2323641&carousel=true&third_party_vendor=1")
      const jsonData = await data.json();
     
      setListOfResturant(jsonData.data.cards[1].card.card.gridElements.infoWithStyle.restaurants)
    }

swiggyData();
  },[])
  

    return (
      <div className="body">
  
  <div className="serch-box">

  <button
   className="btn-filter" 
    onClick={() => {
      let filterRes = listOfResturant.filter(
        (curRes) => curRes.info.avgRating > 4.5
      );
      setListOfResturant(filterRes)
    }}
 
   >
 Filter Resturant</button>
    
  </div>
 <h2 className="heading">Top restaurant chains in Jamshedpur</h2>
  <div className="resturant-container">
     {listOfResturant.map((curRes) => 
    <ResturantCard key={curRes.info.id} resData={curRes}/>
    )}
  </div>

      </div>
    )
 
 
  }

export default Body;