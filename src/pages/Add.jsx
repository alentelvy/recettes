import React, {useState, useEffect} from 'react'
import axios from "axios";
import { useFormik } from 'formik';

const Add = () => {


  const [etapes, setEtapes] = useState([])
  const [ingredients, setIngredients] = useState([])
  console.log("ingredients", ingredients)


  const handleAdd = (etapParam, ingrParam) => {
    etapParam && formik.values.etape && setEtapes(etapes => [...etapes, formik.values.etape] );
    ingrParam && formik.values.ingredient && setIngredients(ingredients => [...ingredients, [(formik.values.ingredientNb).toString(), formik.values.ingredient]] );
  }

const handleDelete = (data, searchParam, etapParam, ingrParam ) => {

  const filtered = data.filter(item => {return (item != searchParam)})
  console.log("filtered", filtered)
  etapParam && setEtapes(filtered)
  ingrParam && setIngredients(filtered)
}


  const formik = useFormik({
    initialValues: {
      etape: '', 
      ingredient: '',
      ingredientNb: '',
      titre: '',
      description: '',
      niveau: '',
      personnes: 0,
      tempsPreparation: 0,
      photo: ''
  },
    onSubmit: values => {
       axios({
        method: 'POST',
        url: `http://localhost:9000/api/recipes`,
        data: {
          etapes: etapes, 
          titre: values.titre,
          description: values.description,
          niveau: values.niveau,
          personnes: values.personnes,
          tempsPreparation: values.tempsPreparation,
          ingredients: ingredients,
          photo: values.photo
      }
      })
        .then((res) => {
          console.log("submitted", res)
        })
        .catch((error) =>{
           console.log(error)
           alert('fill all the fields')
      });
     },

  });



  console.log("etapes", etapes, formik.values.etape)
  return (
    <>
    <form onSubmit={formik.handleSubmit}>
        <label htmlFor="titre">Titre</label>
        <input
          required="required"
          id="titre"
          name="titre"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.titre}
        />

      <label htmlFor="description">Description</label>
        <input
          required="required"
          id="description"
          name="description"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.description}
        />

      <label htmlFor="niveau">Niveau</label>
      <div id="niveau"> 

        <label htmlFor="jedi">Jedi</label>
        <input
          id="jedi"
          name="niveau"
          type="radio"
          onChange={formik.handleChange}
          value='jedi'
        />

        <label htmlFor="padawan">Padawan</label>
        <input
          id="padawan"
          name="niveau"
          type="radio"
          onChange={formik.handleChange}
          value='padawan'
        />

        <label htmlFor="maitre">Maitre</label>
        <input
          id="maitre"
          name="niveau"
          type="radio"
          onChange={formik.handleChange}
          value='maitre'
        />
      </div>

        

      <label htmlFor="personnes">Nb personnes</label>
        <input
          id="personnes"
          name="personnes"
          type="number"
          min="1"
          onChange={formik.handleChange}
          value={formik.values.personnes}
        />

      <label htmlFor="tempsPreparation">Temps preparation</label>
        <input
          id="tempsPreparation"       
          name="tempsPreparation"
          type="number"
          min="1"
          onChange={formik.handleChange}
          value={formik.values.tempsPreparation}
        />


      <div> 
       <label htmlFor="etape">Etapes</label>
        <input
          required="required"
          id="etape"
          name="etape"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.etape}
        />      
      <button type="button" onClick= {() => handleAdd(true, false)}>Add </button>
      </div>

      <div> 
      <label htmlFor="ingredientNb">Ingredients nb</label>
       <input
          required="required"
          id="ingredientNb"
          name="ingredientNb"
          type="number"
          min="1"
          onChange={formik.handleChange}
          value={formik.values.ingredientNb}
        />   
        <label htmlFor="ingredient">Ingredients</label> 
        <input
          required="required"
          id="ingredient"
          name="ingredient"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.ingredient}
        />    
      <button type="button" onClick= {() => handleAdd(false, true)}>Add </button>
      </div>


        <button type="submit">Submit</button>
      </form>

      {etapes.length> 0 && 
        etapes.map((etape, i) => {
          return (
            <>
              <div key = {i}>
                {etape}
              </div>
              <button type="button" onClick = {() => handleDelete(etapes, etape, true, false)}>Delete </button>
            </>
        )})
      }

      {ingredients.length> 0 && 
        ingredients.map((ingredient, i) => {
          return (
            <>
              <div key = {i}>
                {ingredient}
              </div>
              <button type="button" onClick = {() => handleDelete(ingredients, ingredient, false, true)}>Delete </button>
            </>
        )})
      }
     </>
  )
}

export default Add