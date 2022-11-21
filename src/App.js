import React from 'react';
import './App.css';
import { Routes, Route, Outlet, Link } from "react-router-dom";

import Recipe from './pages/Recipe';
import Details from './pages/Details';
import Modify from './pages/Modify';
import Add from './pages/Add';
import NoMatch from './pages/NoMatch';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img className="site-logo" src="./public/food.jpeg" alt="" />
        {/* <nav>
          <ul>
            <li>
              <NavLink to="/">Accueil</NavLink>
            </li>
            <li>
              <NavLink to="/details">Mon panier</NavLink>
            </li>
          </ul>
        </nav> */}
      </header>
      <Routes>
        <Route path="/" element={<Recipe/>} />
        <Route path="/details/:id" element={<Details/>} />
        <Route path="/edit/:id" element={<Modify/>} />
        <Route path="/add" element={<Add/>} />
        <Route path="*" element={<NoMatch />} />
      </Routes>

      
    </div>
  );
}


export default App;



function Layout() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/details">Details</Link>
          </li>
          <li>
            <Link to="/modify">Modify</Link>
          </li>
          <li>
            <Link to="/add">Add</Link>
          </li>
          <li>
            <Link to="/nothing-here">Nothing Here</Link>
          </li>
        </ul>
      </nav>

      <hr />

      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet />
    </div>
  );
}