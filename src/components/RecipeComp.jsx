import React from 'react'
import '../pages/Pages.css';

const RecipeComp = ({item}) => {
  return (
    <div key = {item.id}>

      <div className = "list">
        <h1>Title: </h1> 
        <h1 name = "titre">{item.titre}</h1>
      </div>

      <div className = "list">
        <p>Description: </p>
        <p  name = "description">{item.description}</p>
    </div>

    <div className = "list">
        <p>Level: </p>
        <p  name = "niveau">{item.niveau}</p>
    </div>

    <div className = "list">
        <p>{item.personnes > 1 ? 'Nb of persons :': 'Person:'} </p>
        <p name = "personnes">{item.personnes}</p>
    </div>

    <div className = "list">
        <p>Preparation time: </p>
        <p name = "tempsPreparation">{`${item.tempsPreparation} min`}</p>
    </div>
        <img src = {item.photo}/>
     
    </div>
  )
}

export default RecipeComp