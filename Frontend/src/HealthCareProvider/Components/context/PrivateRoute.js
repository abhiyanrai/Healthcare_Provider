import { useEffect } from "react";
import { Navigate } from "react-router-dom"; 
import { isAuth } from "../../../utils/helperFunctions"; 
import { currentAccountOwnerProfileApi } from "../../../Apis/healthcareProvider";
import { useNavigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const navigate = useNavigate();
  const checkToken = ()=>{
    currentAccountOwnerProfileApi().then(() => {
      return children;
    }).catch((err)=>{
      localStorage.removeItem("token") 
      navigate("/login")
    })
  }
  useEffect(()=>{
    checkToken()
  },[])
  const auth = isAuth() 
  return auth ? children : <Navigate to={"/login"}/>
}
