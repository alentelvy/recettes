
import React, {useState, useEffect} from 'react'
import axios from "axios";
import RecipeComp from '../components/RecipeComp'
import { useParams } from 'react-router-dom';
import { useFormik } from 'formik';
 
 

const Modify = () => {

  const [data, setData] = useState([]);
  let { id } = useParams();
  const baseURL = `http://localhost:9000/api/recipe/${id}`;
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    console.log("render")
    const getData = async () => {
      const { data } = await axios.get(baseURL);
      setData(data);
    };
  
    getData();
  }, [isSubmitting]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: data ? data : [], 
    onSubmit: values => {
       axios({
        method: 'PUT',
        url: baseURL,
        data: values
      })
        .then((res) => {
          console.log("submitted", res)
          setIsSubmitting(!isSubmitting)
        })
        .catch((error) =>{
           console.log(error)
      });
     },
  });


   if (! data) {return null}

   return (
    <>
      <RecipeComp item = {data}/>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="titre">Titre</label>
        <input
          id="titre"
          name="titre"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.titre}
        />

      <label htmlFor="description">Description</label>
        <input
          id="description"
          name="description"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.description}
        />
      <label htmlFor="niveau">Niveau</label>
        <input
          id="niveau"
          name="niveau"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.niveau}
        />

      <label htmlFor="personnes">Nb personnes</label>
        <input
          id="personnes"
          name="personnes"
          type="number"
          onChange={formik.handleChange}
          value={formik.values.personnes}
        />

      <label htmlFor="tempsPreparation">Temps preparation</label>
        <input
          id="tempsPreparation"
          name="tempsPreparation"
          type="number"
          onChange={formik.handleChange}
          value={formik.values.tempsPreparation}
        />

      {/* <label htmlFor="photo">Photo</label>
        <input
          id="photo"
          name="photo"
          type="file"
          onChange={formik.handleChange}
          value={formik.values.photo}
        /> */}
        <button type="submit">Submit</button>
      </form>
     </>
   );
 };

 export default Modify