import React, { useEffect, useState, useContext } from "react";
import { useFormik } from "formik";
import { signUpSchema } from "../../../Components/Schemas";
import { Link } from "react-router-dom";
import {
  registerOwnerApi,
} from "../../../Apis";
import AuthContext from "../../../Components/context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { setToken } from "../../../utils/helperFunctions";
import { InputErrorMessage } from "../../../Components/common/Errors";
import toast from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { WhiteLoader } from "../../../Components/common/Errors/loader/WhiteLoader";

const Signup = () => {
  const appContext = useContext(AuthContext);
  const { setIsLoggedIn, fetchCurrentAccountDetails } = appContext;
  const { isLoggedIn } = appContext.state;
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordVisiblej, setPasswordVisiblej] = useState(false);
  const [loader,setLoader]=useState(false);
  const navigate = useNavigate();

  const { values, handleSubmit, handleBlur, handleChange, touched, errors } =
    useFormik({
      initialValues: {
        firstName: "",
        lastName: "",
        salutation: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema: signUpSchema,
      onSubmit: async (values) => {
        setLoader(true);
        try {
          const res = await registerOwnerApi(values);
          if (res.status === 200 || res.status === 201) {
            const token = res?.data?.token;
            setToken(token);
            setIsLoggedIn(true);
            fetchCurrentAccountDetails();
            // navigate("/")
            setLoader(false);
            const message = res?.data?.message;
            toast.success(message , {id:"003"});
          }
        } catch (err) {
          toast.error(err?.response.data.message , {id:"004"});
          setLoader(false)
        }
      },
    });

    const togglePasswordVisibility = () => {
      setPasswordVisible((prevState) => !prevState);
    };
    const togglePasswordVisibilityj = () => {
      setPasswordVisiblej((prevState) => !prevState);
    };

    
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);




  return (
    <>
      <div>
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
                  Welcome to Account Owner Panel
                </h1>
                <p className="text-white text-opacity-80">
                  Medicine cure diseases but only doctors can cure patients
                </p>
              </div>

              <div className="w-56 h-56 bg-blue-100 rounded-circle position-absolute bottom-0 end-20 transform translate-y-1/3"></div>
            </div>

            <div className="col-12 col-md-9 col-lg-7 offset-lg-5 border-left-lg min-h-screen d-flex flex-column justify-content-center position-relative">
              <div className="py-lg-16 px-lg-20">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-lg-10 col-md-10 col-xl-7 mx-auto ms-xl-0">
                      <div className="mt-10 mt-lg-5 mb-6 d-lg-block text-center">
                        <span className="d-inline-block d-lg-block h-24 mb-4 mb-lg-6 me-3">
                          <i className="bi bi-person-circle login-icon"></i>
                        </span>
                        <h1 className="ls-tight font-bolder h2">
                          Account Holder Signup
                        </h1>
                      </div>

                      <div className="mb-3 d-flex justify-content-between">
                        <div>
                          <div className="col-auto">
                            <label className="form-label mb-0" htmlFor="name">
                              Honorific
                            </label>
                            <select
                              style={{
                                padding: "8.8px 12px",
                                display: "initial",
                              }}
                              type="string"
                              name="salutation"
                              className={`form-select
                                         ${touched?.salutation &&
                                  Boolean(errors.salutation)
                                  ? "border-danger"
                                  : ""
                                }`}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.salutation}
                            >
                              <option hidden>Select</option>
                              <option value="Dr">Dr</option>
                              <option value="Mr">Mr</option>
                              <option value="Ms">Ms</option>
                            </select>
                            <InputErrorMessage
                              error={touched.salutation && errors.salutation}
                              marginBottom={-15}
                            />
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <label
                            className="form-label mb-0"
                            htmlFor="firstName"
                          >
                            First Name
                          </label>
                          <input
                            type="text"
                            id="fname"
                            placeholder="Enter First Name"
                            name="firstName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.firstName?.trim()}
                            className={`form-control ${touched?.firstName && Boolean(errors.firstName)
                              ? "border-danger"
                              : ""
                              }`}
                          />
                          <InputErrorMessage
                            error={touched.firstName && errors.firstName}
                            marginBottom={-15}
                          />
                        </div>
                        <div className="col-sm-4">
                          <label className="form-label mb-0" htmlFor="lastName">
                            Last Name
                          </label>
                          <input
                            type="text"
                            id="lname"
                            placeholder="Enter Last Name"
                            name="lastName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.lastName?.trim()}
                            className={`form-control ${touched?.lastName && Boolean(errors.lastName)
                              ? "border-danger"
                              : ""
                              }`}
                          />
                          <InputErrorMessage
                            error={touched.lastName && errors.lastName}
                            marginBottom={-15}
                          />
                        </div>
                      </div>
                      <div className="mb-1">
                        <div className="d-flex align-items-center justify-content-between">
                          <div>
                            <label className="form-label mb-0" htmlFor="email">
                              Email address
                            </label>
                          </div>
                        </div>
                        <input
                          type="email"
                          id="email"
                          placeholder="Enter email address"
                          name="email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                          className={`form-control ${touched?.email && Boolean(errors.email)
                            ? "border-danger"
                            : ""
                            }`}
                        />
                        <InputErrorMessage
                          error={touched.email && errors.email}
                          marginBottom={-15}
                        />
                        <div className="d-flex align-items-center justify-content-between">
                          <div></div>
                          {/* <div className="mb-2">
                                                        <button type="submit" className="text-sm text-muted text-primary-hover text-underline">Send OTP</button>
                                                    </div> */}
                        </div>
                      </div>

                      <div className="mb-3">
                        <div className="d-flex align-items-center justify-content-between">
                          <div>
                            <label className="form-label mb-0" htmlFor="password">
                              Password
                            </label>
                          </div>
                        </div>
                        <div className="showhide-main">
                          <input
                            type={passwordVisible ? "text" : "password"}
                            name="password"
                            onChange={handleChange}
                            value={values?.password}
                            // className="form-control"
                            id="password"
                            placeholder="Enter confirm password"
                            className={`form-control ${touched?.password && Boolean(errors.password)
                              ? "border-danger"
                              : ""
                              }`}
                          />
                          <span className="pass-showhide" onClick={togglePasswordVisibility}>
                            {passwordVisible ? <i class="bi bi-eye"></i> : <i class="bi bi-eye-slash"></i>}
                          </span>

                        </div>
                        <InputErrorMessage
                          error={touched.password && errors.password}
                          marginBottom={-15}
                        />
                      </div>
                      <div className="mb-3">
                        <div className="d-flex align-items-center justify-content-between">
                          <div>
                            <label className="form-label mb-0" htmlFor="password">
                              Confirm Password
                            </label>
                          </div>
                        </div>
                        <div className="showhide-main">
                          <input
                            type={passwordVisiblej ? "text" : "password"}
                            name="confirmPassword"
                            value={values.confirmPassword}
                            onChange={handleChange}
                            className={`form-control ${touched?.confirmPassword &&
                              Boolean(errors.confirmPassword)
                              ? "border-danger"
                              : ""
                              }`}
                            id="password"
                            placeholder="Enter confirm password"
                          />
                          <span className="pass-showhide" onClick={togglePasswordVisibilityj}>
                            {passwordVisiblej ? <i class="bi bi-eye"></i> : <i class="bi bi-eye-slash"></i>}
                          </span>
                        </div>
                        <InputErrorMessage
                          error={
                            touched.confirmPassword && errors.confirmPassword
                          }
                          marginBottom={-15}
                        />
                      </div>
                      <div>
                        <button
                          type="submit"
                          className="btn btn-primary w-full"
                          disabled={loader}
                        // onClick={SignupRegisterOwner}
                        >
                         {loader ? <WhiteLoader/> : "Sign Up"} 
                        </button>

                        {/* <button type="submit" className="btn btn-primary w-full"
                                                onClick={SignupRegisterOwner}>
                                                Sign Up
                                            </button> */}
                      </div>

                      {/* <!-- <div className="my-6"> */}
                      <div className="mt-5">
                      <small>Already a User? </small>
                      <Link
                        to="/login"
                        className="text-warning text-sm font-semibold"
                      >
                        Login
                      </Link>
                      </div>
                      {/* </div> --> */}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div >
      </div >
    </>
  );
};

export default Signup;
