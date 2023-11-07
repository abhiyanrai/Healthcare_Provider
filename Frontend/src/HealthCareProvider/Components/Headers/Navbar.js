import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
// import AuthContext from "../context/AuthProvider";
import AuthContext from "../../../Components/context/AuthProvider";
// import { SERVER_ENDPOINT } from "../../utils/baseUrl";
import { SERVER_ENDPOINT } from "../../../utils/baseUrl";
import img from '../../../Assets/img/img-profile.jpg';
const Navbar = ({ pageData }) => {
  const appContext = useContext(AuthContext);
  const { loggedInOwner } = appContext?.state;
  const location = useLocation();
  const { logout } = appContext;
  console.log(loggedInOwner,":::P{P{P{P")

  const getTitle = () => {
    return (
      pageData?.find((l) => l?.pathname === location?.pathname)?.name || ""
    );
  };

  return (
    <>
      <nav
        className="navbar navbar-light position-lg-sticky top-lg-0 d-none d-lg-block overlap-10 flex-none bg-white border-bottom px-0 py-3"
        id="topbar"
      >
        <div className="container-fluid justify-content-between">
          <div className="navbar-user page-title">{getTitle()}</div>

          {/* <!-- Right menu --> */}
          <div className="navbar-user d-none d-sm-block">
            <div className="hstack gap-3 ms-4">
              <div className="dropdown">
                <div
                  className="d-flex align-items-center"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-haspopup="false"
                  aria-expanded="true"
                >
                  <div>
                    <div className="avatar avatar-sm bg-warning rounded-circle text-white">
                      <img
                        alt="..."
                        src={`${SERVER_ENDPOINT}/${loggedInOwner?.profilePic}`}
                        onError={(event) => {
                          event.target.src = img;
                          event.onerror = null;
                        }}
                      />
                    </div>
                  </div>
                  <div className="d-none d-sm-block ms-3">
                    {loggedInOwner ? (
                      <span className="h6">
                        {loggedInOwner.salutation +
                          " " +
                          loggedInOwner.firstName +
                          " " +
                          loggedInOwner.lastName}
                      </span>
                    ) : (
                      <span className="h6">{null}</span>
                    )}
                  </div>
                  <div className="d-none d-md-block ms-md-2">
                    <i className="bi bi-chevron-down text-muted text-xs"></i>
                  </div>
                </div>
                <div className="dropdown-menu dropdown-menu-end">
                  <div className="dropdown-header">
                    <span className="badge badge-lg badge-dot">
                      {loggedInOwner ? (
                        <>
                          <i className="bg-success"></i>
                          <span className="d-block text-heading font-semibold">
                            {loggedInOwner.salutation +
                              " " +
                              loggedInOwner.firstName +
                              " " +
                              loggedInOwner.lastName}
                          </span>
                        </>
                      ) : (
                        <span className="h6">{null}</span>
                      )}
                    </span>
                  </div>
                  <Link className="dropdown-item" to="/dashboard/editprofile">
                    <i className="fa-solid fa-user-pen me-3 text-muted"></i>My profile
                  </Link>
                  <Link className="dropdown-item" to='/ChangePassword'>
                                        <i className="fa-solid fa-lock me-3 text-muted"></i>Change Password
                                    </Link>
                  <div className="dropdown-divider"></div>
                  <Link className="dropdown-item" onClick={logout}>
                    <i className="fa-solid fa-right-from-bracket me-3 text-muted "></i>
                    Logout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
