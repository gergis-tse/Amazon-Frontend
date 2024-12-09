import { Link, useNavigate, useLocation} from "react-router-dom";
import classes from "./Auth.module.css";
import {auth} from "../../Utility/FireBase"
import { useState,useContext } from "react";
import {DataContext} from "../../Components/DataProvider/DataProvider"
import {signInWithEmailAndPassword,createUserWithEmailAndPassword} from "firebase/auth"
import {Type} from "../../Utility/Action.type"
import {ClipLoader} from "react-spinners"
function Auth() {
  const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState("");
const[loading,setLoading]=useState({
signIn:false,
signUp:false,
})
const navigate=useNavigate()
const navStateData=useLocation()
console.log(navStateData);


const [{user},dispatch]=useContext(DataContext)
// console.log(email,password);
// console.log(user);

const authHandler = async(e) => {
  e.preventDefault()
  // console.log(e.target.name);
  if(e.target.name == "signin"){
setLoading({...loading,signIn:true})
   signInWithEmailAndPassword(auth, email, password)
    .then((userInfo)=>{
      // console.log(userInfo);
      dispatch({
        type:Type.SET_USER,
        user:userInfo.user,
      })
      setLoading({ ...loading, signIn: false });
      navigate(navStateData?.state?.redirect || "/")
    }).catch((error)=>{
setError(error.message);
setLoading({ ...loading, signIn: false });
    }
    
    )
  } 
  else{
      setLoading({ ...loading, signUp: true });
     createUserWithEmailAndPassword(auth, email, password)
    .then((userInfo)=>{
      // console.log(userInfo);
       dispatch({
         type: Type.SET_USER,
         user: userInfo.user,
       });
       setLoading({ ...loading, signUp: false });
       navigate(navStateData?.state?.redirect || "/")
    }).catch((error)=>{setError(error.message)
       setLoading({ ...loading, signUp: false });
    }
    )
  }
}
  return (
    <section className={classes.login}>
      <Link to="/">
        <img
          src="https://pngimg.com/uploads/amazon/small/amazon_PNG2.png"
          alt="amazon logo"
        />
      </Link>
      <div className={classes.login_container}>
        <h1>sign-In</h1>
        {navStateData?.state?.msg && <small style={{padding:"5px",textAlign:"center",color:"red",fontWeight:"bold"}}>{navStateData?.state?.msg}</small>}
        <form action="">
          <div>
            <label htmlFor="email">E-mail</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="email"
              id="email"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
              id="password"
            />
          </div>
          <button
            type="submit"
            onClick={authHandler}
            name="signin"
            className={classes.login_signIn}
          >
            {loading.signIn ? <ClipLoader color="#000" size={15} /> : "Sign In"}
          </button>
          <p>
            By signing-in you agree to the AMAZON FAKE CLONE Conditions of the
            use & sale.Please see our privacy notice,our cookies notice and our
            interest-based ads notice
          </p>
          <button
            type="submit"
            onClick={authHandler}
            name="signup"
            className={classes.login_register}
          >
            {loading.signUp ? (
              <ClipLoader color="#000" size={15} />
            ) : (
              " Create Your Amazon Account"
            )}
          </button>
          {error && (
            <small
              style={{ paddingTop: "5px", color: "red", textAlign: "center" }}>{error} </small>
          )}
        </form>
      </div>
    </section>
  );
}

export default Auth
