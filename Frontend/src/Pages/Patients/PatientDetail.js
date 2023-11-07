import React, { useEffect, useState } from "react";
import { useParams, Location, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import ConsultationList from "./ConsultationList";
import ExaminationList from "./ExaminationList";
import BillingInformation from "./BillingInformation";
import Preports from "./Preports";
import VisitDetails from "./VisitDetails";
import {
  getAppointmentByPatientIdApi,
  getListingApi,
  getSinglePatientDetailsById,
} from "../../Apis";
import { roomSchema, singlePatientFormSchema } from "../../Components/Schemas";
import { InputErrorMessage } from "../../Components/common/Errors";
import { updatePatientProfileById } from "../../Apis";
import toast from 'react-hot-toast';
import copy from "copy-to-clipboard";
import "react-toastify/dist/ReactToastify.css";
import img from "../../Assets/img/img-profile.jpg";
import Loader from "../../Components/common/Errors/loader/Loader";
import moment from "moment";

const PatientDetail = () => {
  const location = useLocation();
  console.log(location , "LOCATION")
  const modal = document.querySelector("#viewPatient");
  const [loading,setLoading]=useState(true);
  const [patientId, setpatientId] = useState(
    location?.state?.patientId || location?.search.slice(1)
  );
  const [singlePatientData, setPatientData] = useState();
  const [examList,setExamList]=useState([])
  const [consultList,setConsultList]=useState([])
  const [appointmentData, setAppointmentData] = useState([]);
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
      address: "",
      city: "",
      zipcode: "",
      dob: "",
      gender: "",
      reference:""
    },
    validationSchema: singlePatientFormSchema,
    onSubmit: async (values) => {
      try {
        const response = await updatePatientProfileById({
          ...values,
          id: patientId,
        });
        if (response.status === 200) {
          modal.click();
          getSinglePatientDataById();
          const message = response?.data?.message || response.statusText;
          toast.success(message);
        }
      } catch (err) {
        const message = err.response?.data?.message || err.response.statusText;
        toast.error(message);
      }
    },
  });


  const getListingData = async(id)=>{
    try{
      const res = await getListingApi(id);
      if(res.status === 200 || res.status === 201){
        console.log(res,"GADKIDSGIDSFIIDSFIADSF")
        setExamList(res.data.allExam);
        setConsultList(res.data.allConsult)
      }
    }catch(err){
      console.log(err)
    }
  }
  const getSinglePatientDataById = async () => {
    try {
      const response = await getSinglePatientDetailsById(patientId);
      if (response.status === 200) {
        setPatientData(response?.data?.patient);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getAppointmentDetails = async (id) => {
    try {
      const res = await getAppointmentByPatientIdApi(id);
      if (res.status === 200 || res.status === 201) {
        setAppointmentData(res.data.appointment);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleHonorficChange =(e)=>{
    setFieldValue("salutation",e.target.value);
    if(e.target.value == "Mr"){
      setFieldValue("gender","Male")
    }else if(e.target.value == "Ms"){
      setFieldValue("gender","Female")
    }
  }
  const getcolor = (val)=>{
    switch (val) {
      case "New":
        return "#e71ae1";
        break;
      case "Reschedule":
        return "#aac4e9";
        break;
      case "Cancelled":
        return "#c5401d";
        break;
      case "Consultation":
        return "#68b04c";
        break;
      case "Regular":
        return "#d7bb58";
        break;
      default:
        return "#ffff";
    }
  }

  useEffect(() => {
    getSinglePatientDataById();
    getAppointmentDetails(patientId);
    getListingData(patientId)
  }, [patientId]);

  useEffect(() => {
    if (location?.state?.id) {
      document.getElementById("#visitdetailsActive").click();
    }
  }, [location?.state?.id]);

  useEffect(() => {
    if (location?.state?.name) {
      console.log(location?.state?.name,"DSFDSFSDFDSFSDFDSFDS")
      document.getElementById(`#${location?.state?.name}`).click();
    }
  }, [location?.state?.name]);
  useEffect(() => {
    if (singlePatientData) {
      const {
        firstName,
        salutation,
        lastName,
        dob,
        gender,
        contactNo,
        email,
        address,
        zipcode,
        city,
        reference
      } = singlePatientData;
      setFieldValue("salutation", salutation);
      setFieldValue("firstName", firstName);
      setFieldValue("lastName", lastName);
      setFieldValue("dob", dob);
      setFieldValue("gender", gender);
      setFieldValue("email", email);
      setFieldValue("address", address);
      setFieldValue("zipcode", zipcode);
      setFieldValue("city", city);
      setFieldValue("contactNo", contactNo);
      setFieldValue("reference", reference);
    }
  }, [singlePatientData]);

  return (
    <main className="py-6 bg-surface-secondary">
      <div className="container-fluid">
        <div className="row">
          <div className="container-fluid">
            <header className="card mb-5">
              <div className="row card-header  d-flex  align-items-center">
                <div className="col-xl-4 col-lg-6 d-flex  align-items-center">
                  <div className="avatar avatar-sm bg-warning rounded-circle text-white me-3">
                    <img alt="..." src={img} />
                  </div>
                  <span>
                    { loading? <Loader/> : singlePatientData?.salutation +
                      " " +
                      singlePatientData?.firstName +
                      " " +
                      singlePatientData?.lastName}
                  </span>
                </div>
                <div className="col-xl-4 col-lg-6">
                  <p style={{whiteSpace: "nowrap"}}>
                    Patient Id:&nbsp;
                    <span>
                     
                      {singlePatientData?.fileNo
                        ? singlePatientData?.fileNo
                        : "-"}
                      {singlePatientData?.fileNo && (
                        <i
                          title="copy"
                          style={{ color: "lightslategray", cursor: "pointer" }}
                          className="fa-solid fa-copy ms-1"
                          onClick={() => copy(singlePatientData?.fileNo) && toast.success("Copied",{id:"0002"})}
                        ></i>
                      )}
                    </span>
                  </p>
                </div>
                <div className="col-xl-4 col-lg-6">
                  <p>
                    D.O.B.:{" "}
                    <span>
                      {" "}
                      {singlePatientData?.dob?.split("-").reverse().join("/")}
                    </span>
                  </p>
                </div>
              </div>
            </header>
            {/* Modal */}
            <div
              className="modal fade"
              id="viewPatient"
              tabIndex={-1}
              aria-labelledby="addpatient"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content shadow-3">
                  <div className="modal-header">
                    <div className="h3 text-start">Edit Patient</div>
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
                      <div className="mb-1 ">
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
                              value={values?.salutation}
                            >
                              <option hidden>Select</option>
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
                      <div className="row mb-1">
                        <div className="col-12 col-sm-6">
                          <label className="form-label" htmlFor="DOB">
                            Date of Birth
                          </label>
                          {console.log(new Date().toISOString()?.split("T")[0],"DSGDSFGFDGRWEGFDSG")}
                          <input
                            type="date"
                            name="dob"
                            className="form-control"
                            id="DOB"
                                          // max="2023-04-05"
                            max={new Date().toISOString()?.split("T")[0]}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.dob}
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
                            name="gender"
                            disabled
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.gender}
                          >
                            <option hidden>Select Gender</option>Basic Info
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
                          <InputErrorMessage
                            error={touched.gender && errors.gender}
                            marginBottom={-15}
                          />
                        </div>
                      </div>
                      <div className="mb-1">
                        <div className="row">
                          <div className="col-12 col-sm-6">
                            <label
                              className="form-label"
                              htmlFor="mobileNumber"
                            >
                              Phone No.
                            </label>
                            <input
                              type="text"
                              placeholder="Enter Phone No."
                              name="contactNo"
                              className="form-control"
                              id="Email/mobileNumber"
                              onKeyDown={(e)=>{
                                if(e.keyCode == 32){
                                  e.preventDefault();
                                }
                              }}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.contactNo}
                            />
                            <InputErrorMessage
                              error={touched.contactNo && errors.contactNo}
                              marginBottom={-15}
                            />
                          </div>
                          <div className="col-12 col-sm-6">
                            <label className="form-label" htmlFor="email">
                              Email Id.
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Email Id"
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
                      <div className="mb-1">
                        <label className="form-label" htmlFor="fullAddress">
                          Full Address
                        </label>
                        <div className="row">
                          <div className="col-12 col-sm-12 mb-1">
                            <input
                              type="text"
                              name="address"
                              className="form-control"
                              id="fullAddress"
                              placeholder="Enter Full Address"
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
                            <label className="form-label" htmlFor="zip">
                              Zip Code
                            </label>
                            <input
                              type="text"
                              name="zipcode"
                              className="form-control"
                              id="zip"
                              placeholder="Enter Zip Code"
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
                            <label className="form-label" htmlFor="city">
                              City
                            </label>
                            <input
                              type="text"
                              name="city"
                              className="form-control"
                              id="city"
                              placeholder="Enter City"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.city}
                            />
                            <InputErrorMessage
                              error={touched.city && errors.city}
                              marginBottom={-15}
                            />
                          </div>
                          <div className="col-12  mb-2">
                            <label className="form-label" htmlFor="city">
                              Reference
                            </label>
                            <input
                              type="text"
                              name="reference"
                              className="form-control"
                              id="city"
                              placeholder="Enter reference"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.reference}
                            />
                           
                          </div>
                        </div>
                      </div>
                      <div className="d-flex justify-content-end">
                        <button
                          type="submit"
                          className="btn btn-primary w-sm-40"
                        >
                          Update
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <ul className="nav nav-tabs overflow-x flex-wrap ms-1 mt-4">
              <li className="nav-item">
                <a
                  href="#information"
                  data-bs-toggle="tab"
                  className="nav-link active font-bold"
                >
                  Basic Information
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#consultation"
                  data-bs-toggle="tab"
                  className="nav-link"
                >
                  Consultation
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#examination"
                  id="#examinationActive"
                  data-bs-toggle="tab"
                  className="nav-link"
                >
                  Initial Examination
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#visitdetails"
                  id="#visitdetailsActive"
                  data-bs-toggle="tab"
                  className="nav-link"
                >
                  Visit Details
                </a>
              </li>
              <li className="nav-item">
                <a href="#preports"  data-bs-toggle="tab" className="nav-link">
                  History Reports
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#billinginformation"
                  data-bs-toggle="tab"
                  className="nav-link"
                >
                  Billing Information
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#appointment"
                  data-bs-toggle="tab"
                  className="nav-link"
                >
                  Appointments
                </a>
              </li>
            </ul>
            <div className="tab-content">
              <div className="tab-pane active" id="information">
                <div className="row g-6">
                  <div className="col-xl-12">
                    <div className="vstack gap-6">
                      {
                        loading ? <Loader/> : 
            
                      <div className="card rounded-top-0">
                        <div className="card-header d-flex align-items-center justify-content-between border-bottom">
                          <h5>Basic Information</h5>
                          <div className="">
                            <button
                              className="btn btn-sm btn-primary d-block d-md-inline-block ms-auto ms-md-0"
                              // onClick={() => setEditForm(false)}
                              data-bs-toggle="modal"
                              data-bs-target="#viewPatient"
                            >
                              Edit
                            </button>
                          </div>
                        </div>
                        <div className="card-body">
                          <div className="container-fluid ">
                            <div className="row">
                              <div className="col-sm-2 d-flex justify-content-center align-items-start">
                                <a
                                  href="#"
                                  className="avatar border w-48 h-48 rounded-circle "
                                >
                                  <img
                                    alt="..."
                                    src={img}
                                    className="rounded-circle"
                                  />
                                </a>
                              </div>

                              <div className="col-sm-10 ">
                                <div className="row pb-4 d-flex justify-content-between align-items-center">
                                  <div className="col-sm-2 font-bold text-end pe-5">
                                    <label>Date</label>
                                  </div>

                                  <div
                                    className="col-sm-10 py-2"
                                    style={{ backgroundColor: "#f8feff" }}
                                  >
                                    {
                                    moment(singlePatientData?.createdAt
                                      ?.split("T")[0]).format("DD/MM/YYYY")}
                                  </div>
                                </div>
                                <div className="row pb-4 d-flex justify-content-between align-items-center">
                                  <div className="col-sm-2 font-bold text-end pe-5">
                                    <label>Full Name</label>
                                  </div>
                                  <div
                                    className="col-sm-10 py-2"
                                    style={{ backgroundColor: "#f8feff" }}
                                  >
                                    {singlePatientData?.salutation +
                                      " " +
                                      singlePatientData?.firstName +
                                      " " +
                                      singlePatientData?.lastName}
                                  </div>
                                </div>
                                <div className="row pb-4 d-flex justify-content-between align-items-center">
                                  <div className="col-sm-2 font-bold text-end pe-5">
                                    <label>Date of Birth</label>
                                  </div>

                                  <div
                                    className="col-sm-10 py-2"
                                    style={{ backgroundColor: "#f8feff" }}
                                  >
                                    {  moment(singlePatientData?.dob).format("DD/MM/YYYY")}
                                  </div>
                                </div>
                                <div className="row pb-4 d-flex justify-content-between align-items-center">
                                  <div className="col-sm-2 font-bold text-end pe-5">
                                    <label>Gender</label>
                                  </div>

                                  <div
                                    className="col-sm-10 py-2"
                                    style={{ backgroundColor: "#f8feff" }}
                                  >
                                    {singlePatientData?.gender}
                                  </div>
                                </div>
                                <div className="row pb-4 d-flex justify-content-between align-items-center">
                                  <div className="col-sm-2 font-bold text-end pe-5">
                                    <label>Email</label>
                                  </div>

                                  <div
                                    className="col-sm-10 py-2"
                                    style={{ backgroundColor: "#f8feff" }}
                                  >
                                    {(singlePatientData?.email)?.toLowerCase()}
                                  </div>
                                </div>

                                <div className="row pb-4 d-flex justify-content-between align-items-center">
                                  <div className="col-sm-2 font-bold text-end pe-5">
                                    <label>Phone Number</label>
                                  </div>

                                  <div
                                    className="col-sm-10 py-2"
                                    style={{ backgroundColor: "#f8feff" }}
                                  >
                                    {singlePatientData?.contactNo}
                                  </div>
                                </div>

                                <div className="row pb-4 d-flex justify-content-between align-items-center">
                                  <div className="col-sm-2 font-bold text-end pe-5">
                                    <label>Reference</label>
                                  </div>

                                  <div
                                    className="col-sm-10 py-2"
                                    style={{ backgroundColor: "#f8feff" }}
                                  >
                                    {singlePatientData?.reference ? singlePatientData?.reference:"-"}
                                  </div>
                                </div>
                                <div className="row pb-4 d-flex justify-content-between align-items-start  ">
                                  <div className="col-sm-2 font-bold text-end pe-5 pt-2">
                                    <label>Address</label>
                                  </div>

                                  <div
                                    className="col-sm-10 py-2"
                                    style={{
                                      backgroundColor: "#f8feff",
                                      height: "5em",
                                    }}
                                  >
                                    {singlePatientData?.address +
                                      " " +
                                      singlePatientData?.city +
                                      " -" +
                                      singlePatientData?.zipcode}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>}
                    </div>
                  </div>
                </div>
              </div>
              <div className="tab-pane fade" id="consultation">
                <ConsultationList patientId={patientId} consultList={consultList} />
              </div>
              <div className="tab-pane fade" id="examination">
                <ExaminationList patientId={patientId} examList={examList} />
              </div>
              <div className="tab-pane fade" id="visitdetails">
                <VisitDetails patientId={patientId} />
              </div>
              <div className="tab-pane fade" id="preports">
                <Preports patientId={patientId} />
              </div>
              <div className="tab-pane fade" id="billinginformation">
                <BillingInformation patientId={patientId} />
              </div>
              <div className="tab-pane fade" id="appointment">
                <div className="card rounded-top-0">
                  <div className="card-header border-bottom">
                  
                  <h5 className="mb-3">Appointments</h5>
                  </div>
                    <div className="table-responsive">
                      <table className="table table-nowrap">
                        <thead className="table-light">
                          <tr>
                            <th>S.No</th>
                            <th>Date</th>
                            <th>Services</th>
                            <th>Appointment Type</th>                    
                          </tr>
                          </thead>
                          <tbody>
                          {Boolean(appointmentData?.length) ?
                            appointmentData?.map((v,i) => {
                              return (
                                <tr>
                                  <td>{i+1}</td>
                                  <td>{moment(v?.startTime?.split("T")[0]).format("DD/MM/YYYY")}</td>
                                  <td>{v?.serviceId?.serviceName}</td>
                                  <td><span className="p-1 rounded text-white"  style={{backgroundColor:`${getcolor(v?.appointmentType)}`}}> {v?.appointmentType}</span></td>
                                </tr>
                              );
                            }):<tr align="center">
                            <td colspan="8">
                              <h5> No record found!</h5>
                            </td>
                          </tr>}
                        </tbody>
                      </table>
                    </div>
                  
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PatientDetail;
