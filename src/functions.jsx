
export const get_min_max = (data) => {
  const numberOfPersons = data.map(item => item.personnes) 
  const min = Math.min.apply(Math, numberOfPersons); 
  const max = Math.max.apply(Math, numberOfPersons);
  return {min, max}
}

export const normalize = (formData) => {
  return formData.trim().toLowerCase()
}