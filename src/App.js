import './App.css';
import React, { useEffect, useState, useRef } from 'react';
function App() {
  const[ingredientList, updateIngredientList] = useState([]);
  const[loading, setLoading] = useState(false);
  const API_KEY = "0852649f54a277171918d8778f65a799";
  const APP_ID = "d114db93";
  const inputRef = useRef(null);

  const search = () => {
    // console.log("input ref", inputRef.current.value);
    searchForRecipe(inputRef.current.value);
  }

  const searchForRecipe = (query) => {
    setLoading(true);
    let url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${API_KEY}`;
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(res => {
        // console.log("final response", res);
        console.log(res.hits);
        updateIngredientList(res.hits);
        setLoading(false);
      })
      .catch(err => {
        console.log("error", err)
        setLoading(false);
      });
  }
  // everytime compnent is mounted useEffect is called
  useEffect(()=>{
    searchForRecipe('chicken');
  }, []);

  return (
    <div className="App">
      <header className="App-header">
      <div>
        <input ref={inputRef} placeholder="Search for Recipe" />
        <button onClick={search}>Search</button>
      </div>
      {loading && <p>Loading...</p>}
        <div className="wrapper">
          {ingredientList.map((item) =>{
            return (
              <div className="Ingredient">
                <span>{item.recipe.label}</span>

                <img src={item.recipe.image} alt=""/>
                {/* <div className="Steps">
                  {item.recipe.ingredientLines.map((step)=>{
                    return <p>{step}</p>;
                  })}
                </div> */}
                <div className='btn btn-recipe'>
                  <button>Get Recipe</button>
                </div>
              </div>
            );
          })}
        </div>
      </header>
    </div>
  );
}

export default App;
