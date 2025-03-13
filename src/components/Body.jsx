import ResturantCard from "./ResturantCard"
import resList from "../utils/mockData"
import {useState} from "react"

const Body = () => {
    const [listOfResturant, setListOfResturant] = useState(resList)
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
  
  <div className="resturant-container">
     {listOfResturant.map((curRes) => 
    <ResturantCard key={curRes.info.id} resData={curRes}/>
    )}
  </div>

      </div>
    )
 
 
  }

export default Body;