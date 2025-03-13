import {IMG_URL} from "../utils/contants"

const ResturantCard = ({resData}) => {
    const {name ,cloudinaryImageId,costForTwo,cuisines,avgRating,locality} = resData.info;
    
    return (
        <div className="res-card">
          <img 
         className="res-image" 
        alt="resturant image" 
        src={ IMG_URL + cloudinaryImageId}  />
          <h3><strong>{name}</strong></h3>
          <h4>⭐{avgRating}</h4>
          <p>{cuisines.join(", ")}</p>
        <p>{locality}</p>
        <h4>{costForTwo}</h4>
          
        </div>
      )
    }

    export default ResturantCard;