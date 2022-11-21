import React, {useState} from 'react'
import axios from "axios";
import { useFormik } from 'formik';
import './Pages.css';

const Add = () => {


  const [etapes, setEtapes] = useState([])
  const [ingredients, setIngredients] = useState([])


  const handleAdd = (etapParam, ingrParam) => {
    console.log(etapParam, ingrParam, etapes, formik.values.etape)
    etapParam && formik.values.etape && setEtapes(etapes => [...etapes, formik.values.etape] );
    ingrParam && formik.values.ingredient && setIngredients(ingredients => [...ingredients, [(formik.values.ingredientNb).toString(), formik.values.ingredient]] );
  }

const handleDelete = (data, searchParam, etapParam, ingrParam ) => {
  const filtered = data.filter(item => {return (item != searchParam)})
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

  return (
    <>
    <form onSubmit={formik.handleSubmit} className = "form">
        <label htmlFor="titre">Title</label>
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

      <label htmlFor="niveau">Level</label>
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

        

      <label htmlFor="personnes">Nb of persons</label>
        <input
          id="personnes"
          name="personnes"
          type="number"
          min="1"
          onChange={formik.handleChange}
          value={formik.values.personnes}
        />

      <label htmlFor="tempsPreparation">Preparation time</label>
        <input
          id="tempsPreparation"       
          name="tempsPreparation"
          type="number"
          min="1"
          onChange={formik.handleChange}
          value={formik.values.tempsPreparation}
        />


      <div> 
       <label htmlFor="etape">Stages</label>
        <input
          required="required"
          id="etape"
          name="etape"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.etape}
        />      
      <button type="button" className = 'add-btn'  onClick= {() => handleAdd(true, false)}>Add </button>
      </div>

      <div>
      {etapes.length> 0 && 
        etapes.map((etape, i) => {
          return (
            <>
              <div key = {i}>
                {etape}
              </div>
              <button type="button" className = 'del-btn' onClick = {() => handleDelete(etapes, etape, true, false)}>Delete </button>
            </>
        )})
      }
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
        <button type="button" className = 'add-btn' onClick= {() => handleAdd(false, true)}>Add </button> 
      <div>
      {ingredients.length> 0 && 
        ingredients.map((ingredient, i) => {
          return (
            <>
              <div key = {i}>
                {ingredient}
              </div>
              <button type="button" className = 'del-btn' onClick = {() => handleDelete(ingredients, ingredient, false, true)}>Delete </button>
            </>
        )})
      }
      </div>
      
      </div>


        <button type="submit" className='submit-btn'>Submit</button>
      </form>


     </>
  )
}

export default Add