import React from "react";
import "./../../../scss/_home.scss";
import HomePage from './Home'
import Dashboard from './Dashboard'
export default function Home() {
 
  let isAuthenticated = localStorage.getItem("user_id")

  
  return (
    <>
    {isAuthenticated? (
    <Dashboard/>
    ):(
    <HomePage/>
    )
    }
    </>
  );
}
