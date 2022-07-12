
import React from 'react'

import { searchDog} from '../actions/index';
import { useDispatch } from 'react-redux';
import "../componentsCSS/searchBar.css"


function toValidateName(name) {
    let errors = {};
    if (!name) {
      errors.name = "This field is required";
    } else if (!/^[a-z]{3,15}$/.test(name)) {
      errors.name =
        "Only 3 to 10 lowercase letters";
    }
    return errors;
  }
  
  function SearchBar({setCurrentPage, setOrder}) {
    const dispatch = useDispatch();
    const [name, setName] = React.useState("");
    //const pokemons = useSelector((state) => state.pokemons);
    const [errors, setErrors] = React.useState({});
  
    function handleInput(e) {
      
      setName(e.target.value);
      setErrors(toValidateName(e.target.value));
    }
    function handleSubmit(e) {
     console.log(name)
        
        dispatch(searchDog(name));
        setCurrentPage(1)
        setOrder(`${name}`)
        setName("");
      
    }
    return (
      <div className='aaa'>
        <div className='textInputWrapper'>
          <input
            className="textInput"
            type="text"
            value={name}
            placeholder="Search by name..."
            onChange={(e) => handleInput(e)}
          />
          {errors.name || !name ? (
            <button className='button--submit' type="submit" disabled={true}>
              Ok
            </button>
          ) : (
            <button
            className='button--submit'
            type="submit"
            onClick={(e) => handleSubmit(e)}
            >
              Ok
            </button>
          )}
        </div>
          {errors.name && <p className='errorSearch'>{errors.name}</p>}
      </div>
    );
  }
  
  export default SearchBar;
