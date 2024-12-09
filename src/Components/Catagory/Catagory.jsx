import CatagoryCard from "./CatagoryCard"
import {categoryInfos} from "./CatagoryFullInfos"
import classes from "./Catagory.module.css"
function Catagory() {
  return(
  <div className={classes.catagory_container}>
     {
     categoryInfos.map((infos,i)=>(
      <CatagoryCard data={infos} key={i}/>
     ))
     }
     </div>
  )
}

export default Catagory
