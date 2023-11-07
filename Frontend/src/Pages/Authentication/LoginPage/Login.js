import React, { useEffect, useState, useContext } from "react";
import { useFormik } from "formik";
import { loginSchema } from "../../../Components/Schemas";
import { Link, useLocation } from "react-router-dom";
import { loginApi, loginHealthCareApi } from "../../../Apis";
import { useNavigate } from "react-router-dom";
import { setToken } from "../../../utils/helperFunctions";
import AuthContext from "../../../Components/context/AuthProvider";
import { InputErrorMessage } from "../../../Components/common/Errors";
import toast from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { WhiteLoader } from "../../../Components/common/Errors/loader/WhiteLoader";
const Login = () => {
  const location = useLocation();
  console.log(location?.search?.slice(1, location?.search?.length), "logc");
  const appContext = useContext(AuthContext);
  const { setIsLoggedIn, fetchCurrentAccountDetails } = appContext;
  const { isLoggedIn } = appContext.state;
  const [role, setRole] = useState(true);
  const [roleSec, setRoleSec] = useState(false);
  const [passwordVisiblez, setPasswordVisiblez] = useState(false);
  const [loader,setLoader]=useState(false)
  const navigate = useNavigate();

  const { values, handleChange, handleBlur, handleSubmit, touched, errors } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
        acceptCheckbox: false,
      },
      validationSchema: loginSchema,
      onSubmit: async (values) => {
        setLoader(true)
        try {
          const res = role
            ? await loginApi(values)
            : await loginHealthCareApi(values);
          if (res.status === 200 || res.status === 201) {
            const token = res?.data?.token;
            setToken(token);
            setIsLoggedIn(true);
            fetchCurrentAccountDetails();
            setLoader(false)
            const message = res?.data?.message || res.statusText;
            toast.success(message, { id: "001" });
          }
        } catch (err) {
          toast.error(err?.response?.data?.message, { id: "002" });
          setLoader(false)
        }
      },
    });

  const handleRole = (e) => {
    if (role) {
      setRoleSec(true);
      setRole(false);
    } else {
      setRole(true);
      setRoleSec(false);
    }
    console.log(e.target.value);
  };
  console.log(role, "roleeole");

  const handleEmailChange = (e) => {
    if (e.keyCode == 32) {
      e.preventDefault();
    } else {
      console.log(false);
    }
  };

  const togglePasswordVisibilityz = () => {
    setPasswordVisiblez((prevState) => !prevState);
  };

  useEffect(() => {
    if (
      location?.search?.slice(1, location?.search?.length) ===
      "healthCareProvider"
    ) {
      setRole(false);
      setRoleSec(true);
    } else {
      setRole(true);
      setRoleSec(false);
    }
  }, [location]);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  return (
    <>
      <div className="px-5 py-5 p-lg-0 h-screen bg-surface-secondary d-flex flex-column justify-content-center">
        <div className="d-flex justify-content-center">
          <div className="col-lg-5 col-xl-4 p-12 p-xl-20 position-fixed start-0 top-0 h-screen overflow-y-hidden bg-primary d-none d-lg-flex flex-column">
            <a className="d-block" href="#">
              <img
                src="/OwnerKit/img/logos/Logo-White.png"
                className="h-24"
                alt="..."
              />
            </a>
            <div className="mt-32 mb-20">
              <h1 className="ls-tight font-bolder display-6 text-white mb-5">
                Welcome to{" "}
                {role ? "Account Holder panel" : "Healthcare Provider panel"}
              </h1>
              <p className="text-white text-opacity-80">
                Medicines cure diseases but only doctors can cure patients
              </p>
            </div>

            <div className="w-56 h-56 bg-blue-100 rounded-circle position-absolute bottom-0 end-20 transform translate-y-1/3"></div>
          </div>

          <div className="col-12 col-md-9 col-lg-7 offset-lg-5 border-left-lg min-h-screen d-flex flex-column justify-content-center position-relative">
            <div className="py-lg-16 px-lg-20">
              <div style={{ justifyContent: "end" }} className="d-flex">
                <div style={{ cursor: "pointer" }} className="m-2">
                  <input
                    type="radio"
                    name="role"
                    value={role}
                    id="bb"
                    onChange={handleRole}
                    checked={role}
                    // disabled={roleSec}
                  />
                  <label htmlFor="bb" className="p-1">
                    Account Owner
                  </label>
                </div>
                <div className="m-2">
                  <input
                    type="radio"
                    name="role"
                    value={roleSec}
                    id="aa"
                    onChange={handleRole}
                    checked={roleSec}
                  />
                  <label htmlFor="aa" className="p-1">
                    Healthcare Provider
                  </label>
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-lg-10 col-md-9 col-xl-7 mx-auto ms-xl-0">
                    <div className="mt-10 mt-lg-5 mb-6 d-lg-block text-center">
                      <span className="d-inline-block d-lg-block h-24 mb-4 mb-lg-6 me-3">
                        <i className="bi bi-person-circle login-icon"></i>
                      </span>
                      <h1 className="ls-tight font-bolder h2">
                        {role
                          ? "Account owner panel"
                          : "Healthcare provider panel"}{" "}
                        login
                      </h1>
                    </div>

                    <div className="mb-1">
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <label className="form-label mb-0" htmlFor="email">
                            Email Address
                          </label>
                        </div>
                      </div>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter email address"
                        // readOnly
                        onChange={handleChange}
                        onKeyDown={handleEmailChange}
                        onBlur={handleBlur}
                        value={values.email}
                        className={`form-control ${
                          touched?.email && Boolean(errors.email)
                            ? "border-danger"
                            : ""
                        }`}
                      />

                      <InputErrorMessage
                        error={touched?.email && errors.email}
                        marginBottom={-5}
                      />
                    </div>

                    <div className="mb-3">
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <label
                            className="form-label  mb-0"
                            htmlFor="password"
                          >
                            Password
                          </label>
                        </div>
                      </div>
                      <div className="showhide-main">
                        <input
                          type={passwordVisiblez ? "text" : "password"}
                          name="password"
                          value={values.password}
                          className={`form-control ${
                            touched?.password && Boolean(errors.password)
                              ? "border-danger"
                              : ""
                          }`}
                          onChange={handleChange}
                          id="password"
                          placeholder="Enter password"
                        />
                        <span
                          className="pass-showhide"
                          onClick={togglePasswordVisibilityz}
                        >
                          {passwordVisiblez ? (
                            <i class="bi bi-eye"></i>
                          ) : (
                            <i class="bi bi-eye-slash"></i>
                          )}
                        </span>
                      </div>
                      <InputErrorMessage
                        error={touched?.password && errors.password}
                        marginBottom={-5}
                      />
                    </div>

                    {/* <div className="mb-5">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="acceptCheckbox"
                          value={values.acceptCheckbox}
                          onChange={handleChange}
                          id="check-remind-me"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="check-remind-me"
                        >
                          Keep me logged in
                        </label>
                      </div>
                    </div> */}

                    <div>
                      <button
                        className="btn btn-primary w-full"
                        type="submit"
                        disabled={loader}
                        // onKeyPress={(e) => e.key === 'Enter' && handleLoginOwner()}
                      >
                       {loader ? <WhiteLoader></WhiteLoader>:"Sign in"} 
                      </button>
                    </div>
                    {role ? (
                      <div className="mt-5">
                        <small>Don't have an account?</small>
                        <Link
                          to="/signup"
                          className="text-warning text-sm font-semibold"
                        >
                          {" "}
                          Sign up
                        </Link>
                      </div>
                    ) : (
                      <div className="mt-5">
                        <small>Forgot your </small>
                        <Link
                          to="/forgotpassword"
                          className="text-warning text-sm font-semibold"
                        >
                          Password?
                        </Link>
                      </div>
                    )}
                    {role ? (
                      <div>
                        <small>Forgot your </small>
                        <Link
                          to="/forgotpassword"
                          className="text-warning text-sm font-semibold"
                        >
                          Password?
                        </Link>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
