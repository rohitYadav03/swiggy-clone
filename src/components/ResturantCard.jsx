import {IMG_URL} from "../utils/contants"

const ResturantCard = ({resData}) => {
    const {name ,cloudinaryImageId,costForTwo,cuisines,avgRating,locality} = resData.info;
    // console.log(id);
    
    return (
        <div className="res-card">
          <img 
         className="res-image" 
        alt="resturant image" 
        src={ IMG_URL + cloudinaryImageId}  />
          <h3>{name}</h3>
          <h4>⭐{avgRating}</h4>
          <p>{cuisines.join(", ")}</p>
        <p>{locality}</p>
        <h4>{costForTwo}</h4>
        </div>
      )
    }

 export   const withVegLabel = (ResturantCard) => {
      return  (prop) => {
        return  (
          <div className="relative">
          <label className="absolute top-2 right-2 bg-green-100 text-green-800 px-2 py-1 rounded-md text-sm">
            Pure Veg
          </label>
          <ResturantCard {...prop}/>
        </div>
        
         
          
        )
      }
    }

    export default ResturantCard;