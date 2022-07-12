
import React from 'react'
import "../componentsCSS/dogCard.css"
import dogAlt from "../componentsCSS/perros.png"


export default function CardChar({image,name,height,weight,life_span, temperament}) {

  return (
<div class="card">
   <div>
    <img className='img' src={image || dogAlt} alt="" />
   </div>
   <div className='det'>
    <h2>{name}</h2>
    <h4>Temperaments</h4>
    {Array.isArray(temperament)?<p>{temperament.map((p)=>{return p.name+", "})}</p>: <p>{temperament}</p>}
    <h4>Weight</h4>
       <p>
       {weight} kgs
       </p>
   </div>
</div>
    
  )
}
    //  <div className='parent'>
      
    //   <div className="card">

    //    <img src={image} alt="" />
    //    <div className='card-text'>
    //    <p>{name}</p>
    //    <div>
    //     {Array.isArray(temperament)?<p>{temperament.map((p)=>{return p.name+","})}</p>: <p>{temperament}</p>}
    //    </div>
    //    <p>{weight}</p>
    //    </div>
    //   </div>
    //   </div>
