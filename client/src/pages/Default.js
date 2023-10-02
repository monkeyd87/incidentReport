import { Outlet } from "react-router-dom";
import { useState } from "react";
import { NavBar } from "../components/NavBar";

export const Default=()=>{
    const [user,setUser] = useState({})
    const signout = ()=>{
        setUser({})
    }
    return(
        <div>
            <NavBar username={user.username} signout={signout}/>
            <Outlet context={[user,setUser]}/>
        </div>
    )
}