
import { useParams } from "react-router";
import useResturantMenu from "../utils/useResturantMenu";
import { useEffect } from "react";

// import {MENU_API} from "../utils/contants"
const ResturantMenu = () => {

const {resId} = useParams();



 const resInfo = useResturantMenu(resId);

 if (resInfo === null) {
  return <h1>Loading...</h1>
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
console.log("hello")

  console.log(
    resInfo?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card
  );

  const { itemCards = [] } = resInfo?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card || {};
console.log("item card", itemCards)
  // console.log(itemCards);

// useEffect(() => {
//   console.log("hello");
  
//   console.log(resInfo?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card)
// });
  
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
