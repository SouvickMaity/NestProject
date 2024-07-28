import React from "react";
import Layout from "./../components/Layout/Layout";
import { useSearch } from "../context/search";
const Search = () => {
  const [values, setValues] = useSearch();
  return (
    <Layout title={"Search results"}>
      <div className="">
        <div className="">
          <h1>Search Resuts</h1>
          <h6>
            {values?.results.length < 1
              ? "No Products Found"
              : `available ${values?.results.length }`}
          </h6> 
          <div className='d-flex flex-wrap'>
             
             {values?.results.map((p) => (
              
                <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                    src={`/api/v1/product/product-image/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">${p.price}</p>
                    <p className="card-text">{p.description.substring(0,30)}</p>
                    <div className='d-flex'>
                    <button  class="btn btn-primary" >More Details</button>
                    <button  class="btn btn-secondary">ADD TO CART</button>
                    </div>
                  </div>
                </div>
              
            ))}
             </div>
          
        </div>
      </div>
    </Layout>
  );
};



export default Search;