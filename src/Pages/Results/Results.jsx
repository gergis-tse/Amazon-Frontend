import LayOut from "../../Components/LayOut/LayOut"
import { useParams } from "react-router-dom";
import axios from "axios";
import {productUrl} from "../../Api/EndPoints"
import { useEffect, useState } from "react"
import classes from "./Result.module.css"
import ProductCard from "../../Components/Product/ProductCard";
import Loader from "../../Components/Loader/Loader";
function Results() {
  const [results,setResults]=useState([])
  const[isLoading,setIsLoading]=useState(false)
  const {categoryName}=useParams()
  useEffect(()=>{

  },[])
  // console.log(categoryName);
  axios.get(`${productUrl}/category/${categoryName}`)
  .then((res)=>{
    setResults(res.data)
    // console.log(res);
    setIsLoading(false)
    
  })
.catch((err)=>{console.log(err);
})
  return (
    <LayOut>
      <h1 style={{ padding: "30px" }}> Results</h1>
      <p style={{ padding: "30px" }}> Category/{categoryName}</p>
      <hr />
      {isLoading ? (
        <Loader />
      ) : (
        <div className={classes.product_container}>
          {results?.map((product) => (
            <ProductCard key={product.id} product={product}  renderDesc={false} 
            renderAdd={true}/>
          ))}
        </div>
      )}
    </LayOut>
  );
}

export default Results
