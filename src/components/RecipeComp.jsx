import React from 'react'

const RecipeComp = ({item}) => {
  return (
    <div key = {item.id}>
        <h1>{item.titre}</h1>
        <p>{item.description}</p>
        <p>{item.niveau}</p>
        <p>{item.personnes}</p>
        <p>{item.tempsPreparation}</p>
        <img src = {item.photo}/>
    </div>
  )
}

export default RecipeComp