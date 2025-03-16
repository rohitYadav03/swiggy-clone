import { useState } from "react";
import { LOGO_URL } from "../utils/contants";

const Header = () => {
  const [btnName, setBtnName] = useState("Login")
    return (
      <div className="header">
        {/* Logo */}
        <img
          src={LOGO_URL}
          alt="swiggy-logo"
          className="app-logo"
        />
  
        {/* Location */}
        <div className="location">
          <span className="location-title">Other</span>
          <span className="location-detail">
           NML Colony, Nand NandNagar...
          </span>
          <i className="ri-arrow-down-s-line"></i>
        </div>
  
        {/* Navigation Items */}
        <div className="nav-item">
          <ul>
            <li>
              <i className="ri-briefcase-line"></i> Swiggy Corporate
            </li>
            <li>
              <i className="ri-discount-percent-line"></i> Offers{" "}
              <span className="new-badge">NEW</span>
            </li>
            <li>
              <i className="ri-question-line"></i> Help
            </li>
            <li>
              <i className="ri-account-circle-line"></i> Sign In
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