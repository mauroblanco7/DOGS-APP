import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs} from "../actions/index";
import DogCard from "./DogCard"
import Loader from "./Loader"
import Pagination from "./Pagination";
import Nav from "./Nav"
import { Link } from "react-router-dom";
import {
  getTemperaments, filterTypes,filterApiOrDb, sortName, sortWeight
} from "../actions/index";
import "../componentsCSS/home.css"
import dogNotFound from "../componentsCSS/perrosnotfound.png"



export default function Home () {
    const dispatch = useDispatch()
    const {dogs, dogsCopy} = useSelector((state)=>state)
    const [order,setOrder] = useState("")
    const [charge, setCharge] = useState(false)
console.log(dogs)
console.log("aca", dogsCopy)

    // paginacion //----------------------------------------
    const [currentPage, setCurrentPage] =  useState(1);
    const [dogsByPage] = useState(8);
    const lastDog = currentPage * dogsByPage;
    const firstDog = lastDog - dogsByPage;
    const [temperament, setTemperament] = useState("All");

    const currentDogsInPage= dogs.slice(firstDog, lastDog)
    
    const pagination = (pagNumber)=>{
      setCurrentPage(pagNumber)
    }
    // paginacion //---------------------------------------
    
    const {temperaments}= useSelector((state) => state);
    useEffect(() => {
      dispatch(getTemperaments());
    }, [dispatch]);

    useEffect(()=>{
      setCharge(true)
      setTimeout(()=>{setCharge(false)}, 4000)
      dispatch(getDogs())
    },[dispatch])

    function handleFilterTypes(e) {
      e.preventDefault();
      setCharge(true)
      dispatch(filterTypes({temperament}));
      setCurrentPage(1);
      setOrder(`filtered ${e.target.value}`);
      setTimeout(()=>{setCharge(false)}, 1000)
    }
    function hanldeFilterApiOrDb(e) {
    
      e.preventDefault();
      setCharge(true)
      dispatch(filterApiOrDb(e.target.value));
      setCurrentPage(1);
      setOrder(`filtered ${e.target.value}`);
      setTimeout(()=>{setCharge(false)}, 1000)
    }
    function hanldeFilterOrderZA(e){
      e.preventDefault();
      setCharge(true)
      dispatch(sortName(e.target.value));
      setCurrentPage(1);
      setOrder(`filtered ${e.target.value}`);
      setTimeout(()=>{setCharge(false)}, 1000)
    }
    function hanldeFilterWeight(e){
      e.preventDefault();
      setCharge(true)
      dispatch(sortWeight(e.target.value));
      setCurrentPage(1);
      setOrder(`filtered ${e.target.value}`);
      setTimeout(()=>{setCharge(false)}, 1000)
    }
    function all () {
      setCharge(true)
      dispatch(getDogs());
      setCurrentPage(1);
      
      setTimeout(()=>{setCharge(false)}, 1000)
    }

    return (
      <React.Fragment>
        <div className="navbar">
          <Nav setCurrentPage={setCurrentPage} setOrder={setOrder}/>
        <div className="filters">
          <button className="btn-all" onClick={()=>all()}>All dogs</button>
        <div>
          <h4>Filter existing or created</h4>
          <select  className="select" onChange={(e)=>hanldeFilterApiOrDb(e)}>
            <option value="existing">Existing</option>
            <option value="created">Created</option>
          </select>
        </div>
        <div>
          <h4>Order by name</h4>
          <select  className="select" onChange={(e)=>hanldeFilterOrderZA(e)}>
          <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
          </select>
        </div>
        <div>
        <h4>Order by weight</h4>
          <select  className="select" onChange={(e)=>hanldeFilterWeight(e)}>
          <option value="upward">Upward weight</option>
            <option value="downward">Downward weight</option>
          </select>
        </div>
      <div>
      <h4>Filter by temperament</h4>
        <select  className="select"
          value={temperament}
          onChange={(e) => setTemperament(e.target.value)}>

          {temperaments &&
            temperaments
              .sort((a, b) => (a.name > b.name ? 1 : -1))
              .map((t) => (
                <option key={t.id} value={t.name}>
                  {t.name}
                </option>
              ))}
        </select>
      <div>
        <button className="btn-filter" onClick={(e) => handleFilterTypes(e)}>Filter</button>
      </div>
      </div>
      </div>
         
        </div>
        <div className="main">
          <div className="pag">
              <div className="pagina">
                {charge?<div className="loader-main">
                          <Loader/>
                        </div>:currentDogsInPage.length?
                                  currentDogsInPage.map((p) => {
                        return (
                          <div className="cardContainer" key={p.id}>
                            <Link className="link"  to={`/home/${p.id}`}>
                              <DogCard
                                name={p.name}
                                image={p.image}
                                height={p.height}
                                weight = {p.weight}
                                life_span = {p.life_span}
                                temperament= {p.temperaments}
                              />
                            </Link>
                          </div>
                        );
                      }):<div className="div-not-found">
                            <h4>Ups!</h4>
                            <img src={dogNotFound} alt="" />
                            <h4>Dog not found</h4>
                            <h5>Try creating a new dog breed</h5>
                        </div>
                }
              </div>

                  <Pagination 
                    dogsByPage={dogsByPage}
                    allDogs={dogs.length}
                    pagination={pagination}
                  />



          </div>
        </div>

      </React.Fragment>
    )
}