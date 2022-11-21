
import React, {useState, useEffect} from 'react'
import axios from "axios";
import RecipeComp from '../components/RecipeComp'
import { useParams } from 'react-router-dom';

const Details = ({item}) => {


  const [data, setData] = useState([]);
  let { id } = useParams();

  const baseURL = `http://localhost:9000/api/recipe/${id}`;


  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(baseURL);
      setData(data);
      console.log(data)
    };
  
    getData();
  }, []);



  if (! data) {return null}
  return (
    <RecipeComp item = {data}/>
  )
}

export default Details