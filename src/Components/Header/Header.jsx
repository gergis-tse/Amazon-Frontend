

import { BiCart } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";
import { SlLocationPin } from "react-icons/sl";
import classes from "./Header.module.css"
import LowerHeader from "./Lowerheader";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DataContext, } from "../DataProvider/DataProvider";
import { auth } from "../../Utility/FireBase";

function Header() {
  const[{basket,user},dispatch]=useContext(DataContext)
  const totalItem=basket?.reduce((amount,item)=>{
    return item.amount+amount
  },0)
  return (
    <section className={classes.fixed}>
      <div className={classes.header_container}>
        <div className={classes.header_logo}>
          <Link to="/">
            <img
              src="https://pngimg.com/uploads/amazon/small/amazon_PNG11.png"
              alt="amazon logo"
            />
          </Link>
          <div className={classes.delivery}>
            <span>
              <SlLocationPin />
            </span>
            <div>
              <p>Delivered to</p>
              <span>Canada</span>
            </div>
          </div>
        </div>

        <div className={classes.search}>
          <select name="" id="">
            <option value="">All</option>
          </select>
          <input type="text" id="" placeholder="Search Amazon" />
          <CiSearch size={38} />
        </div>

        <div className={classes.order_container}>
          <Link to="/" className={classes.language}>
            <img
              src="https://pngimg.com/uploads/flags/small/flags_PNG14655.png"
              alt="usa flag"
            />
            <select>
              <option value="">EN</option>
            </select>
          </Link>
          <Link to={!user && "/auth"}>
            <div>
              {user ? (
                <>
                  <p>Hello,{user?.email?.split("@")[0]}</p>
                  <span onClick={()=>auth.signOut()}>signOut</span>
                </>
              ) : (
                <>
                  <p>Hello, sign In</p>
                  <span>Accounts&Lists </span>
                </>
              )}
            </div>
          </Link>
          <Link to="/Orders">
            <p>returns</p>
            <span>& Orders</span>
          </Link>
          <Link to="/cart" className={classes.cart}>
            <BiCart size={35} />
            <span>{totalItem} </span>
          </Link>
        </div>
      </div>

      <LowerHeader />
    </section>
  );
  
}

export default Header
