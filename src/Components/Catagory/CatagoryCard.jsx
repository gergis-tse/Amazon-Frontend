import { Link } from "react-router-dom"
import classes from "./Catagory.module.css"
function CatagoryCard({data}) {
  // console.log(data);
  
  return (
    <div className={classes.catagory}>
      <Link to={`/category/${data?.name}`}>
        <span>
          <h2>{data?.title}</h2>
        </span>
        <img src={data?.imgLink} alt="" />
        <p>shop now</p>
      </Link>
    </div>
  );
}

export default CatagoryCard
