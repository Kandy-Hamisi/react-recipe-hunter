import './App.css';
import React, { useEffect, useState, useRef } from 'react';
function App() {
  const[ingredientList, updateIngredientList] = useState([]);
  const[loading, setLoading] = useState(false);
  const API_KEY = "0852649f54a277171918d8778f65a799";
  const APP_ID = "d114db93";
  const inputRef = useRef(null);

  // mpesa credentials
  const CONS_KEY = 'pjIhT9HvDvIwfAHiXjkv1wZJWIuTf1kf';
  const CONS_SECRET = 'b4kN7Lh47TlsRkyc';

  const search = () => {
    // console.log("input ref", inputRef.current.value);
    searchForRecipe(inputRef.current.value);
  }

  // mpesa integration
  const generateToken = () => {
    let credentials = Buffer.from(`${CONS_KEY}:${CONS_SECRET}`).toString('base64');
    console.log(credentials);
    let authUrl = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    let checking = headers.append(`Authorization`, `Basic ${credentials}`);
    console.log(checking);
    fetch(authUrl, { headers })
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log(error));
    
  };

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
                  <button onClick={generateToken} >Get Recipe</button>
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
