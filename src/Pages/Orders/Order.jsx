import LayOut from "../../Components/LayOut/LayOut"
import classes from "./Order.module.css"
import { useContext,useEffect,useState} from "react";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { db } from "../../Utility/FireBase";
import ProductCard from "../../Components/Product/ProductCard"
function Order() {
  const [{user},dispatch]=useContext(DataContext);
  const[orders,setOrders]=useState([]);
 
  
  
useEffect(()=>{
if (user) {
  db.collection("users")
  .doc(user.uid)
  .collection("orders")
  .orderBy("created","desc")
  .onSnapshot((snapshot)=>{
    // console.log(snapshot)
    setOrders(
      snapshot.docs.map((doc) => ({
        id:doc.id,
        data:doc.data()
      }))
    );
    
  })
  
} else {
  setOrders([])
}
},[])

  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.orders_container}>
          <h2>your orders</h2>
          {
            orders?.length == 0 && (<div style={{padding:'20px'}}>you don't have any orders yet</div>)
          }
          <div>
            {
              orders?.map((eachOrder,i)=>{
                return(
                  <div key={i}>
                    <hr />
                    <p> Order ID: {eachOrder?.id}</p>
                    {
                      eachOrder?.data?.basket?.map((order)=>(
                        <ProductCard flex={true} product={order} key={order.id}/>
                      ))
                    }
                   
                    
                  </div>
                )
              })
            }
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Order