import React,{useEffect,lazy,Suspense} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "../Components/Headers/Sidebar";
import Navbar from "../Components/Headers/Navbar";
import Dashboard from "../Pages/Dashboard/Dashboard";
// import Login from "../Pages/Authentication/LoginPage/Login";
// import HealthcareProvider from "../Pages/Healthcare/HealthcareProvider";
// import EditProfile from "../Pages/UserAccount/EditProfile/EditProfile";
// import ChangePassword from "../Pages/UserAccount/ChangePassword/ChangePassword";
// import Signup from "../Pages/Authentication/SignupPage/Signup";
import PrivateRoute from "../Components/context/PrivateRoute";
import { getToken } from "../utils/helperFunctions";
// import Patients from "../Pages/Patients/Patients";
// import RecentActivity from "../Pages/Activity/RecentActivity";
// import Consultation from "../Pages/Consultation/Consultation";
// import PatientDetail from "../Pages/Patients/PatientDetail";
import Examination from "../Pages/Patients/Examination";
// import Myschedule from "../Pages/Sechedule/Mysechedule";
// import Progress from "../Pages/Progress/Progress";
// import PatientsBilling from "../Pages/PatientsBilling/PatientsBilling";
// import SystemSettings from "../Pages/SystemSettings/SystemSettings";
// import SubscriptionPayment from "../Pages/SubscriptionPayment/SubscriptionPayment";
// import View from "../Pages/Patients/View";
// import Visit_view from "../Pages/Visits/Visit_view";
// import ConsultationView from "../Pages/Consultation/ConsultationView";
// import Examinationp from "../Pages/Examination/Examinationp";
// import ExaminationpReports from "../Pages/Examination/ExaminationpReports";
// import CustomView from "../Pages/Sechedule/CustomView";
import { Redirect } from 'react-router-dom'
// import ErrorPage from "../Pages/ErrorPage";
// import Visit from "../Pages/Visits/Visit";
// import VisitDetailsView from "../Pages/Patients/VisitDetailsView";
// import Paymentfailed from "../Pages/SubscriptionPayment/Paymentfailed";
// import PaymentSuccess from "../Pages/SubscriptionPayment/PaymentSuccess";
// import Forgotpassword from "../Pages/Authentication/forgot/Forgotpassword";
// import Resetpassword from "../Pages/Authentication/reset/Resetpassword";
// import TransactionHistory from "../Pages/TransactionHistory/TransactionHistory";
// import DailyNotes from "../Pages/DailyNotes/DailyNotes";
// import SetupYourAccount from "../SetupAccount/SetupYourAccount";
const Login = lazy(() => import('../Pages/Authentication/LoginPage/Login'));
const HealthcareProvider = lazy(() => import('../Pages/Healthcare/HealthcareProvider'));
const EditProfile = lazy(() => import('../Pages/UserAccount/EditProfile/EditProfile'));
const ChangePassword = lazy(() => import('../Pages/UserAccount/ChangePassword/ChangePassword'));
const Signup = lazy(() => import('../Pages/Authentication/SignupPage/Signup'));
const Patients = lazy(() => import('../Pages/Patients/Patients'));
const RecentActivity = lazy(() => import('../Pages/Activity/RecentActivity'));
const Consultation = lazy(() => import('../Pages/Consultation/Consultation'));
const PatientDetail = lazy(() => import('../Pages/Patients/PatientDetail'));
const Myschedule = lazy(() => import('../Pages/Sechedule/Mysechedule'));
const PatientsBilling = lazy(() => import('../Pages/PatientsBilling/PatientsBilling'));
const SystemSettings = lazy(() => import('../Pages/SystemSettings/SystemSettings'));
const SubscriptionPayment = lazy(() => import('../Pages/SubscriptionPayment/SubscriptionPayment'));
const View = lazy(() => import('../Pages/Patients/View'));
const Visit_view = lazy(() => import('../Pages/Visits/Visit_view'));
const ConsultationView = lazy(() => import('../Pages/Consultation/ConsultationView'));
const Examinationp = lazy(() => import('../Pages/Examination/Examinationp'));
const ExaminationpReports = lazy(() => import('../Pages/Examination/ExaminationpReports'));
const ErrorPage = lazy(() => import('../Pages/ErrorPage'));
const Visit = lazy(() => import('../Pages/Visits/Visit'));
const VisitDetailsView = lazy(() => import('../Pages/Patients/VisitDetailsView'));
const Paymentfailed = lazy(() => import('../Pages/SubscriptionPayment/Paymentfailed'));
const PaymentSuccess = lazy(() => import('../Pages/SubscriptionPayment/PaymentSuccess'));
const Forgotpassword = lazy(() => import('../Pages/Authentication/forgot/Forgotpassword'));
const Resetpassword = lazy(() => import('../Pages/Authentication/reset/Resetpassword'));
const TransactionHistory = lazy(() => import('../Pages/TransactionHistory/TransactionHistory'));
const DailyNotes = lazy(() => import('../Pages/DailyNotes/DailyNotes'));
const SetupYourAccount = lazy(() => import('../SetupAccount/SetupYourAccount'));


