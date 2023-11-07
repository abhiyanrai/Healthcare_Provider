import React, { useContext, useEffect,useState } from "react";
import { Link, useLocation } from "react-router-dom";
// import AuthContext from "../context/AuthProvider";
import AuthContext from "../../../Components/context/AuthProvider";
// import { SERVER_ENDPOINT } from "../../utils/baseUrl";
import { SERVER_ENDPOINT } from "../../../utils/baseUrl";
import $ from "jquery";
import img from "../../../Assets/img/img-profile.jpg";
const Sidebar = () => {
  const appContext = useContext(AuthContext);
  const { loggedInOwner } = appContext?.state;
  const { logout } = appContext;
  const [active,setActive]=useState("")
  const location =  useLocation();
// const handleLogoClick =()=>{
//   setActive('jainul');
// }
//   $(document).ready(function () {
//     $(".navbar-nav li").click(function () {
//       $(this).addClass("jainul");
//       $(this).siblings().removeClass("jainul");
//     });
//   });

  console.log(loggedInOwner?.role,"new Roleee")

  return (
    <>
       <nav
      className="navbar show navbar-vertical h-lg-screen navbar-expand-lg px-0 py-3 navbar-light bg-white border-bottom border-bottom-lg-0 border-end-lg"
      id="sidebar"
    >
      <div className="container-fluid">
        {/* <!-- Toggler --> */}
        <button
          className="navbar-toggler ms-n2"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#sidebarCollapse"
          aria-controls="sidebarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        {/* <!-- Brand --> */}
        <Link  
          className="navbar-brand py-lg-2 mb-lg-5 px-lg-6 me-0 ms-4"
          to="/"
        >
          <img src="/OwnerKit/img/logos/logo.png" alt="..." />
        </Link>

        {/* <!-- User menu (mobile) --> */}
        <div className="navbar-user d-lg-none">
          {/* <!-- Dropdown --> */}
          <div className="dropdown">
            {/* <!-- Toggle --> */}
            <a
              href="#"
              id="sidebarAvatar"
              role="button"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <div className="avatar-parent-child">
                <img
                  alt="..."
                  className="avatar avatar- rounded-circle"
                  src={
                    loggedInOwner?.profilePic
                      ? `${SERVER_ENDPOINT}${loggedInOwner.profilePic}`
                      : img
                  }
                />
                {/* <span >
                  {loggedInOwner.salutation + " " + loggedInOwner.firstName + " "  + loggedInOwner.lastName}
                </span> */}
              </div>
            </a>
            {/* <!-- Menu --> */}

            <div
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="sidebarAvatar"
            >
              <div className="dropdown-header">
                <span className="badge badge-lg badge-dot">
                  <i className="bg-success"></i>
                  <span className="d-block text-heading font-semibold">
                    {/* {loggedInOwner.salutation + " " + loggedInOwner.firstName + " "  + loggedInOwner.lastName} */}
                  </span>
                </span>
                {/* {console.log(loggedInOwner, "salllllll")} */}
              </div>
              <div className="dropdown-divider"></div>

              <Link className="dropdown-item" to="/dashboard/editprofile">
                <i className="fa-solid fa-user-pen me-3 text-muted"></i>My
                profile
              </Link>
              <div className="dropdown-divider"></div>
              <Link className="dropdown-item" onClick={logout}>
                <i className="fa-solid fa-right-from-bracket me-3 text-muted"></i>
                Logout
              </Link>
            </div>
          </div>
        </div>
        {/* <!-- Collapse --> */}
{
  console.log(location.pathname,"patyyyyyfh")
}
  <div className="collapse navbar-collapse" id="sidebarCollapse">
          {/* <!-- Navigation --> */}

          <ul className="navbar-nav ps-4">
            <li className={`nav-item  ${location.pathname=="/" && "jainul"}`}>
              <Link className="nav-link" to="/">
                <i className="bi bi-briefcase"></i>
                Calendar
              </Link>
            </li>
          
            
           

            <li className="nav-item">
              <Link className={`nav-link ${location.pathname == "/dashboard/patients" || location.pathname == "/patients/profile" ? "jainul":""}`} to="/dashboard/patients">
                <i className="bi bi-people"></i>
                Patients
              </Link>
            </li>

            <li className="nav-item">
              <Link className={`nav-link ${location.pathname == "/consultation" || location.pathname == `/Consultation/ConsultationView` ? "jainul":""}`} to="/consultation">
                <i className="bi bi-journals"></i>
                Consultations
              </Link>
            </li>

            <li className="nav-item">
              <Link className={`nav-link ${location.pathname == "/examination" ||  location.pathname == "/examinationpReports" ? "jainul":""}`} to="/examination">
                <i className="bi bi-card-checklist"></i>
                Examinations
              </Link>
            </li>

            <li className={`nav-item ${location.pathname == "/dailyNotes" && "jainul"} `}>
              <Link className="nav-link" to="/dailyNotes">
                <i className="bi bi-calendar-week"></i>
                Daily Notes
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link className="nav-link" to="patients/visits/:id">
                <i className="bi bi-calendar-week"></i>
                Visit
              </Link>
            </li> */}
            {/* <li className="nav-item">
              <Link className="nav-link" to="progress/progress">
                <i className="bi bi-clipboard-data"></i>
                Reports
              </Link>
            </li> */}
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname == "/PatientsBilling/PatientsBilling" && "jainul"}`} to="PatientsBilling/PatientsBilling">
                <i className="bi bi-receipt"></i>
                Patients Billing
              </Link>
            </li> 
          </ul>

          {/* <!-- Push content down --> */}
          <div className="mt-auto"></div>
        </div>

     
      </div>
    </nav>

      
    </>
  );
};

export default Sidebar;
