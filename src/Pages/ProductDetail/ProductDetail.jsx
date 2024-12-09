import { useEffect, useState } from "react";
import LayOut from "../../Components/LayOut/LayOut"
import classes from "./ProductDetail"
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../Api/EndPoints";
import ProductCard from "../../Components/Product/ProductCard";
import Loader from "../../Components/Loader/Loader";
function ProductDetail() {
const{productId}=useParams()
const[product,setproduct]=useState({})
const[isLoading,setIsLoading]=useState(false)
// console.log(productId);
useEffect(()=>{
  setIsLoading(true)
axios.get(`${productUrl}/${productId}`)
.then((res)=>{
  setproduct(res.data)
  setIsLoading(false)
  // console.log(res.data);
  
  
}).catch((err)=>{console.log(err)
setIsLoading(false)}
)
},[])

  return (
    <LayOut>
      {isLoading ? (<Loader />) : (<ProductCard product={product} flex={true} renderDesc={true} renderAdd={true}/>)}
    </LayOut>
  );
}

export default ProductDetail
