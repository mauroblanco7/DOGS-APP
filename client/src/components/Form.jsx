
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTemperaments,
  resState,
  postDog,
  getDogs
} from "../actions/index";
import Loader from "./Loader";
import Message from "./Message";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { validation } from "./Validation";
import Nav3 from "./Nav3";
import "../componentsCSS/form.css"

export default function DogCreate() {
  const dispatch = useDispatch();
  const allTemperaments = useSelector((e) => e.temperaments);
  const allDogs = useSelector((e) => e.dogs);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false)

  const [input, setInput] = useState({
    name: "",
    minHeight: "",
    maxHeight: "",
    minWeight: "",
    maxWeight: "",
    minlife_span: "",
    maxlife_span: "",
    image: "",
    temperament: [],
    createdInBd: false,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getTemperaments());
    dispatch(resState(resState));
    dispatch(getDogs())
  }, [dispatch]);

  function handleSubmit(e) {
    let regexName = /^[A-Z][a-z]{4,10}$/;
    console.log(input)
    const a = allDogs.filter((b)=>b.name === input.name)
    if (a.length > 0) {
      return alert("There is already a breed with this name, try another name")
    }
      if (input.name.length &&
        regexName.test(input.name) &&
        input.minHeight.length && 
        input.maxHeight.length && 
        input.minWeight.length &&  
        input.maxWeight.length &&   
        input.minlife_span.length&&        
        input.maxlife_span.length &&       
        input.temperament.length>0 &&
        Number(input.minHeight) <=Number(input.maxHeight)&&
        Number(input.minWeight) <= Number(input.maxWeight) &&
        Number(input.minlife_span) <= Number(input.maxlife_span)
        ) {
          
        
      let crear = {
      name: input.name,
      height: `${input.minHeight} - ${input.maxHeight}`,
      weight: `${input.minWeight} - ${input.maxWeight}`,
      life_span: `${input.minlife_span} - ${input.maxlife_span} years`,
      image: input.image,
      temperament: input.temperament.join(", "),
    };

    dispatch(postDog(crear));
    setLoading(false);
    setResponse(true);
    
    setTimeout(() => setResponse(false), 3000);
    window.location.replace('')

} else {
  setErr(true)
  setLoading(false);
  setTimeout(() => setErr(false), 3000);
}
  }
  function handelChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validation({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelectTemperament(e) {
    
    if (!input.temperament.includes(e.target.value)) {
        setInput({
        ...input,
        temperament: [...input.temperament, e.target.value],
      });
    }
  }
  function handleDelete(e) {
    e.preventDefault();
    setInput({
      ...input,
      temperament: input.temperament.filter((temp) => temp !== e.target.value),
    });
  }

  return (
    <div className="formPerfil">
      <Nav3/>
 
      <div className="titleform">
        <h1 className="titleForm">Create Dog</h1>
      </div>

      <div className="form" onSubmit={resState}>
        <div  className="fieldform">
          <label className="title5">Name{" "}</label>
          <input
            type="text"
            name="name"
            placeholder="Dog breed"
            value={input.name}
            onChange={(e) => handelChange(e)}
            required
          />

          <strong>{errors.name}</strong>
        </div>
        <div className="fieldform">
          <label className="title5">Height min{" "}</label>
          <input
            type="number"
            name="minHeight"
            placeholder="Centimeters"
            value={input.minHeight}
            onChange={(e) => handelChange(e)}
            min="1" max="100"
            required
          />

          <strong>{errors.minHeight}</strong>
        </div >
        <div className="fieldform">
          <label className="title5">Pais de origen{" "}</label>
          <input
            type="text"
            name="pais"
            placeholder="Pais"
            // value={input.pais}
            onChange={(e) => handelChange(e)}
            required
          />
{/* 
          <strong>{errors.minHeight}</strong> */}
        </div >
        <div className="fieldform">
          <label className="title5">Height max{" "} </label>
          <input
            required
            type="number"
            name="maxHeight"
            placeholder="Centimeters"
            value={input.maxHeight}
            min="1" max="100"
            onChange={(e) => handelChange(e)}
          />

          <strong>{errors.maxHeight}</strong>
        </div>
        <div  className="fieldform">
          <label className="title5">Weight min{" "}</label>
          <input
            type="number"
            name="minWeight"
            placeholder="Kilograms"
            value={input.minWeight}
            min="1" max="100"
            onChange={(e) => handelChange(e)}
            required
          />

          <strong>{errors.minWeight}</strong>
        </div>
        <div className="fieldform">
          <label className="title5">Weight max{" "}</label>
          <input
            type="number"
            name="maxWeight"
            placeholder="Kilograms"
            value={input.maxWeight}
            min="1" max="100"
            onChange={(e) => handelChange(e)}
            required
          ></input>

          <strong>{errors.maxWeight}</strong>
        </div>
        <div className="fieldform">
          <label className="title5">Life span min{" "}</label>
          <input
            type="number"
            name="minlife_span"
            placeholder="Years"
            value={input.minlife_span}
            min="1" max="60"
            onChange={(e) => handelChange(e)}
            required
          />

          <strong>{errors.minlife_span}</strong>
        </div>
        <div className="fieldform">
          <label className="title5">Life span max{" "}</label>
          <input
            type="number"
            name="maxlife_span"
            placeholder="Years"
            value={input.maxlife_span}
            min="1" max="60"
            onChange={(e) => handelChange(e)}
            required
          />

          <strong className="err">{errors.maxlife_span}</strong>
        </div>
        <div className="fieldform">
          <label name="image" className="title5">
            Image{" "}
          </label>
          <input
            name="image"
            value={input.image}
            placeholder="URL"
            onChange={(e) => handelChange(e)}
            required
          ></input>
        </div>
        <div className="fieldform fieldtemperaments">
          <label className="title5" value="temperament" name="temperament">
            {" "}
            Temperament{" "}
          </label>
          <select
            className="boton6"
            onChange={(e) => handleSelectTemperament(e)}
          >
            <option>Temperaments</option>
            {allTemperaments &&
              allTemperaments
                .sort((a, b) => (a.name > b.name ? 1 : -1))
                .map((e) => (
                  <option key={e.id} value={e.name}>
                    {e.name}
                  </option>
                ))}
          </select>
       

          {!input.temperament.length? 
          <strong>{errors.temperament}</strong>
          :input.temperament.map((nombre, i) => {
            return (
              <div key={i} className="concatFiltro">
                <button
                  
                  onClick={handleDelete}
                  value={nombre}
                >
                  X
                </button>
                <span>{nombre}</span>
              </div>
            );
          })}
        </div>

        <div className="btn-home-details">
          <button
            className="btn-all"
            type="submit"
            onClick={(e) => handleSubmit(e)}
          >
            {" "}
            Create new Dog
          </button>
        {loading && <Loader />}
      {response && (
        <div>
        <Message msg="The breed of dog has been created" bgColor="#198754" />
        </div>
      )}
      {err && (
        <div className="errormes">
        <Message msg="The dog breed has not been created, fill in all the fields" bgColor="#FF0000" />
        </div>
      ) }

      </div>
      </div>
    </div>
  );
}

