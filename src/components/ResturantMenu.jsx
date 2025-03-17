import {useState, useEffect } from "react";
// import ShimmerCard from "./Shimmer";

const ResturantMenu = () => {
const [resInfo , setResInfo] = useState(null);
  
useEffect(() => {
        fetchResMenu();
    },[])

    async function fetchResMenu (){
      const fetchData = await fetch("https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=22.8115122&lng=86.2266482&restaurantId=127034");
      const menuData = await fetchData.json();
     setResInfo(menuData)
      console.log(menuData.data.cards[2].card.card.info);
           }   

          if (!resInfo) {
            return<h2>Loading.....</h2>
          }
   
    const {name, avgRating,cloudinaryImageId,cuisines,costForTwoMessage,totalRatingsString,city,areaName,sla } = resInfo?.data?.cards[2]?.card?.card?.info;
    // console.log(name);
    
    return (
        <div>
  <h1>{name}</h1>
  <h2>⭐{avgRating}({totalRatingsString}) - {costForTwoMessage}</h2>
  <h3>{cuisines.join(", ")}</h3>
<h3>{areaName} - {city}</h3>
<h3>{sla.minDeliveryTime + "-" + sla.maxDeliveryTime + "min"}</h3>
  <ul>
    <li>Dosa</li>
    <li>Idli</li>
    <li>Biryani</li>
  </ul>
        </div>
    )
}
    
export default ResturantMenu;
