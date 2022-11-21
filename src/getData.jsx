import axios from "axios";

const baseURL = "http://localhost:9000/api/recipes";


// export const getData = async () => {
//   const { response } = await axios.get(baseURL);
//   return response
// };

export const getData = () => {
  axios.get(baseURL)
  .then(response => {return(response.data)});
};

// axios
//     .get(baseURL)
//     .then((response) => {
//       displayOutput(response)
//     })
//     .catch((err) => console.log(err));

export const get_min_max = (data) => {
  const numberOfPersons = data.map(item => item.personnes) 
  const min = Math.min.apply(Math, numberOfPersons); 
  const max = Math.max.apply(Math, numberOfPersons);
  return {min, max}
}
