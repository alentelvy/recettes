import React, {useState, useEffect} from 'react'
import axios from "axios";
import {get_min_max} from '../getData'
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



  // searchTitle && filterArr.push('searchTitle')
  
  // console.log(filterArr)

  //const filteredResult = filterByTitle(data)
  //searchTitle &&  filteredResult.concat(data.filter(item => {return item.titre.includes(searchTitle)}))
  // if (searchTitle) {
    
  //   title = data.filter(item => {return item.titre.includes(searchTitle)})
  //   //return title
  // }

  // const title = [
  //   ...(searchTitle ? data.filter(item => {return item.titre.includes(searchTitle)}) : []) 
  // ]

  // const level = [
  //   ...(searchLevel ? data.filter(item => {return item.niveau.includes(searchLevel)}) : [])
  // ]

  // const persons = [
  //   ...(searchPersons ? data.filter(item => {return item.personnes === parseInt(searchPersons)}) : [])
  // ]

  // console.log("****************** DATA", data, title, level)

  // const filteredResult = [...title, ...level, ...persons]

  // const uniq = [...new Set(filteredResult)];
  // console.log("unique", uniq)


 
//   const filteredResult = data
//     // .filter(item => {
//     //   console.log("1", searchTitle, item.titre.includes(searchTitle))
//     //   return item.titre.includes(searchTitle)})
//     .filter(item => {
//       console.log("2", searchLevel, item.niveau.includes(searchLevel))
//       return item.niveau.includes(searchLevel)})
//     // .filter(item => {
//     //   console.log("3 search persons", searchPersons)
//     //   return item.personnes === parseInt(searchPersons)})
//     // .filter(item => {return item.tempsPreparation === parseInt(searchTime)})
const normalize = (formData) => {
  return formData.trim().toLowerCase()
}


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
  const filtered = data.filter(item => {return item.personnes === parseInt(searchPersons)})
  return filtered
});

const filterByTime = ((data, searchTime) => {
  const filtered = data.filter(item => {return item.tempsPreparation === parseInt(searchTime)})
  return filtered
});


const filters = []

searchTitle && filters.push({"func": filterByTitle, "val": searchTitle})
searchLevel && filters.push({"func": filterByLevel, "val": searchLevel})
searchTitle && filters.push({"func": filterByPersons, "val": searchPersons})
searchLevel && filters.push({"func": filterByTime, "val": searchTime})

console.log(filters)


if (searchTitle) {
  console.log("searchTitle", searchTitle)
  let result = filterByTitle(data, searchTitle)
  console.log("****", result)
  setData(result)
}

if (searchLevel) {
  console.log("searchLevel", searchLevel)
  let result = filterByTitle(data, searchTitle)
  console.log("****", result)
  setData(result)
}

console.log("DATA", data)

// const filterByTitle = ((data) => {
//   searchTitle = "Dustcrepe"
//   data.filter(item => {return item.titre.includes(searchTitle)})
// });

// let filtered = []
// if (searchTitle) {
//   const title = filterByTitle(data, "Dustcrepe")
//   console.log("title", title)
//   const temp = filtered.concat(title)
//   return temp
// }

// console.log("filtered", temp)

//const filters = [filterByTitle, filterByLevel, filterByPersons]

// let result = []
//   filters.forEach((filter) => {
//     let filterFunc = filter["func"]
//     let filterParam = filter["val"]
//     if (result.length > 0 ) {
//       let temp = filterFunc(result, filterParam)
//       console.log("SEARCH IN RESULT", temp)
//       if (temp.length == 0 ) {
//         result = []
//       }
     
//     }
//     else {
//       let temp = filterFunc(data, filterParam)
//       console.log("SEARCH IN ALL", temp)
//       result = [...result, ...temp]
//       return
//     }
//     // let temp = filterFunc(data, filterParam)
//     // console.log("temp", temp)
//     // if (temp.length == 0) {
//     //   console.log("stop")
//     //   return
//     // }
//     // else {
//     //   let temp = filterFunc(result, filterParam)
//     //   result = [...result, ...temp]
//     //   console.log("result", result)
//     // }
    
//     // result = []
//   })

    //result = [...new Set([...result, ...temp])]
    
    



// console.log("res", result)

// setDisplay(result)


// const filteredData = filters.map(filter => {
//   return data.reduce(filter);
// })




  // setDisplay(filteredResult);
  // console.log("$$$$$", filteredResult)
  // setSearchTitle('');
  // setSearchLevel('');
  // setSearchPersons('')
  // setSearchTime('')
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
        <input type="text" name="searchLevel" value = {searchLevel} onChange={event => setSearchLevel(event.target.value)} />

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
        <div key = {item.id} >
          <Link to={`/details/${item.id}`}>
            <RecipeComp item = {item}/>
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