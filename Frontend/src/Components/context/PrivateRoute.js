import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { isAuth } from "../../utils/helperFunctions";
import { currentAccountOwnerProfileApi } from "../../Apis";
import { useNavigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const navigate = useNavigate();
  const checkToken = ()=>{
    currentAccountOwnerProfileApi()?.then(() => {
      return children;
    }).catch((err)=>{
      localStorage.removeItem("token")
      // window.location.href="/login"
      navigate("/login")
    })
  }
  useEffect(()=>{
    checkToken()
  },[])
  const auth = isAuth()
  // console.log(auth, "auth")
  return auth ? children : <Navigate to={"/login"}/>
}
