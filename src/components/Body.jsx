import ResturantCard from "./ResturantCard"
import resList from "../utils/mockData"

const Body = () => {
    
  return (
      <div className="body">
  
  <div className="serch-box">
    <input type="text"></input>
    <button className="btn-serchh">Search</button>
  </div>
  
  <div className="resturant-container">
     {resList.map((curRes) => 
    <ResturantCard resData={curRes}/>
    )}
  </div>
      </div>
    )
  }

export default Body;