import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { healthCareProviderSchema } from "../../Components/Schemas";
import { InputErrorMessage } from "../../Components/common/Errors";
import img from "../../../Assets/img/img-profile.jpg";
// import {
//   saveandSendUserApiCreatedByOwner,
//   saveUserApiCreatedByOwner,
//   getProvidersDetails,
//   imageProfileApi,
// } from "../../Apis";

import {  saveandSendUserApiCreatedByOwner,
  saveUserApiCreatedByOwner,
  getProvidersDetails,
  imageProfileApi, } from "../../../Apis/healthcareProvider";
import toast from 'react-hot-toast';
import AllHealthcareProviders from "../../Components/AllHealthcareProviders/AllHealthcareProviders";
import "react-toastify/dist/ReactToastify.css";
import SearchFilter from "../../Components/SearchFilterData/SearchFilter";
import { SERVER_ENDPOINT } from "../../../utils/baseUrl";
import AllHealthCareProviderData from "./AllHealthCareProviderData";

const HealthcareProvider = () => {
  const modal = document.querySelector("#addpatient");
  const [providerDatas, setProviderDatas] = useState();
  const [save, setSave] = useState(false);
  const [runUseEffect, setRunUseEffect] = useState(false);
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
      salutation: "",
      firstName: "",
      lastName: "",
      email: "",
      contactNo: "",
      specialization: "",
      address: "",
      experience: "",
      profilePic: "",
    },
    validationSchema: healthCareProviderSchema,
    onSubmit: async (values, action) => {
      try {
        if (save) {
          const response = await saveUserApiCreatedByOwner(values);
          if (response.status === 201) {
            const message = response?.data?.message || response.statusText;
            fetchAllProvidersDetails();
            modal.click();
            toast.success(message);
          }
        } else {
          const response = await saveandSendUserApiCreatedByOwner(values);
          if (response.status === 201) {
            const message = response?.data?.message || response.statusText;
            fetchAllProvidersDetails();
            modal.click();
            toast.success(message);
            console.log(message);
          }
        }
      } catch (err) {
        console.log(err);
        const message = err.response?.data?.message || err.response.statusText;
        toast.error(
          message
        );
      }
    },
  });

  const handleImage = async (event) => {
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
      setFieldValue("profilePic", "");
      event.target.value = null;
    }
  };

  const fetchAllProvidersDetails = async () => {
    try {
      const response = await getProvidersDetails();
      if (response.status === 200) {
        setProviderDatas(response?.data?.allProviders);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllProvidersDetails();
  }, [runUseEffect]);
  console.log(errors);
  return (
    <>
      <main className="py-6 bg-surface-secondary">
        <header>
          <div className="container-fluid">
            <div className="mb-5 ps-3">
              <div className="row d-flex align-items-center justify-content-end">
                <div className="col-auto ">
                  <a
                    href="#addpatient"
                    className="btn btn-primary w-100 d-flex"
                    data-bs-toggle="modal"
                  >
                    <span>
                      <i className="bi bi-plus-square-dotted pe-sm-2 p-auto" />{" "}
                    </span>
                    <span className="d-none d-sm-block">
                      Add Healthcare Provider
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div
          className="modal fade"
          id="addpatient"
          tabIndex={-1}
          aria-labelledby="addpatient"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content shadow-3">
              <div className="modal-header">
                <div className="h3 text-start">Add Healthcare Provider</div>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
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
                        value={values.salutation}
                        className={`form-select px-2 form-control-solid ${
                          touched.salutation && Boolean(errors.salutation)
                            ? "border-danger"
                            : ""
                        }`}
                      >
                        <option hidden>Select</option>
                        <option value="Dr.">Dr.</option>
                        <option value="Mr.">Mr.</option>
                        <option value="Ms.">Ms.</option>
                      </select>
                      <InputErrorMessage
                        error={touched.salutation && errors.salutation}
                        marginBottom={-15}
                      />
                    </div>
                    <div className="mb-3 col-sm-5">
                      <label className="form-label" htmlFor="name">
                        First Name{" "}
                        <span className="text-danger font-bolder">*</span>
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        id="name"
                        placeholder="Enter Name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.firstName}
                        className={`form-control form-control-solid ${
                          touched.firstName && Boolean(errors.firstName)
                            ? "border-danger"
                            : ""
                        }`}
                      />
                      <InputErrorMessage
                        error={touched.firstName && errors.firstName}
                        marginBottom={-15}
                      />
                    </div>
                    <div className="mb-3 col-sm-5">
                      <label className="form-label" htmlFor="name">
                        Last Name{" "}
                        <span className="text-danger font-bolder">*</span>
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        id="name"
                        placeholder="Enter Name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.lastName}
                        className={`form-control form-control-solid ${
                          touched.lastName && Boolean(errors.lastName)
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
                        touched.email && Boolean(errors.email)
                          ? "border-danger"
                          : ""
                      }`}
                    />
                    <InputErrorMessage
                      error={touched.email && errors.email}
                      marginBottom={-15}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="email">
                      Phone Number{" "}
                      <span className="text-danger font-bolder">*</span>
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
                        touched.address && Boolean(errors.address)
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
                        touched.specialization && Boolean(errors.specialization)
                          ? "border-danger"
                          : ""
                      }`}
                    />
                    <InputErrorMessage
                      error={touched.specialization && errors.specialization}
                      marginBottom={-15}
                    />
                  </div>
                  <div className="mb-3">
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
                        touched.experience && Boolean(errors.experience)
                          ? "border-danger"
                          : ""
                      }`}
                    />
                    <InputErrorMessage
                      error={touched.experience && errors.experience}
                      marginBottom={-15}
                    />
                  </div>
                  <div className="d-flex justify-content-end mt-5">
                    {/* <button
                      type="submit"
                      className="btn btn-primary w-sm-40 "
                      onClick={() => setSave(true)}
                    >
                      Save
                    </button> */}
                    <button
                      type="submit"
                      className="btn btn-primary w-sm-60"
                      onClick={() => setSave(false)}
                    >
                     Save & Send Link
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Container --> */}
        <div className="container-fluid vstack gap-5">
          <div className="card ">
            <div className="d-flex card-header border-bottom">
              <h5 className="mb-0 font-bolder h3">All Healthcare Providers</h5>
              <div className="ms-auto text-end">
                {/* <SearchFilter startLength={15} filterData={providerDatas} /> */}
                {/* <div className="d-flex ">
                  <div className="input-group input-group-sm input-group-inline me-3">
                    <span className="input-group-text pe-2">
                      <i className="bi bi-search"></i>
                    </span><input type="email" className="form-control" placeholder="Search" aria-label="Search" />
                  </div>
                  <button type="button" className="btn btn-sm px-3 btn-neutral d-flex align-items-center">
                    <i className="bi bi-funnel me-2"></i>
                    <span>Filters</span>
                  </button>
                </div> */}
              </div>
            </div>
            <div className="card">
              <div className="col-xl-12">
                <AllHealthCareProviderData
                  providerDatas={providerDatas}
                  setRunUseEffect={setRunUseEffect}
                  runUseEffec={runUseEffect}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default HealthcareProvider;
