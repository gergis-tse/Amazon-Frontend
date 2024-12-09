import LayOut from "../../Components/LayOut/LayOut"
import classes from "./payment.module.css"
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { useContext } from "react";
import ProductCard from "../../Components/Product/ProductCard"
import { useState } from "react";
import {
  useStripe,
  useElements,
  CardElement
} from "@stripe/react-stripe-js";
import CurrencyFormat from "../../Components/CurrenctFormat/CurrencyFormat";
import {axiosInstance} from "../../Api/Axios"
import{ClipLoader} from "react-spinners"
import { db } from "../../Utility/FireBase";
import {useNavigate } from "react-router-dom";

function Payment() {
  const[{basket,user},dispatch]=useContext(DataContext)

  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

   const total = basket.reduce((amount, item) => {
     return item.price * item.amount + amount;
   }, 0);

  const[cardError,setCardError]=useState("")
  const[processing,setProcessing]=useState(false)
    const stripe = useStripe();
    const elements = useElements();
    const navigate=useNavigate();

    const handleChange=(e)=>{
      // console.log(e);
      e.error.message?setCardError( e.error.message):setCardError("")
      
    }
    const handlePayment=async(e)=>{
      e.preventDefault();
      try{ 
        setProcessing(true)
        const response= await axiosInstance({method:"POST",
          url:`/payment/create?total=${total*100}`
        })
 const clientSecret=response.data?.clientSecret;
        const {paymentIntent} =await stripe.confirmCardPayment(
          clientSecret,{
payment_method:{
card:elements.getElement(CardElement)
}
  //  console.log(paymentIntent)
            
          }
          
          
        )
await db
.collection("users")
.doc(user.uid)
.collection("orders")
.doc(paymentIntent.id)
.set({
  basket:basket,
  amount:paymentIntent.amount,
  created:paymentIntent.created,
})


dispatch({type:TypeError.EMPTY_BASKET})



        setProcessing(false)
        navigate("/Orders",{state:{msg:"you have placed new order"}})
      } catch (error) {
        console.log(error)
        setProcessing(false)
        
      }
    }
  return (
    <LayOut>
      <div className={classes.Payment_header}>Checkout({totalItem})items</div>
      <section className={classes.payment}>
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 React Lane </div>
            <div> calgary,AB</div>
          </div>
        </div>
        <hr />
        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />
        <div className={classes.flex}>
          <h3>Payment method</h3>
          <div className={classes.payment_card}>
            <div className={classes.payment_details}>
              <form onSubmit={handlePayment}>
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}

                <CardElement onChange={handleChange} />
                <div className={classes.payment_price}>
                  <div>
                    <span style={{ display: "flex", gap: 5 }}>
                      Total Order |<CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button type="submit">
                    {processing?(
                      <div className={classes.loading}>
                        <ClipLoader color="gray" size={12} />
                        <p> Please Wait ...</p>
                      </div>
                    ):(
                      "Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment
