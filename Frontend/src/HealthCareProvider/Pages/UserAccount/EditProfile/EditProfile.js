import React, { useContext, useEffect, useState } from "react";
// import AuthContext from "../../../Components/context/AuthProvider";
import AuthContext from "../../../../Components/context/AuthProvider";
import { useFormik } from "formik";
import { editProfileSchema } from "../../../Components/Schemas";
import { useNavigate } from "react-router-dom";
// import {
//   updateAccountOwnerProfileApi,
//   imageProfileApi,
//   currentAccountOwnerProfileApi,
// } from "../../../Apis";
import {  updateAccountOwnerProfileApi,
  imageProfileApi,
  currentAccountOwnerProfileApi, } from "../../../../Apis/healthcareProvider";
import toast from 'react-hot-toast';
import "react-toastify/dist/ReactToastify.css";
import { InputErrorMessage } from "../../../Components/common/Errors";
import { SERVER_ENDPOINT } from "../../../../utils/baseUrl";
import img from "../../../../Assets/img/img-profile.jpg";
const EditProfile = () => {
  const [profile, setProfile] = useState("");
  const [remove, setRemove] = useState(false);
  const [disable, setDisable] = useState(true);
  const appContext = useContext(AuthContext);
  const { setLoggedInOwner } = appContext;
  const navigate = useNavigate()
  console.log(appContext);
  const [loggedInOwner, setLoggedInOwners] = useState();

  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleBlur,
    handleChange,
    setFieldValue,
    setErrors,
    setValues,
  } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      contactNo: "",
      profilePic: "",
      salutation: "",
      email: "",
    },
    validationSchema: editProfileSchema,
    onSubmit: async (values) => {
      // console.log(values,":::::::::::::::::::")
      try {
        const response = await updateAccountOwnerProfileApi(values);
        if (response.status === 200) {
          fetchCurrentAccountDetails();
          toast.success("Profile Updated Successfully!");
          navigate("/")
        } else {
          toast.error("Something went wrong.");
        }
      } catch (err) {
        const message = err.response?.data?.message || err.response.statusText;
        toast.error(message);
      }
    },
  });
  const fetchCurrentAccountDetails = async () => {
    try {
      const response = await currentAccountOwnerProfileApi();
      if (response.status === 200) {
        setLoggedInOwners(response?.data?.user);
        setLoggedInOwner(response?.data?.user);
        console.log(response.data, "resoponse");
        setValues({
          salutation: response?.data?.user.salutation,
          profilePic: response?.data?.user?.profilePic,
          firstName: response?.data?.user?.firstName,
          lastName: response?.data?.user?.lastName,
          contactNo: response?.data?.user?.contactNo,
          email: response?.data?.user?.email,
        });
      }
      console.log(values, "first");
    } catch (err) {
      console.log(err);
    }
  };
  const handleRemove = async () => {
    try {
      const response = await updateAccountOwnerProfileApi({ profilePic: "" });
      setFieldValue("profilePic", "");
      if (response.status === 200) {
        fetchCurrentAccountDetails();
        toast.success("Profile picture removed successfully!");
      } else {
        toast.error("Something went wrong.");
      }
    } catch (err) {
      const message = err.response?.data?.message || err.response.statusText;
      toast.error(message);
    }
    fetchCurrentAccountDetails();
  };

  const handleFileChange = async (e) => {
    try {
      let file = e.target.files[0];
      if (!file) {
        return;
      }
      
      const type = file.type?.split("/")[1];
      const imageType = ["jpeg", "jpg", "png"];
      const validImageType = imageType.includes(type);
      if (!validImageType) {
        return toast.error("Upload a valid image : jpeg, png, jpg");
      } else if (file.size > 10000001) {
        return toast.error("Image size cannot be more than 10 MB");
      } else {
        let fr = new FileReader();

        fr.readAsDataURL(file);
        fr.onload = function () {
          setProfile(fr.result);
        };
        setErrors({});
      }
      const formdata = new FormData();
      formdata.append("file", file);
      const response = await imageProfileApi(formdata);
      if (response.status === 200) {
        setFieldValue("profilePic", response?.data?.filePath);
        toast.success(response.data.message);
        // fetchCurrentAccountDetails();
      }else{
        toast.error('Image size is too large')
      }
    } catch (err) {
      console.log(err);
      toast.error('Image size is too large')
    }
  };
  console.log(values);
  useEffect(() => {
    fetchCurrentAccountDetails();
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="row mt-6">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="d-flex justify-content-between mb-5 align-items-center">
                    <h3 className="mb-0 font-bolder h3">
                      Account Owner Profile
                    </h3>
                    <button
                      className="btn btn-sm btn-primary d-block d-md-inline-block ms-auto ms-md-0"
                      data-bs-toggle="modal"
                      data-bs-target="#viewPatient"
                      onClick={() => setDisable(false)}
                    >
                      Edit
                    </button>
                  </div>

                  <hr className="mb-10" />
                  <div className="col-lg-4">
                    <h3 className="h4 mb-5 text-center img-head">
                      Upload Image
                    </h3>
                    <div className="d-flex flex-column align-items-center text-center">
                      <a className="avatar w-48 h-48 border border-body border-4 rounded position-relative">
                       {
                        !disable &&  <div
                        className="border position-absolute rounded text-center bg-white bottom-0 end-0 text-primary-hover"
                        style={{
                          height: "2em",
                          width: "2em",
                          cursor: "pointer",
                          color: "#a2a4a9",
                        }}
                        title="Upload Image"
                      >
                        <label htmlFor="image">
                          <input
                            name="profilePic"
                            id="image"
                            type="file"
                            style={{ display: "none" }}
                            accept="image/png, image/jpeg, image/jpg"
                            hidden={true}
                            // value={dummy.data}
                            onChange={handleFileChange}
                          />

                          <i
                            style={{ cursor: "pointer" }}
                            className="bi bi-camera"
                          ></i>
                        </label>

                        {/* <input type="file"/> */}
                      </div>
                       }
                       {
                        !disable && <div>
                        {values?.profilePic?.length ? (
                          <a
                            className="edit-delete-profile text-danger-hover"
                            title="Delete Image"
                            onClick={handleRemove}
                          >
                            <i className="bi bi-trash" aria-hidden="true"></i>
                          </a>
                        ) : (
                          <a
                            className="edit-delete-profile text-danger-hover"
                            title="Delete Image"
                          >
                            <i className="bi bi-trash" aria-hidden="true"></i>
                          </a>
                        )}
</div>
                       }
                        <img
                          alt="..."
                          src={`${SERVER_ENDPOINT}/${values.profilePic}`}
                          onError={(event) => {
                            event.target.src = img;
                            event.onerror = null;
                          }}
                          className="rounded-circle"
                        />
                      </a>
                    </div>
                  </div>

                  <div className="col-lg-8">
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="mb-5 col-sm-2">
                          <label className="form-label" htmlFor="name">
                            Honorific
                          </label>

                          <select
                            disabled={disable}
                            type="string"
                            name="salutation"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.salutation}
                            style={{fontWeight:"400" ,color:"black"}}
                            className={`form-select px-2 form-control-solid  ${
                              touched.salutation && Boolean(errors.salutation)
                                ? "border-danger"
                                : ""
                            }`}
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
                        <div className="mb-5 col-sm-5">
                          <label className="form-label" htmlFor="name">
                            First Name
                          </label>
                          <input
                            type="text"
                            name="firstName"
                            disabled={disable}
                            id="name"
                            placeholder="Enter Name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.firstName?.trim()}
                            className={`form-control form-control-solid ${
                              touched.firstName && Boolean(errors.firstName)
                                ? "border-danger"
                                : ""
                            }`}
                          />
                          {/* {console.log(Boolean(errors.email))} */}
                          <InputErrorMessage
                            error={touched.firstName && errors.firstName}
                            marginBottom={-15}
                          />
                        </div>
                        <div className="mb-5 col-sm-5">
                          <label className="form-label" htmlFor="name">
                            Last Name
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            disabled={disable}
                            id="name"
                            placeholder="Enter Name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.lastName?.trim()}
                            className={`form-control form-control-solid ${
                              touched.lastName && Boolean(errors.lastName)
                                ? "border-danger"
                                : ""
                            }`}
                          />
                          {/* {console.log(Boolean(errors.email))} */}
                          <InputErrorMessage
                            error={touched.lastName && errors.lastName}
                            marginBottom={-15}
                          />
                        </div>
                        <div className="mb-5 col-sm-6">
                          <label className="form-label" htmlFor="name">
                            Contact No
                          </label>
                          <input
                            type="text"
                            name="contactNo"
                            disabled={disable}
                            id="name"
                            placeholder="Enter Contact Number"
                            onKeyPress={(event) => {
                              if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                              }
                            }}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.contactNo?.trim()}
                            className={`form-control form-control-solid ${
                              touched.contactNo && Boolean(errors.contactNo)
                                ? "border-danger"
                                : ""
                            }`}
                          />
                          <InputErrorMessage
                            error={touched.contactNo && errors.contactNo}
                            marginBottom={-15}
                          />
                        </div>
                        <div className="mb-5 col-sm-6">
                          <label className="form-label" htmlFor="email">
                            Email
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            value={(values.email)?.toLowerCase()}
                            id="email"
                            disabled
                          />
                        </div>
                      </div>

                      <div className="text-end">
                        <button type="submit" disabled={disable} className="btn btn-primary">
                          Update
                        </button>
                      </div>
                      {/* <ToastContainer autoClose={2000}/> */}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


export default EditProfile;
