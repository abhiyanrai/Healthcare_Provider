import React, { useContext ,lazy,Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Sidebar from "../Components/Headers/Sidebar";
// import Navbar from "../Components/Headers/Navbar";
import Dashboard from "../Pages/Dashboard/Dashboard";
// import Login from "../Pages/Authentication/LoginPage/Login";
// import HealthcareProvider from "../Pages/Healthcare/HealthcareProvider";
// import EditProfile from "../Pages/UserAccount/EditProfile/EditProfile";
// import ChangePassword from "../Pages/UserAccount/ChangePassword/ChangePassword";
import Signup from "../Pages/Authentication/SignupPage/Signup";
import PrivateRoute from "../Components/context/PrivateRoute";
// import { getToken } from "../utils/helperFunctions";
import { getToken } from "../../utils/helperFunctions";
// import Patients from "../Pages/Patients/Patients";
// import RecentActivity from "../Pages/Activity/RecentActivity";
// import Consultation from "../Pages/Consultation/Consultation";
// import PatientDetail from "../Pages/Patients/PatientDetail";
import Examination from "../Pages/Patients/Examination";
// import Myschedule from "../Pages/Sechedule/Mysechedule";
// import Progress from "../Pages/Progress/Progress";
// import PatientsBilling from "../Pages/PatientsBilling/PatientsBilling";
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
// import DailyNotes from "../../Pages/DailyNotes/DailyNotes";
import AuthContext from "../Components/context/AuthProvider";


const Login = lazy(() => import('../Pages/Authentication/LoginPage/Login'));
const Sidebar = lazy(() => import('../Components/Headers/Sidebar'));
const Navbar = lazy(() => import('../Components/Headers/Navbar'));
const EditProfile = lazy(() => import('../Pages/UserAccount/EditProfile/EditProfile'));
const HealthcareProvider = lazy(() => import('../Pages/Healthcare/HealthcareProvider'));
const ChangePassword = lazy(() => import('../Pages/UserAccount/ChangePassword/ChangePassword'));
const Patients = lazy(() => import('../Pages/Patients/Patients'));
const RecentActivity = lazy(() => import('../Pages/Activity/RecentActivity'));
const Consultation = lazy(() => import('../Pages/Consultation/Consultation'));
const PatientDetail = lazy(() => import('../Pages/Patients/PatientDetail'));
const Myschedule = lazy(() => import('../Pages/Sechedule/Mysechedule'));
const PatientsBilling = lazy(() => import('../Pages/PatientsBilling/PatientsBilling'));
const View = lazy(() => import('../Pages/Patients/View'));
const Visit_view  = lazy(() => import('../Pages/Visits/Visit_view'));
const ConsultationView  = lazy(() => import('../Pages/Consultation/ConsultationView'));
const Examinationp  = lazy(() => import('../Pages/Examination/Examinationp'));
const ExaminationpReports  = lazy(() => import('../Pages/Examination/ExaminationpReports'));
const ErrorPage  = lazy(() => import('../Pages/ErrorPage'));
const Visit  = lazy(() => import('../Pages/Visits/Visit'));
const VisitDetailsView  = lazy(() => import('../Pages/Patients/VisitDetailsView'));
const DailyNotes  = lazy(() => import('../../Pages/DailyNotes/DailyNotes'));






const HealthcareRouter = () => {


  const pageData = [
    {
      pathname: "/",
      name: "Calendar",
      navbar: true,
      isPrivate: true,
      component: <Myschedule />,
    },
    {
      pathname: "/login",
      name: "Login",
      navbar: false,
      isPrivate: false,
      component: <Login />,
    },
    {
      pathname: "/signup",
      name: "Signup",
      navbar: false,
      isPrivate: false,
      component: <Signup />,
    },
   
    // {
    //   pathname: "/paymentSuccess",
    //   name: "Payment Success",
    //   navbar: false,
    //   isPrivate: false,
    //   component: <PaymentSuccess />,
    // },
    {
      pathname: "/dashboard/healthcareprovider",
      name: "Healthcare Providers",
      navbar: false,
      isPrivate: true,
      component: <HealthcareProvider />,
    },
    {
      pathname: "/dashboard/patients",
      name: "Patients",
      navbar: false,
      isPrivate: true,
      component: <Patients />,
    },
    {
      pathname: "/sechedule/mysechedule",
      name: "My schedules",
      navbar: false,
      isPrivate: true,
      component: <Myschedule />,
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
      component: <Examinationp />,
    }, {
      pathname: "/dailyNotes",
      name: "Daily notes",
      navbar: false,
      isPrivate: true,
      component: <DailyNotes />,
    },
    {
      // pathname: "examination/examinationpReports/:id",
      pathname: "/examinationpReports",
      name: "Examination Reports",
      navbar: true,
      isPrivate: true,
      component: <ExaminationpReports />,
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
      component: <PatientsBilling />,
    },
   
  
    {
      pathname: "/dashboard/editprofile",
      name: "My Profile",
      navbar: false,
      isPrivate: true,
      component: <EditProfile />,
    },
    {
      pathname: "/changepassword",
      name: "Change Password",
      navbar: false,
      isPrivate: true,
      component: <ChangePassword />,
    },
    {
      pathname: "/recentactivity",
      name: "All Activity",
      navbar: false,
      isPrivate: true,
      component: <RecentActivity />,
    },
    {
      pathname: "/VisitDetailsView",
      name: "Visit Details View",
      navbar: false,
      isPrivate: true,
      component: <VisitDetailsView />,
    },
    //  {pathname: "/consultation/:patientId",name: "Consultation",navbar: false, isPrivate: true, component:<Consultation/>,},
    {
      pathname: "/consultation",
      name: "Consultations",
      navbar: true,
      isPrivate: true,
      component: <Consultation />,
    },
    {
      pathname: "/Consultation/ConsultationView/:patientId",
      name: "Consultation View",
      navbar: false,
      isPrivate: true,
      component: <ConsultationView />,
    },
    {
      pathname: "/patients/profile",
      name: "Patients",
      navbar: false,
      isPrivate: true,
      component: <PatientDetail />,
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
      component: <View />,
    },
    {
      pathname: "/visitiesview",
      name: "view",
      navbar: false,
      isPrivate: true,
      component: <Visit_view />,
    },
    {
      pathname: "/patients/visits/:id",
      name: "Visits",
      navbar: false,
      isPrivate: true,
      component: <Visit />,
    },
    {
      pathname: "*",
      name: "Dashboard",
      navbar: false,
      isPrivate: true,
      component: <ErrorPage />,
    },
  ];

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
                    element={<PrivateRoute><Suspense fallback="">{el.component}</Suspense></PrivateRoute>}
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

export default HealthcareRouter;
