import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { healthCareProviderSchema } from "../../Components/Schemas";
import { InputErrorMessage } from "../../Components/common/Errors";
import img from "../../Assets/img/img-profile.jpg";
import {
  saveandSendUserApiCreatedByOwner,
  saveUserApiCreatedByOwner,
  getProvidersDetails,
  imageProfileApi,
} from "../../Apis";
import toast from "react-hot-toast";
import AllHealthcareProviders from "../../Components/AllHealthcareProviders/AllHealthcareProviders";
import "react-toastify/dist/ReactToastify.css";
import SearchFilter from "../../Components/SearchFilterData/SearchFilter";
import { SERVER_ENDPOINT } from "../../utils/baseUrl";
import AllHealthCareProviderData from "./AllHealthCareProviderData";
import { useRef } from "react";
import { WhiteLoader } from "../../Components/common/Errors/loader/WhiteLoader";

const AddModal = ({ fetchAllProvidersDetails, currentPage, limit, modala }) => {
  // console.log( ,  limit ,currentPage,"DGKSDFGKDFKGD")
  const [save, setSave] = useState(false);
  const [loader,setLoader]=useState(false);
  const ref = useRef();
  const {
    values,
    touched,
    errors,
    setErrors,
    handleChange,
    handleBlur,
    handleSubmit,
    setValues,
    setFieldValue,
    resetForm
  } = useFormik({
    initialValues: {
      salutation: "",
      firstName: "",
      lastName: "",
      email: "",
      contactNo: "",
      specialization: "",
      address: "",
      // experience: "",
      profilePic: "",
    },
    validationSchema: healthCareProviderSchema,
    onSubmit: async (values, action) => {
      setLoader(true);
      try {
        if (save) {
          const response = await saveUserApiCreatedByOwner(values);
          if (response.status === 201 || response.status === 200) {
            const message = response?.data?.message || response.statusText;

            modala.click();
            toast.success(message);
            fetchAllProvidersDetails(currentPage, limit);
            setErrors({});
            resetForm()
            ref.current.value = null;
            setLoader(false);
          }
        } else {
          const response = await saveandSendUserApiCreatedByOwner(values);
          if (response.status === 201 || response.status === 200) {
            const message = response?.data?.message;
            console.log("ADSFJDSFGFKDSAKFAJFDASDJFJSDFJDS");
            fetchAllProvidersDetails(currentPage, limit);
            toast.success(message);
            console.log(message);
            setErrors({});
            modala.click();
            setLoader(false)
            resetForm()
            ref.current.value = null;
          }
        }
      } catch (err) {
        console.log(err);
        setLoader(false)
        const message = err.response?.data?.message || err.response.statusText;
        toast.error(message);
      }
    },
  });

  const handleImage = async (event) => {
    if(!event.target.file[0]) return ;
    console.log(event.target.files[0].name.split(".")[1]);
    let type = event.target.files[0].name.split(".")[1];
    if (
      type === "png" ||
      type === "jpeg" ||
      type === "jpg" ||
      type === "gif" ||
      type === "svg"
    ) {
      const formdata = new FormData();
      formdata.append("file", event.target.files[0]);
      const res = await imageProfileApi(formdata);
      if (res.status === 200 || res.status === 201) {
        toast.success(res.data.message);
        console.log(res);
        setFieldValue("profilePic", res?.data?.filePath);
      } else {
        toast.error(res.data.message);
      }
    } else {
      toast.error("This field accept only image");
      setFieldValue("profilePic", null);
      event.target.value = null;
    }
  };

  const handleClose =()=>{
    setErrors({});
    // setValues({});
    resetForm()
    ref.current.value = null;
  }
  // const fetchAllProvidersDetails = async (page,limit) => {
  //   try {
  //     const response = await getProvidersDetails(page,limit);
  //     if (response.status === 200) {
  //       setProviderDatas(response?.data?.allProviders);
  //       console.log(Math.ceil(response?.data?.totalCount /limit),"TATAT")
  //       setPageCount(Math.ceil(response?.data?.totalCount / limit));
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // console.log(pageCount ,"pageCount")
  //   useEffect(() => {
  //     fetchAllProvidersDetails(currentPage,limit);
  //   }, [runUseEffect]);
  console.log(errors);

  return (
    <div className="modal-dialog modal-lg modal-dialog-centered">
      <div className="modal-content shadow-3">
        <div className="modal-header">
          <div className="h3 text-start">Add Healthcare Provider</div>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            onClick={handleClose}
          />
        </div>
        <div className="modal-body">
          {/* Text */}
          <form onSubmit={handleSubmit}>
            <div className="mb-3 row">
              <div className="col-10">
                <label className="form-label">Profile Image</label>
                <input
                  type="file"
                  className="form-control form-control-solid "
                  onChange={handleImage}
                  ref={ref}
                />
              </div>
              {console.log(
                SERVER_ENDPOINT + values.profilePic,
                "profilefic   "
              )}
              <div className="col-2 ">
                <img
                  // name="profilePic"
                  src={
                    values?.profilePic
                      ? SERVER_ENDPOINT + "/" + values?.profilePic
                      : img
                  }
                  // src="/OwnerKit/img/people/img-profile.jpg"
                  className="rounded-circle  w-24 h-24 border mx-auto d-block"
                  alt="..."
                />
              </div>
            </div>
            <div className="row">
              <div className="mb-3 col-sm-2">
                <label className="form-label" htmlFor="name">
                  Honorific
                </label>
                <select
                  type="string"
                  name="salutation"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values?.salutation}
                  className={`form-select px-2 form-control-solid ${
                    touched?.salutation && Boolean(errors.salutation)
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
              <div className="mb-3 col-sm-5">
                <label className="form-label" htmlFor="name">
                  First Name <span className="text-danger font-bolder">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="name"
                  placeholder="Enter First Name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.firstName}
                  className={`form-control form-control-solid ${
                    touched?.firstName &&  Boolean(errors.firstName)
                      ? "border-danger"
                      : ""
                  }`}
                />
                <InputErrorMessage
                  error={touched.firstName &&  errors.firstName}
                  marginBottom={-15}
                />
              </div>
              <div className="mb-3 col-sm-5">
                <label className="form-label" htmlFor="name">
                  Last Name <span className="text-danger font-bolder">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="name"
                  placeholder="Enter Last Name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lastName}
                  className={`form-control form-control-solid ${
                    touched?.lastName &&  Boolean(errors.lastName)
                      ? "border-danger"
                      : ""
                  }`}
                />
                <InputErrorMessage
                  error={touched.lastName &&  errors.lastName}
                  marginBottom={-15}
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="email">
                Email <span className="text-danger font-bolder">*</span>
              </label>
              <input
                type="text"
                name="email"
                id="email"
                required
                placeholder="Enter email address"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                className={`form-control form-control-solid ${
                  touched?.email && Boolean(errors.email) ? "border-danger" : ""
                }`}
              />
              <InputErrorMessage
                error={touched.email &&  errors.email}
                marginBottom={-15}
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="email">
                Phone Number <span className="text-danger font-bolder">*</span>
              </label>
              <input
                type="text"
                name="contactNo"
                id="tel"
                required
                placeholder="Enter Phone Number"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.contactNo}
                className={`form-control form-control-solid ${
                  touched?.contactNo && Boolean(errors.contactNo)
                    ? "border-danger"
                    : ""
                }`}
              />
              <InputErrorMessage
                error={touched.contactNo &&  errors.contactNo}
                marginBottom={-15}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Address</label>
              <textarea
                name="address"
                type="text"
                style={{ resize: "none" }}
                placeholder="Enter address"
                rows="2"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.address}
                className={`form-control form-control-solid ${
                  touched?.address &&  Boolean(errors.address)
                    ? "border-danger"
                    : ""
                }`}
              ></textarea>
              <InputErrorMessage
                error={touched.address && errors.address}
                marginBottom={-15}
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="specialization">
                Specialization
              </label>
              <input
                type="text"
                name="specialization"
                id="specialization"
                placeholder="Enter Specialization"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.specialization}
                className={`form-control form-control-solid ${
                  touched?.specialization &&  Boolean(errors.specialization)
                    ? "border-danger"
                    : ""
                }`}
              />
              <InputErrorMessage
                error={touched.specialization &&  errors.specialization}
                marginBottom={-15}
              />
            </div>
            {/* <div className="mb-3">
              <label className="form-label" htmlFor="Experience">
                Experience in Industry
              </label>
              <input
                type="text"
                name="experience"
                id="experience"
                placeholder="Enter Experience"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.experience}
                className={`form-control form-control-solid ${
                  touched?.experience && Boolean(errors.experience)
                    ? "border-danger"
                    : ""
                }`}
              />
              <InputErrorMessage
                error={touched.experience &&  errors.experience}
                marginBottom={-15}
              />
            </div> */}
            <div className="d-flex justify-content-end mt-5">
              <button
                type="submit"
                className="btn btn-primary w-sm-60"
                onClick={() => setSave(false)}
                disabled={loader}
              >
               {loader ? <WhiteLoader /> :"Save & Send Link"} 
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddModal;
