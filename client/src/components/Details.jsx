import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getDetail, resState } from "../actions/index";
import Loader from "./Loader";
import "../componentsCSS/details.css"
import Nav2 from "./Nav2"
import dogAlt from "../componentsCSS/perros.png"


export default function Detail() {
  const { id } = useParams();
  const dogDetail = useSelector((state) => state.dogsDetail);
  const dispatch = useDispatch();
  console.log(dogDetail)

  useEffect(() => {
    dispatch(getDetail(id));
    return () => {
      dispatch(resState());
    };
  }, [dispatch, id]);

  return (
    <div>
      <Nav2/>
      {Object.keys(dogDetail).length > 0 ? (
        <main className="paginado2">
          <div className="btn-home-details">
            <Link to="/home">
              <button className="btn-all" onClick={resState}>
                Home
              </button>
            </Link>
          </div>
          <div className="detailss">
          <div className="img-det">
            <img
              src={dogDetail[0].image || dogAlt}
              alt={dogDetail[0].name}
              className="imagdetalle"
            />
          </div>

          <div className="cardDetalle">
            <div>
              <h1>{dogDetail[0].name}</h1>
            </div>
            <div className="base3">
              <h4>Temperament:</h4>
              <p>{Array.isArray(dogDetail[0].temperaments)?dogDetail[0].temperaments.map(e=>e.name + ", "):dogDetail[0].temperaments}</p>
            </div>
            <div className="base3">
              <h4>Height:</h4>
              <p>{dogDetail[0].height} Cms.</p>
            </div>
            <div className="base3">
              <h4>Weight:</h4>
              <p>{dogDetail[0].weight} Kgs.</p>
            </div>
            <div className="base3">
              <h4>Life Span:</h4>
              <p>{dogDetail[0].life_span}</p>
            </div>
          </div>
          </div>
        </main>
      ) : (
        <div className="loader-details">
        <Loader />
        </div>
      )}
      
    </div>
  );
}