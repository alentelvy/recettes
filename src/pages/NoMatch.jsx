import React from 'react'
import { Routes, Route, Outlet, Link } from "react-router-dom";


const NoMatch = () => {
  return (
    <div>NoMatch
        <Link to="/">Go to the home page</Link>
    </div>
  )
}

export default NoMatch