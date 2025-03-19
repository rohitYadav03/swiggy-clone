import { useState } from "react";
import { LOGO_URL } from "../utils/contants";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Header = () => {
  const [btnName, setBtnName] = useState("Login");
  const onlineStatus = useOnlineStatus();
    return (
      <div className="header">
        {/* Logo */}
     <Link to="/">
     <img
          src={LOGO_URL}
          alt="swiggy-logo"
          className="app-logo"
        />
     </Link>
  
        {/* Location */}
        <div className="location">
          <span className="location-title">Other</span>
          <span className="location-detail">
           NML Colony, Nand NandNagar...
          </span>
          <i className="ri-arrow-down-s-line"></i>
        </div>
  
  <h3>{onlineStatus ? "online status ✅" : "online status 🔴"}</h3>

        {/* Navigation Items */}
        <div className="nav-item">
          <ul>
            <li>
              <i className="ri-briefcase-line"></i> 
              <Link to="/">Home</Link>
            </li>
            <li>
              <i className="ri-discount-percent-line"></i> 
              Offers{" "}
              <span className="new-badge">NEW</span>
             
            </li>
            <li>
              <i className="ri-question-line"></i> 
              <Link to= "/contact">Contact Us</Link>
            </li>
            <li>
              <i className="ri-account-circle-line"></i> 
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <i className="ri-shopping-bag-line"></i> Cart{" "}
              <span className="cart-count">0</span>
            </li>
            <li>
            <button id="btn" onClick={() => btnName == "Login" ? setBtnName("Logout") : setBtnName("Login")}>{btnName}</button>
            </li>
          </ul>
        </div>
      </div>
    );
  };

 export default Header;