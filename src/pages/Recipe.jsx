import React, {useState, useEffect} from 'react'
import axios from "axios";
import {get_min_max, normalize} from '../functions'
import RecipeComp from '../components/RecipeComp'
import { Link, useNavigate } from "react-router-dom";
import './Pages.css';

const Recipe = () => {

  const navigate = useNavigate()
  const [data, setData] = useState([]);
  const [display, setDisplay] = useState([])
  const baseURL = "http://localhost:9000/api/recipes";
  const [ initialRange, setInitialRange ] = useState([]);
  const [isDelete, setIsDelete] = useState(false)
  const [del, setDel] = useState(false)


  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(baseURL);
      console.log(data)
      setData(data);
      setDisplay(data)
      const {min, max} = get_min_max(data)
      setInitialRange([min, max])
    };
  
    getData();
  }, [del]);


  

    const [ searchTitle, setSearchTitle ] = useState('');
    const [ searchLevel, setSearchLevel ] = useState('');
    const [ searchPersons, setSearchPersons] = useState('');
    const [ searchTime, setSearchTime] = useState('');


const handleOnSubmit = (e) => {
  e.preventDefault()




const filterByTitle = ((data, searchTitle) => {
    const title = normalize(searchTitle)
    const filtered = data.filter(item => { return item.titre.toLowerCase().includes(title)})
    return filtered
});

const filterByLevel = ((data, searchLevel) => {
  const level = normalize(searchLevel)
  const filtered = data.filter(item => {return item.niveau.toLowerCase().includes(level)})
  return filtered
});

const filterByPersons = ((data, searchPersons) => {
  console.log("searchPersons", searchPersons, typeof searchPersons)
  const filtered = data.filter(item => {return item.personnes === parseInt(searchPersons)})
  return filtered
});

const filterByTime = ((data, searchTime) => {
  if (searchTime){
    const filtered = data.filter(item => {return item.tempsPreparation === parseInt(searchTime)})
    return filtered
  }
  return
});

//Create an array of used filters
const filters = []
searchTitle && filters.push({"func": filterByTitle, "val": searchTitle})
searchLevel && filters.push({"func": filterByLevel, "val": searchLevel})
searchPersons && filters.push({"func": filterByPersons, "val": searchPersons})
searchTime && filters.push({"func": filterByTime, "val": searchTime})

console.log(filters)

//Apply filters on data copy 
  let copy = [...data]
  let result
  filters.forEach(filter => {
    console.log("filter", filter)
    let filterFunc = filter["func"]
    let filterParam = filter["val"]
    console.log("copy", copy)
    result = filterFunc(copy, filterParam)
    //console.log("result", result)
    if( result.length > 0) {
      copy = result
    } else {
      return result 
    }
  })


  console.log("res", result)
  setDisplay(result)
  setSearchTitle('');
  setSearchLevel('');
  setSearchPersons('')
  setSearchTime('')
}



const handleDelete = (id) => {
      axios
      .delete(`http://localhost:9000/api/recipe/${id}`, { data: { answer: "ok" } })
      .then((res) => {
        console.log("deleted", res)
        setIsDelete(!isDelete)
        setDel(!del)
        setDisplay(data)
      })
      .catch((error) =>{
        console.log(error)
    });
}



if (!data) return null;
return (

    <div className = "recipe-wrapper" >
      <form onSubmit={handleOnSubmit}  className = "form">
        <label htmlFor="searchTitle">Search by title</label>
        <input type="text" name="searchTitle"  value = {searchTitle} onChange={event => setSearchTitle(event.target.value)} />

        <label htmlFor="searchLevel">Search by level</label>
        <div name="searchLevel" id="niveau"> 

          <label htmlFor="jedi">Jedi</label>
          <input id="jedi" name="niveau" type="radio" onChange={event => setSearchLevel(event.target.value)} value='jedi'/>

          <label htmlFor="padawan">Padawan</label>
          <input id="padawan" name="niveau" type="radio" onChange={event => setSearchLevel(event.target.value)} value='padawan'/>

          <label htmlFor="maitre">Maitre</label>
          <input id="maitre" name="niveau" type="radio" onChange={event => setSearchLevel(event.target.value)} value='maitre'/>
        </div>

        <label htmlFor="searchPersons">Search by number of persons (between {initialRange[0]} and {initialRange[1]})</label>
        <input type="range" name="searchPersons" min={initialRange[0]} max={initialRange[1]} value = {searchPersons} onChange={event => setSearchPersons(event.target.value)}/> 
        <output id="amount" name="amount">{searchPersons}</output>

        <label htmlFor="searchTime">Search by minutes </label>
        <input type="number" name="searchTime" min="1" value = {searchTime}  onChange={event => setSearchTime(event.target.value)} />
       

        <button type="submit" className='submit-btn'>Search</button>
      </form>

      <div>
      <button type="button" onClick= {() => navigate('/add')} className='add-recipe-btn'> Add new recipe </button>
      </div>

    {display.length > 0 &&
     display.map((item) => {
      return (
        <div key = {item.id} className = "component">
          <Link to={`/details/${item.id}`} style={{ textDecoration: 'none', color: 'black' }}>
            <RecipeComp item = {item} />
          </Link>

        <div> 
        <button type="button" className = "edit-btn" onClick= {() => navigate(`/edit/${item.id}`)}>Modify </button>
        <button type="button" className = "del-btn" onClick = {() => setIsDelete(true)}>Delete </button>
        </div>
 
      {isDelete && 
       <div>
          Are you sure you want to delete the recipe? 
        <button type="button" className = "del-btn" onClick= {() => handleDelete(item.id)}>Yes </button>
        <button type="button" className = "add-btn" onClick = {() => setIsDelete(false) }>No </button>
        </div> } 
      
      </div>
      )
      })
    }
      
    </div>
  );
}

export default Recipe