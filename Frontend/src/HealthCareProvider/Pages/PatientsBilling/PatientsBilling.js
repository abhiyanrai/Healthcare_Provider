import React, { useRef, useState } from "react";
import { useEffect } from "react";
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";
// import {
//   createBillApi,
//   getAllPatientsDetails,
//   getBillInfoByIdApi,
//   getBillingListApi,
//   getServiceApi,
//   getServiceByIdApi,
//   getSinglePatientDetailsById,
// } from "../../Apis";
import copy from "copy-to-clipboard";
import { API_BASE_URL } from "../../../utils/baseUrl";
import { createBillApi ,getAllPatientsDetails,
  getBillInfoByIdApi,
  getBillingListApi,
  getServiceApi,
  getServiceByIdApi,
  getSinglePatientDetailsById,} from "../../../Apis/healthcareProvider";
import moment from "moment/moment";
import { useReactToPrint } from "react-to-print";
import { sendEmailApi } from "../../../Apis";
const PatientsBilling = () => {
  const [patinetData, setPatientData] = useState();
  const [billingData, setBillingData] = useState([]);
  const [patientList, setPatientList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg,setErrorMsg]=useState("")
  const [allServices, setAllServices] = useState([]);
  const [billId, setBillId] = useState("");
  const [serviceId, setServiceId] = useState([]);
  const [serviceData, setServiceData] = useState([]);
  const [grandTotal, setGrandTotal] = useState("");
  const [discount, setDiscount] = useState("");
  const [paymentMode, setPaymentMode] = useState("Cash");
  const [singleBillData, setSingleBillData] = useState("");
  const [firstCheck, setFirstCheck] = useState(false);
  const [render, setRender] = useState(true);
  const [secondCheck, setSecondCheck] = useState(false);
  const [toogleView, setToogleView] = useState(false);
  const [num, setNum] = useState(1);
  const [tax, setTax] = useState(0);
  const [opData, setOpData] = useState();
  const location = useLocation();
  const inputRef = useRef(null);
  const [pdata,setPData]=useState();
  const [op,setOp]=useState()
  const [selectedPatient, setSelectedPatient] = useState(
    location?.state?.id ? location?.state?.id : ""
  );
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const navigate = useNavigate();
  const modal = document.getElementById("exampleModal");
  const FIRST_DISCOUNT = 19;
  const SECOND_DISCOUNT = 30;
  const mystyle = {
    padding: ".1rem 1.5rem",
  };
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const getAllPatientDetails = async () => {
    try {
      const res = await getAllPatientsDetails();
      if (res.status === 200 || res.status === 201) {
        setPatientList(res?.data?.allPatients);
        managePatients(res?.data?.allPatients)
      }
    } catch (err) {
      console.log(err);
    }
  };
  const managePatients = (data) => {
    console.log(data, "data");
    let d = [];
    data?.map((v) => {
      d.push({ label: v.firstName + " " + v.lastName, value: v._id });
    });
    setOp(d);
  };
  const getPatientDetails = async (id) => {
    try {
      const res = await getSinglePatientDetailsById(id);
      if (res.status === 200 || res.status === 201) {
        setPatientData(res?.data?.patient);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const filterServices = (data) => {
    const categories = data
      ?.map((v) => v?.categoryId._id)
      .filter((v, i, a) => a.indexOf(v) === i);
    const newArray = categories?.map((c) => ({
      categoryId: c,
      label: data.find((d) => d.categoryId._id === c).categoryId.name,
      options: data
        .filter((d) => d.categoryId._id === c)
        .map((a) => ({
          // ...a,
          label: a.serviceName,
          value: a._id,
        })),
    }));

    setOpData(newArray);
  };

  const handleServiceChange = async (e) => {
    console.log(e?.value, "SADFDSFDSF");
    setServiceId(e);
    setErrorMsg("")
  };

  const handleSelectChange = (e) => {
    setSelectedPatient(e.target.value);
    getPatientDetails(e.target.value);
  };

  const getAllServices = async () => {
    try {
      const res = await getServiceApi();
      if (res.status === 200 || res.status === 201) {
        setAllServices(res?.data?.allServices);
        filterServices(res?.data?.allServices);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handlePChange=(e)=>{
    setPData(e);
    setSelectedPatient(e.value);
  }
  console.log(patinetData, "billingsadfdsa");
  const getServiceList = (data) => {
    let d = data
      .map((v) => {
        return v.serviceName;
      })
      .join(" , ");
    return d;
  };
  const handleServiceClick = async () => {
    if (serviceId?.value) {
      try {
        const res = await getServiceByIdApi(serviceId?.value);
        console.log(res,"rsonodsfiasdfposdauf")
        if (res.status === 200 || res.status === 201) {
          setServiceData([
            ...serviceData,
            {
              serviceName: res?.data?.service?.serviceName,
              amount: res?.data?.service?.amount,
              data: res?.data?.service,
              serviceAmount: getServiceAmount(res?.data?.service?.text , res.data.service.amount)
            },
          ]);
          // inputRef.current.value = null;
          setServiceId("");
          setFirstCheck(false);
          setSecondCheck(false);
          setDiscount("");
          setErrorMsg("")
          modal.click();
        }
      } catch (err) {
        console.log(err);
      }
    }else{
      setErrorMsg("Please select service")
    }
  };

  const handleFormView = () => {
    setToogleView(true);
  };
  console.log(serviceData,"servieceDAta")

  const handleCancelBill = () => {
    setToogleView(false);
    setServiceData([]);
  };
  const handleRemoveData = (id) => {
    serviceData?.splice(id, 1);
    setGrandTotal(getTotalAmount());
    // setTax("");
    setFirstCheck(false);
    setSecondCheck(false);
    setDiscount("");
    setRender(!render);
  };
  const getTotalAmount = () => {
    let sum = 0;
    // serviceData?.filter((v)=>v.)
    console.log(serviceData,"sevidata")
    // let totalamount= getServiceAmount(serviceData)
    for (let i = 0; i < serviceData?.length; i++) {
      sum = parseFloat(sum) + parseFloat(getServiceAmount(serviceData[i].data.text,serviceData[i].amount));
    }
    // console.log(sum,"SUMMMMMMMMMMM")
    return sum.toFixed(2);
  };

  const handleFirstDiscount = ({ target }) => {
    const { value, checked } = target;
    if (value == 30) {
      setFirstCheck(false);
      setSecondCheck(!secondCheck);
    } else {
      setSecondCheck(false);
      setFirstCheck(!firstCheck);
    }
    if (checked) {
      let totalPercnet = (parseFloat(getTotalAmount()) * value) / 100;
      // let taxx = (getTotalAmount() * tax) / 100;
      setGrandTotal(
        (
          parseFloat(getTotalAmount()) -
          parseFloat(totalPercnet) 
        ).toFixed(2)
      );
      setDiscount(value);
    } else {
      setGrandTotal(getTotalAmount());
      setDiscount("");
    }
  };

  const handleBilling = async () => {
    let data = {
      patientId: selectedPatient,
      totalAmount: getTotalAmount(),
      discountApplied: discount,
      billAmount: grandTotal,
      orderJson: serviceData,
      paymentMode: paymentMode,
    };
    try {
      const res = await createBillApi(data);
      if (res.status === 200 || res.status === 201) {
        toast.success(res.data.message);
        setBillId(res?.data?.patientBilling?._id);
        getAllBillingDetails(selectedPatient);
        setToogleView(false);
        setFirstCheck(false);
        setSecondCheck(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleListData = () => {
    if (num === 1) {
      setNum(billingData?.length);
    } else {
      setNum(1);
    }
  };
  const getAllBillingDetails = async (id) => {
    try {
      const res = await getBillingListApi(id);
      if (res.status === 200 || res.status === 201) {
        setBillingData(res?.data?.allBillingData);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getServiceAmount =(tax,amount)=>{
    console.log(tax,amount,"SDFASRTDGFHFSDFSFDFGFDG")
    let percent = tax?.reduce((sum, person) => parseInt(sum) + parseInt(person.value), 0);
    console.log(percent,"percentttt")
    let total = amount * percent /100 ;
    return parseInt(total) + parseInt(amount) 
  }
  // const handleTax = (e) => {
  //   setTax(e.target.value);
  //   let d = (getTotalAmount() * e.target.value) / 100;
  //   setGrandTotal((parseFloat(grandTotal) + parseFloat(d)).toFixed(2));
  // };
  // const handleTax = (e) => {
  //   if (e.target.value === "") {

  //     // setGrandTotal(parseFloat(discount)-parseFloat(getTotalAmount()))
  //     setGrandTotal((e)=>{
  //       setGrandTotal(e-tax);
  //       setTax("");
  //     })
  //   }
  //   else{
  //     setTax(e.target.value);
  //     console.log(e.target.value);
  //     let d = (getTotalAmount() * e.target.value) / 100;
  //     setGrandTotal((parseFloat(grandTotal) + parseFloat(d)).toFixed(2));
  //   }

  // };

  const handleSendEmail = async () => {
    if (singleBillData && patinetData) {
      const res = await sendEmailApi(singleBillData._id, patinetData.email);
      if (res.status === 200 || res.status === 201) {
        toast.success(res.data.message);
      }
    }
  };
  const getBillInfo = async (id) => {
    try {
      const res = await getBillInfoByIdApi(id);
      if (res.status === 200 || res.status === 201) {
        setSingleBillData(res?.data?.patientBilling);
      }
    } catch (err) {}
  };
  useEffect(() => {
    scrollToBottom();
  }, [toogleView]);
  useEffect(() => {
    setGrandTotal(getTotalAmount());
  }, [serviceData]);

  useEffect(() => {
    getBillInfo(billId);
  }, [billId]);

  useEffect(() => {
    getAllPatientDetails();
    getAllServices();
  }, []);
  useEffect(() => {
    if (selectedPatient) {
      getPatientDetails(selectedPatient);
      getAllBillingDetails(selectedPatient);
    }
  }, [selectedPatient]);
  return (
    <>
      <div className="container-fluid mt-6">
        <div className="card">
          <div className="row card-header card-p align-items-center">
            {patinetData ? (
              <>
                {" "}
                <div className="col-md-3">
                  <div
                    className="avatar avatar-sm rounded-circle text-white me-3"
                    style={{ width: "20px", height: "20px" }}
                  >
                    <img
                      alt="..."
                      src="/static/media/img-profile.00fa072a3afa1895a513.jpg"
                      width="20"
                    />
                  </div>
                  <span>
                    {patinetData?.salutation +
                      " " +
                      patinetData?.firstName +
                      " " +
                      patinetData?.lastName}
                  </span>
                </div>
                <div className="col-md-3">
                  <p>
                    Patient Id:&nbsp;
                    <span className="copy-text">
                      {patinetData?.fileNo}{" "}
                      <i
                        title="copy"
                        className="fa-solid fa-copy ms-1"
                        style={{ color: "lightslategray", cursor: "pointer" }}
                        onClick={() =>
                          copy(patinetData?.fileNo) &&
                          toast.success("Copied", { id: "0001" })
                        }
                      ></i>
                    </span>
                  </p>
                </div>
                <div className="col-md-3">
                  <p>
                    D.O.B.:{" "}
                    <span>
                      {" "}
                      {moment(patinetData?.dob).format("DD/MM/YYYY")}
                    </span>
                  </p>
                </div>
                <div className="col-md-3">
                  <select
                    className="form-select"
                    value={selectedPatient || patinetData?._id}
                    onChange={handleSelectChange}
                    aria-label="Default select example"
                  >
                    <option value="" hidden>
                      Select Patient
                    </option>
                    {patientList?.length &&
                      patientList?.map((v) => {
                        return (
                          <option value={v._id}>Patient: {v?.fileNo}</option>
                        );
                      })}
                  </select>
                </div>
              </>
            ) : (
              <div className="col-md-12">
                <Select 
              value={pdata}
              selected={pdata}
              onChange={handlePChange}
              isSearchable={true}
              // className="form-select"
              options={op}
              
              />
                {/* <select
                  className="form-select"
                  value={selectedPatient}
                  onChange={handleSelectChange}
                  aria-label="Default select example"
                >
                  <option value="" hidden>
                    Select Patient
                  </option>
                  {patientList?.length &&
                    patientList?.map((v) => {
                      return (
                        <option value={v._id}>Patient: {v?.fileNo}</option>
                      );
                    })}
                </select> */}
              </div>
            )}
          </div>
        </div>
        {selectedPatient && (
          <>
            {Boolean(billingData?.length) && (
              <div className="card mt-5 table-responsive-md">
                <div className="row card-header">
                  <div className="table-responsive">
                    <table className="table table-nowrap">
                      <tbody className="position-relative">
                        <tr>
                          <th>S.No</th>
                          <th>Date</th>
                          <th>Services</th>
                          {/* <th>Status</th> */}
                          <th>Amount</th>
                          <th></th>
                        </tr>
                        {Boolean(billingData?.length) &&
                          billingData?.slice(0, num)?.map((v, i) => {
                            return (
                              <tr>
                                <td>{i + 1} </td>
                                <td>
                                  {v.createdAt
                                    ?.split("T")[0]
                                    ?.split("-")
                                    .reverse()
                                    .join("/")}
                                </td>
                                <td>{getServiceList(v?.orderJson)}</td>
                                <td>
                                  <i class="bi bi-currency-euro"></i>
                                  {v.billAmount}
                                </td>
                                <td>
                                  <button
                                    className="btn btn-sm btn-primary"
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModalInvoice"
                                    onClick={() => setBillId(v._id)}
                                  >
                                    View
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        <span
                          className="position-absolute right-0"
                          onClick={handleListData}
                          style={{ top: "75px", right: "0", cursor: "pointer" }}
                        >
                          <i
                            className={
                              num > 1
                                ? "bi bi-dash-circle-dotted"
                                : "bi bi-plus-circle-dotted"
                            }
                            style={{ borderBottom: "none" }}
                          ></i>
                        </span>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
            <div className="row">
              <div className="col-lg-12 d-flex justify-content-end">
                {!toogleView && (
                  <button
                    className="btn btn-sm btn-primary mt-5"
                    onClick={handleFormView}
                  >
                    GENERATE BILL
                  </button>
                )}
              </div>
            </div>

            {toogleView && (
              <>
                <div className="text-end mt-5">
                  <button
                    className="btn btn-primary btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    <span>
                      <i className="bi bi-plus-square-dotted me-2"></i>Add
                      Service
                    </span>
                  </button>
                </div>
                <div className="card mt-5">
                  <div className="card">
                    <div className="col-lg-12">
                      <div
                        className="table-responsive"
                        style={{ overflow: "initial" }}
                      >
                        <table className="table table-bordered">
                          <thead className="table-light">
                            <tr>
                              <th>S.No.</th>
                              <th colspan="3">Services Rendered</th>
                              <th>Price(<i class="bi bi-currency-euro"></i>)</th>
                              <th>Tax%</th>
                              <th>Amount(<i class="bi bi-currency-euro"></i>)</th>
                              <th></th>
                            </tr>
                            {Boolean(serviceData?.length) ? (
                              serviceData?.map((v, i) => {
                                return (
                                  <tr style={{ verticalAlign: "top" }}>
                                    <td>{i + 1}</td>
                                    <td colspan="3" className="wrappp">
                                      <h5>{v.serviceName}</h5>
                                      <p></p>
                                      <div>
                                        <p>{v.data.serviceDescp}</p>
                                      </div>
                                    </td>
                                    <td><input
                                        type="number"
                                        name=""
                                        value={v.amount}
                                        disabled
                                        id=""
                                        placeholder="0.00"
                                      /></td>
                                      <td>
                                        {
                                          Boolean(v?.data?.text?.length) ? 
                                          v?.data?.text?.map((v)=>{
                                            return (
                                              <>
                                              <span>{v.name}</span> - <span>{v.value} <br/></span>
                                              </>
                                            )
                                          }):"-"
                                        }
                                      </td>
                                    <td>
                                      {getServiceAmount(v?.data?.text , v.amount)}
                                    </td>

                                    <td>
                                      <i
                                        onClick={() => handleRemoveData(i)}
                                        className="fa-sharp fa-solid fa-circle-xmark"
                                      ></i>
                                    </td>
                                  </tr>
                                );
                              })
                            ) : (
                              <tr align="center">
                                <td colspan="8">
                                  {" "}
                                  <h5> No record found!</h5>
                                </td>{" "}
                              </tr>
                            )}
                          </thead>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mt-5">
                  <div className="col-lg-12">
                    <h5>
                      <u>Discount:</u>
                    </h5>
                    <div className="form-check ms-5 mt-2">
                      <input
                        className="form-check-input"
                        onClick={handleFirstDiscount}
                        type="checkbox"
                        value={FIRST_DISCOUNT}
                        id="flexCheckDefault"
                        checked={firstCheck}
                        disabled={Boolean(!serviceData?.length)}
                      />
                      <label
                        className="form-check-label"
                        for="flexCheckDefault"
                      >
                        Police/Student Discount 19%
                      </label>
                    </div>
                    <div className="form-check ms-5">
                      <input
                        className="form-check-input"
                        onClick={handleFirstDiscount}
                        type="checkbox"
                        value={SECOND_DISCOUNT}
                        id="flexCheckChecked"
                        checked={secondCheck}
                        disabled={Boolean(!serviceData?.length)}
                      />
                      <label
                        className="form-check-label"
                        for="flexCheckChecked"
                      >
                        Professional Courtesy Discount 30% MD, DO, RN, EMT, KO,
                        Zahnarzt
                      </label>
                    </div>
                  </div>
                  {/* <div className="row mt-5">
                    <h5>
                      <u>Tax:</u>
                    </h5>
                    <div className="form-check ms-5 mt-2">
                      <select
                        className=""
                        value={tax} 
                        onChange={handleTax}
                        // onClick={handleFirstDiscount}
                        // type="checkbox"
                        // value={FIRST_DISCOUNT}
                        // id="flexCheckDefault"
                        // checked={firstCheck}
                        disabled={Boolean(!serviceData?.length)}
                      >
                        <option value="0">Select</option>
                        <option value="5">UST</option>
                        <option value="10">VAT</option>
                      </select>
                      </div>
                  </div> */}
                </div>
                <table className="table table-borderless bg-white mt-4 tb_td">
                  <tbody>
                    <tr className="mt-3">
                      <th colspan="3" style={{ width: "50%" }}></th>
                      <th>Total Price</th>
                      <th>Total Discount</th>
                      {/* <th>Total Tax</th> */}
                      <th>Total Due Amount</th>
                    </tr>
                    <tr>
                      <td colspan="3" style={{ width: "50%" }}></td>
                      <td><i class="bi bi-currency-euro"></i>{getTotalAmount()}</td>
                      <td>{discount ? discount + "%" : "-"}</td>
                      {/* <td>{tax ? tax + "%" : "-"}</td> */}
                      <td><i class="bi bi-currency-euro"></i>{grandTotal}</td>
                    </tr>
                    <tr>
                      <td colspan="3" style={{ width: "50%" }}></td>
                      <td></td>
                      <td>{/* <a href="">+Add</a> */}</td>
                      <td>{/* <a href="">+Add</a> */}</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td colspan="3" style={{ width: "50%" }}></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>Grand Total</td>
                    </tr>
                    <tr>
                      <td colspan="3" style={{ width: "50%" }}></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>
                        <b><i class="bi bi-currency-euro"></i>{grandTotal}</b>
                      </td>
                    </tr>
                  </tbody>
                </table>
                {console.log(Boolean(!serviceData?.length), "servie data")}
                <div className="col text-end mb-5 mt-5">
                  <button
                    name=""
                    id=""
                    disabled={Boolean(!serviceData?.length)}
                    onClick={handleBilling}
                    className="btn btn-primary btn-sm me-2"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModalInvoice"
                    role="button"
                  >
                    Submit
                  </button>
                  <a
                    name=""
                    id=""
                    className="btn btn-default btn-sm"
                    href="#"
                    role="button"
                    onClick={handleCancelBill}
                  >
                    Cancel
                  </a>
                </div>
              </>
            )}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>
      {/* Service Modal */}
      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body pb-0">
              {/* <select
                className="form-select"
                value={serviceId}
                onChange={handleServiceChange}
                id=""
                placeholder="Add services"
              >
                <option value="">Select</option>
                {Boolean(allServices?.length) &&
                  allServices?.map((v) => {
                    return <option value={v?._id}>{v?.serviceName}</option>;
                  })}
              </select> */}

              <Select
                // isMulti
                name="serviceType"
                options={opData}
                ref={inputRef}
                value={serviceId}
                onChange={handleServiceChange}
                // isClearable={true}
                placeholder="select"
                isOptionDisabled={(option) => option.disabled}
              />
              <span className="text-danger">{errorMsg}</span>
            </div>
            <div className="modal-footer d-block text-end">
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleServiceClick}
                className="btn btn-primary btn-sm"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Invoice popup modal code start here  */}
      <div
        className="modal fade"
        id="exampleModalInvoice"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header pt-2 pe-4 ps-4">
              <h3 className="modal-title fs-5" id="exampleModalLabel">
                INVOICE
              </h3>
              {console.log(singleBillData, "SDFADSFDSFDSFDASFDSFSDA")}
              <a
                className="btn btn-sm btn-neutral"
                style={{ position: "absolute", right: "60px" }}
                title="Download"
                href={`${API_BASE_URL}/common/pdf/patient/billing?id=${singleBillData?._id}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-download"
                  viewBox="0 0 16 16"
                >
                  <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                  <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                </svg>
              </a>
              <p
                className="btn btn-sm btn-neutral"
                style={{
                  position: "absolute",
                  right: "120px",
                  cursor: "pointer",
                }}
                onClick={handlePrint}
              >
                Print
              </p>

              <p
                onClick={handleSendEmail}
                // href={`${API_BASE_URL}/common/pdf/patient/billing?id=${singleBillData?._id}&email=${patinetData?.email}`}
                className="btn btn-sm btn-neutral"
                style={{
                  position: "absolute",
                  right: "198px",
                  cursor: "pointer",
                }}
              >
                Send to Email
              </p>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setServiceData([])}
              ></button>
            </div>
            <hr />
            <div className="modal-body pt-0 print-t" ref={componentRef}>
              <div className="d-flex justify-content-between">
                {console.log(patinetData, "paisdfjdskfjdfi")}
                <h5>
                  Patient Id: <span>{patinetData?.fileNo}</span>
                </h5>
                <h5>
                  {console.log(singleBillData, "SDFRSEDGDFYHSERDGCSEATFDG")}
                  Date of bill:{" "}
                  <span>
                    {Boolean(singleBillData?.length)
                      ? singleBillData?.createdAt
                          ?.split("T")[0]
                          ?.split("-")
                          ?.reverse()
                          .join("/")
                      : moment(billingData[0]?.createdAt).format("DD/MM/YYYY")}
                  </span>
                </h5>
              </div>

              <table className="table table-borderless border border-light-subtle mt-3">
                <tbody>
                  <tr>
                    <th
                      style={{
                        textDecoration: "underline",
                        width: "22%",
                        paddingBottom: "0.2rem",
                      }}
                    >
                      <h6>Patient Details: </h6>
                    </th>
                    <td></td>
                  </tr>
                  <tr>
                    <th style={mystyle}>Name: </th>
                    <td style={mystyle}>
                      {patinetData?.salutation +
                        " " +
                        patinetData?.firstName +
                        " " +
                        patinetData?.lastName}
                    </td>
                  </tr>
                  <tr>
                    <th style={mystyle}>Date of Birth:</th>
                    <td style={mystyle}>
                      {patinetData?.dob?.split("-").reverse().join("/")}
                    </td>
                  </tr>
                  <tr>
                    <th style={mystyle}>Gender:</th>
                    <td style={mystyle}>{patinetData?.gender}</td>
                  </tr>
                  <tr>
                    <th style={mystyle}>Email:</th>
                    <td style={mystyle}>{patinetData?.email?.toLowerCase()}</td>
                  </tr>
                  <tr>
                    <th style={mystyle}>Phone:</th>
                    <td style={mystyle}>{patinetData?.contactNo}</td>
                  </tr>
                  <tr>
                    <th className="pb-4" style={mystyle}>
                      Address:
                    </th>
                    <td className="white-space pb-4" style={mystyle}>
                      {patinetData?.address +
                        " " +
                        patinetData?.city +
                        " " +
                        (patinetData?.zipCode ? patinetData?.zipCode : "")}
                    </td>
                  </tr>
                </tbody>
              </table>
              <table className="table mt-4">
                <thead className="table-light">
                  <tr>
                    <th scope="col">S.No.</th>
                    <th scope="col">Service Rendered</th>
                    <th scope="col"><i class="bi bi-currency-euro"></i>Price</th>
                    <th scope="col">Tax %</th>
                    <th scope="col" style={{ textAlign: "end" }}>
                    <i class="bi bi-currency-euro"></i> Service Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Boolean(singleBillData?.orderJson?.length)
                    ? singleBillData?.orderJson?.map((v, i) => {
                      console.log(v,"DSAFDSFWEFDSFASF")
                        return (
                          <tr>
                            <th scope="row">{i + 1}</th>
                            <td>{v?.serviceName}</td>
                            <td>{v?.amount}</td>
                            <td>{v?.data?.text?.map((v)=>{
                              return (
                                <><p style={{paddingTop:"20px"}}>{v.name} - {v.value}</p><br/></>
                              )
                            })}</td>
                            <td style={{ textAlign: "end" }}>{getServiceAmount(v?.data?.text , v.amount)}</td>
                          </tr>
                        );
                      })
                    : serviceData?.map((v, i) => {
                        return (
                          <tr>
                            <th scope="row">{i + 1}</th>
                            <td>{v?.serviceName}</td>
                            <td>{v?.amount}</td>
                            <td>{v?.data?.text?.map((v)=>{
                              return (
                                <><p>{v.name} - {v.value}</p><br/></>
                              )
                            })}</td>
                            <td style={{ textAlign: "end" }}>{getServiceAmount(v?.data?.text , v.amount)}</td>
                          </tr>
                        );
                      })}
                </tbody>
              </table>
              {/* <hr /> */}

              <table className="table table-borderless mt-4">
                <tbody>
                  <tr>
                    <td style={{ textAlign: "end", ...mystyle }}></td>
                    <th style={{ textAlign: "end", ...mystyle }}>
                      Total Amount:
                    </th>
                    <td style={{ textAlign: "end", ...mystyle }}>
                    <i class="bi bi-currency-euro"></i>
                      {console.log(singleBillData,"bill data")}
                      {/* {
                          getServiceAmount(singleBillData?.orderJson?.map((v)=>v.data.text) , v.amount)
                      } */}
                      {singleBillData?.totalAmount
                        ? singleBillData?.totalAmount
                        : getTotalAmount()}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "end", ...mystyle }}></td>
                    <th style={{ textAlign: "end", ...mystyle }}>Discount:</th>
                    <td style={{ textAlign: "end", ...mystyle }}>
                      {singleBillData?.discountApplied
                        ? singleBillData?.discountApplied + "%"
                        : discount
                        ? discount + "%"
                        : "-"}
                    </td>
                  </tr>
                  {/* <tr>
                    <td style={{ textAlign: "end", ...mystyle }}></td>
                    <th style={{ textAlign: "end", ...mystyle }}>Tax:</th>
                    <td style={{ textAlign: "end", ...mystyle }}>
                      {tax ? tax + "%" : "-"}
                    </td>
                  </tr> */}
                </tbody>
              </table>
              <hr />
              <table className="table table-borderless mt-4">
                <tbody>
                  <tr>
                    <td style={{ width: "37%" }}></td>
                    <th
                      style={{
                        textAlign: "end",
                        ...mystyle,
                        backgroundColor: " #00000026",
                      }}
                    >
                      <h4>TOTAL PAYMENT</h4>
                    </th>
                    <td
                      style={{
                        textAlign: "end",
                        ...mystyle,
                        backgroundColor: " #00000026",
                      }}
                    >
                      <h4>
                      <i class="bi bi-currency-euro"></i>
                        {singleBillData?.billAmount
                          ? singleBillData?.billAmount
                          : grandTotal}
                      </h4>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* Invoice popup modal code end here  */}
    </>
  );
};
  

export default PatientsBilling;
