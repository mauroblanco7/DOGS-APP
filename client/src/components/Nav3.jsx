import React from 'react'
import "../componentsCSS/nav.css";
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import dogs from "../componentsCSS/perros2.png"



export default function Nav({setCurrentPage,setOrder}) {

  return (
    <div className='navbardiv'>
         <div className='logo'>
          <p>Henry dogs</p>
          <img src={dogs} alt="" />
         </div>
          <div className='titledet'>
            <h1>CREATE</h1>
          </div>
          <div className="btn-home-details">
        <Link to="/home">
          <button className="btn-all">Home</button>
        </Link>
      </div>
          {/* <button class="cssbuttons-io-button"><Link className='link-create'target="_blank" to={"/create"}>Create your dog</Link>
  <div class="icon">
  <Link className='link-create'target="_blank" to={"/create"}>
    <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"></path><path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" fill="currentColor"></path></svg>
 </Link>
  </div>
</button> */}

      
        
    </div>
  )
  }