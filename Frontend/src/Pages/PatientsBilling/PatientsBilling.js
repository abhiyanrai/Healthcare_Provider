import React, { useContext, useRef, useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useReactToPrint } from "react-to-print";
import moment from "moment/moment";
import Select from "react-select";

import DropdownTreeSelect from "react-dropdown-tree-select";
import "react-dropdown-tree-select/dist/styles.css";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import {
  addWalletAmountApi,
  createBillApi,
  generateInvoiceNumberApi,
  getAllPatientsDetails,
  getBankDetailsApi,
  getBillInfoByIdApi,
  getBillingListApi,
  getClnicDetailsApi,
  getDiscountedDataApi,
  getPdfDownloadApi,
  getServiceApi,
  getServiceByIdApi,
  getSinglePatientDetailsById,
  getWalletDetailsByIdApi,
  sendEmailApi,
} from "../../Apis";
import { API_BASE_URL } from "../../utils/baseUrl";
import copy from "copy-to-clipboard";
import { WhiteLoader } from "../../Components/common/Errors/loader/WhiteLoader";
import { FIRST_DISCOUNT, SECOND_DISCOUNT } from "../../utils/baseUrl";
import AuthContext from "../../Components/context/AuthProvider";

const PatientsBilling = () => {
  const appContext = useContext(AuthContext);
  const { loggedInOwner, fetchCurrentAccountDetails } = appContext?.state;

  console.log(loggedInOwner, "SPOIOPOIOPPIUOOIU");
  const [patinetData, setPatientData] = useState();
  const [billingData, setBillingData] = useState([]);
  const [patientList, setPatientList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [allServices, setAllServices] = useState([]);
  const [billId, setBillId] = useState("");
  const [serviceId, setServiceId] = useState([]);
  const [serviceData, setServiceData] = useState([]);
  const [grandTotal, setGrandTotal] = useState("");
  const [discount, setDiscount] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [singleBillData, setSingleBillData] = useState("");
  const [firstCheck, setFirstCheck] = useState(false);
  const [render, setRender] = useState(true);
  const [secondCheck, setSecondCheck] = useState(false);
  const [toogleView, setToogleView] = useState(false);
  const [num, setNum] = useState(1);
  const [downloadLoader, setDownloadLoader] = useState(false);
  const [tax, setTax] = useState(0);
  const [opData, setOpData] = useState({});
  const [searchTerm,setSearchTerm]=useState();
  const location = useLocation();
  const [loader, setLoader] = useState(false);
  const inputRef = useRef(null);
  const [pdata, setPData] = useState();
  const [walletAmount, setWalletAmount] = useState(0);
  const [totalWalletAmount, setTotalWalletAmount] = useState(0);
  const [calculatedData, setCalculatedData] = useState();
  const [op, setOp] = useState();
  const [selectedPatient, setSelectedPatient] = useState(
    location?.state?.id ? location?.state?.id : ""
  );
  const [serviceDate, setServiceDate] = useState(
    new Date().toLocaleDateString()?.split("/").reverse()?.join("-")
  );
  const [paymentDetals, setPaymentDetails] = useState("");
  const componentRef = useRef();
  const [paidAmount, setPaidAmount] = useState();
  const [invoiceDetails, setInvoiceDetails] = useState({
    clinic: "",
    invoiceNum: "",
    isAccept: false,
  });
  const [serachResult,setSearchResults]=useState([]);
  const [footerDetails, setFooterDetails] = useState({
    bank: "",
    clinic: "",
  });
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const navigate = useNavigate();
  const modal = document.getElementById("exampleModal");

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
        managePatients(res?.data?.allPatients);
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

  const getDiscountForInvoice = (discount, totalAmount) => {
    if (!discount) return;
    // console.log(discount,"applied ")
    let totalPercnet = (parseFloat(totalAmount) * parseFloat(discount)) / 100;
    // console.log(getTotalAmount() ,totalPercnet ,"totaltoooper")
    return totalPercnet;
  };

  const getDiscountAmount = () => {
    if (!discount) return;

    let totalPercnet = (parseFloat(getTotalAmount()) * discount) / 100;
    return totalPercnet;
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
          label: a.serviceName,
          value: a._id,
          subService: a.subService,
        })),
    }));
    console.log(newArray, "newArray");

    let d = newArray?.map((v) => {
      return {
        label: v?.label,
        value: v?.categoryId,
        disabled: true,
        // isHeading: true,
        children: v?.options?.map((l) => {
          return {
            label: l.label,
            value: l.value,
            children: l?.subService?.map((v) => {
              return {
                label: "subservice",
                value: "",
              };
            }),
          };
        }),
      };
    });

    // setOpData(newArray);
    setOpData(d);
  };

  // const customItemRenderer = ({ item, select }) => {
  //   if (item.isHeading) {
  //     // Render headings as non-selectable elements
  //     return (
  //       <div style={{ fontWeight: 'bold', marginLeft: `${item.depth * 20}px` }}>
  //         {item.label}
  //       </div>
  //     );
  //   } else {
  //     // Render selectable items
  //     return (
  //       <div
  //         onClick={() => select(item.value)}
  //         style={{ cursor: 'pointer', marginLeft: `${item.depth * 20}px` }}
  //       >
  //         {item.label}
  //       </div>
  //     );
  //   }
  // };

  // const filterServices =(data)=>{
  //   console.log(data,"daalla");
  //   let d = data?.map((v)=>{
  //     console.log(v,"valueuleuue")
  //     return {
  //       label:v?.categoryId?.name,
  //       value:v?.categoryId?._id,
  //       children: data?.map((v)=>{
  //         return {
  //           label:v.serviceName,
  //           value:v._id,
  //           children:v?.subService?.map((v)=>{
  //             return {
  //               label:"subservice",
  //               value:""
  //             }
  //           })
  //         }
  //       })
  //     }
  //   })
  //   setOpData(d)
  //   console.log(d,"dyyydiid")
  // }

  const onChange = (currentNode, selectedNodes) => {
    console.log("onChange::", currentNode, selectedNodes);
  };
  const onAction = (node, action) => {
    console.log("onAction::", action, node);
  };
  const onNodeToggle = (currentNode) => {
    console.log("onNodeToggle::", currentNode);
  };

  const handleServiceChange = async (e) => {
    setServiceId(e);
    setErrorMsg("");
  };

  const handleSelectChange = (e) => {
    setSelectedPatient(e.target.value);
    getPatientDetails(e.target.value);
  };

  const handleGenerateInvoiceNumber = async () => {
    try {
      const res = await generateInvoiceNumberApi({
        invoiceNumber: invoiceDetails?.invoiceNum,
      });
      toast.success(res.data.messages);
      document.getElementById("exampleModaldiscount").click();
      fetchCurrentAccountDetails();
    } catch (err) {
      console.log(err);
    }
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

  console.log(allServices, "allSErveee");
  const handlePChange = (e) => {
    setPData(e);
    setSelectedPatient(e.value);
  };
  console.log(patinetData, "billingsadfdsa");
  const getServiceList = (data) => {
    console.log(data, "dataatatttawwwww");
    let d = data
      .map((v) => {
        return v.serviceName;
      })
      .join(" , ");
    return d;
  };
  const handleServiceClick = async (id) => {
    if (id) {
      try {
        const res = await getServiceByIdApi(id);
        console.log(res, "rsonodsfiasdfposdauf");
        if (res.status === 200 || res.status === 201) {
          setServiceData([
            ...serviceData,
            {
              serviceName: res?.data?.service?.serviceName,
              amount: res?.data?.service?.amount,
              data: res?.data?.service,
              serviceAmount: res?.data?.service?.amount,
            },
          ]);
          console.log(res?.data?.service,"")
          // inputRef.current.value = null;
          setServiceId("");
          setFirstCheck(false);
          setSecondCheck(false);
          setDiscount("");
          setErrorMsg("");
          modal.click();
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      setErrorMsg("Please select service");
    }
  };

  const handleFormView = () => {
    setToogleView(true);
  };
  console.log(serviceData, "servieceDAta");

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
    console.log(serviceData,"Serviiee")
    let sum = 0;
    // let totalamount = getServiceAmount(serviceData)
    for (let i = 0; i < serviceData?.length; i++) {
      sum =
        parseFloat(sum) +
        parseFloat(
          getServiceAmount(serviceData[i]?.data?.tax, serviceData[i].amount)
        );
    }
    console.log(sum,"SUSJSJSJ")
    return sum;
  };

  const getFormatAmount =(amount)=>{
    let d = amount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".").replace(/(\d)(?=(\d{3})+(?!\d)\.)/g, "$1,");
    console.log(d,"ammmmdooouu")
    return d
  }
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
        (parseFloat(getTotalAmount()) - parseFloat(totalPercnet)).toFixed(2)
      );
      setDiscount(value);
    } else {
      setGrandTotal(getTotalAmount());
      setDiscount("");
    }
  };

  // console.log(serviceData , "serivicceedAAtat")
  // let servicess = serviceData?.map((v)=>{
  //   return {"serviceId":v?.data?._id}
  // })
  // console.log(servicess ,"seriiivveerrr")
  const handleBilling = async () => {
    let servicess = serviceData?.map((v) => {
      return { serviceId: v?.data?._id };
    });

    let data = {
      patientId: selectedPatient,
      totalAmount: getTotalAmount(),
      discountApplied: discount,
      billAmount: grandTotal,
      orderJson: servicess,
      paymentMode: paymentMode,
      paymentDetails: paymentDetals,
      serviceDate: serviceDate,
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

  const getServiceAmount = (tax, amount) => {
    console.log(tax, amount, "SDFASRTDGFHFSDFSFDFGFDG");
    let percent = tax?.reduce(
      (sum, person) => parseInt(sum) + parseInt(person.value),
      0
    );
    console.log(percent, "percentttt");
    let total = (amount * percent) / 100;
    // return parseFloat(total) + parseFloat(amount);
    return  parseFloat(amount);
  };

  const handleWalletAmount = async () => {
    if (walletAmount) {
      let data = {
        patientId: selectedPatient,
        walletAmount: Number(walletAmount),
      };
      try {
        const res = await addWalletAmountApi(data);
        if (res.status === 200 || res.status === 201) {
          console.log(res);
          toast.success(res.data.message);
          getWalletDetailsByPatientId(selectedPatient);
          document.getElementById("exampleModalwallet").click();
          setWalletAmount(0);
        }
      } catch (er) {
        console.log(er);
      }
    }
  };

  const getWalletDetailsByPatientId = async (id) => {
    try {
      const res = await getWalletDetailsByIdApi(id);
      if (res.status === 200 || res.status === 201) {
        console.log(res);
        setTotalWalletAmount(getFormatAmount(res.data?.wallet?.walletAmount));
      }
    } catch (err) {
      console.log(err);
    }
  };

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

  const addDiscount = async () => {
    console.log(firstCheck, "firstcheck", secondCheck, "ADTA", serviceData);
    let data = {
      discountPercentage: firstCheck ? 19 : secondCheck ? 30 : "",
      servicesToBuy: serviceData?.map((v) => {
        return { serviceId: v.data._id };
      }),
    };
    console.log(data, "DDDDAADDDAADDDAADDD");
    if (firstCheck || secondCheck) {
      try {
        const res = await getDiscountedDataApi(data);
        console.log(res, "POIUIO");
        if (res.status === 200 || res.status === 201) {
          setCalculatedData(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      setCalculatedData();
    }
  };

  const filterServicesByName = (serviceName) => {
    return allServices.filter((service) =>
      service.serviceName.toLowerCase().includes(serviceName.toLowerCase())
    );
  };

  const handleSearch =(e)=>{
    console.log(e,"Ever",allServices);
    const inputValue = e.target.value;
    setSearchTerm(inputValue);

    if (inputValue.trim() === '') {
      setSearchResults([]);
    } else {
      const results = filterServicesByName(inputValue);
      setSearchResults(results);
    }

  }


  const handleDownloadLoader = () => {
    setDownloadLoader(true);
    setTimeout(() => {
      setDownloadLoader(false);
    }, 2000);
  };

  const handleSendEmail = async () => {
    if (singleBillData && patinetData) {
      setLoader(true);
      try {
        const res = await sendEmailApi(singleBillData._id, patinetData.email);
        if (res.status === 200 || res.status === 201) {
          toast.success(res.data.message);
          setLoader(false);
        }
      } catch (err) {
        toast.err("Something went wrong !");
        setLoader(false);
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

  const getBankDetails = async () => {
    try {
      const res = await getBankDetailsApi();
      if (res.status === 200 || res.status === 201) {
        setFooterDetails({ ...footerDetails, bank: res?.data?.bank });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getClinicDetails = async () => {
    try {
      const res = await getClnicDetailsApi();
      console.log(res, "rjsponie");
      if (res.status === 200 || res.status === 201) {
        setFooterDetails({ ...footerDetails, clinic: res.data.clinic });
      }
    } catch (err) {
      console.log(err);
    }
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
    getBankDetails();
    getClinicDetails();
  }, []);
  useEffect(() => {
    if (selectedPatient) {
      getPatientDetails(selectedPatient);
      getAllBillingDetails(selectedPatient);
      getWalletDetailsByPatientId(selectedPatient);
    }
  }, [selectedPatient]);

  useEffect(() => {
    addDiscount();
  }, [firstCheck, secondCheck]);
  return (
    <>
      <div className="container-fluid mt-6">
        <div className="card">
          <div className="row card-header card-p align-items-center">
            {patinetData ? (
              <>
                {" "}
                <div className="col-xl col-lg-6 d-flex">
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
                <div className="col-xl col-lg-6">
                  <p style={{ whiteSpace: "nowrap" }}>
                    Patient Id:&nbsp;
                    <span>
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
                <div className="col-xl col-lg-6">
                  <p>
                    D.O.B.:{" "}
                    <span>
                      {" "}
                      {moment(patinetData?.dob).format("DD/MM/YYYY")}
                    </span>
                  </p>
                </div>
                <div className="col-xl col-lg-6">
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
                <div className="mt-5 d-flex flex-wrap justify-content-between align-items-center">
                  <span style={{ float: "left" }}>
                    <span
                      className="text-primary me-3"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModalwallethistory"
                    >
                      <b style={{ cursor: "pointer" }}>
                        <u>Wallet History</u>
                      </b>
                    </span>
                    <b>Wallet : </b>
                    <input
                      style={{
                        width: "20%",
                        fontWeight: "bold",
                        color: `${totalWalletAmount < 1 ? "red" : "green"}`,
                      }}
                      type="text"
                      value={totalWalletAmount ? totalWalletAmount : "0"}
                      disabled
                      className="me-3"
                    />
                    <svg
                      style={{ cursor: "pointer" }}
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModalwallet"
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="#0967ae"
                      class="bi bi-plus-circle-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                    </svg>
                  </span>
                  <span className="d-flex align-items-baseline">
                    <div>
                      <b>Service Date : </b>
                    </div>
                    <div>
                      <input
                        className="form-control w-auto ms-2"
                        type="date"
                        value={serviceDate}
                        onChange={(e) => setServiceDate(e.target.value)}
                      />
                    </div>
                    <div>
                      <button
                        className="btn btn-primary btn-sm ms-3"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                      >
                        <span>
                          <i className="bi bi-plus-square-dotted me-2"></i>Add
                          Service
                        </span>
                      </button>
                    </div>
                  </span>
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
                              <th>
                                Price(<i class="bi bi-currency-euro"></i>)
                              </th>
                              <th>Tax%</th>
                              <th>
                                Amount(<i class="bi bi-currency-euro"></i>)
                              </th>
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
                                    <td>
                                      <p> {getFormatAmount(v.amount)} </p>
                                      {/* <input
                                        type="number"
                                        name=""
                                        value={getFormatAmount(v.amount)}
                                        disabled
                                        id=""
                                        placeholder="0.00"
                                      /> */}
                                    </td>
                                    <td>
                                      {Boolean(v?.data?.text?.length)
                                        ? v?.data?.text?.map((v) => {
                                            return (
                                              <>
                                                <span>
                                                  {v.name ? v.name : ""}
                                                </span>{" "}
                                                -{" "}
                                                <span>
                                                  {v.value !== 0 ? v.value : ""}{" "}
                                                  <br />
                                                </span>
                                              </>
                                            );
                                          })
                                        : "-"}
                                    </td>
                                    <td>{getFormatAmount(v?.serviceAmount)}</td>

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
                      <td>
                        {console.log(calculatedData, "calculatedData")}
                        <i class="bi bi-currency-euro"></i>
                        {/* {getTotalAmount()} */}
                        {calculatedData
                          ? getFormatAmount(calculatedData?.totalAmount)
                          : getFormatAmount(getTotalAmount())}
                      </td>
                      {/* <td>{  discount ? discount + "%" : "-"}</td> */}
                      <td>
                        {/* {getDiscountAmount()} */}
                        {calculatedData
                          ? getFormatAmount(calculatedData?.discountAmount)
                          : "-"}
                      </td>
                      {/* <td>{tax ? tax + "%" : "-"}</td> */}
                      <td>
                        <i class="bi bi-currency-euro"></i>
                        {/* {grandTotal}
                         */}
                         {console.log(calculatedData , "caluecajated",grandTotal)}
                        {calculatedData
                          ? getFormatAmount(calculatedData?.billAmount)
                          : getFormatAmount(grandTotal)}
                      </td>
                    </tr>
                    <tr>
                      <td colspan="3" style={{ width: "50%" }}></td>
                      <td></td>
                      <td>{/* <a href="">+Add</a> */}</td>
                      <td>{/* <a href="">+Add</a> */}</td>
                      <td></td>
                    </tr>
                    {/* <tr>
                      <td colspan="3" style={{ width: "50%" }}></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>Grand Total</td>
                    </tr> */}
                    {/* <tr>
                      <td colspan="3" style={{ width: "50%" }}></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>
                        <b>
                          <i class="bi bi-currency-euro"></i>
                          {grandTotal}
                        </b>
                      </td>
                    </tr> */}
                  </tbody>
                </table>
                {/* <table className="table table-borderless bg-white mt-4 mb-4 tb_td">
                  <tbody>
                    <tr>
                      <th>Pay Now</th>
                      <th>Payment Mode</th>
                      <th>Payment Detials</th>
                    </tr>
                    <tr>
                      <td>
                        <div
                          class="input-group mb-3 i-mb-0"
                          style={{
                            border: "1px solid #ccc",
                            width: "fit-content",
                            boxShadow: "none",
                            borderRadius: "none",
                          }}
                        >
                          <span
                            class="input-group-text pt-1 pb-1"
                            id="basic-addon1"
                          >
                            USD
                          </span>
                          <input
                            type="text"
                            class=""
                            placeholder="Enter amount"
                            aria-label=""
                            aria-describedby="basic-addon1"
                            onChange={(e) => setPaidAmount(e.target.value)}
                            value={paidAmount}
                          />
                        </div>
                      </td>
                      <td>
                        <select
                          className="pt-1 pb-1"
                          name=""
                          value={paymentMode}
                          onChange={(e) => setPaymentMode(e.target.value)}
                          id=""
                          style={{ width: "fit-content" }}
                        >
                          <option value="Cash">Cash</option>
                          <option value="Online">Online</option>
                          <option value="UPI">UPI</option>
                        </select>
                      </td>
                      <td>
                        <input
                          className="i-mb-0"
                          style={{ border: "1px solid #ccc", padding: "5px" }}
                          type="text"
                          name=""
                          id=""
                          value={paymentDetals}
                          onChange={(e) => setPaymentDetails(e.target.value)}
                          placeholder="Enter Details"
                        />
                      </td>
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
                        <b>
                          <i class="bi bi-currency-euro"></i>
                          {grandTotal}
                        </b>
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>
                        <i class="fa-solid fa-clock"></i>{" "}
                        <span>26 Dec, 23 - 12:32 pm</span>
                      </td>
                      <td></td>
                      <td>
                        <span className="billing-full-paid">Full Paid</span>
                      </td>
                    </tr>
                  </tbody>
                </table> */}

                <div className="col text-end mb-5 mt-5">
                  <button
                    name=""
                    id=""
                    disabled={Boolean(!serviceData?.length)}
                    data-bs-toggle="modal"
                    data-bs-target={
                      loggedInOwner?.invoiceStartingNumber
                        ? "#exampleModalInvoice"
                        : "#exampleModaldiscount"
                    }
                    role="button"
                    onClick={
                      loggedInOwner?.invoiceStartingNumber && handleBilling
                    }
                    className="btn btn-primary btn-sm me-2"
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
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body pb-0">
            <div className="d-flex card-header border-bottom">
          <div className="ms-auto text-end">
            {/* <SearchFilter startLength={15} filterData={providerDatas} /> */}

            <div className="d-flex ">
              <div className="input-group input-group-sm input-group-inline me-3">
                <span className="input-group-text pe-2">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search"
                  aria-label="Search"
                  onChange={handleSearch}
                />
              </div>
           
            </div>
          </div>
        </div>
              <div className="table-responsive">
                <table className="table table-hover table-nowrap ">
                  <thead className="table-light text-start">
                    <tr>
                      <th className="col-1">S.No</th>
                      <th className="col-2">Service</th>
                      <th className="col-2">Price</th>
                      <th className="col-2">Tax</th>
                      {/* <th className="col-2">Amount</th> */}
                      <th className="col-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>

                    {
                      searchTerm && Boolean(!serachResult?.length) ? <tr align="center">
                      <td colspan="8">
                        {" "}
                        <h6>No Data Found!</h6>
                      </td>{" "}
                    </tr>: <>{Boolean(allServices?.length) &&
                        (Boolean(serachResult?.length) ? serachResult : allServices)?.map((v, index) => {
                          return (
                            <tr className="text-start">
                              <td>
                                <span className="text-heading">{index + 1}</span>
                              </td>
                              <td>
                                <span className="text-heading">
                                  {v?.serviceName}
                                </span>
                              </td>
                              <td>
                                <span className="text-heading">{getFormatAmount(v?.amount)}</span>
                              </td>
                              <td>
                                <span className="text-heading">
                                 -
                                </span>
                              </td>
                              <td>
                                <span className="text-heading">
                                  <button
                                    type="button"
                                    onClick={()=>handleServiceClick(v?._id)}
                                    className="btn btn-primary btn-sm"
                                  >
                                    Add
                                  </button>
                                </span>
                              </td>
                            </tr>
                          );
                        })}</>
                    }

                    
                  </tbody>
                </table>
              </div>

              {/* <DropdownTreeSelect
                data={opData}
                onChange={onChange}
                onAction={onAction}
                onNodeToggle={onNodeToggle}
                keepTreeOnSearch={true}
                // mode="multiSelect"
                texts={{ placeholder: 'Select Service ' }}
                mode="hierarchical"
                // keepOpenOnSelect={true}
                // itemRenderer={customItemRenderer}
                // inlineSearchInput={true}
              /> */}

              {/* <Select
                // isMulti
                name="serviceType"
                options={opData}
                ref={inputRef}
                value={serviceId}
                onChange={handleServiceChange}
                // isClearable={true}
                placeholder="select"
                isOptionDisabled={(option) => option.disabled}
              /> */}
              {/* <span className="text-danger">{errorMsg}</span> */}
            </div>
            <div className="modal-footer d-block text-end">
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                data-bs-dismiss="modal"
              >
                Cancel
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
              <h4 className="modal-title fs-5" id="exampleModalLabel">
                INVOICE
              </h4>
              {console.log(singleBillData, "SDFADSFDSFDSFDASFDSFSDA")}
              <a
                className="btn btn-sm btn-neutral"
                style={{ position: "absolute", right: "60px" }}
                title="Download"
                onClick={handleDownloadLoader}
                href={`${API_BASE_URL}/common/pdf/patient/billing?id=${singleBillData?._id}`}
              >
                {downloadLoader ? (
                  <WhiteLoader color="black" />
                ) : (
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
                )}
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
                {loader ? <WhiteLoader color="black" /> : "Send to Email"}
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
              <h5>Patient Details: </h5>
              {/* <div className="d-flex justify-content-between">
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
              </div> */}
              <div className="d-flex overflow-auto border border-light-subtle">
                <div className="col-md-6">
                  <table className="table table-borderless mt-3">
                    <tbody>
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
                        <th style={mystyle}>D.O.B.:</th>
                        <td style={mystyle}>
                          {patinetData?.dob?.split("-")?.reverse()?.join("/")}
                        </td>
                      </tr>
                      <tr>
                        <th style={mystyle}>Gender:</th>
                        <td style={mystyle}>{patinetData?.gender}</td>
                      </tr>
                      <tr>
                        <th style={mystyle}>Email:</th>
                        <td style={mystyle}>
                          {patinetData?.email?.toLowerCase()}
                        </td>
                      </tr>
                      <tr>
                        <th style={mystyle}>Phone:</th>
                        <td style={mystyle}>{patinetData?.contactNo}</td>
                      </tr>
                      <tr>
                        <th className="pb-4" style={mystyle}>
                          Address:
                        </th>
                        {console.log(patinetData, "pateintData")}
                        <td className="white-space pb-4" style={mystyle}>
                          {patinetData?.address +
                            " " +
                            patinetData?.city +
                            " " +
                            (patinetData?.zipcode ? patinetData?.zipcode : "")}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="col-md-6">
                  <table className="table table-borderless mt-3">
                    <tbody>
                      <tr>
                        <td style={{ padding: "0.1rem 1.5rem" }}>Patient Id</td>
                        <td style={{ padding: "0.1rem 1.5rem" }}></td>
                      </tr>
                      <tr>
                        <th style={{ padding: "0.1rem 1.5rem" }}>
                          Invoice number
                        </th>
                        <td style={{ padding: "0.1rem 1.5rem" }}>5565642</td>
                      </tr>
                      <tr>
                        <th style={{ padding: "0.1rem 1.5rem" }}>
                          Service date
                        </th>
                        <td style={{ padding: "0.1rem 1.5rem" }}>20/10/2023</td>
                      </tr>
                      <tr>
                        <th style={{ padding: "0.1rem 1.5rem" }}>
                          Date of bill
                        </th>
                        <td style={{ padding: "0.1rem 1.5rem" }}>20/10/2023</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div class="table-responsive">
                <table className="table mt-4">
                  <thead className="table-light">
                    <tr>
                      <th scope="col">S.No.</th>
                      <th scope="col">Service Rendered</th>
                      <th scope="col">
                        <i class="bi bi-currency-euro"></i>Price
                      </th>
                      <th scope="col">Tax %</th>
                      <th scope="col" style={{ textAlign: "end" }}>
                        <i class="bi bi-currency-euro"></i> Service Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Boolean(singleBillData?.orderJson?.length)
                      ? singleBillData?.orderJson?.map((v, i) => {
                          return (
                            <tr>
                              <th scope="row">{i + 1}</th>
                              <td>{v?.serviceName}</td>
                              <td>{getFormatAmount(v?.amount)}</td>
                              <td>
                                {v?.data?.text?.map((v) => {
                                  return (
                                    <>
                                      <p style={{ paddingTop: "20px" }}>
                                        {v.name ? v.name : ""} -{" "}
                                        {v.value !== 0 ? v.value : ""}
                                      </p>
                                      <br />
                                    </>
                                  );
                                })}
                              </td>
                              <td style={{ textAlign: "end" }}>
                                {getFormatAmount(v?.actualAmount)}
                              </td>
                            </tr>
                          );
                        })
                      : serviceData?.map((v, i) => {
                          return (
                            <tr>
                              <th scope="row">{i + 1}</th>
                              <td>{v?.serviceName}</td>
                              <td>{getFormatAmount(v?.amount)}</td>
                              <td>
                                {v?.data?.text?.map((v) => {
                                  return (
                                    <>
                                      <p>
                                        {v.name ? v.name : " "} -{" "}
                                        {v.name ? v.value : ""}
                                      </p>
                                      <br />
                                    </>
                                  );
                                })}
                              </td>
                              <td style={{ textAlign: "end" }}>
                                {v?.actualAmount}
                              </td>
                            </tr>
                          );
                        })}
                  </tbody>
                </table>
              </div>
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
                      {console.log(singleBillData, "bill data")}
                      {/* {
                          getServiceAmount(singleBillData?.orderJson?.map((v)=>v.data.text) , v.amount)
                      } */}
                      {singleBillData?.totalAmount
                        ? getFormatAmount(singleBillData?.totalAmount)
                        : getFormatAmount(getTotalAmount())}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "end", ...mystyle }}></td>
                    <th style={{ textAlign: "end", ...mystyle }}>Discount:</th>
                    {/* <td style={{ textAlign: "end", ...mystyle }}>
                      {singleBillData?.discountApplied
                        ? singleBillData?.discountApplied + "%"
                        : discount
                        ? discount + "%"
                        : "-"}
                    </td> */}
                    <td style={{ textAlign: "end", ...mystyle }}>
                      {singleBillData?.discountApplied
                        ? getDiscountForInvoice(
                            singleBillData?.discountApplied,
                            singleBillData?.totalAmount
                          )
                        : getDiscountAmount()}
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
                      <h4>ss</h4>
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
              <hr />
              <div className="row footer-fix">
                <div className="col-lg-5 col-12">
                  {console.log(footerDetails, "footerdetiaalll")}
                  <table className="table table-borderless patient-bill">
                    <tbody>
                      <h6>Clinic Details</h6>
                      <tr>
                        <th>Clinic/Practioner Name</th>
                        <td>{footerDetails.clinic?.clinicName}</td>
                      </tr>
                      <tr>
                        <th>Specialty</th>
                        <td>{footerDetails.clinic?.speciality}</td>
                      </tr>
                      <tr>
                        <th>Address</th>
                        <td>{footerDetails.clinic?.clinicAddress}</td>
                      </tr>
                      <tr>
                        <th>Email</th>
                        <td>{footerDetails.clinic?.clinicEmail}</td>
                      </tr>
                      <tr>
                        <th>Website</th>
                        <td>{footerDetails.clinic?.website}</td>
                      </tr>
                      <tr>
                        <th>Contact No</th>
                        <td>{footerDetails.clinic?.clinicNumber}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="col-1 col-lg-2"></div>
                <div className="col-lg-5 col-12">
                  <table className="table table-borderless patient-bill">
                    <tbody>
                      <h6>Bank details</h6>
                      <tr>
                        <th>Currency</th>
                        <td>{footerDetails.bank?.currency}</td>
                      </tr>
                      <tr>
                        <th>Bank name</th>
                        <td>{footerDetails.bank?.bankName}</td>
                      </tr>
                      <tr>
                        <th>Bank code (BLZ)</th>
                        <td>{footerDetails.bank?.bankCode}</td>
                      </tr>
                      <tr>
                        <th>Account number (Konto)</th>
                        <td>{footerDetails.bank?.accountNo}</td>
                      </tr>
                      <tr>
                        <th>Swift code (BIC)</th>
                        <td>{footerDetails.bank?.swiftCode}</td>
                      </tr>
                      <tr>
                        <th>Sort code (IBAN)</th>
                        <td>{footerDetails.bank?.sortCode}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Invoice popup modal code end here  */}

      {/* Add wallet balance modal  */}
      <div
        class="modal fade"
        id="exampleModalwallet"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div className="d-flex justify-content-end pt-2 pe-2">
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <label className="form-label" htmlFor="amount">
                Add Amount
              </label>
              <input
                className="form-control"
                type="text"
                name=""
                id="amount"
                placeholder="EUR"
                value={walletAmount}
                onChange={(e) => setWalletAmount(e.target.value)}
              />
            </div>
            <div class="modal-body">
              <label className="form-label" htmlFor="mode">
                Payment Mode
              </label>
              <select
                onChange={(e) => setPaymentMode(e.target.value)}
                value={paymentMode}
                className="form-select"
                name="mode"
                id=""
              >
                <option value="Cash">Cash</option>
                <option value="Online">Online</option>
                <option value="UPI">UPI</option>
              </select>
            </div>
            <div class="modal-footer justify-content-end">
              <button
                type="button"
                class="btn btn-secondary btn-sm"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleWalletAmount}
                class="btn btn-primary btn-sm"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* wallet history popup modal  */}
      <div
        class="modal fade"
        id="exampleModalwallethistory"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-xl">
          <div class="modal-content">
            <div className="d-flex justify-content-end pt-2 pe-2">
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <table class="table table-bordered jainul-table">
                <thead class="table-light">
                  <tr>
                    <th>S.No.</th>
                    <th>Invoice date</th>
                    <th>Wallet amount</th>
                    <th> Total Billed amount</th>
                    <th>Mode of payment</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>12/08/2023</td>
                    <td>2980</td>
                    <td>9850</td>
                    <td>Cash</td>
                    <td>Pending</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="modal-footer justify-content-end">
              <button
                type="button"
                class="btn btn-secondary btn-sm"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary btn-sm">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Add discount modal  */}
      <div
        class="modal fade"
        id="exampleModaldiscount"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div className="d-flex justify-content-end pt-2 pe-2">
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div className="row">
                <div className="col-3">
                  <label className="form-label" htmlFor="amount">
                    Clinic code
                  </label>
                  <input
                    className="form-control"
                    type="number"
                    name=""
                    disabled
                    id="amount"
                    value={loggedInOwner?.clinicId}
                    onChange={(e) =>
                      setInvoiceDetails({
                        ...invoiceDetails,
                        clinic: e.target.value,
                      })
                    }
                    placeholder=""
                  />
                </div>
                <div className="col-9">
                  <label className="form-label" htmlFor="amount">
                    Invoice number
                  </label>
                  <input
                    className="form-control"
                    type="number"
                    name=""
                    id="amount"
                    value={invoiceDetails?.invoiceNum}
                    onChange={(e) =>
                      setInvoiceDetails({
                        ...invoiceDetails,
                        invoiceNum: e.target.value,
                      })
                    }
                    placeholder=""
                  />
                </div>
                <div className="col-12 mt-4">
                  <label htmlFor="text" className="form-label">
                    Description text
                  </label>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Cupiditate natus error delectus non fuga nam.
                  </p>
                </div>
                <div className="col-12"></div>
                <div className="col-12 mt-4 d-flex align-itmes-baseline">
                  <input
                    type="checkbox"
                    value={invoiceDetails?.isAccept}
                    checked={invoiceDetails?.isAccept}
                    onChange={(e) =>
                      setInvoiceDetails({
                        ...invoiceDetails,
                        isAccept: e.target.checked,
                      })
                    }
                    name=""
                    id=""
                  />
                  <small className="text-danger ms-2">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Quaerat quo et nulla facilis maxime consequuntur?
                  </small>
                </div>
              </div>
            </div>
            <div class="modal-footer justify-content-end">
              <button
                type="button"
                disabled={!invoiceDetails?.isAccept}
                onClick={handleGenerateInvoiceNumber}
                class="btn btn-primary btn-sm"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PatientsBilling;
