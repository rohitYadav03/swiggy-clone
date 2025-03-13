import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";
import Header from "./components/Header";
import Body from "./components/Body"


const root = ReactDOM.createRoot(document.getElementById("root"));

const AppLayout = () => {
 return (
 <div>
   <Header />
  <Body />
 </div>
 )
}


root.render(<AppLayout />);

