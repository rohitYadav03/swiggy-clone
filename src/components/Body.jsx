import ResturantCard from "./ResturantCard";
import { useEffect, useState } from "react";
import ShimmerCard from "./Shimmer.jsx";
import { NavLink} from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus.jsx";
import { withVegLabel } from "./ResturantCard";

const Body = () => {
  const [listOfResturant, setListOfResturant] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [serchText, setSerchText] = useState("")
 const [filterResturant, setfilterResturant] = useState([]);
 const [apiData , setApiData]  = useState(null);

 const ResturantVeg = withVegLabel(ResturantCard)


  useEffect(() => {
    const swiggyData = async () => {
      try {
        setIsLoading(true);
        const data = await fetch(
          "https://www.swiggy.com/dapi/restaurants/list/v5?offset=0&is-seo-homepage-enabled=true&lat=22.8034668&lng=86.232364"
        );
        const jsonData = await data.json();

  setListOfResturant(
    (jsonData.data.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants) || 
    (jsonData.data.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
  );
  setApiData(jsonData.data.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
       
        
        setfilterResturant( (jsonData.data.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants) || 
        (jsonData.data.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
      )
        setIsLoading(false);

      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    swiggyData();
    console.log("list",listOfResturant);
    
  }, []);

  useEffect(() => {
console.log("list", listOfResturant);

  },[listOfResturant])

  const onlineStatus = useOnlineStatus();  
  if (!onlineStatus) {  
    console.log("offline");
    
    return <h1>You are offline</h1>;  
  }

  return (
    <div className="body">

      <div className="feature-box">

 <div className="serch-box">
 <input className="border" type="text" placeholder="Search..." value={serchText} onChange={(event) => setSerchText(event.target.value)}></input>

 <button className="border" onClick={() => {

 let filterRes =   listOfResturant.filter((curRes) => curRes.info.name.toLowerCase().includes(serchText.trim().toLowerCase()))
 setfilterResturant(filterRes)
 }}>Search</button>

 </div>

      <div className="filter-btn">
      <button
          className="btn-filter border border-black text-black px-4 py-2 "
          onClick={() => {
            let filterRes = filterResturant.filter(
              (curRes) => curRes.info.avgRating > 4.2
            );
            setfilterResturant(filterRes);
          }}
        >
          Top Rated Resturant
        </button>
        <button className="border" onClick={() => {
          setfilterResturant(apiData || listOfResturant)
          
        }}> Back to All </button>
      </div>
      </div>

      <h2 className="heading">Top restaurant chains in Jamshedpur</h2>

      <div className="resturant-container">
        {isLoading ? (
          // Show shimmer UI while loading
          Array(12)
            .fill("")
            .map((_, index) => <ShimmerCard key={index} />)
        ) : (
          // Show actual restaurant cards once data is loaded
          filterResturant.map((curRes) => ( 
           <NavLink to={"/resturant/"+ curRes.info.id} key={curRes.info.id}>{curRes?.info?.veg  ? <ResturantVeg resData={curRes} /> :  <ResturantCard resData={curRes} />}</NavLink>
         
           
          ))
        
          
        )}
      </div>
    </div>
  );
};

export default Body;