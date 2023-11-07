import React, { useEffect, useState } from "react";
import AuthContext from './Components/context/AuthProvider';
import MainRouter from './MainRouter/MainRouter';
import { getToken, removeToken } from "./utils/helperFunctions";

import { Toaster } from "react-hot-toast";
import { currentAccountOwnerProfileApi } from "./Apis";
import HealthcareRouter from "./HealthCareProvider/MainRouter/HealthcareRouter";
import { WhiteLoader } from "./Components/common/Errors/loader/WhiteLoader";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false); // false boolean
  const [loggedInOwner, setLoggedInOwner] = useState(null)
  const [toggleView,setToggleView] = useState(true);
  const [loading,setLoading]=useState(true);

const token = getToken()

const fetchCurrentAccountDetails = async () => {
 try {
  setLoading(true);
  const response = await currentAccountOwnerProfileApi()
  if(response?.status === 200) {
     setLoggedInOwner(response?.data?.user)
     setIsLoggedIn(true);
     setLoading(false);
  }
 } catch(err) {
  console.log(err)
 }
}

  const logout = () => {
     removeToken()
     setIsLoggedIn(false)
     setLoggedInOwner({
      loading: false,
      data: null
     })
  } 


  useEffect(() => {
    if(token !== ""){
      fetchCurrentAccountDetails()
    }
  }, [token])


  useEffect(()=>{
    if(loggedInOwner?.role === "Health care provider"){
      setToggleView(false);
      document.title = 'Intellispine Healthcare provider'
    }else{
      setToggleView(true);
      document.title = 'Intellispine Account owner'
    }
  },[loggedInOwner])

  // useEffect(()=>{
  //   if(loggedInOwner?.role === "Health care provider"){

  //     document.title = 'Intellispine Healthcare provider'
  //   }else{
  //     document.title = 'Intellispine Account owner'
  //   }
  // })
  return (
    <div className="App">
     <AuthContext.Provider
     value={{
      state: {
       isLoggedIn,
       loggedInOwner,
     },
     logout,
     setLoggedInOwner,
     setIsLoggedIn,
     fetchCurrentAccountDetails,
     }}>
      {
      toggleView ? <MainRouter/> : <HealthcareRouter />
      }
       
     </AuthContext.Provider>
     <Toaster position='top-center' autoClose={1500} reverseOrder={false}/>
    </div>
  );
}

export default App;
