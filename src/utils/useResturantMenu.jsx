import {useEffect, useState } from "react";
import { MENU_API } from "./contants";

const useResturantMenu = (resId) => {
const [resInfo ,setResInfo] = useState(null)

useEffect(() => {
   fetchMenu();
},[])

const fetchMenu = async () => {
    const menuData = await fetch(MENU_API + resId);

    const jsonData = await menuData.json();
     setResInfo(jsonData)
}

    return resInfo;
}

export default useResturantMenu;