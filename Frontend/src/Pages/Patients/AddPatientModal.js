import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { patientFormSchema } from "../../Components/Schemas";
import { InputErrorMessage } from "../../Components/common/Errors";
import {
  createPatientsByAccountOwner,
} from "../../Apis";
import toast from 'react-hot-toast';
import "react-toastify/dist/ReactToastify.css";
import moment from "moment/moment";
const AddPatientModal = ({schedule,getAllPatients, modal,getRecentPatientsData,getPatientsData,searchVal,
    currentPage,
    limit,
    limitRecent,
    currentPageRecent
  }) => {
  const [clearForm, setClearForm] = useState(false);
  const [loading,setLoading]=useState(false)
    // console.log(modal,"MODALA")
    
  const {
    values,
    touched,
    errors,
    setErrors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues: {
      registrationDate: moment().format('YYYY-MM-DD'),
      salutation: "",
      firstName: "",
      lastName: "",
      email: "",
      contactNo: "",
      address: "",
      city: "",
      zipcode: "",
      dob: "",
      gender: "",
      reference:""
    },
    validationSchema: patientFormSchema,
    onSubmit: async (values, action) => {
      try {
        setLoading(true);
        if (clearForm) {
          action.resetForm();
        } else {
          const response = await createPatientsByAccountOwner(values);
          if (response?.status === 201 || response?.status === 200) {
            if(schedule === false){
              getRecentPatientsData("",currentPageRecent,limitRecent);
              getPatientsData(searchVal, currentPage, limit);
            }
            if(schedule === true){
              getAllPatients();
            }
            console.log('runn1')
            modal.click();
            console.log('runn2')
            resetForm();
            console.log('runn3')
            const message = response?.data?.message || response?.statusText;
            toast.success(
              message
            );
            setLoading(false)
            console.log('runn4')
          }
        }
      } catch (err) {
        const message = err.response?.data?.message || err.response?.statusText;
        toast.error(
          message
          
        );
        console.log('runn454')
      }
    },
  });

  const handleReset = ()=>{
    setClearForm(true);
    resetForm();
  }

  const handleHonorficChange =(e)=>{
    setFieldValue("salutation",e.target.value);
    if(e.target.value == "Mr"){
      setFieldValue("gender","Male")
    }else if(e.target.value == "Ms"){
      setFieldValue("gender","Female")
    }
  }

  const handleGenderChange =(e)=>{
    setFieldValue("gender",e.target.value);

    if(e.target.value == "Male"){
      setFieldValue("salutation","Mr")
    }else if(e.target.value == "Female"){
      setFieldValue("salutation","Ms")
    }

  }
  return (
    <div className="modal-dialog modal-lg modal-dialog-centered">
    <div className="modal-content shadow-3">
      <div className="modal-header">
        <div className="h3 text-start">Add Patient</div>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
          onClick={()=>setErrors({})}
        />
      </div>
      <div className="modal-body">
        {/* Text */}
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="form-label" htmlFor="dateOfVisit">
              Date
            </label>
            <input
              type="date"
              name="registrationDate"
              className="form-control"
              id="dateOfVisit"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.registrationDate}
              // disabled
              max="2070-12-31"
              // min={new Date().toISOString()?.split("T")[0]}
            />
            <InputErrorMessage
              error={
                touched.registrationDate && errors.registrationDate
              }
              marginBottom={-15}
            />
          </div>
          <div className="mb-3 ">
            <div className="row ">
              <div className="col-sm-2">
                <label className="form-label" htmlFor="name">
                  Honorific
                </label>
                <select
                  type="string"
                  name="salutation"
                  className="form-select form-control-solid pe-4"
                  onChange={handleHonorficChange}
                  onBlur={handleBlur}
                  value={values.salutation}
                >
                  <option hidden>Select</option>
                  {/* <option>Dr.</option> */}
                  <option value="Mr">Mr</option>
                  <option value="Ms">Ms</option>
                </select>
                <InputErrorMessage
                  error={touched.salutation && errors.salutation}
                  marginBottom={-15}
                />
              </div>
              <div className="col-sm-5">
                <label className="form-label" htmlFor="fname">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  className="form-control"
                  id="fname"
                  placeholder="Enter First Name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.firstName}
                />
                <InputErrorMessage
                  error={touched.firstName && errors.firstName}
                  marginBottom={-15}
                />
              </div>
              <div className="col-sm-5">
                <label className="form-label" htmlFor="lname">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  className="form-control"
                  id="lname"
                  placeholder="Enter Last Name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lastName}
                />
                <InputErrorMessage
                  error={touched.lastName && errors.lastName}
                  marginBottom={-15}
                />
              </div>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-12 col-sm-6">
              <label className="form-label" htmlFor="DOB">
                Date of Birth
              </label>
              <input
                type="date"
                name="dob"
                className="form-control"
                id="DOB"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.dob}
                max={new Date().toISOString()?.split("T")[0]}
              />
              <InputErrorMessage
                error={touched.dob && errors.dob}
                marginBottom={-15}
              />
            </div>
            <div className="col-12 col-sm-6">
              <label className="form-label" htmlFor="gender">
                Gender
              </label>
              <select
                className="form-select"
                disabled
                name="gender"
                onChange={handleGenderChange}
                onBlur={handleBlur}
                value={values.gender}
              >
                <option hidden>Select Gender</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
              </select>
              <InputErrorMessage
                error={touched.gender && errors.gender}
                marginBottom={-15}
              />
            </div>
          </div>
          <div className="mb-4">
            <div className="row">
              <div className="col-12 col-sm-6">
                <label className="form-label" htmlFor="mobileNumber">
                  Phone No.
                </label>
                <input
                  type="text"
                  name="contactNo"
                  className="form-control"
                  id="Email/mobileNumber"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.contactNo}
                  onKeyPress={(event) => {
                    if (/[A-Za-z ]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  // onKeyPress={(event) => {
                  //   if (!/[0-9]/.test(event.key)) {
                  //     event.preventDefault();
                  //   }
                  // }}
                />
                <InputErrorMessage
                  error={touched.contactNo && errors.contactNo}
                  marginBottom={-15}
                />
              </div>
              <div className="col-12 col-sm-6">
                <label className="form-label" htmlFor="email">
                  Email
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                <InputErrorMessage
                  error={touched.email && errors.email}
                  marginBottom={-15}
                />
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label className="form-label" htmlFor="fullAddress">
              Full Address
            </label>
            <div className="row">
              <div className="col-12 col-sm-12 mb-5">
                <input
                  type="text"
                  name="address"
                  className="form-control"
                  id="fullAddress"
                  placeholder="Address"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.address}
                />
                <InputErrorMessage
                  error={touched.address && errors.address}
                  marginBottom={-15}
                />
              </div>
              <div className="col-6 col-sm-6 mb-2">
                <input
                  type="text"
                  name="zipcode"
                  className="form-control"
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  id="fullAddress"
                  placeholder="Zip Code"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.zipcode}
                />
                <InputErrorMessage
                  error={touched.zipcode && errors.zipcode}
                  marginBottom={-15}
                />
              </div>
              <div className="col-6 col-sm-6 mb-2">
                <input
                  type="text"
                  name="city"
                  className="form-control"
                  id="fullAddress"
                  placeholder="City"
                  
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.city}
                />
                <InputErrorMessage
                  error={touched.city && errors.city}
                  marginBottom={-15}
                />
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-12 mb-5">
                <label className="form-label" htmlFor="email">
                Reference
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="reference"
                  name="reference"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.reference}
                />
              </div>
          <div className="d-flex justify-content-between">
            <button
            type="button"
              className="btn btn-secondary w-sm-40"
              // onClick={() => setClearForm(true)}
              onClick={handleReset}
            >
              Clear
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-sm-40"
              onClick={() => setClearForm(false)}
              // onClick={handleReset}
              // id="btnnn"
              // data-bs-dismiss="modal"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  )
}

export default AddPatientModal