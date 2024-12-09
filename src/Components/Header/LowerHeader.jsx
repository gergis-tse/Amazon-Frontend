
import classes from "./Header.module.css"
import { Link}   from "react-router-dom";
import { IoMenuSharp } from "react-icons/io5";
function LowerHeader() {
  return (
    <div className={classes.lower_container}>
      <ul>
        <li>
          <Link to="">
            <IoMenuSharp />
            All
          </Link>
        </li>
        <li>
          <Link to="">Today's Deals</Link>
        </li>
        <li>
          <Link to=""> Customer Service</Link>
        </li>
        <li>
          <Link to="">Registry</Link>
        </li>
        <li>
          <Link to="">Gift Cards</Link>
        </li>
        <li>
          <Link to="">Sell</Link>
        </li>
      </ul>
    </div>
  );
}

export default LowerHeader
