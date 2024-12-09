import { useEffect, useState } from "react"

import axios from "axios"
import ProductCard from "./ProductCard"
import classes from "./Product.module.css"
import Loader from "../Loader/Loader"
function Product() {
    const[products,setproducts]=useState([])
    const [isLoading,setIsLoading]=useState(false)
    useEffect(()=>{
     setIsLoading(true)
        axios.get("https://fakestoreapi.com/products")
        .then((res)=>{
            setproducts(res.data)
            // console.log(res);
            setIsLoading(false)

            
        })
        .catch((error)=>{console.log(error)
        setIsLoading(false)}
        )
    },[])
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className={classes.product_container}>
          {products?.map((singleProduct) => (
            <ProductCard
              product={singleProduct}
              key={singleProduct.id}
              renderAdd={true}
            
            />
          ))}
        </section>
      )}
    </>
  );
}

export default Product
