import ResturantCard from "./ResturantCard";
import { useEffect, useState } from "react";
import ShimmerCard from "./Shimmer.jsx";
import { NavLink} from "react-router-dom";

const Body = () => {
  const [listOfResturant, setListOfResturant] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [serchText, setSerchText] = useState("")
 const [filterResturant, setfilterResturant] = useState([]);
 const [apiData , setApiData]  = useState(null);
 
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
  }, []);



  return (
    <div className="body">

      <div className="feature-box">

 <div className="serch-box">
 <input type="text" placeholder="Search..." value={serchText} onChange={(event) => setSerchText(event.target.value)}></input>

 <button onClick={() => {

 let filterRes =   listOfResturant.filter((curRes) => curRes.info.name.toLowerCase().includes(serchText.trim().toLowerCase()))
 setfilterResturant(filterRes)
 }}>Search</button>

 </div>

      <div className="filter-btn">
      <button
          className="btn-filter"
          onClick={() => {
            let filterRes = filterResturant.filter(
              (curRes) => curRes.info.avgRating > 4.2
            );
            setfilterResturant(filterRes);
          }}
        >
          Top Rated Resturant
        </button>
        <button onClick={() => {
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
           <NavLink to={"/resturant/"+ curRes.info.id} key={curRes.info.id}> <ResturantCard resData={curRes} /></NavLink>
          ))
        )}
      </div>
    </div>
  );
};

export default Body;