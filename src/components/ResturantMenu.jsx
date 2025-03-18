import { useState, useEffect, use } from "react";
import { useParams } from "react-router";
import { MENU_API } from "../utils/contants";
// import {MENU_API} from "../utils/contants"
const ResturantMenu = () => {
  const [resInfo, setResInfo] = useState(null);
  const [error, setError] = useState(null); // State to store errors

const {resId} = useParams();

  useEffect(() => {
    fetchResMenu();
  }, []);

  async function fetchResMenu() {
    try {
      const fetchData = await fetch(MENU_API + resId);
     
      if (!fetchData.ok) {
        throw new Error(`HTTP error! Status: ${fetchData.status}`);
      }
    
      const menuData = await fetchData.json();
      setResInfo(menuData);
      console.log(menuData.data?.cards[2]);
      
    } catch (err) {
      console.error("Error fetching menu:", err);
      setError(err.message); 
    }
  }


  if (error) {
    return <h2>Error: {error}</h2>;
  }

  if (!resInfo) {
    return <h2>Loading.....</h2>;
  }

  const {
    name,
    avgRating,
    cuisines,
    costForTwoMessage,
    totalRatingsString,
    city,
    areaName,
    sla,
  } = resInfo?.data?.cards[2]?.card?.card?.info || {};

  console.log(
    resInfo?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card
  );
  const { itemCards = [] } = resInfo?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card || {};

  return (
    <div>
      <br></br>
      <h1>{name}</h1>
      <h3>
        ⭐{avgRating}({totalRatingsString}) - {costForTwoMessage}
      </h3>
      <p>{cuisines?.join(", ")}</p>
      <h3>
        {areaName} - {city}
      </h3>
      <h3>{sla?.minDeliveryTime + "-" + sla?.maxDeliveryTime + "min"}</h3>
      <br></br>
    
      <h3>Menu</h3>
      <ul>
        {itemCards.map((curMenu) => {
          console.log(curMenu);
          
          const { name, description, ratings, price, defaultPrice, id } = curMenu.card.info;
          const { rating, ratingCountV2 } = ratings.aggregatedRating || {};

          return (
            <li key={id}>
              <br></br>
              <h2>{name}</h2>
              <h3>Price - ₹{price / 100 || defaultPrice / 100}</h3>
              <span>⭐{rating || ""}</span> <span>({ratingCountV2})</span>
              <p>{description}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ResturantMenu;