const MainRouter = () => {
  const token = localStorage.getItem("token");
  const pageData = [
    {
      pathname: "/",
      name: "Calendar",
      navbar: true,
      isPrivate: true,
      component: <Suspense fallback=""><Myschedule /> </Suspense> ,
    },
    {
      pathname: "/login",
      name: "Login",
      navbar: false,
      isPrivate: false,
      component: <Suspense fallback=""><Login /> </Suspense> ,
    },
    {
      pathname: "/signup",
      name: "Signup",
      navbar: false,
      isPrivate: false,
      component: <Suspense fallback=""><Signup />  </Suspense> ,
    },
    {
      pathname: "/forgotpassword",
      name: "Forgot Password",
      navbar: false,
      isPrivate: false,
      component:  <Suspense fallback=""><Forgotpassword /> </Suspense>,
    },
    {
      pathname: "/resetpassword",
      name: "Reset Password",
      navbar: false,
      isPrivate: false,
      component: <Suspense fallback=""><Resetpassword /> </Suspense>,
    },
    {
      pathname: "/Paymentfailed",
      name: "Payment Failed",
      navbar: false,
      isPrivate: false,
      component: <Suspense fallback=""><Paymentfailed />  </Suspense>,
    },
    {
      pathname: "/paymentSuccess",
      name: "Payment Success",
      navbar: false,
      isPrivate: false,
      component: <Suspense fallback=""> <PaymentSuccess /> </Suspense>,
    },
    {
      pathname: "/dashboard/healthcareprovider",
      name: "Healthcare Providers",
      navbar: false,
      isPrivate: true,
      component:<Suspense fallback=""> <HealthcareProvider /> </Suspense>,
    },
    {
      pathname: "/dashboard/patients",
      name: "Patients",
      navbar: false,
      isPrivate: true,
      component: <Suspense fallback=""> <Patients /> </Suspense>,
    },
    {
      pathname: "/sechedule/mysechedule",
      name: "Calendar",
      navbar: false,
      isPrivate: true,
      component:  <Suspense fallback=""><Myschedule /></Suspense>,
    },
    // {
    //   pathname: "sechedule/customView",
    //   name: "custom View",
    //   navbar: false,
    //   isPrivate: true,
    //   component: <CustomView/>,
    // },
    {
      pathname: `/examination`,
      name: "Examinations",
      navbar: true,
      isPrivate: true,
      component:  <Suspense fallback=""><Examinationp /> </Suspense>,
    },
    {
      // pathname: "examination/examinationpReports/:id",
      pathname: "/examinationpReports",
      name: "Examination Reports",
      navbar: true,
      isPrivate: true,
      component:  <Suspense fallback=""><ExaminationpReports /></Suspense>,
    },
    // {
    //   pathname: "/progress/progress",
    //   name: "Reports",
    //   navbar: false,
    //   isPrivate: true,
    //   component: <Progress />,
    // },
    {
      pathname: "/PatientsBilling/PatientsBilling",
      name: "Patients Billing",
      navbar: false,
      isPrivate: true,
      component: <Suspense fallback=""><PatientsBilling /> </Suspense>,
    },
    {
      pathname: "/SystemSettings/SystemSettings",
      name: "Modal Settings",
      navbar: false,
      isPrivate: true,
      component:  <Suspense fallback=""><SystemSettings /> </Suspense>,
    },
    {
      pathname: "/subscriptionPayment",
      name: "Subscription and Payment",
      navbar: false,
      isPrivate: true,
      component:  <Suspense fallback=""><SubscriptionPayment /></Suspense>,
    },
    {
      pathname: "/dashboard/editprofile",
      name: "My Profile",
      navbar: false,
      isPrivate: true,
      component:  <Suspense fallback=""><EditProfile /> </Suspense>,
    },
    {
      pathname: "/changepassword",
      name: "Change Password",
      navbar: false,
      isPrivate: true,
      component:  <Suspense fallback=""><ChangePassword /> </Suspense>,
    },
    {
      pathname: "/recentactivity",
      name: "All Activity",
      navbar: false,
      isPrivate: true,
      component:  <Suspense fallback=""><RecentActivity /> </Suspense>,
    },

   
    {
      pathname: "/transactionHistory",
      name: "Transaction History",
      navbar: false,
      isPrivate: true,
      component:  <Suspense fallback=""><TransactionHistory /> </Suspense>,
    },
    {
      pathname: "/setupyouraccount",
      name: "Setup Your Account",
      navbar: false,
      isPrivate: true,
      component:  <Suspense fallback="">< SetupYourAccount /></Suspense>,
    },
    {
      pathname: "/VisitDetailsView",
      name: "Visit Details View",
      navbar: false,
      isPrivate: true,
      component:  <Suspense fallback=""><VisitDetailsView /> </Suspense>,
    },
    {
      pathname: "/dailyNotes",
      name: "Daily notes",
      navbar: false,
      isPrivate: true,
      component: <Suspense fallback=""><DailyNotes /> </Suspense>,
    },
    //  {pathname: "/consultation/:patientId",name: "Consultation",navbar: false, isPrivate: true, component:<Consultation/>,},
    {
      pathname: "/consultation",
      name: "Consultations",
      navbar: true,
      isPrivate: true,
      component:  <Suspense fallback=""><Consultation /> </Suspense>,
    },
    {
      pathname: "/Consultation/ConsultationView/:patientId",
      name: "Consultation View",
      navbar: false,
      isPrivate: true,
      component: <Suspense fallback=""><ConsultationView />   </Suspense>,
    },
    {
      pathname: "/patients/profile",
      name: "Patients",
      navbar: false,
      isPrivate: true,
      component: <Suspense fallback=""><PatientDetail />  </Suspense>,
    },
    // {
    //   pathname: "/examination",
    //   name: "Examination",
    //   navbar: false,
    //   isPrivate: true,
    //   component: <Examination />,
    // },

    {
      pathname: "/consultation/view",
      name: "view",
      navbar: false,
      isPrivate: true,
      component:<Suspense fallback=""> <View />   </Suspense>,
    },
    {
      pathname: "/visitiesview",
      name: "view",
      navbar: false,
      isPrivate: true,
      component:  <Suspense fallback=""><Visit_view /> </Suspense>,
    },
    {
      pathname: "/patients/visits/:id",
      name: "Visits",
      navbar: false,
      isPrivate: true,
      component:<Suspense fallback=""> <Visit />  </Suspense>,
    },
    {
      pathname: "*",
      name: "Dashboard",
      navbar: false,
      isPrivate: true,
      component: <Suspense fallback=""> <ErrorPage />  </Suspense>,
    },
  ];


  useEffect(() => {
    getToken();
  }, [token])
  
  return (
    <>
      <BrowserRouter>
        <div className="d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary">
          {/* {console.log(getToken())} */}
          {Boolean(getToken()) && <Sidebar />}
          <div className="flex-lg-1 h-screen overflow-y-lg-auto">
            {Boolean(getToken()) && <Navbar pageData={pageData} />}
            <Routes>
              {pageData.map((el, index) => {
                return el.isPrivate ? (
                  <Route
                    key={index}
                    path={el.pathname}
                    element={<PrivateRoute>{el.component}</PrivateRoute>}
                  />
                ) : (
                  <Route
                    key={index}
                    path={el.pathname}
                    element={el.component}
                  />
                );
              })}
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
};

export default MainRouter;
