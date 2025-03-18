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

           }   

          if (!resInfo) {
            return<h2>Loading.....</h2>
          }
   
    const {name, avgRating,cuisines,costForTwoMessage,totalRatingsString,city,areaName,sla } = resInfo?.data?.cards[2]?.card?.card?.info;
    console.log(resInfo?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card)
  const {itemCards} = resInfo?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card
  
  
  
    // cars[5].groupedCard.cardGroupMap.REGULAR.cards[2].card.card.itemCards
    return (
        <div>
  <h1>{name}</h1>
  <br></br>
  <h3>⭐{avgRating}({totalRatingsString}) - {costForTwoMessage}</h3>
  <p>{cuisines.join(", ")}</p>
<h3>{areaName} - {city}</h3>
<h3>{sla.minDeliveryTime + "-" + sla.maxDeliveryTime + "min"}</h3>
<br></br>
<br></br>
<h3>Menu</h3>
  <ul>
  {itemCards.map((curMenu) => {
    // console.log(curMenu.card.info);
    const {name,description,ratings,price,defaultPrice,id} = curMenu.card.info;
    const {rating, ratingCountV2} = ratings.aggregatedRating;
 return (  <li key={id}>
  <br></br>
      <h2>{name}</h2>
      <h3>{price/100 || defaultPrice/100}</h3>
      <span>⭐{rating || ""}</span> <span>({ratingCountV2})</span>
      <p>{description}</p>
      <br></br>
    </li>)
   })}
  </ul>
  
   

        </div>
    )
}
    
export default ResturantMenu;
